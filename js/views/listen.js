// Luyện nghe với file của bạn: tải mp3 lên (lưu trong IndexedDB của trình duyệt), nghe với tốc độ/lặp câu,
// hiện nội dung nghe (pinyin, nghĩa, đồng bộ thời gian) và câu hỏi đọc hiểu (tự soạn hoặc tạo tự động từ nội dung).
import { store, logActivity } from '../core/store.js';
import { segment, isHan, hsk30List, LV30, shuffle, sentencePinyin } from '../core/dict.js';
import { esc, icon, $, $$, toast, zhTokens } from '../core/ui.js';
import { speak, stopSeq, SR } from '../core/tts.js';
import { typingTrainer, splitSentences } from './typing.js';
import { sentenceChars, align, recognizeOnce, recordClip } from './speaking.js';

// ── Kho dữ liệu (IndexedDB) ──
const DB = {
  db: null,
  open() { return this.db ? Promise.resolve(this.db) : new Promise((res, rej) => { const r = indexedDB.open('hanngu-listen', 1); r.onupgradeneeded = () => r.result.createObjectStore('sets', { keyPath: 'id' }); r.onsuccess = () => res(this.db = r.result); r.onerror = () => rej(r.error); }); },
  async tx(mode, fn) { const db = await this.open(); return new Promise((res, rej) => { const t = db.transaction('sets', mode), s = t.objectStore('sets'); const r = fn(s); t.oncomplete = () => res(r && r.result); t.onerror = () => rej(t.error); }); },
  all() { return this.tx('readonly', s => s.getAll()); },
  get(id) { return this.tx('readonly', s => s.get(id)); },
  put(d) { d.updated = Date.now(); return this.tx('readwrite', s => s.put(d)); },
  del(id) { return this.tx('readwrite', s => s.delete(id)); },
};
const uid = () => 'l' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const fmtT = s => { if (s == null || isNaN(s)) return '--:--'; s = Math.max(0, s); return `${String(Math.floor(s / 60)).padStart(2, '0')}:${(s % 60).toFixed(1).padStart(4, '0')}`; };
const fmtSize = b => b > 1048576 ? (b / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(b / 1024)) + ' KB';
const AUDIO_RE = /\.(mp3|m4a|aac|wav|ogg|oga|opus|webm|flac|mp4)$/i, TEXT_RE = /\.(txt|lrc|srt|vtt)$/i;
const baseName = n => n.replace(/\.[^.]+$/, '');
const readText = f => new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(String(r.result)); r.onerror = rej; r.readAsText(f, 'utf-8'); });
const durationOf = src => new Promise(res => { const a = new Audio(); a.preload = 'metadata'; a.onloadedmetadata = () => res(isFinite(a.duration) ? a.duration : 0); a.onerror = () => res(0); a.src = src; setTimeout(() => res(0), 8000); });

// ── Đọc nội dung nghe: "câu|nghĩa", LRC [mm:ss.xx], SRT/VTT, hoặc dòng Trung + dòng Việt ──
const toSec = (m, s) => +m * 60 + +s;
export function parseTranscript(text) {
  text = String(text || '').replace(/\r/g, '').replace(/^﻿/, '');
  const lines = [];
  // SRT / VTT
  if (/-->/.test(text)) {
    for (const blk of text.split(/\n\s*\n/)) {
      const m = blk.match(/(\d+):(\d{2}):(\d{2})[,.](\d{1,3})\s*-->/) || blk.match(/(?:^|\n)()(\d{1,2}):(\d{2})[,.](\d{1,3})\s*-->/);
      if (!m) continue;
      const t = (+m[1] || 0) * 3600 + +m[2] * 60 + +m[3] + +('0.' + m[4]);
      const body = blk.split('\n').filter(l => l.trim() && !/-->/.test(l) && !/^\d+$/.test(l.trim()) && !/^WEBVTT/.test(l)).join(' ').replace(/<[^>]+>/g, '').trim();
      if (body) pushLine(lines, body, t);
    }
    return lines;
  }
  for (let raw of text.split('\n')) {
    raw = raw.trim(); if (!raw || /^\[(ti|ar|al|by|offset|length):/i.test(raw)) continue;
    let t = null; const m = raw.match(/^\[(\d{1,3}):(\d{2}(?:\.\d{1,3})?)\]\s*/);
    if (m) { t = toSec(m[1], m[2]); raw = raw.slice(m[0].length); }
    if (!raw) continue;
    pushLine(lines, raw, t);
  }
  lines.forEach(l => delete l.g);
  return lines;
}
function pushLine(lines, raw, t) {
  const bar = raw.indexOf('|');
  if (bar > 0) { lines.push({ zh: raw.slice(0, bar).trim(), vi: raw.slice(bar + 1).trim(), t }); return; }
  const prev = lines[lines.length - 1];
  if (![...raw].some(isHan)) { // dòng không có chữ Hán → nghĩa của dòng trước
    if (prev && prev.g) { // đoạn vừa bị tách câu mà có bản dịch chung → gộp lại thành một dòng
      const g = prev.g, grp = lines.filter(l => l.g === g); lines.splice(lines.indexOf(grp[0]), grp.length, { zh: grp.map(l => l.zh).join(''), vi: raw, t: grp[0].t });
    } else if (prev && !prev.vi) prev.vi = raw; else if (prev) prev.vi += ' ' + raw;
    return;
  }
  lines.forEach(l => delete l.g);
  // đoạn dài nhiều câu → tách câu (chỉ khi không có mốc thời gian)
  const parts = t == null ? splitSentences(raw) : [raw], g = parts.length > 1 ? Math.random() : 0;
  (parts.length ? parts : [raw]).forEach((z, i) => lines.push({ zh: z, vi: '', t: i === 0 ? t : null, ...(g ? { g } : {}) }));
}
const linesToText = ls => ls.map(l => `${l.t != null ? `[${fmtT(l.t)}] ` : ''}${l.zh}${l.vi ? '|' + l.vi : ''}`).join('\n');

// ── Câu hỏi: tự soạn ──
// 1. 他想去哪儿？
// A. 北京  B. 上海  C. 广州
// Đáp án: A        (đúng/sai: Đáp án: 对 / 错 / Đúng / Sai)
// Giải thích: ... (không bắt buộc)
export function parseQuestions(text) {
  const qs = []; let cur = null;
  const flush = () => { if (cur && cur.q) { if (!cur.opts.length) cur.opts = ['对 (Đúng)', '错 (Sai)']; if (cur.ans >= 0 && cur.ans < cur.opts.length) qs.push(cur); else cur.bad = true, qs.push(cur); } cur = null; };
  for (let ln of String(text || '').replace(/\r/g, '').split('\n')) {
    ln = ln.trim(); if (!ln) continue;
    const ans = ln.match(/^(?:đáp án|dap an|答案|key|answer)\s*[:：]?\s*(.+)$/i);
    const exp = ln.match(/^(?:giải thích|giai thich|解析|explain)\s*[:：]\s*(.+)$/i);
    if (ans && cur) {
      const v = ans[1].trim();
      if (/^[A-Fa-f]/.test(v) && cur.opts.length) cur.ans = v[0].toUpperCase().charCodeAt(0) - 65;
      else if (/^(对|đúng|dung|√|✓|true|t\b|y)/i.test(v)) { cur.tf = true; cur.ans = 0; }
      else if (/^(错|sai|×|✗|x\b|false|f\b|n)/i.test(v)) { cur.tf = true; cur.ans = 1; }
      continue;
    }
    if (exp && cur) { cur.exp = exp[1]; continue; }
    const opt = [...ln.matchAll(/(?:^|\s)([A-Fa-f])\s*[.、:：)）]\s*(.+?)(?=\s+[A-Fa-f]\s*[.、:：)）]|$)/g)];
    if (opt.length && cur && opt[0].index === 0) { opt.forEach(o => { cur.opts[o[1].toUpperCase().charCodeAt(0) - 65] = o[2].trim(); }); cur.opts = cur.opts.filter(x => x != null); continue; }
    flush();
    cur = { q: ln.replace(/^(?:câu\s*)?\d{1,3}\s*[.、:：)）]\s*/i, ''), opts: [], ans: -1, kind: 'own' };
  }
  flush();
  return qs;
}

// ── Câu hỏi: tạo tự động từ nội dung ──
function candidates(zh) {
  return segment(zh).filter(t => t.han && t.w && [...t.t].length >= 1 && !/^(的|了|是|吗|呢|吧|啊|和|在|我|你|他|她|它|们|也|都|很|不)$/.test(t.t))
    .map(t => ({ h: t.t, lv: LV30.get(t.t) || 3 }));
}
let POOL = null;
const pool = () => POOL || (POOL = [1, 2, 3].flatMap(lv => hsk30List(lv).map(w => ({ h: w.h, lv, vi: w.vi }))));
function distractors(h, n = 3, avoid = '') {
  const len = [...h].length, lv = LV30.get(h) || 2;
  const same = pool().filter(w => [...w.h].length === len && w.h !== h && !avoid.includes(w.h) && Math.abs(w.lv - lv) <= 1);
  return shuffle(same).slice(0, n).map(w => w.h);
}
export function autoQuestions(lines, n = 10) {
  const L = lines.map((l, i) => ({ ...l, i })).filter(l => [...l.zh].filter(isHan).length >= 4);
  if (!L.length) return [];
  const out = [];
  const withVi = L.filter(l => l.vi);
  const pickL = shuffle(L);
  let k = 0;
  const kinds = ['cloze', 'tf', withVi.length >= 4 ? 'mean' : 'cloze', 'cloze', 'tf'];
  while (out.length < n && k < pickL.length * 3) {
    const l = pickL[k % pickL.length], kind = kinds[k % kinds.length]; k++;
    if (out.some(q => q.src === l.i && q.kind === kind)) continue;
    const cs = candidates(l.zh);
    if (kind === 'cloze' && cs.length) {
      const c = shuffle(cs).sort((a, b) => [...b.h].length - [...a.h].length)[0];
      const ds = distractors(c.h, 3, l.zh); if (ds.length < 3) continue;
      const opts = shuffle([c.h, ...ds]);
      out.push({ kind, q: 'Nghe và chọn từ đúng điền vào chỗ trống: ' + l.zh.replace(c.h, '（　　）'), opts, ans: opts.indexOf(c.h), src: l.i, exp: l.zh + (l.vi ? ' — ' + l.vi : '') });
    } else if (kind === 'tf' && cs.length) {
      const truth = Math.random() < 0.5; let s = l.zh;
      if (!truth) { const c = shuffle(cs)[0], d = distractors(c.h, 1, l.zh)[0]; if (!d) continue; s = l.zh.replace(c.h, d); }
      out.push({ kind, tf: true, q: `Theo bài nghe, câu sau đúng hay sai? 「${s}」`, opts: ['对 (Đúng)', '错 (Sai)'], ans: truth ? 0 : 1, src: l.i, exp: 'Câu trong bài: ' + l.zh + (l.vi ? ' — ' + l.vi : '') });
    } else if (kind === 'mean' && l.vi) {
      const ds = shuffle(withVi.filter(o => o.i !== l.i && o.vi !== l.vi)).slice(0, 3).map(o => o.vi); if (ds.length < 3) continue;
      const opts = shuffle([l.vi, ...ds]);
      out.push({ kind, q: `Câu 「${l.zh}」 có nghĩa là gì?`, opts, ans: opts.indexOf(l.vi), src: l.i, exp: l.zh + ' — ' + l.vi });
    }
  }
  return out;
}

// Ghi âm đến khi người nói im lặng ~1,2 giây (hoặc hết maxSec / bấm dừng)
async function recordSilence(stream, maxSec, onLevel, setStop) {
  const mr = new MediaRecorder(stream), chunks = []; mr.ondataavailable = e => e.data.size && chunks.push(e.data);
  const ac = new (window.AudioContext || window.webkitAudioContext)(), an = ac.createAnalyser(); an.fftSize = 1024;
  ac.createMediaStreamSource(stream).connect(an); const buf = new Float32Array(an.fftSize);
  mr.start();
  const t0 = performance.now(); let voiced = 0, lastVoice = 0, noise = 0.01, n = 0, stop = false;
  setStop && setStop(() => { stop = true; });
  await new Promise(res => {
    const tick = () => {
      const el = (performance.now() - t0) / 1000;
      an.getFloatTimeDomainData(buf); let e = 0; for (const v of buf) e += v * v; const rm = Math.sqrt(e / buf.length);
      if (el < 0.3) noise = (noise * n + rm) / ++n;
      if (rm > Math.max(0.015, noise * 3)) { voiced++; lastVoice = el; }
      onLevel && onLevel(rm);
      if (stop || el >= maxSec || (voiced > 6 && el - lastVoice > 1.2 && el > 1.2)) return res();
      requestAnimationFrame(tick);
    };
    tick();
  });
  await new Promise(res => { mr.onstop = res; mr.stop(); });
  ac.close();
  return { blob: new Blob(chunks, { type: chunks[0]?.type || 'audio/webm' }), voiced: voiced > 3 };
}

// ════════════ Thư viện bài nghe ════════════
export async function listenHome(root) {
  root.innerHTML = `<div class="page-head"><div><h1>🎧 Luyện nghe với file của bạn</h1></div></div>
  <p class="muted">Tải file nghe (mp3, m4a, wav…) lên để nghe với tốc độ chậm/nhanh, lặp từng câu, xem <b>nội dung nghe</b> có pinyin và nghĩa, rồi làm <b>câu hỏi đọc hiểu</b>. File được lưu ngay trên trình duyệt của bạn (không gửi lên mạng).</p>
  <section class="card ls-up" id="lsDrop">
    <h2>⬆️ Thêm bài nghe</h2>
    <p class="small muted">Kéo thả file vào đây hoặc bấm chọn. Có thể chọn nhiều file cùng lúc; nếu kèm file nội dung cùng tên (<code>.txt</code>, <code>.lrc</code>, <code>.srt</code>) thì nội dung sẽ được gắn tự động.</p>
    <div class="row gap wrap"><label class="btn">${icon('plus')} Chọn file nghe<input type="file" id="lsFile" accept="audio/*,.mp3,.m4a,.wav,.ogg,.aac,.flac,.txt,.lrc,.srt,.vtt" multiple hidden></label>
      <label class="btn ghost">📦 Nhập bài đã xuất (.json)<input type="file" id="lsImp" accept=".json,application/json" hidden></label></div>
    <details class="vs-det"><summary>🔗 Hoặc dán link file mp3 trên mạng</summary>
      <div class="row gap wrap" style="margin-top:8px"><input id="lsUrl" class="inp" placeholder="https://…/bai-nghe.mp3" style="flex:1;min-width:220px"><input id="lsUrlName" class="inp" placeholder="Tên bài (không bắt buộc)" style="flex:1;min-width:160px"><button class="btn ghost" id="lsUrlAdd">Thêm</button></div>
      <p class="small muted">Link phải mở thẳng ra file âm thanh. Link YouTube hãy dùng ở mục Thi thử.</p></details>
    <div id="lsMsg" class="small"></div>
  </section>
  <section class="card"><div class="row gap wrap" style="justify-content:space-between"><h2>📚 Bài nghe của bạn</h2><span class="muted small" id="lsQuota"></span></div><div id="lsList"><p class="muted">Đang tải…</p></div></section>`;

  const draw = async () => {
    const all = (await DB.all()).sort((a, b) => (b.updated || 0) - (a.updated || 0));
    $('#lsList', root).innerHTML = all.length ? `<div class="ls-list">${all.map(d => `<div class="ls-item">
      <a class="ls-main" href="#/listen/${d.id}"><span class="ls-ic">🎧</span><span><b>${esc(d.title)}</b><small class="muted">${fmtT(d.duration).replace(/\.\d$/, '')} · ${d.lines?.length ? `${d.lines.length} câu nội dung` : 'chưa có nội dung'} · ${(d.qs?.length || 0)} câu hỏi${d.best != null ? ` · điểm cao nhất ${d.best}%` : ''}${d.size ? ' · ' + fmtSize(d.size) : d.audioUrl ? ' · link' : ''}</small></span></a>
      <button class="mini ls-del" data-id="${d.id}" title="Xóa bài này">Xóa</button></div>`).join('')}</div>`
      : '<p class="muted">Chưa có bài nghe nào. Hãy thêm file ở trên.</p>';
    try { const e = await navigator.storage?.estimate?.(); if (e) $('#lsQuota', root).textContent = `Đã dùng ${fmtSize(e.usage || 0)} trên trình duyệt`; } catch {}
  };
  const msg = h => { $('#lsMsg', root).innerHTML = h; };
  async function addFiles(files) {
    files = [...files]; const audios = files.filter(f => AUDIO_RE.test(f.name) || f.type.startsWith('audio/')), texts = files.filter(f => TEXT_RE.test(f.name));
    if (!audios.length) { if (texts.length) msg('<span class="bad-t">Hãy chọn kèm file âm thanh. Muốn thêm nội dung cho bài đã có, hãy mở bài đó.</span>'); return; }
    let last = null;
    for (const f of audios) {
      if (f.size > 200 * 1048576) { msg(`<span class="bad-t">File “${esc(f.name)}” lớn hơn 200 MB, không thêm được.</span>`); continue; }
      msg(`Đang thêm “${esc(f.name)}”…`);
      const url = URL.createObjectURL(f), duration = await durationOf(url); URL.revokeObjectURL(url);
      const tf = texts.find(t => baseName(t.name).toLowerCase() === baseName(f.name).toLowerCase());
      const d = { id: uid(), title: baseName(f.name), created: Date.now(), audio: f, type: f.type || 'audio/mpeg', size: f.size, duration, lines: tf ? parseTranscript(await readText(tf)) : [], qText: '', qs: [] };
      try { await DB.put(d); last = d; } catch (e) { msg(`<span class="bad-t">Không lưu được “${esc(f.name)}” (bộ nhớ trình duyệt có thể đã đầy).</span>`); }
    }
    if (last) { logActivity(); msg(`<span class="ok-t">Đã thêm ${audios.length} bài.</span>`); if (audios.length === 1) location.hash = '#/listen/' + last.id; else draw(); }
  }
  $('#lsFile', root).onchange = e => addFiles(e.target.files);
  const drop = $('#lsDrop', root);
  drop.ondragover = e => { e.preventDefault(); drop.classList.add('over'); };
  drop.ondragleave = () => drop.classList.remove('over');
  drop.ondrop = e => { e.preventDefault(); drop.classList.remove('over'); addFiles(e.dataTransfer.files); };
  $('#lsUrlAdd', root).onclick = async () => {
    const u = $('#lsUrl', root).value.trim(); if (!/^https?:\/\//i.test(u)) { toast('Link phải bắt đầu bằng http:// hoặc https://', 'bad'); return; }
    msg('Đang kiểm tra link…'); const duration = await durationOf(u);
    if (!duration) msg('<span class="bad-t">Không mở được file từ link này (có thể link không phải file âm thanh hoặc trang chặn). Vẫn thêm để bạn thử nghe.</span>');
    const d = { id: uid(), title: $('#lsUrlName', root).value.trim() || decodeURIComponent(u.split('/').pop().split('?')[0]).replace(/\.[^.]+$/, '') || 'Bài nghe', created: Date.now(), audioUrl: u.slice(0, 1000), duration, lines: [], qText: '', qs: [] };
    await DB.put(d); location.hash = '#/listen/' + d.id;
  };
  $('#lsImp', root).onchange = async e => {
    const f = e.target.files[0]; if (!f) return;
    try {
      const j = JSON.parse(await readText(f)); if (j.app !== 'hanngu-listen') throw new Error();
      let audio = null; if (j.audio) audio = await (await fetch(j.audio)).blob();
      const d = { id: uid(), title: j.title || 'Bài nghe', created: Date.now(), audio, type: audio?.type, size: audio?.size, audioUrl: j.audioUrl || '', duration: j.duration || 0, lines: j.lines || [], qText: j.qText || '', qs: j.qs || [] };
      await DB.put(d); toast('Đã nhập bài nghe.', 'good'); location.hash = '#/listen/' + d.id;
    } catch { toast('File không đúng định dạng bài nghe đã xuất.', 'bad'); }
  };
  $('#lsList', root).onclick = async e => { const b = e.target.closest('.ls-del'); if (!b) return; if (!confirm('Xóa bài nghe này khỏi trình duyệt?')) return; await DB.del(b.dataset.id); draw(); };
  draw();
  return 'Luyện nghe';
}

// ════════════ Trang nghe ════════════
export async function listenItem(root, id, tab = 'text') {
  root.innerHTML = '<p class="muted">Đang mở bài nghe…</p>';
  const d = await DB.get(id); if (!d) { root.innerHTML = '<p>Không tìm thấy bài nghe này. <a href="#/listen">Quay lại</a></p>'; return 'Luyện nghe'; }
  d.lines = d.lines || []; d.qs = d.qs || [];
  const src = d.audio ? URL.createObjectURL(d.audio) : d.audioUrl;
  const opt = store.s.listenOpt || { py: true, vi: true, hide: false, rate: 1 };
  const saveOpt = () => store.update(s => { s.listenOpt = { ...opt }; });
  root.innerHTML = `<nav class="crumb"><a href="#/listen">Luyện nghe</a> › ${esc(d.title)}</nav>
  <section class="card ls-player">
    <div class="row gap wrap" style="justify-content:space-between;align-items:center"><h1 class="ls-title" id="lsTitle" title="Bấm để đổi tên">${esc(d.title)}</h1>
      <span class="row gap"><button class="mini" id="lsRename">✏️ Đổi tên</button><button class="mini" id="lsExport">📦 Xuất bài</button></span></div>
    <audio id="lsAudio" controls preload="metadata" src="${esc(src || '')}"></audio>
    <div class="row gap wrap ls-ctl">
      <button class="btn sm ghost" id="lsBack" title="Lùi 5 giây">⏪ 5s</button>
      <button class="btn sm" id="lsPlay">${icon('play')} Phát / Dừng</button>
      <button class="btn sm ghost" id="lsFwd" title="Tiến 5 giây">5s ⏩</button>
      <label class="sel">Tốc độ <select id="lsRate">${[0.5, 0.6, 0.75, 0.9, 1, 1.25, 1.5].map(r => `<option value="${r}" ${r === (opt.rate || 1) ? 'selected' : ''}>${r}x</option>`).join('')}</select></label>
      <label class="chk"><input type="checkbox" id="lsLoop"> Lặp câu đang nghe</label>
      <span class="muted small" id="lsNow"></span>
    </div>
    <p class="muted small">Phím tắt khi không gõ chữ: <kbd>Space</kbd> phát/dừng · <kbd>←</kbd>/<kbd>→</kbd> lùi/tiến 5 giây · <kbd>R</kbd> nghe lại câu hiện tại.</p>
  </section>
  <div class="tabs ls-tabs" role="tablist">
    <a class="tab ${tab === 'text' ? 'on' : ''}" href="#/listen/${d.id}">📄 Nội dung nghe</a>
    <a class="tab ${tab === 'quiz' ? 'on' : ''}" href="#/listen/${d.id}/quiz">❓ Câu hỏi đọc hiểu <small class="muted">(${d.qs.length})</small></a>
    <a class="tab ${tab === 'speak' ? 'on' : ''}" href="#/listen/${d.id}/speak">🎤 Nghe – nói lại</a>
    <a class="tab ${tab === 'type' ? 'on' : ''}" href="#/listen/${d.id}/type">⌨️ Nghe – gõ lại</a>
  </div>
  <div id="lsBody"></div>`;

  const au = $('#lsAudio', root);
  au.playbackRate = opt.rate || 1;
  au.onerror = () => { $('#lsNow', root).innerHTML = '<span class="bad-t">Không phát được âm thanh này.</span>'; };
  const timed = () => d.lines.map((l, i) => ({ ...l, i })).filter(l => l.t != null).sort((a, b) => a.t - b.t);
  const curLine = () => { const T = timed(), t = au.currentTime; let c = null; for (const l of T) { if (l.t <= t + 0.05) c = l; else break; } return c; };
  const lineEnd = i => { const T = timed(), k = T.findIndex(l => l.i === i); return k >= 0 && T[k + 1] ? T[k + 1].t : (au.duration || Infinity); };
  let stopAt = null, loopStart = 0;
  const playLine = i => { const l = d.lines[i]; if (!l || l.t == null) return false; au.currentTime = loopStart = l.t; stopAt = lineEnd(i); au.play(); return true; };
  $('#lsBack', root).onclick = () => { au.currentTime = Math.max(0, au.currentTime - 5); };
  $('#lsFwd', root).onclick = () => { au.currentTime = Math.min(au.duration || 1e9, au.currentTime + 5); };
  $('#lsPlay', root).onclick = () => { if (!$('#lsLoop', root).checked) stopAt = null; au.paused ? au.play() : au.pause(); };
  $('#lsRate', root).onchange = e => { au.playbackRate = opt.rate = +e.target.value; saveOpt(); };
  au.ontimeupdate = () => {
    const c = curLine();
    $('#lsNow', root).textContent = `${fmtT(au.currentTime)} / ${fmtT(au.duration)}${c ? ` · câu ${c.i + 1}` : ''}`;
    $$('.ls-line', root).forEach(el => el.classList.toggle('now', !!c && +el.dataset.i === c.i));
    const loop = $('#lsLoop', root).checked;
    if (stopAt != null && au.currentTime >= stopAt - 0.03) { if (loop) au.currentTime = loopStart; else { au.pause(); stopAt = null; } }
    else if (loop && stopAt == null && c && !au.paused) { stopAt = lineEnd(c.i); loopStart = c.t; }
  };
  au.onplay = () => { stopSeq(); };
  const keyH = e => {
    if (!document.body.contains(au)) { document.removeEventListener('keydown', keyH); return; }
    if (/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName) || e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.code === 'Space') { e.preventDefault(); stopAt = null; au.paused ? au.play() : au.pause(); }
    else if (e.key === 'ArrowLeft') au.currentTime = Math.max(0, au.currentTime - 5);
    else if (e.key === 'ArrowRight') au.currentTime += 5;
    else if (e.key === 'r' || e.key === 'R') { const c = curLine(); if (c) playLine(c.i); }
  };
  document.addEventListener('keydown', keyH);
  const save = () => DB.put(d);
  $('#lsRename', root).onclick = async () => { const n = prompt('Tên bài nghe:', d.title); if (n && n.trim()) { d.title = n.trim().slice(0, 120); await save(); $('#lsTitle', root).textContent = d.title; } };
  $('#lsExport', root).onclick = async () => {
    const j = { app: 'hanngu-listen', v: 1, title: d.title, duration: d.duration, audioUrl: d.audioUrl || '', lines: d.lines, qText: d.qText || '', qs: d.qs };
    if (d.audio) { if (d.audio.size > 60 * 1048576 && !confirm('File âm thanh lớn, file xuất sẽ rất nặng. Vẫn xuất?')) return; j.audio = await new Promise(res => { const r = new FileReader(); r.onload = () => res(r.result); r.readAsDataURL(d.audio); }); }
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(j)], { type: 'application/json' })); a.download = `${d.title.replace(/[\\/:*?"<>|]/g, '_')}.json`; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 3000);
    toast('Đã xuất bài (gồm âm thanh, nội dung và câu hỏi) – gửi file này cho bạn bè rồi bấm “Nhập bài đã xuất”.');
  };
  if (!d.duration && src) au.addEventListener('loadedmetadata', () => { if (isFinite(au.duration)) { d.duration = au.duration; save(); } }, { once: true });

  const body = $('#lsBody', root);

  // ── Nội dung nghe ──
  function drawText(edit = !d.lines.length) {
    if (edit) {
      body.innerHTML = `<section class="card"><h2>📝 Nhập nội dung nghe</h2>
        <p class="small muted">Dán lời của bài nghe. Mỗi câu một dòng, có thể kèm nghĩa sau dấu <code>|</code> hoặc ở dòng tiếng Việt ngay bên dưới. Hỗ trợ dòng có mốc thời gian dạng LRC <code>[00:12.5] 你好！|Xin chào!</code> và file phụ đề <code>.srt</code>. Đoạn văn dài sẽ được tự tách thành câu.</p>
        <textarea id="lsTxt" class="inp ls-txt" lang="zh-CN" rows="10" placeholder="你好，我叫王明。|Xin chào, tôi tên là Vương Minh.\n我是中国人。\nTôi là người Trung Quốc.">${esc(linesToText(d.lines))}</textarea>
        <div class="row gap wrap"><button class="btn" id="lsSaveTxt">💾 Lưu nội dung</button>
          <label class="btn ghost">📄 Tải file nội dung (.txt, .lrc, .srt)<input type="file" id="lsTxtFile" accept=".txt,.lrc,.srt,.vtt,text/plain" hidden></label>
          <button class="btn" id="lsAI">🤖 Nhận dạng tự động từ file</button>
          ${SR ? '<button class="btn ghost" id="lsAuto">🎙️ Nhận dạng qua loa + micro</button>' : ''}
          ${d.lines.length ? '<button class="btn ghost" id="lsCancel">Hủy</button>' : ''}</div>
        <div id="lsAutoBox" class="small"></div></section>`;
      $('#lsSaveTxt', body).onclick = async () => { d.lines = parseTranscript($('#lsTxt', body).value); await save(); toast(d.lines.length ? `Đã lưu ${d.lines.length} câu.` : 'Đã xóa nội dung.'); drawText(false); };
      $('#lsTxtFile', body).onchange = async e => { const f = e.target.files[0]; if (f) $('#lsTxt', body).value = linesToText(parseTranscript(await readText(f))); };
      if ($('#lsCancel', body)) $('#lsCancel', body).onclick = () => drawText(false);
      if ($('#lsAuto', body)) $('#lsAuto', body).onclick = autoTranscribe;
      $('#lsAI', body).onclick = aiTranscribe;
      return;
    }
    const hasT = d.lines.some(l => l.t != null), hasVi = d.lines.some(l => l.vi);
    body.innerHTML = `<section class="card">
      <div class="row gap wrap ls-bar">
        <label class="sw"><input type="checkbox" id="oPy" ${opt.py ? 'checked' : ''}><span></span> Pinyin</label>
        ${hasVi ? `<label class="sw"><input type="checkbox" id="oVi" ${opt.vi ? 'checked' : ''}><span></span> Tiếng Việt</label>` : ''}
        <label class="sw" title="Nghe trước, bấm vào câu để hiện chữ"><input type="checkbox" id="oHide" ${opt.hide ? 'checked' : ''}><span></span> Ẩn chữ (nghe trước)</label>
        <span class="grow"></span>
        <button class="mini" id="lsSync">⏱️ ${hasT ? 'Đồng bộ lại thời gian' : 'Đồng bộ câu với âm thanh'}</button>
        <button class="mini" id="lsEdit">✏️ Sửa nội dung</button>
      </div>
      ${hasT ? '<p class="small muted">Bấm ▶ ở mỗi câu để nghe riêng câu đó; câu đang phát được tô màu.</p>' : '<p class="note small">Nội dung chưa có mốc thời gian. Bấm “Đồng bộ câu với âm thanh”, nghe và bấm phím <kbd>Enter</kbd> mỗi khi một câu mới bắt đầu – sau đó bạn có thể bấm vào từng câu để nghe lại và lặp câu.</p>'}
      <div id="lsSyncBox"></div>
      <div class="ls-text ${opt.py ? '' : 'no-py'} ${opt.vi ? '' : 'no-vi'} ${opt.hide ? 'hide-zh' : ''}">${d.lines.map((l, i) => `<div class="ls-line" data-i="${i}">
        <button class="ls-t" ${l.t == null ? 'disabled' : ''} title="Nghe câu này">${l.t != null ? '▶ ' + fmtT(l.t).replace(/\.\d$/, '') : (i + 1)}</button>
        <div class="ls-body"><div class="zh" lang="zh-CN">${zhTokens(l.zh)}</div>${l.vi ? `<div class="vi">${esc(l.vi)}</div>` : ''}</div>
        <button class="say ls-tts" title="Nghe giọng máy đọc câu này" aria-label="Giọng máy đọc">${icon('vol')}</button></div>`).join('')}</div>
      <p class="muted small">Bấm vào một từ để tra nghĩa. ${d.lines.length} câu · ${[...d.lines.map(l => l.zh).join('')].filter(isHan).length} chữ Hán.</p>
    </section>`;
    const txt = $('.ls-text', body);
    $('#oPy', body).onchange = e => { opt.py = e.target.checked; txt.classList.toggle('no-py', !opt.py); saveOpt(); };
    if ($('#oVi', body)) $('#oVi', body).onchange = e => { opt.vi = e.target.checked; txt.classList.toggle('no-vi', !opt.vi); saveOpt(); };
    $('#oHide', body).onchange = e => { opt.hide = e.target.checked; txt.classList.toggle('hide-zh', opt.hide); $$('.ls-line', body).forEach(x => x.classList.remove('shown')); saveOpt(); };
    $('#lsEdit', body).onclick = () => drawText(true);
    $('#lsSync', body).onclick = startSync;
    txt.onclick = e => {
      const ln = e.target.closest('.ls-line'); if (!ln) return; const i = +ln.dataset.i;
      if (e.target.closest('.ls-t')) { playLine(i); return; }
      if (e.target.closest('.ls-tts')) { au.pause(); speak(d.lines[i].zh); return; }
      if (txt.classList.contains('hide-zh') && !ln.classList.contains('shown')) { ln.classList.add('shown'); e.stopPropagation(); }
    };
  }

  // Đồng bộ thời gian: nghe và bấm Enter khi mỗi câu bắt đầu
  function startSync() {
    const box = $('#lsSyncBox', body); let k = 0; const marks = [];
    box.innerHTML = `<div class="ls-sync card"><p><b>Đồng bộ thời gian</b> – bấm <b>Bắt đầu</b>, khi nghe thấy câu nào bắt đầu thì bấm nút lớn (hoặc phím <kbd>Enter</kbd>).</p>
      <div class="ls-snext" lang="zh-CN"></div>
      <div class="row gap wrap"><button class="btn" id="sGo">${icon('play')} Bắt đầu từ đầu</button><button class="btn big" id="sMark" disabled>⏎ Câu này bắt đầu</button><button class="btn ghost" id="sUndo" disabled>↶ Lùi 1 câu</button><button class="btn ghost" id="sStop">Xong / Hủy</button></div>
      <p class="small muted" id="sInfo"></p></div>`;
    const show = () => { $('.ls-snext', box).innerHTML = k < d.lines.length ? `Câu ${k + 1}/${d.lines.length}: ${esc(d.lines[k].zh)}` : '✓ Đã đánh dấu hết các câu.'; $('#sInfo', box).textContent = marks.length ? `Đã đánh dấu ${marks.length} câu, câu gần nhất lúc ${fmtT(marks[marks.length - 1])}.` : ''; };
    const finish = async saveIt => {
      document.removeEventListener('keydown', kh); au.pause();
      if (saveIt && marks.length) { d.lines.forEach((l, i) => { l.t = i < marks.length ? +marks[i].toFixed(2) : null; }); await save(); toast(`Đã lưu thời gian cho ${marks.length} câu.`, 'good'); }
      drawText(false);
    };
    const mark = () => { if (k >= d.lines.length) return; marks.push(au.currentTime); k++; show(); $('#sUndo', box).disabled = false; if (k >= d.lines.length) setTimeout(() => finish(true), 600); };
    const kh = e => { if (e.key === 'Enter') { e.preventDefault(); if (!$('#sMark', box).disabled) mark(); } };
    document.addEventListener('keydown', kh);
    $('#sGo', box).onclick = () => { marks.length = 0; k = 0; stopAt = null; au.currentTime = 0; au.play(); $('#sMark', box).disabled = false; show(); };
    $('#sMark', box).onclick = mark;
    $('#sUndo', box).onclick = () => { if (!marks.length) return; marks.pop(); k--; show(); };
    $('#sStop', box).onclick = () => finish(marks.length > 0 && confirm(`Lưu thời gian cho ${marks.length} câu đã đánh dấu?`));
    show(); box.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // Nhận dạng thẳng từ file bằng AI chạy trên máy (Whisper) – không cần loa/micro
  let worker = null;
  function aiTranscribe() {
    const out = $('#lsAutoBox', body);
    const mem = navigator.deviceMemory || 8;
    out.innerHTML = `<div class="ls-ai card">
      <p><b>🤖 Nhận dạng tự động bằng AI (Whisper) chạy ngay trên máy bạn</b> – đọc thẳng từ file, không cần loa hay micro, không gửi âm thanh đi đâu. Lần đầu cần tải mô hình về trình duyệt (chỉ một lần), sau đó dùng lại ngay. Kết quả có mốc thời gian, chữ phồn thể được đổi sang giản thể.</p>
      <div class="row gap wrap"><label class="sel">Mô hình <select id="aiModel">
        <option value="Xenova/whisper-base">Nhanh – base (~80 MB)</option>
        <option value="Xenova/whisper-small" ${mem >= 8 ? 'selected' : ''}>Chính xác hơn – small (~250 MB)</option>
        <option value="Xenova/whisper-tiny">Rất nhanh, kém chính xác – tiny (~40 MB)</option></select></label>
        <button class="btn sm" id="aiGo">▶ Bắt đầu nhận dạng</button><button class="btn sm ghost" id="aiStop" disabled>Dừng</button></div>
      <div class="ai-prog" hidden><div class="my-bar"><span id="aiBar"></span></div><span class="small muted" id="aiTxt"></span></div>
      <div class="sp-live" id="aiLive"></div>
      <p class="small muted">Nên dùng máy tính và trình duyệt Chrome/Edge bản mới. Bài 5 phút thường mất vài phút để nhận dạng (máy càng mạnh càng nhanh). AI có thể nghe sai tên riêng hoặc từ hiếm – hãy đọc lại và sửa trước khi lưu.</p></div>`;
    const bar = $('#aiBar', out), txt = $('#aiTxt', out), live = $('#aiLive', out), prog = $('.ai-prog', out);
    const setP = (f, m) => { prog.hidden = false; bar.style.width = Math.round(Math.max(0, Math.min(1, f)) * 100) + '%'; txt.textContent = m; };
    const got = [];
    const finish = (ok, msg) => {
      if (worker) { worker.terminate(); worker = null; }
      $('#aiGo', out).disabled = false; $('#aiStop', out).disabled = true;
      if (got.length) {
        const ta = $('#lsTxt', body);
        const lines = got.map(g => `[${fmtT(g.t)}] ${/[。！？!?…]$/.test(g.zh) ? g.zh : g.zh + '。'}`).join('\n');
        ta.value = (ta.value.trim() ? ta.value.trim() + '\n' : '') + lines;
        ta.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      if (msg) txt.innerHTML = msg;
      if (ok) toast(got.length ? `Đã nhận dạng ${got.length} câu – hãy đọc lại, sửa rồi bấm “Lưu nội dung”.` : 'Không nhận ra lời nói tiếng Trung trong file này.', got.length ? 'good' : 'bad');
    };
    $('#aiStop', out).onclick = () => finish(false, 'Đã dừng. Phần đã nhận dạng được chép vào ô nội dung.');
    $('#aiGo', out).onclick = async () => {
      got.length = 0; live.innerHTML = '';
      $('#aiGo', out).disabled = true; $('#aiStop', out).disabled = false;
      let pcm;
      try { setP(0, 'Đang đọc file âm thanh…'); pcm = await decode16k(); }
      catch (e) { finish(false, `<span class="bad-t">Không đọc được file âm thanh (${esc(e.message || e)}). ${d.audioUrl ? 'File từ link có thể bị trang gốc chặn – hãy tải file về máy rồi thêm lại.' : ''}</span>`); return; }
      try { worker = new Worker(new URL('../workers/asr.js', import.meta.url), { type: 'module' }); }
      catch { finish(false, '<span class="bad-t">Trình duyệt này chưa hỗ trợ chạy nhận dạng (cần Chrome/Edge/Firefox bản mới).</span>'); return; }
      const files = {};
      worker.onmessage = ev => {
        const m = ev.data;
        if (m.type === 'stage') setP(0, m.msg);
        else if (m.type === 'load') { files[m.file] = [m.loaded || 0, m.total || 0]; const L = Object.values(files).reduce((a, x) => a + x[0], 0), T = Object.values(files).reduce((a, x) => a + x[1], 0); setP(T ? L / T : 0, `Đang tải mô hình: ${fmtSize(L)}${T ? ' / ' + fmtSize(T) : ''} (chỉ lần đầu)`); }
        else if (m.type === 'part') { got.push(...m.lines); setP((m.k + 1) / m.n, `Đã nhận dạng ${m.k + 1}/${m.n} đoạn · ${got.length} câu`); live.innerHTML = got.slice(-5).map(g => `<div lang="zh-CN">[${fmtT(g.t)}] ${esc(g.zh)}</div>`).join(''); }
        else if (m.type === 'done') { setP(1, '✓ Xong'); finish(true); }
        else if (m.type === 'error') finish(false, `<span class="bad-t">Lỗi khi nhận dạng: ${esc(m.msg)}. Hãy kiểm tra kết nối mạng (lần đầu cần tải mô hình) hoặc thử mô hình nhỏ hơn.</span>`);
      };
      worker.onerror = ev => finish(false, `<span class="bad-t">Không chạy được bộ nhận dạng (${esc(ev.message || 'lỗi')}).</span>`);
      worker.postMessage({ type: 'run', model: $('#aiModel', out).value, audio: pcm }, [pcm.buffer]);
    };
  }
  // Giải mã file thành âm thanh mono 16 kHz (định dạng Whisper cần)
  async function decode16k() {
    const buf = d.audio ? await d.audio.arrayBuffer() : await (await fetch(d.audioUrl)).arrayBuffer();
    return pcm16k(buf);
  }
  async function pcm16k(buf) {
    const AC = window.AudioContext || window.webkitAudioContext;
    const ctx = new AC();
    const ab = await new Promise((res, rej) => { const p = ctx.decodeAudioData(buf, res, rej); if (p && p.then) p.then(res, rej); });
    ctx.close && ctx.close();
    const len = Math.ceil(ab.duration * 16000);
    const off = new OfflineAudioContext(1, len, 16000);
    const src = off.createBufferSource(); src.buffer = ab; src.connect(off.destination); src.start();
    const r = await off.startRendering();
    return new Float32Array(r.getChannelData(0));
  }

  // Nhận dạng tự động: phát âm thanh qua loa và nghe lại bằng micro (Chrome/Edge)
  function autoTranscribe() {
    const out = $('#lsAutoBox', body);
    out.innerHTML = `<div class="note">Máy sẽ <b>phát bài nghe qua loa</b> và dùng <b>micro</b> để nhận dạng lời nói (cần Chrome/Edge, cho phép micro, phòng yên tĩnh, bật loa vừa đủ – không dùng tai nghe). Kết quả chỉ để tham khảo, hãy sửa lại cho đúng rồi bấm “Lưu nội dung”. Mỗi câu nhận được sẽ kèm mốc thời gian.</div>
      <div class="row gap"><button class="btn sm" id="aGo">🎙️ Bắt đầu nhận dạng</button><button class="btn sm ghost" id="aStop" disabled>Dừng</button></div><div class="sp-live" id="aLive"></div>`;
    let r = null, running = false, segStart = null; const got = [];
    const live = $('#aLive', out);
    const stop = () => { running = false; try { r && r.stop(); } catch {} au.pause(); $('#aGo', out).disabled = false; $('#aStop', out).disabled = true;
      if (got.length) { const ta = $('#lsTxt', body); ta.value = (ta.value.trim() ? ta.value.trim() + '\n' : '') + got.map(g => `[${fmtT(g.t)}] ${g.zh}`).join('\n'); toast(`Đã nhận dạng ${got.length} câu – hãy kiểm tra lại rồi lưu.`); } };
    const begin = () => {
      if (!running) return;
      r = new SR(); r.lang = 'zh-CN'; r.continuous = true; r.interimResults = true;
      r.onresult = e => { let interim = ''; for (let i = e.resultIndex; i < e.results.length; i++) { const t = e.results[i][0].transcript.trim(); if (segStart == null) segStart = Math.max(0, au.currentTime - 1); if (e.results[i].isFinal) { if (t) got.push({ zh: t.replace(/\s+/g, ''), t: segStart }); segStart = null; } else interim += t; }
        live.innerHTML = got.slice(-4).map(g => `<div lang="zh-CN">[${fmtT(g.t)}] ${esc(g.zh)}</div>`).join('') + (interim ? `<div class="muted" lang="zh-CN">${esc(interim)}</div>` : ''); };
      r.onerror = e => { if (e.error === 'not-allowed') { toast('Bạn chưa cho phép dùng micro.', 'bad'); stop(); } };
      r.onend = () => { if (running) setTimeout(begin, 120); };
      try { r.start(); } catch {}
    };
    $('#aGo', out).onclick = () => { running = true; got.length = 0; au.currentTime = 0; au.playbackRate = 1; au.play(); begin(); $('#aGo', out).disabled = true; $('#aStop', out).disabled = false; live.innerHTML = '<span class="muted">Đang nghe…</span>'; };
    $('#aStop', out).onclick = stop;
    au.addEventListener('ended', () => { if (running) setTimeout(stop, 1500); });
  }

  // ── Câu hỏi đọc hiểu ──
  function drawQuiz(mode = d.qs.length ? 'do' : 'edit') {
    if (mode === 'edit') {
      body.innerHTML = `<section class="card"><h2>✍️ Soạn câu hỏi</h2>
        <p class="small muted">Mỗi câu hỏi: dòng câu hỏi, các dòng đáp án <code>A.</code> <code>B.</code> <code>C.</code> (có thể viết trên cùng một dòng), rồi dòng <code>Đáp án: B</code>. Câu đúng/sai thì không cần đáp án A/B, chỉ ghi <code>Đáp án: 对</code> hoặc <code>Đáp án: 错</code>. Có thể thêm dòng <code>Giải thích: …</code>.</p>
        <textarea id="qTxt" class="inp ls-txt" lang="zh-CN" rows="12" placeholder="1. 他明天去哪儿？\nA. 北京  B. 上海  C. 广州\nĐáp án: A\n\n2. 他是老师。\nĐáp án: 错\nGiải thích: 他是医生。">${esc(d.qText || '')}</textarea>
        <div class="row gap wrap"><button class="btn" id="qSave">💾 Lưu câu hỏi</button>
          <button class="btn ghost" id="qAuto" ${d.lines.length ? '' : 'disabled title="Cần có nội dung nghe trước"'}>✨ Tạo câu hỏi tự động từ nội dung</button>
          ${d.qs.length ? '<button class="btn ghost" id="qCancel">Hủy</button>' : ''}</div>
        <div id="qMsg" class="small"></div>
        ${d.lines.length ? '' : `<p class="note small">Chưa có nội dung nghe nên chưa tạo câu hỏi tự động được. <a href="#/listen/${d.id}">Thêm nội dung nghe</a> trước, hoặc tự soạn câu hỏi ở trên.</p>`}</section>`;
      $('#qSave', body).onclick = async () => {
        const t = $('#qTxt', body).value, qs = parseQuestions(t), bad = qs.filter(q => q.bad);
        if (bad.length) { $('#qMsg', body).innerHTML = `<span class="bad-t">Chưa rõ đáp án của: ${bad.map(q => '“' + esc(q.q.slice(0, 30)) + '”').join(', ')}. Hãy thêm dòng “Đáp án: …”.</span>`; return; }
        d.qText = t; d.qs = [...qs, ...d.qs.filter(q => q.kind !== 'own')]; await save(); toast(`Đã lưu ${qs.length} câu hỏi tự soạn.`); drawQuiz('do'); updTab();
      };
      $('#qAuto', body).onclick = async () => { const auto = autoQuestions(d.lines, 10); if (!auto.length) { $('#qMsg', body).innerHTML = '<span class="bad-t">Nội dung quá ngắn để tạo câu hỏi.</span>'; return; } d.qText = $('#qTxt', body).value; d.qs = [...parseQuestions(d.qText).filter(q => !q.bad), ...auto]; await save(); toast(`Đã tạo ${auto.length} câu hỏi tự động.`); drawQuiz('do'); updTab(); };
      if ($('#qCancel', body)) $('#qCancel', body).onclick = () => drawQuiz('do');
      return;
    }
    const qs = d.qs, ans = {};
    const kindLb = { own: '', cloze: 'Điền từ', tf: 'Đúng/Sai', mean: 'Nghĩa câu' };
    body.innerHTML = `<section class="card">
      <div class="row gap wrap" style="justify-content:space-between"><h2>❓ Câu hỏi đọc hiểu <small class="muted">(${qs.length})</small></h2>
        <span class="row gap wrap"><button class="mini" id="qEdit">✏️ Soạn / sửa câu hỏi</button>${d.lines.length ? '<button class="mini" id="qNew">✨ Đổi bộ câu hỏi tự động</button>' : ''}</span></div>
      <p class="small muted">Nghe bài (có thể nghe nhiều lần ở trình phát phía trên) rồi chọn đáp án. ${d.best != null ? `Điểm cao nhất: <b>${d.best}%</b>.` : ''}</p>
      <ol class="ls-qs">${qs.map((q, n) => `<li class="ls-q" data-n="${n}">
        <div class="ls-qq">${kindLb[q.kind] ? `<span class="tag">${kindLb[q.kind]}</span> ` : ''}<span lang="zh-CN">${esc(q.q)}</span></div>
        <div class="ls-opts">${q.opts.map((o, k) => `<button class="ls-opt" data-k="${k}"><b>${q.tf ? '' : String.fromCharCode(65 + k) + '.'}</b> <span lang="zh-CN">${esc(o)}</span></button>`).join('')}${SR ? `<button class="say ls-vans" title="Trả lời bằng giọng nói" aria-label="Trả lời bằng giọng nói">${icon('mic')}</button>` : ''}</div>
        <div class="ls-vout small"></div>
        <div class="ls-exp" hidden>${q.exp ? `<span class="muted small">${esc(q.exp)}</span>` : ''} ${q.src != null && d.lines[q.src]?.t != null ? `<button class="mini ls-hear" data-i="${q.src}">▶ Nghe lại đoạn này</button>` : ''}</div>
      </li>`).join('')}</ol>
      <div class="row gap wrap"><button class="btn" id="qSubmit">Nộp bài</button><button class="btn ghost" id="qReset">Làm lại</button></div>
      <div id="qRes"></div></section>`;
    $('#qEdit', body).onclick = () => drawQuiz('edit');
    if ($('#qNew', body)) $('#qNew', body).onclick = async () => { d.qs = [...d.qs.filter(q => q.kind === 'own'), ...autoQuestions(d.lines, 10)]; await save(); drawQuiz('do'); updTab(); };
    let done = false;
    body.onclick = e => {
      const h = e.target.closest('.ls-hear'); if (h) { playLine(+h.dataset.i); return; }
      const v = e.target.closest('.ls-vans'); if (v && !done) { voiceAnswer(v.closest('.ls-q')); return; }
      const b = e.target.closest('.ls-opt'); if (!b || done) return;
      const li = b.closest('.ls-q'); ans[li.dataset.n] = +b.dataset.k;
      $$('.ls-opt', li).forEach(x => x.classList.toggle('sel', x === b));
    };
    $('#qSubmit', body).onclick = async () => {
      if (done) return;
      const left = qs.length - Object.keys(ans).length;
      if (left && !confirm(`Còn ${left} câu chưa trả lời. Vẫn nộp bài?`)) return;
      done = true; let ok = 0;
      $$('.ls-q', body).forEach(li => { const q = qs[+li.dataset.n], a = ans[li.dataset.n]; if (a === q.ans) ok++;
        $$('.ls-opt', li).forEach(x => { const k = +x.dataset.k; x.classList.toggle('right', k === q.ans); x.classList.toggle('wrong', k === a && a !== q.ans); x.disabled = true; });
        li.classList.add(a === q.ans ? 'ok' : 'no'); $('.ls-exp', li).hidden = false; });
      const sc = qs.length ? Math.round(ok / qs.length * 100) : 0;
      const prev = d.best; d.best = Math.max(d.best || 0, sc); await save(); logActivity(3);
      $('#qRes', body).innerHTML = `<div class="sp-sum"><div class="score-ring" style="--p:${sc}"><span>${sc}%</span></div><div><h3>Đúng ${ok}/${qs.length} câu</h3><p class="muted small">${prev != null && sc > prev ? '🎉 Điểm cao mới!' : ''} Các câu sai có giải thích và nút nghe lại đoạn liên quan.</p></div></div>`;
      $('#qRes', body).scrollIntoView({ behavior: 'smooth', block: 'center' });
    };
    $('#qReset', body).onclick = () => drawQuiz('do');
    // Trả lời bằng giọng nói: đọc đáp án (hoặc “A/B/C”, “对/错”), máy chọn phương án khớp nhất
    async function voiceAnswer(li) {
      const q = qs[+li.dataset.n], out = $('.ls-vout', li), mic = $('.ls-vans', li);
      if (mic.classList.contains('rec')) return;
      au.pause(); mic.classList.add('rec'); out.innerHTML = '<span class="muted">Đang nghe… hãy nói đáp án của bạn</span>';
      try {
        const alts = await recognizeOnce();
        if (!alts.length) { out.innerHTML = '<span class="muted">Không nghe rõ, hãy thử lại.</span>'; return; }
        let best = { k: -1, sc: 0, a: alts[0] };
        for (const a of alts) {
          const t = a.replace(/\s/g, '');
          q.opts.forEach((o, k) => {
            let sc = align(o.replace(/\s*\(.*\)$/, ''), t).score;
            const letter = String.fromCharCode(65 + k);
            if (!q.tf && new RegExp(`^(${letter}|${letter.toLowerCase()}|选${letter}|答案是?${letter})[。.]?$`).test(t)) sc = 100;
            if (q.tf && k === 0 && /^(对|是|对的|正确|是的|没错)[。！]?$/.test(t)) sc = 100;
            if (q.tf && k === 1 && /^(错|不对|错的|错误|不是|不正确)[。！]?$/.test(t)) sc = 100;
            if (sc > best.sc) best = { k, sc, a };
          });
        }
        if (best.k >= 0 && best.sc >= 50) {
          ans[li.dataset.n] = best.k; $$('.ls-opt', li).forEach(x => x.classList.toggle('sel', +x.dataset.k === best.k));
          out.innerHTML = `🎤 Máy nghe được: <span lang="zh-CN">${esc(best.a)}</span> → chọn <b>${q.tf ? esc(q.opts[best.k]) : String.fromCharCode(65 + best.k)}</b>`;
        } else out.innerHTML = `🎤 Máy nghe được: <span lang="zh-CN">${esc(alts[0])}</span> – chưa khớp phương án nào, hãy nói lại rõ hơn hoặc bấm chọn.`;
      } catch (err) { out.innerHTML = `<span class="bad-t">${esc(err.message)}</span>`; }
      finally { mic.classList.remove('rec'); }
    }
  }

  // ── Nghe – nói lại (shadowing): nghe từng câu, máy tự ghi âm và chấm đọc đúng từng chữ ──
  // AI Whisper dùng chung cho chấm băng và thử nhận giọng
  const setAI = h => $$('.ai-status', body).forEach(x => { x.innerHTML = h; });
  let aw = null; const waiting = new Map(); let seq = 0;
  const aiWorker = () => {
    if (aw) return aw;
    aw = new Worker(new URL('../workers/asr.js', import.meta.url), { type: 'module' });
    const files = {};
    aw.onmessage = ev => { const m = ev.data;
      if (m.type === 'load') { files[m.file] = [m.loaded || 0, m.total || 0]; const L = Object.values(files).reduce((a, x) => a + x[0], 0), T = Object.values(files).reduce((a, x) => a + x[1], 0); setAI(`🤖 Đang tải AI chấm: ${fmtSize(L)}${T ? ' / ' + fmtSize(T) : ''} (chỉ lần đầu) – bạn cứ luyện, bài sẽ được chấm khi tải xong.`); }
      else if (m.type === 'ready') setAI('<span class="ok-t">🤖 AI chấm đã sẵn sàng.</span>');
      else if (m.type === 'error') setAI(`<span class="bad-t">Không tải được AI chấm (${esc(m.msg)}). Bản ghi vẫn được giữ để bạn tự nghe lại; có thể dùng cách chấm bằng trình duyệt bên dưới.</span>`);
      else if (m.type === 'clip') { const w = waiting.get(m.id); if (w) { waiting.delete(m.id); if (m.error && !m.text) setAI(`<span class="bad-t">AI chấm gặp lỗi: ${esc(m.error)}</span>`); w(m.text); } }
    };
    aw.onerror = ev => { setAI(`<span class="bad-t">Không chạy được AI chấm (${esc(ev.message || 'lỗi')}).</span>`); };
    return aw;
  };
  const askAI = (pcm, model) => new Promise(res => { const id = ++seq; waiting.set(id, res); aiWorker().postMessage({ type: 'clip', id, audio: pcm, model }, [pcm.buffer]); });

  // ── Thử AI nhận giọng: nói bất kỳ câu nào, xem AI nghe ra chữ gì (và so với câu muốn đọc) ──
  const aiTestHtml = () => `<section class="card ai-test">
    <h2>🧪 Thử AI nhận giọng đọc</h2>
    <p class="small muted">Bấm 🎤 rồi đọc một câu tiếng Trung bất kỳ – AI sẽ ghi lại và cho biết nó <b>nghe ra chữ gì</b> (kèm pinyin, nghĩa). Nếu chọn hoặc gõ <b>câu muốn đọc</b>, máy so sánh và tô màu từng chữ đúng/sai. Nói xong im lặng khoảng 1 giây là máy tự dừng.</p>
    <div class="row gap wrap ls-sbar">
      <label class="sel">AI nghe <select id="atEng">
        <option value="Xenova/whisper-base">Whisper base – chạy trên máy (~80 MB)</option>
        <option value="Xenova/whisper-small">Whisper small – chuẩn hơn (~250 MB)</option>
        <option value="Xenova/whisper-tiny">Whisper tiny – rất nhanh (~40 MB)</option>
        ${SR ? '<option value="sr">Nhận dạng của trình duyệt (Chrome/Edge, cần mạng)</option>' : ''}</select></label>
      ${d.lines.length ? `<label class="sel">Câu trong bài <select id="atPick"><option value="">— đọc tự do —</option>${d.lines.map((l, i) => `<option value="${i}">${i + 1}. ${esc(l.zh.slice(0, 24))}${l.zh.length > 24 ? '…' : ''}</option>`).join('')}</select></label>` : ''}
    </div>
    <input id="atTarget" class="inp" lang="zh-CN" placeholder="Câu bạn muốn đọc (không bắt buộc) – ví dụ: 你好，我叫小明。" style="width:100%;box-sizing:border-box">
    <div class="row gap wrap" style="align-items:center;margin-top:10px"><button class="btn big" id="atRec">🎤 Bấm để nói</button><span class="tp-vu"><span id="atVu"></span></span><span class="small muted" id="atInfo"></span></div>
    <div class="small ai-status"></div>
    <div id="atOut"></div>
    <details class="vs-det" id="atHisD" hidden><summary>🕘 Các lần thử trước</summary><div id="atHis"></div></details>
  </section>`;
  function bindAiTest() {
    const eng = $('#atEng', body), tg = $('#atTarget', body), btn = $('#atRec', body), info = $('#atInfo', body), out = $('#atOut', body), vu = $('#atVu', body);
    try { const v = store.s.listenOpt?.aiEng; if (v && [...eng.options].some(o => o.value === v)) eng.value = v; } catch {}
    eng.onchange = () => { opt.aiEng = eng.value; saveOpt(); };
    if ($('#atPick', body)) $('#atPick', body).onchange = e => { const i = e.target.value; tg.value = i === '' ? '' : d.lines[+i].zh; };
    const hist = [];
    let active = false, stopNow = null;
    const render = (said, url, ms, engName) => {
      const target = tg.value.trim();
      let cmp = '';
      if (target && said) {
        const r = align(target, said), sc = sentenceChars(target, 0);
        cmp = `<div class="at-cmp"><div class="small muted">So với câu muốn đọc ${badge(r.score)} – đúng ${r.ok}, gần đúng ${r.tone}:</div><div class="sp-text" style="--sp-size:1.4rem"><div class="sp-row at-tg"><div class="sp-body"><div class="sp-zh" lang="zh-CN">${sc.html}</div></div></div></div></div>`;
        setTimeout(() => paint($('.at-tg', out), r.marks), 0);
      }
      out.innerHTML = `<div class="at-res">
        <div class="small muted">🤖 ${esc(engName)} nghe ra${ms ? ` (sau ${(ms / 1000).toFixed(1)} giây)` : ''}:</div>
        ${said ? `<div class="sent at-said"><div class="sent-body"><div class="zh">${zhTokens(said)}</div></div><div class="sent-act"><button class="say at-say" title="Nghe giọng máy đọc câu AI nghe được" aria-label="Giọng máy đọc">${icon('vol')}</button></div></div>` : '<p class="bad-t">AI không nghe ra chữ nào – hãy nói to, rõ hơn và gần micro.</p>'}
        ${url ? `<div class="small muted">Giọng của bạn:</div><audio controls src="${url}"></audio>` : ''}
        ${cmp}</div>`;
      $('.at-say', out) && ($('.at-say', out).onclick = () => speak(said));
      hist.unshift({ said, target, at: new Date().toLocaleTimeString('vi-VN') });
      $('#atHisD', body).hidden = false;
      $('#atHis', body).innerHTML = hist.slice(0, 10).map(h => `<div class="small"><b>${h.at}</b> · <span lang="zh-CN">${esc(h.said || '(không nghe ra)')}</span>${h.target ? ` <span class="muted">← muốn đọc:</span> <span lang="zh-CN">${esc(h.target)}</span>` : ''}</div>`).join('');
    };
    btn.onclick = async () => {
      if (active) { stopNow && stopNow(); return; }
      au.pause(); active = true; btn.classList.add('rec'); btn.textContent = '⏹ Đang nghe… bấm để dừng';
      const e = eng.value; out.innerHTML = '';
      try {
        if (e === 'sr') {
          info.textContent = 'Trình duyệt đang nghe…';
          const fake = {}; stopNow = () => fake._stop && fake._stop();
          const r = await recordClip(fake);
          const said = (r.alts || [])[0] || '';
          render(said ? said : '', r.url, 0, 'Trình duyệt');
        } else {
          let stream; try { stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } }); } catch { throw new Error('Cần cho phép dùng micro.'); }
          aiWorker().postMessage({ type: 'preload', model: e });
          info.textContent = 'Đang ghi âm…';
          const { blob, voiced } = await recordSilence(stream, 15, lv => { vu.style.width = Math.min(100, lv / 0.15 * 100) + '%'; }, f => { stopNow = f; });
          stream.getTracks().forEach(t => t.stop()); vu.style.width = '0';
          const url = URL.createObjectURL(blob);
          if (!voiced) { render('', url, 0, 'Whisper'); return; }
          info.textContent = '🤖 AI đang nghe lại bản ghi…'; const t0 = performance.now();
          const said = await askAI(await pcm16k(await blob.arrayBuffer()), e);
          render(said, url, performance.now() - t0, 'Whisper');
        }
        logActivity();
      } catch (err) { out.innerHTML = `<p class="bad-t">${esc(err.message || err)}</p>`; }
      finally { active = false; stopNow = null; btn.classList.remove('rec'); btn.textContent = '🎤 Bấm để nói'; info.textContent = ''; }
    };
  }

  // ── File nghe chạy liền, đến khoảng trống có sẵn trong file thì tự ghi âm câu trả lời ──
  const gapHtml = () => `<section class="card ls-gapc">
    <h2>📼 Chạy file nghe – tự ghi âm câu trả lời trong khoảng trống</h2>
    <p class="small muted">Dùng cho file có sẵn khoảng lặng để người học trả lời (như đề thi nói, bài “nghe và nhắc lại”). Máy dò các <b>khoảng trống</b> trong file, rồi <b>phát file liền một mạch</b>: khi file im lặng, máy <b>tự ghi âm</b> câu bạn nói, file nói tiếp thì tự dừng ghi. Sau đó AI Whisper (chạy trên máy) nghe lại câu hỏi và câu trả lời của bạn.</p>
    <div class="row gap wrap ls-sbar">
      <label class="sel">Kiểu bài <select id="gpMode"><option value="answer">Nghe câu hỏi rồi trả lời – AI ghi ra bạn nói gì</option><option value="repeat">Nghe và nhắc lại – chấm đọc đúng từng chữ</option></select></label>
      <label class="sel">Khoảng trống dài từ <select id="gpMin"><option value="1.2">1,2 giây</option><option value="2" selected>2 giây</option><option value="3">3 giây</option><option value="5">5 giây</option></select></label>
      <label class="sel">AI <select id="gpModel"><option value="Xenova/whisper-base">Whisper base (~80 MB)</option><option value="Xenova/whisper-small">Whisper small – chuẩn hơn (~250 MB)</option><option value="Xenova/whisper-tiny">Whisper tiny (~40 MB)</option></select></label>
    </div>
    <div class="row gap wrap"><button class="btn" id="gpGo">▶ Chạy file và ghi âm câu trả lời</button><button class="btn ghost" id="gpStop" disabled>⏹ Dừng</button><button class="btn ghost" id="gpScan">🔍 Chỉ dò khoảng trống</button></div>
    <div class="small" id="gpInfo"></div>
    <div class="ls-tl" id="gpTl" hidden></div>
    <div class="tp-gap" id="gpBanner" hidden><div class="tp-lbl">🎤 Đến lượt bạn – hãy nói <span class="tp-vu"><span id="gpVu"></span></span> <span id="gpLeft"></span></div><div class="my-bar"><span id="gpBar"></span></div></div>
    <div class="small ai-status"></div>
    <ol class="ls-gres" id="gpRes"></ol>
    <div id="gpSum"></div>
  </section>`;
  let gapPcm = null, gapSlots = null;
  async function scanGaps(minGap) {
    if (!gapPcm) gapPcm = await decode16k();
    const a = gapPcm, F = 800; // 50 ms / khung
    const e = []; for (let i = 0; i + F <= a.length; i += F) { let s = 0; for (let j = i; j < i + F; j += 2) s += a[j] * a[j]; e.push(Math.sqrt(s / (F / 2))); }
    const sorted = [...e].sort((x, y) => x - y), floor = sorted[Math.floor(sorted.length * 0.1)] || 0, peak = sorted[Math.floor(sorted.length * 0.95)] || 0.1;
    const thr = Math.max(0.006, floor + (peak - floor) * 0.12);
    const speech = e.map(v => v > thr);
    const slots = []; let firstSpeech = speech.indexOf(true);
    if (firstSpeech < 0) return [];
    let i = firstSpeech;
    while (i < speech.length) {
      while (i < speech.length && speech[i]) i++;
      const s0 = i; while (i < speech.length && !speech[i]) i++;
      const len = (i - s0) * 0.05;
      if (len >= minGap) slots.push({ a: s0 * 0.05 + 0.1, b: i >= speech.length ? Math.min(s0 * 0.05 + 30, i * 0.05) : i * 0.05 - 0.05 });
    }
    // đoạn file nói trước mỗi khoảng trống = câu hỏi / câu mẫu
    slots.forEach((sl, k) => { sl.qa = k ? slots[k - 1].b : firstSpeech * 0.05; sl.qb = sl.a; });
    return slots;
  }
  function drawTimeline(slots) {
    const tl = $('#gpTl', body), dur = au.duration || (gapPcm ? gapPcm.length / 16000 : 1);
    tl.hidden = false;
    tl.innerHTML = slots.map((s, k) => `<span class="ls-slot" style="left:${s.a / dur * 100}%;width:${Math.max(0.4, (s.b - s.a) / dur * 100)}%" title="Khoảng trống ${k + 1}: ${fmtT(s.a)}–${fmtT(s.b)}"></span>`).join('') + '<span class="ls-head" id="gpHead"></span>';
  }
  function bindGap() {
    const info = $('#gpInfo', body), res = $('#gpRes', body);
    let running = false, rec = null;
    const doScan = async () => {
      info.textContent = 'Đang dò khoảng trống trong file…';
      try { gapSlots = await scanGaps(+$('#gpMin', body).value); }
      catch (e) { info.innerHTML = `<span class="bad-t">Không đọc được file âm thanh (${esc(e.message || e)}).</span>`; return null; }
      if (!gapSlots.length) { info.innerHTML = '<span class="bad-t">Không tìm thấy khoảng trống nào đủ dài. Hãy chọn “khoảng trống dài từ” ngắn hơn, hoặc dùng chế độ “Băng chạy liên tục” bên dưới (máy tự chèn khoảng trống).</span>'; return null; }
      info.innerHTML = `Tìm thấy <b>${gapSlots.length}</b> khoảng trống để trả lời (vạch đỏ trên thanh thời gian).`;
      drawTimeline(gapSlots); return gapSlots;
    };
    $('#gpScan', body).onclick = doScan;
    $('#gpMin', body).onchange = () => { gapSlots = null; };
    $('#gpStop', body).onclick = () => { running = false; au.pause(); };
    $('#gpGo', body).onclick = async () => {
      if (running) return;
      const slots = gapSlots || await doScan(); if (!slots) return;
      let stream; try { stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } }); } catch { toast('Cần cho phép dùng micro để ghi âm câu trả lời.', 'bad'); return; }
      const model = $('#gpModel', body).value, mode = $('#gpMode', body).value;
      aiWorker().postMessage({ type: 'preload', model });
      running = true; $('#gpGo', body).disabled = true; $('#gpStop', body).disabled = false; answers = []; drawAnswers();
      res.innerHTML = slots.map((s, k) => `<li class="ls-gr" data-k="${k}"><div class="ls-gq"><b>Câu ${k + 1}</b> <button class="mini gp-q" data-k="${k}">▶ Nghe lại đoạn trong file (${fmtT(s.qa).replace(/\.\d$/, '')})</button> <span class="small muted gp-qt"></span></div><div class="ls-ga small muted">Chưa đến lượt</div></li>`).join('');
      $('#lsLoop', root).checked = false; stopAt = null; au.playbackRate = 1; au.currentTime = Math.max(0, slots[0].qa - 0.3);
      const banner = $('#gpBanner', body), bar = $('#gpBar', body), vu = $('#gpVu', body), left = $('#gpLeft', body), head = $('#gpHead', body);
      const ac = new (window.AudioContext || window.webkitAudioContext)(), an = ac.createAnalyser(); an.fftSize = 1024; ac.createMediaStreamSource(stream).connect(an); const buf = new Float32Array(an.fftSize);
      let k = 0;
      const startRec = () => { const mr = new MediaRecorder(stream), ch = []; mr.ondataavailable = e => e.data.size && ch.push(e.data); mr.start(); rec = { mr, ch, k, voiced: 0 }; banner.hidden = false; const row = $(`.ls-gr[data-k="${k}"]`, res); row.classList.add('now'); $('.ls-ga', row).textContent = '🎤 Đang ghi âm câu trả lời…'; row.scrollIntoView({ behavior: 'smooth', block: 'center' }); };
      const stopRec = () => { if (!rec) return; const r = rec; rec = null; banner.hidden = true; r.mr.onstop = () => handleAnswer(r, slots[r.k], model, mode); r.mr.stop(); };
      await au.play().catch(() => {});
      await new Promise(done => {
        const loop = () => {
          if (!running) { stopRec(); return done(); }
          const t = au.currentTime, dur = au.duration || 1;
          if (head) head.style.left = (t / dur * 100) + '%';
          const s = slots[k];
          if (s && !rec && t >= s.a && t < s.b) startRec();
          if (rec) {
            const sl = slots[rec.k]; an.getFloatTimeDomainData(buf); let e = 0; for (const v of buf) e += v * v; const rm = Math.sqrt(e / buf.length); if (rm > 0.02) rec.voiced++;
            vu.style.width = Math.min(100, rm / 0.15 * 100) + '%'; bar.style.width = Math.min(100, (t - sl.a) / (sl.b - sl.a) * 100) + '%'; left.textContent = `còn ${Math.max(0, sl.b - t).toFixed(0)} giây`;
            if (t >= sl.b) { stopRec(); k++; }
          } else if (s && t >= s.b) k++;
          if (au.ended || (au.paused && !rec && t > 0 && !running)) { stopRec(); return done(); }
          if (au.ended) { stopRec(); return done(); }
          if (k >= slots.length && !rec) { return done(); }
          requestAnimationFrame(loop);
        };
        loop();
      });
      running = false; ac.close(); setTimeout(() => stream.getTracks().forEach(t => t.stop()), 500);
      $('#gpGo', body).disabled = false; $('#gpStop', body).disabled = true; banner.hidden = true;
    };
    res.onclick = e => { const b = e.target.closest('.gp-q'); if (b && gapSlots) { const s = gapSlots[+b.dataset.k]; au.currentTime = s.qa; stopAt = s.qb; au.play(); } };
  }
  let answers = [];
  // Tổng hợp: AI ghi ra người học đã trả lời gì ở từng câu
  function drawAnswers() {
    const box = $('#gpSum', body); if (!box) return;
    const list = answers.map((x, k) => x && { ...x, k }).filter(Boolean);
    if (!list.length) { box.innerHTML = ''; return; }
    d.lastAnswers = list; save();
    box.innerHTML = `<div class="gp-sum"><div class="row gap wrap" style="justify-content:space-between;align-items:center"><h3>📝 Bạn đã trả lời (AI ghi lại)</h3><span class="row gap"><button class="mini" id="gpCopy">📋 Sao chép</button><button class="mini" id="gpDl">⬇️ Tải .txt</button></span></div>
      <ol>${list.map(x => `<li value="${x.k + 1}">${x.q ? `<div class="small muted" lang="zh-CN">Câu hỏi: ${esc(x.q)}</div>` : ''}<div lang="zh-CN">${x.a ? esc(x.a) : '<span class="muted">(không trả lời)</span>'}</div><div class="small muted py-line">${x.a ? esc(sentencePinyin(x.a)) : ''}</div></li>`).join('')}</ol></div>`;
    const txt = () => `${d.title}\n\n` + list.map(x => `Câu ${x.k + 1}${x.q ? ` – ${x.q}` : ''}\n${x.a || '(không trả lời)'}\n${x.a ? sentencePinyin(x.a) : ''}`).join('\n\n');
    $('#gpCopy', box).onclick = async () => { try { await navigator.clipboard.writeText(txt()); toast('Đã sao chép.'); } catch { toast('Không sao chép được.', 'bad'); } };
    $('#gpDl', box).onclick = () => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([txt()], { type: 'text/plain;charset=utf-8' })); a.download = `tra-loi-${d.title.replace(/[\\/:*?"<>|]/g, '_')}.txt`; a.click(); };
  }
  async function handleAnswer(r, slot, model, mode) {
    const row = $(`.ls-gr[data-k="${r.k}"]`, body); if (!row) return;
    row.classList.remove('now');
    const blob = new Blob(r.ch, { type: r.ch[0]?.type || 'audio/webm' }), url = URL.createObjectURL(blob);
    const out = $('.ls-ga', row);
    // câu hỏi/câu mẫu: lấy từ nội dung nghe (nếu có mốc thời gian), nếu không thì cho AI nghe đoạn đó trong file
    const fromLines = d.lines.filter(l => l.t != null && l.t >= slot.qa - 0.5 && l.t < slot.qb).map(l => l.zh).join('');
    let target = fromLines;
    if (!target && gapPcm && mode === 'repeat') target = await askAI(gapPcm.slice(Math.floor(slot.qa * 16000), Math.floor(slot.qb * 16000)), model);
    $('.gp-qt', row).innerHTML = target ? `File: <span lang="zh-CN">${esc(target)}</span>` : '';
    if (r.voiced < 4) { out.innerHTML = `<span class="muted">Không nghe thấy bạn trả lời.</span> <audio controls src="${url}"></audio>`; answers[r.k] = { q: target || '', a: '', t: slot.qa }; drawAnswers(); return; }
    out.innerHTML = `🤖 AI đang nghe câu trả lời… <audio controls src="${url}"></audio>`;
    const said = await askAI(await pcm16k(await blob.arrayBuffer()), model);
    if (!said) { out.innerHTML = `<span class="muted">AI không nghe ra chữ nào rõ ràng.</span> <audio controls src="${url}"></audio>`; return; }
    if (mode === 'repeat' && target) {
      const al = align(target, said), sc = sentenceChars(target, 0);
      out.innerHTML = `<div>${badge(al.score)} <span class="muted">Bạn nói (AI nghe):</span> <span lang="zh-CN">${esc(said)}</span> <audio controls src="${url}"></audio></div><div class="sp-text" style="--sp-size:1.25rem"><div class="sp-row gp-tg"><div class="sp-body"><div class="sp-zh" lang="zh-CN">${sc.html}</div></div></div></div>`;
      paint($('.gp-tg', out), al.marks);
    } else {
      out.innerHTML = `<div class="gp-ans"><span class="gp-lb">🗣️ Bạn nói:</span><div class="zh at-said" lang="zh-CN">${zhTokens(said)}</div></div><audio controls src="${url}"></audio>`;
    }
    answers[r.k] = { q: target || '', a: said, t: slot.qa };
    drawAnswers();
    logActivity();
  }

  function drawSpeak() {
    if (!d.lines.length) { body.innerHTML = gapHtml() + aiTestHtml() + `<section class="card"><p class="note">Cần có nội dung nghe để luyện nói lại theo bài. <a href="#/listen/${d.id}">Thêm nội dung nghe</a> (có thể dùng 🤖 Nhận dạng tự động). Bạn vẫn có thể dùng hai mục ở trên.</p></section>`; bindGap(); bindAiTest(); return; }
    d.speak = d.speak || {};
    let base = 0;
    const hasT = d.lines.some(l => l.t != null);
    body.innerHTML = gapHtml() + aiTestHtml() + `<section class="card">
      <h2>🎤 Nghe – nói lại</h2>
      <p class="small muted">Nghe từng câu rồi nói lại. Ở chế độ <b>tự động</b>, máy phát câu ${hasT ? 'trong file' : 'bằng giọng máy đọc (nên đồng bộ thời gian để dùng giọng thật trong file)'}, sau đó <b>tự ghi âm</b> giọng bạn và <b>chấm đúng/sai từng chữ</b>: <span class="lg ok">đúng</span> <span class="lg tone">gần đúng – kiểm tra thanh điệu</span> <span class="lg miss">thiếu hoặc sai</span>, rồi chuyển sang câu tiếp theo.</p>
      ${SR ? '' : '<p class="note small">Trình duyệt này chưa có nhận dạng giọng nói sẵn – hãy dùng chế độ “Băng chạy liên tục” (AI Whisper chấm) hoặc mở bằng Chrome/Edge.</p>'}
      <div class="ls-tape">
        <h3>📼 Băng chạy liên tục – có khoảng trống để bạn nói</h3>
        <p class="small muted">Băng phát từng câu, sau mỗi câu <b>tự dừng một khoảng</b> (dài theo độ dài câu) để bạn nói lại. Trong khoảng trống máy <b>tự ghi âm</b>, nói xong thì tự chạy tiếp. Bản ghi của bạn được <b>AI Whisper chạy ngay trên máy</b> nghe lại và chấm đúng/sai từng chữ – không cần Chrome, không gửi âm thanh đi đâu (lần đầu cần tải mô hình).</p>
        <div class="row gap wrap ls-sbar">
          <label class="sel">Kiểu <select id="tpMode"><option value="repeat">Nhắc lại câu vừa nghe – chấm từng chữ</option><option value="answer">Câu vừa nghe là câu hỏi – tôi trả lời, AI ghi ra tôi nói gì</option></select></label>
          <label class="sel">Khoảng trống <select id="tpGap"><option value="1">bằng độ dài câu</option><option value="1.5" selected>1,5 lần câu</option><option value="2">2 lần câu</option><option value="3">3 lần câu</option></select></label>
          <label class="sel">AI chấm <select id="tpModel"><option value="Xenova/whisper-base">base – nhanh (~80 MB)</option><option value="Xenova/whisper-small">small – chuẩn hơn (~250 MB)</option><option value="Xenova/whisper-tiny">tiny – rất nhanh (~40 MB)</option></select></label>
          <label class="chk"><input type="checkbox" id="tpEarly" checked> Nói xong thì chạy tiếp ngay</label>
        </div>
        <div class="row gap wrap"><button class="btn" id="tpGo">▶ Chạy băng từ câu <input id="tpFrom" type="number" min="1" max="${d.lines.length}" value="1" class="inp sm" style="width:64px" onclick="event.stopPropagation()"></button><button class="btn ghost" id="tpStop" disabled>⏹ Dừng băng</button></div>
        <div class="tp-gap" id="tpGapBox" hidden><div class="tp-lbl">🎤 Đến lượt bạn – nói lại câu vừa nghe <span class="tp-vu"><span id="tpVu"></span></span></div><div class="my-bar"><span id="tpBar"></span></div></div>
        <div class="small ai-status" id="tpAI"></div>
      </div>
      <h3 class="sub">⚡ Hoặc luyện từng câu, chấm ngay bằng trình duyệt (Chrome/Edge)</h3>
      <div class="row gap wrap ls-sbar">
        <button class="btn" id="spAuto">▶ Luyện tự động từ câu <input id="spFrom" type="number" min="1" max="${d.lines.length}" value="1" class="inp sm" style="width:64px" onclick="event.stopPropagation()"></button>
        <button class="btn ghost" id="spStop" disabled>⏹ Dừng</button>
        <label class="chk"><input type="checkbox" id="spRetry" checked> Đọc lại câu dưới 60%</label>
        <label class="chk"><input type="checkbox" id="spHide"> Ẩn chữ khi nghe</label>
        <label class="sw"><input type="checkbox" id="spPy" ${opt.py ? 'checked' : ''}><span></span> Pinyin</label>
      </div>
      <div id="spSum"></div>
      <div class="sp-text ls-sp ${opt.py ? '' : 'no-py'}" style="--sp-size:1.4rem">${d.lines.map((l, i) => { const r = sentenceChars(l.zh, base); base += r.n; return `<div class="sp-row" data-i="${i}">
        <div class="sp-body"><div class="sp-zh" lang="zh-CN">${r.html}</div>${l.vi ? `<div class="sp-vi">${esc(l.vi)}</div>` : ''}<div class="sp-res">${d.speak[i] != null ? badge(d.speak[i]) + ' <span class="muted small">lần trước</span>' : ''}</div></div>
        <div class="sp-act"><button class="say sp-hear" title="Nghe câu gốc" aria-label="Nghe câu gốc">${icon('play')}</button><button class="say sp-rec1" title="Ghi âm câu này" aria-label="Ghi âm câu này">${icon('mic')}</button></div></div>`; }).join('')}</div>
    </section>`;
    const rows = $$('.ls-sp .sp-row', body);
    $('#spPy', body).onchange = e => { opt.py = e.target.checked; $('.ls-sp', body).classList.toggle('no-py', !opt.py); saveOpt(); };
    $('#spHide', body).onchange = e => $('.ls-sp', body).classList.toggle('hide-zh', e.target.checked);
    let running = false, cancel = null;
    const hear = i => new Promise(res => {
      const l = d.lines[i];
      $('#lsLoop', root).checked = false;
      if (l.t != null && src) { const h = () => { au.removeEventListener('pause', h); res(); }; au.addEventListener('pause', h); playLine(i); cancel = () => { au.pause(); }; }
      else { au.pause(); speak(l.zh, { onEnd: res }); cancel = () => { stopSeq(); res(); }; setTimeout(res, 20000); }
    });
    const durOf = i => { const l = d.lines[i]; return l.t != null ? Math.max(2, lineEnd(i) - l.t) : [...l.zh].filter(isHan).length * 0.35 + 1; };
    async function rec(i) {
      const el = rows[i], out = $('.sp-res', el), mic = $('.sp-rec1', el);
      mic.classList.add('rec'); el.classList.add('now'); out.innerHTML = '<span class="muted">🎤 Đang ghi âm… hãy nói lại câu này</span>';
      const fake = {}; if (!SR) setTimeout(() => fake._stop && fake._stop(), (durOf(i) * 1.6 + 1.5) * 1000);
      try {
        const r = await recordClip(fake);
        const audioH = r.url ? `<audio controls src="${r.url}"></audio>` : '';
        if (!SR) { out.innerHTML = `<span class="muted small">Nghe lại giọng bạn để so với câu gốc:</span> ${audioH}`; return null; }
        const bestA = (r.alts || []).map(a => ({ a, ...align(d.lines[i].zh, a) })).sort((x, y) => y.score - x.score)[0];
        if (!bestA) { paint(el, []); out.innerHTML = `<span class="muted">Không nghe rõ giọng nói.</span> ${audioH}`; return 0; }
        paint(el, bestA.marks);
        d.speak[i] = Math.max(d.speak[i] || 0, bestA.score);
        out.innerHTML = `${badge(bestA.score)} <span class="muted small">Máy nghe được:</span> <span lang="zh-CN">${esc(bestA.a)}</span> ${audioH}`;
        logActivity();
        return bestA.score;
      } catch (err) { out.innerHTML = `<span class="bad-t">${esc(err.message)}</span>`; return null; }
      finally { mic.classList.remove('rec'); }
    }
    const summary = () => {
      const sc = Object.values(d.speak); if (!sc.length) return;
      const avg = Math.round(sc.reduce((a, b) => a + b, 0) / sc.length), weak = Object.entries(d.speak).filter(([, v]) => v < 70).map(([i]) => +i);
      d.speakAvg = avg; save();
      $('#spSum', body).innerHTML = `<div class="sp-sum"><div class="score-ring" style="--p:${avg}"><span>${avg}%</span></div><div><h3>Đã luyện ${sc.length}/${d.lines.length} câu · trung bình ${avg}%</h3>
        ${weak.length ? `<p class="small">Câu nên luyện lại: ${weak.map(i => `<a href="#" data-goto="${i}">${i + 1}</a>`).join(', ')}</p>` : '<p class="ok-t small">Không có câu nào dưới 70%. Giỏi lắm!</p>'}</div></div>`;
    };
    $('#spAuto', body).onclick = async () => {
      if (running) return;
      running = true; $('#spAuto', body).disabled = true; $('#spStop', body).disabled = false;
      const from = Math.min(d.lines.length, Math.max(1, +$('#spFrom', body).value || 1)) - 1;
      for (let i = from; i < d.lines.length && running; i++) {
        rows.forEach(r => r.classList.remove('now')); rows[i].classList.add('now'); rows[i].scrollIntoView({ behavior: 'smooth', block: 'center' });
        let tries = 0, sc;
        do {
          $('.sp-res', rows[i]).innerHTML = '<span class="muted">🔊 Nghe câu gốc…</span>';
          await hear(i); if (!running) break;
          await new Promise(r => setTimeout(r, 250));
          sc = await rec(i); tries++;
          if (running && sc != null && sc < 60 && $('#spRetry', body).checked && tries < 2) { $('.sp-res', rows[i]).insertAdjacentHTML('beforeend', ' <span class="muted small">– nghe lại và đọc thêm một lần</span>'); await new Promise(r => setTimeout(r, 1200)); }
          else break;
        } while (running);
        $('#spFrom', body).value = Math.min(d.lines.length, i + 2);
        await new Promise(r => setTimeout(r, 600));
      }
      running = false; $('#spAuto', body).disabled = false; $('#spStop', body).disabled = true; rows.forEach(r => r.classList.remove('now'));
      await save(); summary();
    };
    $('#spStop', body).onclick = () => { running = false; cancel && cancel(); };
    body.onclick = async e => {
      const g = e.target.closest('[data-goto]'); if (g) { e.preventDefault(); const el = rows[+g.dataset.goto]; el.scrollIntoView({ behavior: 'smooth', block: 'center' }); el.classList.add('flash-row'); setTimeout(() => el.classList.remove('flash-row'), 1600); return; }
      const row = e.target.closest('.sp-row'); if (!row || running) return; const i = +row.dataset.i;
      if (e.target.closest('.sp-hear')) { hear(i); return; }
      if (e.target.closest('.sp-rec1')) { if ($('.sp-rec1', row).classList.contains('rec')) return; await rec(i); await save(); summary(); return; }
      if ($('.ls-sp', body).classList.contains('hide-zh')) row.classList.toggle('shown');
    };
    // ── Băng chạy liên tục + AI Whisper chấm ──
    let tape = false, stream = null;
    const scoreFromAI = (i, text, url, mode) => {
      const el = rows[i], out = $('.sp-res', el), audioH = url ? `<audio controls src="${url}"></audio>` : '';
      if (!text) { paint(el, []); out.innerHTML = `<span class="muted">AI không nghe thấy lời nói rõ ràng.</span> ${audioH}`; return; }
      if (mode === 'answer') { out.innerHTML = `<div class="gp-ans"><span class="gp-lb">🗣️ Bạn trả lời:</span><div class="zh at-said" lang="zh-CN">${zhTokens(text)}</div></div>${audioH}`; d.tapeAnswers = d.tapeAnswers || {}; d.tapeAnswers[i] = text; save(); return; }
      const r = align(d.lines[i].zh, text);
      paint(el, r.marks); d.speak[i] = Math.max(d.speak[i] || 0, r.score);
      out.innerHTML = `${badge(r.score)} <span class="muted small">🤖 AI nghe được:</span> <span lang="zh-CN">${esc(text)}</span> ${audioH}`;
      save(); summary();
    };
    async function recordGap(maxSec) {
      const box = $('#tpGapBox', body), bar = $('#tpBar', body), vu = $('#tpVu', body);
      box.hidden = false;
      const mr = new MediaRecorder(stream), chunks = []; mr.ondataavailable = e => e.data.size && chunks.push(e.data);
      const ac = new (window.AudioContext || window.webkitAudioContext)(), an = ac.createAnalyser(); an.fftSize = 1024;
      ac.createMediaStreamSource(stream).connect(an); const buf = new Float32Array(an.fftSize);
      mr.start();
      const t0 = performance.now(); let voiced = 0, lastVoice = 0, noise = 0.01, n = 0;
      await new Promise(res => {
        const tick = () => {
          if (!tape) return res();
          const el = (performance.now() - t0) / 1000;
          an.getFloatTimeDomainData(buf); let e = 0; for (const v of buf) e += v * v; const rm = Math.sqrt(e / buf.length);
          if (el < 0.3) { noise = (noise * n + rm) / ++n; }
          const thr = Math.max(0.015, noise * 3);
          if (rm > thr) { voiced++; lastVoice = el; }
          vu.style.width = Math.min(100, rm / 0.15 * 100) + '%';
          bar.style.width = Math.min(100, el / maxSec * 100) + '%';
          const early = $('#tpEarly', body).checked && voiced > 6 && el - lastVoice > 1.1 && el > 1.2;
          if (el >= maxSec || early) return res();
          requestAnimationFrame(tick);
        };
        tick();
      });
      await new Promise(res => { mr.onstop = res; mr.stop(); });
      ac.close(); box.hidden = true;
      return { blob: new Blob(chunks, { type: chunks[0]?.type || 'audio/webm' }), voiced: voiced > 3 };
    }
    $('#tpGo', body).onclick = async () => {
      if (tape || running) return;
      try { stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } }); }
      catch { toast('Cần cho phép dùng micro để ghi âm câu trả lời.', 'bad'); return; }
      if (!window.MediaRecorder) { toast('Trình duyệt này không hỗ trợ ghi âm.', 'bad'); return; }
      const model = $('#tpModel', body).value;
      aiWorker().postMessage({ type: 'preload', model });
      tape = true; $('#tpGo', body).disabled = true; $('#tpStop', body).disabled = false; $('#spAuto', body).disabled = true;
      const mult = +$('#tpGap', body).value, tmode = $('#tpMode', body).value;
      $('#tpGapBox .tp-lbl', body).firstChild.textContent = tmode === 'answer' ? '🎤 Đến lượt bạn – hãy trả lời câu hỏi ' : '🎤 Đến lượt bạn – nói lại câu vừa nghe ';
      const from = Math.min(d.lines.length, Math.max(1, +$('#tpFrom', body).value || 1)) - 1;
      for (let i = from; i < d.lines.length && tape; i++) {
        rows.forEach(r => r.classList.remove('now')); rows[i].classList.add('now'); rows[i].scrollIntoView({ behavior: 'smooth', block: 'center' });
        $('.sp-res', rows[i]).innerHTML = '<span class="muted">🔊 Đang phát…</span>';
        await hear(i); if (!tape) break;
        const gap = tmode === 'answer' ? 5 + 5 * mult : Math.max(3, durOf(i) * mult + 1.2);
        $('.sp-res', rows[i]).innerHTML = '<span class="muted">🎤 Đang ghi âm câu trả lời…</span>';
        const { blob, voiced } = await recordGap(gap);
        const url = URL.createObjectURL(blob);
        if (!voiced) { $('.sp-res', rows[i]).innerHTML = `<span class="muted">Không nghe thấy bạn nói ở câu này.</span> <audio controls src="${url}"></audio>`; }
        else {
          $('.sp-res', rows[i]).innerHTML = `<span class="muted">🤖 AI đang nghe bản ghi…</span> <audio controls src="${url}"></audio>`;
          const idx = i;
          blob.arrayBuffer().then(pcm16k).then(pcm => askAI(pcm, model)).then(text => scoreFromAI(idx, text, url, tmode))
            .catch(() => { $('.sp-res', rows[idx]).innerHTML = `<span class="muted">Không đọc được bản ghi.</span> <audio controls src="${url}"></audio>`; });
        }
        $('#tpFrom', body).value = Math.min(d.lines.length, i + 2);
      }
      tape = false; stream.getTracks().forEach(t => t.stop()); stream = null;
      $('#tpGo', body).disabled = false; $('#tpStop', body).disabled = true; $('#spAuto', body).disabled = false; rows.forEach(r => r.classList.remove('now'));
      if (waiting.size) setAI(`🤖 AI đang chấm nốt ${waiting.size} câu…`);
    };
    $('#tpStop', body).onclick = () => { tape = false; cancel && cancel(); };
    summary();
    bindGap(); bindAiTest();
  }
  const badge = sc => `<span class="score ${sc >= 80 ? 'good' : sc >= 50 ? 'mid' : 'bad'}">${sc}%</span>`;
  const paint = (el, marks) => $$('.cz', el).forEach((c, j) => { c.classList.remove('ok', 'tone', 'miss', 'hl'); if (marks[j]) c.classList.add(marks[j]); });
  function updTab() { const t = $$('.ls-tabs .tab', root)[1]; if (t) t.innerHTML = `❓ Câu hỏi đọc hiểu <small class="muted">(${d.qs.length})</small>`; }

  // ── Nghe – gõ lại ──
  function drawType() {
    if (!d.lines.length) { body.innerHTML = `<section class="card"><p class="note">Cần có nội dung nghe để luyện gõ. <a href="#/listen/${d.id}">Thêm nội dung nghe</a>.</p></section>`; return; }
    body.innerHTML = `<section class="card ty-sec"><h2>⌨️ Nghe – gõ lại</h2><p class="small muted">Nghe từng câu ở trình phát phía trên (bấm <kbd>R</kbd> để nghe lại câu hiện tại nếu đã đồng bộ thời gian) rồi gõ lại câu đó. Gõ đúng đến đâu chữ mẫu biến mất đến đó.</p><div id="lsTy"></div></section>`;
    typingTrainer($('#lsTy', body), { key: 'ls' + d.id, sentences: d.lines.map(l => [l.zh, l.vi || '']) });
  }
  if (tab === 'quiz') drawQuiz(); else if (tab === 'type') drawType(); else if (tab === 'speak') drawSpeak(); else drawText();
  return `Luyện nghe: ${d.title}`;
}
