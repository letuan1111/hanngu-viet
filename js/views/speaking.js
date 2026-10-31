// Luyện nói theo chủ đề: bài nói mẫu 5 phần × 3 câu, bật/tắt pinyin & nghĩa, đổi phông, nghe mẫu, ghi âm và chấm từng chữ
import { store, logActivity } from '../core/store.js';
import { SPEAK_GROUPS, SPEAK_ITEMS, SPEAK_VOCAB, SPEAK_STRUCT, SPEAK_FOCUS, SPEAK_INTRO } from '../data/speaking.js';
import { segment, charPinyins, isHan, sentencePinyin, grammarById } from '../core/dict.js';
import { esc, icon, $, $$, toast, applyDisplay, say, sentence, exampleHtml, zhTokens, recAudio } from '../core/ui.js';
import { checkSentence } from '../core/checker.js';
import { vocabSet, ex5 } from './vocabset.js';
import { typingTrainer, splitSentences } from './typing.js';
import { SPEAK_LONG } from '../data/speaking-long.js';
import { AI_DEFAULT, aiModelOptions, aiPreload, aiLong, toPcm16k, recordVoice, onAIStatus } from '../core/ai.js';
import { speak, speakSeq, stopSeq, SR } from '../core/tts.js';

const FONTS = [['kai', 'Khải thư 楷体 (chuẩn sách giáo khoa)'], ['song', 'Tống thể 宋体 (chữ in)'], ['hei', 'Hắc thể 黑体 (không chân)']];
const strip = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ü/g, 'v');

// ── Danh sách chủ đề ──
export const NUM = ['①', '②', '③', '④', '⑤', '⑥'];
export const structById = id => SPEAK_STRUCT.find(t => t.id === id);
export const focusOf = id => SPEAK_FOCUS.find(f => f.qs.includes(id));
export function speakingList(root) {
  const best = store.s.speakBest || {};
  root.innerHTML = `<div class="page-head"><div><h1>Luyện nói theo chủ đề</h1></div></div>
  <p class="muted">${esc(SPEAK_INTRO)} Đọc với pinyin và nghĩa tiếng Việt, tắt dần khi đã quen, nghe giọng mẫu, rồi ghi âm để máy chấm từng chữ. Mỗi chủ đề có hai dạng: <b>khung 15 câu</b> và <b>bài nói hoàn chỉnh khoảng 200 chữ</b>. Cuối mỗi bài có khung 5 phần để bạn tự viết bài nói của mình.</p>
  <section class="card sp-focus"><h2>🧭 Học theo nhóm cấu trúc – không cần thuộc 480 câu riêng lẻ</h2>
    <p class="muted small">32 chủ đề có tổng cộng 480 câu mẫu, nhưng nhiều câu dùng lại cùng cấu trúc. Hãy học theo nhóm:</p>
    <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Nhóm</th><th>Câu hỏi</th><th>Cấu trúc trọng tâm</th></tr></thead><tbody>
    ${SPEAK_FOCUS.map(f => `<tr><td><b>${esc(f.name)}</b></td><td>${f.qs.map(q => `<a href="#/speaking/${q}">${q}</a>`).join(', ')}</td><td lang="zh-CN">${f.ids.map(id => { const t = structById(id); return `<span class="chip sm" title="${esc(t.vi)}">${esc(t.f)}</span>`; }).join(' ')}</td></tr>`).join('')}
    </tbody></table></div></section>
  ${SPEAK_GROUPS.map(([g, name, ic]) => { const items = SPEAK_ITEMS.filter(x => x.g === g); return `<section class="chapter"><h2 class="grp-h">${ic} Nhóm ${g} – ${esc(name)} <span class="grp-n">${items.length} bài</span></h2>
    <div class="lesson-list">${items.map(x => `<a class="lesson-item ${best[x.id] >= 80 ? 'done' : ''}" href="#/speaking/${x.id}"><span class="ln">${best[x.id] >= 80 ? icon('check') : x.id}</span><span class="lt"><b lang="zh-CN" class="sp-q">${esc(x.q)}</b><small>${esc(x.qvi)}</small></span>${(store.s.mySpeech || {})[x.id]?.text ? '<span class="best" title="Đã có bài nói của bạn">✍️</span>' : ''}${best[x.id] != null ? `<span class="best">${best[x.id]}%</span>` : ''}</a>`).join('')}</div></section>`; }).join('')}`;
  return 'Luyện nói theo chủ đề';
}

// Hiển thị câu theo từng chữ (để tô màu kết quả), gom chữ theo từ để tra nghĩa
export function sentenceChars(zh, base) {
  const arr = charPinyins([...zh].filter(isHan).join('')) || [];
  let k = 0, html = '';
  for (const t of segment(zh)) {
    if (!t.han) { html += `<span class="pn">${esc(t.t)}</span>`; continue; }
    const chars = [...t.t].map(c => `<span class="cz" data-k="${base + k}">${esc(c)}</span>`);
    const py = t.w && t.t.length > 1 ? t.w.p : [...t.t].map((_, j) => arr[k + j] || '').join(' ');
    html += `<span class="tk" data-w="${esc(t.t)}"><ruby>${chars.join('')}<rt>${esc(py)}</rt></ruby></span>`;
    k += t.t.length;
  }
  return { html, n: k };
}

// So khớp chữ đọc được với văn bản: đúng chữ/đúng âm = đúng; cùng âm khác thanh = sai thanh; còn lại = thiếu/sai
export function align(target, said) {
  const T = [...target].filter(isHan), S = [...said].filter(isHan);
  if (!T.length) return { marks: [], score: 0 };
  const tp = charPinyins(T.join('')) || T, sp = charPinyins(S.join('')) || S;
  const sim = (i, j) => T[i] === S[j] || tp[i] === sp[j] ? 2 : strip(tp[i]) === strip(sp[j]) ? 1 : 0;
  const n = T.length, m = S.length, dp = Array.from({ length: n + 1 }, () => new Int16Array(m + 1));
  for (let i = 1; i <= n; i++) for (let j = 1; j <= m; j++) { const s = sim(i - 1, j - 1); dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1], s ? dp[i - 1][j - 1] + s : 0); }
  const marks = Array(n).fill('miss'); let i = n, j = m;
  while (i > 0 && j > 0) { const s = sim(i - 1, j - 1); if (s && dp[i][j] === dp[i - 1][j - 1] + s) { marks[i - 1] = s === 2 ? 'ok' : 'tone'; i--; j--; } else if (dp[i - 1][j] >= dp[i][j - 1]) i--; else j--; }
  const ok = marks.filter(x => x === 'ok').length, tone = marks.filter(x => x === 'tone').length;
  return { marks, score: Math.round((ok + tone * 0.5) / n * 100), ok, tone };
}

// ── Trang bài nói ──
export function speakingItem(root, id, mode) {
  const x0 = SPEAK_ITEMS.find(i => i.id === +id); if (!x0) { root.innerHTML = '<p>Không có bài này.</p>'; return; }
  const long = mode === 'long' && SPEAK_LONG[x0.id];
  // bài hoàn chỉnh ~200 chữ dùng chung giao diện; điểm & luyện gõ lưu riêng
  const x = long ? { ...x0, s: SPEAK_LONG[x0.id].map(([, zh, vi]) => [zh, vi]), pi: SPEAK_LONG[x0.id].map(r => r[0]) } : { ...x0, pi: x0.s.map((_, i) => Math.floor(i / 3)) };
  const bk = long ? x0.id + 'L' : x0.id, sfx = long ? '/long' : '';
  const range = k => { const a = x.pi.indexOf(k), b = x.pi.lastIndexOf(k); return a === b ? `câu ${a + 1}` : `câu ${a + 1}–${b + 1}`; };
  const hanN = [...x.s.map(r => r[0]).join('')].filter(isHan).length;
  const st = store.s.settings, opt = store.s.speakOpt || { py: true, vi: true, size: 1.5 };
  const idx = SPEAK_ITEMS.indexOf(x), prev = SPEAK_ITEMS[idx - 1], next = SPEAK_ITEMS[idx + 1];
  const g = SPEAK_GROUPS.find(gg => gg[0] === x.g) || ['', '', ''];
  let base = 0;
  const rows = x.s.map(([zh, vi], i) => { const r = sentenceChars(zh, base); const k = x.pi[i]; const ph = (i === 0 || x.pi[i - 1] !== k) && x.parts?.[k] ? `<h3 class="sp-part"><span class="sp-pn">${NUM[k]}</span> ${esc(x.parts[k])} <small class="muted">${range(k)}</small></h3>` : ''; const row = ph + `<div class="sp-row" data-i="${i}" data-zh="${esc(zh)}" data-from="${base}" data-n="${r.n}">
      <div class="sp-body"><div class="sp-zh" lang="zh-CN">${r.html}</div><div class="sp-vi">${esc(vi)}</div><div class="sp-res"></div></div>
      <div class="sp-act"><button class="say sp-play" title="Nghe câu này" aria-label="Nghe câu này">${icon('vol')}</button>${SR ? `<button class="say sp-mic" title="Ghi âm câu này" aria-label="Ghi âm câu này">${icon('mic')}</button>` : ''}</div></div>`; base += r.n; return row; }).join('');
  const qr = sentenceChars(x.q, 100000);
  root.innerHTML = `<nav class="crumb"><a href="#/speaking">Luyện nói</a> › ${g[2]} ${esc(g[1])}</nav>
  <div class="sp-head card"><p class="eyebrow">Câu hỏi ${x.id} · Nhóm ${g[0]} – ${esc(g[1])}</p><div class="sp-qbig" lang="zh-CN">${qr.html}</div><div class="sp-qvi">${esc(x.qvi)}</div>
    <div class="sp-outline">${(x.parts || []).map((p, i) => `<span class="sp-ol"><b>${NUM[i]}</b> ${esc(p)}</span>`).join('<span class="sp-arr">→</span>')}</div>
    ${focusOf(x.id) ? `<p class="small sp-fc"><b>Cấu trúc trọng tâm (nhóm “${esc(focusOf(x.id).name)}”):</b> <span lang="zh-CN">${focusOf(x.id).ids.map(id => `<span class="chip sm" title="${esc(structById(id).vi)}">${esc(structById(id).f)}</span>`).join(' ')}</span></p>` : ''}
    <p class="muted small">${long ? `Bài nói hoàn chỉnh ${hanN} chữ, vẫn theo 5 phần nhưng nối câu dài và tự nhiên hơn.` : '5 phần × 3 câu = 15 câu.'} Có thể thay tên, thời gian, địa điểm, sở thích cho đúng bản thân.</p>
    <div class="tabs sp-mode" role="tablist"><a class="tab ${long ? '' : 'on'}" href="#/speaking/${x.id}" role="tab" aria-selected="${!long}">📋 Khung 15 câu</a><a class="tab ${long ? 'on' : ''}" href="#/speaking/${x.id}/long" role="tab" aria-selected="${!!long}">📄 Bài hoàn chỉnh ~200 chữ</a></div>
    ${x.note ? `<p class="note small">💡 ${esc(x.note)}</p>` : ''}</div>
  <div class="sp-bar card" role="toolbar" aria-label="Tùy chọn hiển thị">
    <label class="sw"><input type="checkbox" id="oPy" ${opt.py ? 'checked' : ''}><span></span> Pinyin</label>
    <label class="sw"><input type="checkbox" id="oVi" ${opt.vi ? 'checked' : ''}><span></span> Tiếng Việt</label>
    <label class="sel">Phông <select id="oFont">${FONTS.map(([k, n]) => `<option value="${k}" ${st.zhFont === k ? 'selected' : ''}>${n}</option>`).join('')}</select></label>
    <span class="row gap"><button class="mini" id="aMinus" aria-label="Chữ nhỏ hơn">A−</button><button class="mini" id="aPlus" aria-label="Chữ to hơn">A+</button></span>
    <span class="grow"></span>
    <button class="btn sm" id="pAll">${icon('play')} Nghe cả bài</button><button class="btn sm ghost" id="pStop">${icon('stop')}</button>
    <label class="sel">Tốc độ <select id="pRate">${[0.75, 1, 1.25].map(r => `<option ${r === (st.rate || 1) ? 'selected' : ''} value="${r}">${r}x</option>`).join('')}</select></label>
  </div>
  <article class="sp-text card ${opt.py ? '' : 'no-py'} ${opt.vi ? '' : 'no-vi'}" style="--sp-size:${opt.size}rem">${rows}</article>
  <section class="card sp-ai">
    <h2>${icon('mic')} Ghi âm & chấm phát âm</h2>
    <p class="muted small">Bấm <b>Bắt đầu nói</b> rồi đọc bài mẫu, đọc bài bạn tự viết, hoặc tự trả lời bằng lời của mình. Máy <b>ghi ra chữ bạn nói</b> (kèm pinyin, nghĩa) và khi chọn so sánh sẽ tô màu từng chữ: <span class="lg ok">đúng</span> <span class="lg tone">gần đúng – kiểm tra thanh điệu</span> <span class="lg miss">thiếu hoặc sai</span>. Bấm 🎤 cạnh từng câu để luyện riêng câu đó.</p>
    <div class="row gap wrap ls-sbar">
      <label class="sel">Nhận dạng bằng <select id="aiEng"><option value="ai">🤖 AI Whisper trên máy (chuẩn hơn, lần đầu cần tải mô hình)</option>${SR ? `<option value="sr" ${store.s.speakEng === 'sr' ? 'selected' : ''}>⚡ Trình duyệt Chrome/Edge (nhanh, không cần tải)</option>` : ''}</select></label>
      <label class="sel ai-only">AI <select id="aiModelSel">${aiModelOptions(store.s.aiModel || AI_DEFAULT)}</select></label>
      <label class="sel">So sánh với <select id="aiCmp"><option value="sample">Bài mẫu đang xem</option><option value="mine">Bài nói của bạn (tự viết)</option><option value="none">Không so sánh – chỉ ghi ra tôi nói gì</option></select></label>
      <label class="chk ai-only"><input type="checkbox" id="aiAuto" checked> Tự dừng khi im lặng 3 giây</label>
    </div>
    <div class="row gap wrap" style="align-items:center"><button class="btn big" id="aiGo">🎤 Bắt đầu nói</button><span class="tp-vu"><span id="aiVu"></span></span><span class="muted" id="aiTime"></span></div>
    <div id="aiLive" class="sp-live" aria-live="polite"></div>
    <div class="small ai-status" id="aiStat"></div>
    <div id="aiOut"></div>
  </section>
  <section class="card ty-sec"><h2>⌨️ Luyện gõ lại bài đọc</h2>
    <p class="muted small">Gõ lại từng câu của bài: gõ đúng đến chữ nào, chữ đó biến mất khỏi câu mẫu; gõ xong một câu sẽ tự chuyển sang câu tiếp. Đồng hồ tính tốc độ theo chữ/phút và từ/phút.</p>
    <div id="typing"></div></section>
  <div id="study"></div>
  <section class="card my-sp" id="mySp"></section>
  <div class="lesson-nav">${prev ? `<a class="btn ghost" href="#/speaking/${prev.id}${sfx}">‹ Câu ${prev.id}</a>` : '<span></span>'}${next ? `<a class="btn" href="#/speaking/${next.id}${sfx}">Câu ${next.id} ›</a>` : ''}</div>`;

  const text = $('.sp-text', root), srows = $$('.sp-row', root);
  const saveOpt = () => store.update(s => s.speakOpt = { py: $('#oPy', root).checked, vi: $('#oVi', root).checked, size: opt.size });
  $('#oPy', root).onchange = e => { text.classList.toggle('no-py', !e.target.checked); saveOpt(); };
  $('#oVi', root).onchange = e => { text.classList.toggle('no-vi', !e.target.checked); saveOpt(); };
  $('#oFont', root).onchange = e => { store.update(s => s.settings.zhFont = e.target.value); applyDisplay(); };
  const size = d => { opt.size = Math.min(2.6, Math.max(1.1, +(opt.size + d).toFixed(2))); text.style.setProperty('--sp-size', opt.size + 'rem'); saveOpt(); };
  $('#aMinus', root).onclick = () => size(-0.15); $('#aPlus', root).onclick = () => size(0.15);
  $('#pAll', root).onclick = () => { logActivity(); speakSeq(srows.map(el => ({ text: el.dataset.zh, el, onBoundary: hlBoundary(el) })), { rate: +$('#pRate', root).value, onItem: k => { srows.forEach((r, j) => r.classList.toggle('now', j === k)); if (k >= 0) srows[k].scrollIntoView({ block: 'center', behavior: 'smooth' }); } }); };
  $('#pStop', root).onclick = stopSeq;
  $('#pRate', root).onchange = e => store.update(s => s.settings.rate = +e.target.value);
  function hlBoundary(el) {
    // charIndex tính theo cả câu (gồm dấu câu) → quy về chỉ số chữ Hán
    const zh = el.dataset.zh; const map = []; let h = 0; [...zh].forEach((c, i) => { map[i] = isHan(c) ? h++ : -1; });
    const cs = $$('.cz', el);
    return (i, len) => { const idxs = new Set(); for (let t = i; t < i + Math.max(1, len); t++) if (map[t] >= 0) idxs.add(map[t]); cs.forEach((c, j) => c.classList.toggle('hl', idxs.has(j))); };
  }

  // tô màu kết quả lên các chữ
  const paint = (el, marks) => { $$('.cz', el).forEach((c, j) => { c.classList.remove('ok', 'tone', 'miss', 'hl'); if (marks[j]) c.classList.add(marks[j]); }); };
  const badge = s => `<span class="score ${s >= 80 ? 'good' : s >= 50 ? 'mid' : 'bad'}">${s}%</span>`;

  // ── Ghi âm từng câu ──
  root.onclick = async e => {
    const a = e.target.closest('[data-goto]'); if (a) { e.preventDefault(); const el = srows[+a.dataset.goto]; el.scrollIntoView({ block: 'center', behavior: 'smooth' }); el.classList.add('flash-row'); setTimeout(() => el.classList.remove('flash-row'), 1600); return; }
    const pl = e.target.closest('.sp-play'); if (pl) { const el = pl.closest('.sp-row'); speak(el.dataset.zh, { el, rate: +$('#pRate', root).value, onBoundary: hlBoundary(el) }); return; }
    const mic = e.target.closest('.sp-mic'); if (!mic) return;
    const el = mic.closest('.sp-row'), out = $('.sp-res', el);
    if (mic.classList.contains('rec')) return;
    mic.classList.add('rec'); out.innerHTML = '<span class="muted">Đang nghe… đọc to câu này</span>';
    try {
      const said = await recognizeOnce();
      const best = said.map(s => ({ s, ...align(el.dataset.zh, s) })).sort((a, b) => b.score - a.score)[0];
      if (!best || !best.s) { out.innerHTML = '<span class="muted">Không nghe rõ, hãy thử lại gần micro hơn.</span>'; }
      else { paint(el, best.marks); out.innerHTML = `${badge(best.score)} <span class="muted small">Máy nghe được:</span> <span lang="zh-CN">${esc(best.s)}</span>`; logActivity(); }
    } catch (err) { out.innerHTML = `<span class="bad-t">${esc(err.message)}</span>`; }
    mic.classList.remove('rec');
  };

  typingTrainer($('#typing', root), { key: 'sp' + bk, sentences: x.s });
  renderStudy($('#study', root), x0);
  renderMySpeech($('#mySp', root), x0);
  bindAI();
  // ── AI ghi âm: ghi ra người học nói gì, so với bài mẫu / bài tự viết ──
  function bindAI() {
    const go = $('#aiGo', root), out = $('#aiOut', root), stat = $('#aiStat', root), vu = $('#aiVu', root), tm = $('#aiTime', root);
    const off = onAIStatus(h => { if (document.body.contains(stat)) stat.innerHTML = h; else off(); });
    $('#aiModelSel', root).onchange = e => store.update(s => { s.aiModel = e.target.value; });
    const eng = $('#aiEng', root), live = $('#aiLive', root);
    const syncEng = () => { $$('.sp-ai .ai-only', root).forEach(el => { el.hidden = eng.value !== 'ai'; }); };
    eng.onchange = () => { store.update(s => { s.speakEng = eng.value; }); syncEng(); }; syncEng();
    let ctl = null, sess = null;
    const idle = () => { go.classList.remove('rec'); go.textContent = '🎤 Bắt đầu nói'; vu.style.width = '0'; };
    go.onclick = async () => {
      if (ctl) { ctl.stop(); return; }
      if (sess) { // dừng nhận dạng của trình duyệt
        const s0 = sess; sess = null; idle(); const { transcript, audioUrl } = await s0.stop(); live.innerHTML = '';
        const audioH = audioUrl ? recAudio(audioUrl) : '', said = transcript.replace(/\s+/g, '');
        if (!said) { out.innerHTML = `<p class="bad-t">Không nhận được giọng nói. Hãy kiểm tra micro và đọc to, rõ hơn.</p>${audioH}`; return; }
        return show(said, audioH, 'Máy');
      }
      stopSeq(); out.innerHTML = '';
      if (eng.value === 'sr') {
        sess = await startSession(live, tm); if (!sess) return;
        go.classList.add('rec'); go.textContent = '⏹ Dừng & chấm điểm'; return;
      }
      const model = $('#aiModelSel', root).value; aiPreload(model);
      try { ctl = await recordVoice({ maxSec: 180, silenceSec: $('#aiAuto', root).checked ? 3 : 0, onLevel: v => { vu.style.width = Math.min(100, v / 0.15 * 100) + '%'; }, onTime: t => { tm.textContent = `⏺ ${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`; } }); }
      catch { toast('Cần cho phép dùng micro.', 'bad'); return; }
      go.classList.add('rec'); go.textContent = '⏹ Đang ghi – bấm để dừng';
      const { blob, voiced } = await ctl.done; ctl = null;
      idle();
      const url = URL.createObjectURL(blob), audioH = `${recAudio(url)}`;
      if (!voiced) { out.innerHTML = `<p class="bad-t">Không nghe thấy giọng nói – hãy nói to hơn, gần micro.</p>${audioH}`; tm.textContent = ''; return; }
      out.innerHTML = `<p class="muted">🤖 AI đang nghe bản ghi…</p>${audioH}`;
      let lines;
      try { lines = await aiLong(await toPcm16k(await blob.arrayBuffer()), model, { onPart: (k, n) => { out.firstElementChild.textContent = `🤖 AI đang nghe… ${k}/${n} đoạn`; } }); }
      catch (e) { out.innerHTML = `<p class="bad-t">AI không nghe được (${esc(e.message || e)}).</p>${audioH}`; return; }
      tm.textContent = '';
      const said = lines.map(l => l.zh).join('');
      if (!said) { out.innerHTML = `<p class="bad-t">AI không nhận ra chữ nào rõ ràng.</p>${audioH}`; return; }
      show(said, audioH, '🤖 AI');
    };
    function show(said, audioH, who) {
      const sents = splitSentences(said).length ? splitSentences(said) : [said];
      let cmpH = '';
      const mode = $('#aiCmp', root).value;
      const rowsEl = mode === 'sample' ? srows : mode === 'mine' ? $$('#myPrev .sp-row', root) : [];
      if (mode !== 'none' && rowsEl.length) {
        const all = rowsEl.map(r => r.dataset.zh).join(''), r = align(all, said);
        let from = 0;
        const weak = [];
        rowsEl.forEach((el, k) => { const n = $$('.cz', el).length, m = r.marks.slice(from, from + n); from += n; paint(el, m); const sc = n ? Math.round((m.filter(v => v === 'ok').length + m.filter(v => v === 'tone').length * 0.5) / n * 100) : 100; const rs = $('.sp-res', el); if (rs) rs.innerHTML = badge(sc); if (sc < 70) weak.push([k, sc, el.dataset.zh]); });
        cmpH = `<div class="sp-sum"><div class="score-ring" style="--p:${r.score}"><span>${r.score}%</span></div><div><p>So với ${mode === 'sample' ? 'bài mẫu' : 'bài bạn tự viết'}: đúng <b>${r.ok}</b> chữ · gần đúng <b>${r.tone}</b>. Các chữ đã được tô màu trong ${mode === 'sample' ? 'bài mẫu ở trên' : 'phần xem trước bài của bạn'}.</p></div></div>`
          + (mode === 'sample' ? (weak.length ? `<h3 class="sub">Câu nên luyện lại (${weak.length})</h3><ul class="weak">${weak.map(([k, sc, z]) => `<li><a href="#" data-goto="${k}">Câu ${k + 1}: <span lang="zh-CN">${esc(z)}</span></a> ${badge(sc)}</li>`).join('')}</ul>` : '<p class="ok-t small">Không có câu nào dưới 70%. Giỏi lắm!</p>') : '');
        if (mode === 'sample') store.update(s => { s.speakBest = s.speakBest || {}; s.speakBest[bk] = Math.max(s.speakBest[bk] || 0, r.score); });
      } else if (mode === 'mine') cmpH = '<p class="note small">Bạn chưa viết “Bài nói của bạn” ở phía dưới nên chưa so sánh được.</p>';
      out.innerHTML = `<div class="at-res"><div class="row gap wrap" style="justify-content:space-between;align-items:center"><b>🗣️ ${who} nghe được bạn nói (${[...said].filter(isHan).length} chữ):</b><span class="row gap"><button class="mini" id="aiCopy">📋 Sao chép</button><button class="mini" id="aiDraft">📝 Đưa vào “Bài nói của bạn”</button><button class="mini" id="aiClr">🗑️ Xóa</button></span></div>
        ${sents.map(z => `<div class="sent at-said"><div class="sent-body"><div class="zh">${zhTokens(z)}</div></div><div class="sent-act"><button class="say ai-say" data-z="${esc(z)}" title="Nghe máy đọc câu này" aria-label="Nghe">${icon('vol')}</button></div></div>`).join('')}
        <div class="small muted">Giọng của bạn:</div>${audioH}${cmpH}</div>`;
      logActivity(5);
      out.onclick = e => { const b = e.target.closest('.ai-say'); if (b) speak(b.dataset.z); };
      $('#aiClr', out).onclick = () => { $$('audio', out).forEach(a => { try { URL.revokeObjectURL(a.src); } catch {} }); out.innerHTML = ''; rowsEl.forEach(el => { paint(el, []); const rs = $('.sp-res', el); if (rs) rs.innerHTML = ''; }); };
      $('#aiCopy', out).onclick = async () => { try { await navigator.clipboard.writeText(said); toast('Đã sao chép.'); } catch { toast('Không sao chép được.', 'bad'); } };
      $('#aiDraft', out).onclick = () => { const pts = $$('.my-ptxt', root); if (!pts.length) return; if (pts.some(t => t.value.trim()) && !confirm('Thay nội dung “Bài nói của bạn” bằng lời bạn vừa nói (chia đều vào 5 phần)?')) return; const per = Math.ceil(sents.length / pts.length) || 1; pts.forEach((t, k) => { t.value = sents.slice(k * per, k * per + per).join(''); t.dispatchEvent(new Event('input')); }); $('#mySp', root).scrollIntoView({ behavior: 'smooth' }); toast('Đã đưa vào Bài nói của bạn – hãy sửa lại cho đúng.'); };
    }
  }
  return `Luyện nói: ${x.q}${long ? ' (bài 200 chữ)' : ''}`;
}

// Nhận dạng một câu (trả về các phương án)
export function recognizeOnce() {
  return new Promise((res, rej) => {
    if (!SR) return rej(new Error('Trình duyệt không hỗ trợ nhận dạng giọng nói (hãy dùng Chrome hoặc Edge).'));
    stopSeq();
    const r = new SR(); r.lang = 'zh-CN'; r.interimResults = false; r.maxAlternatives = 5;
    let got = false;
    r.onresult = e => { got = true; res([...e.results[0]].map(a => a.transcript)); };
    r.onerror = e => rej(new Error(e.error === 'not-allowed' ? 'Bạn chưa cho phép dùng micro.' : e.error === 'no-speech' ? 'Không nghe thấy giọng nói, hãy thử lại.' : 'Lỗi nhận dạng: ' + e.error));
    r.onend = () => { if (!got) res([]); };
    r.start();
  });
}

// Phiên ghi âm cả bài: nhận dạng liên tục (tự khởi động lại khi trình duyệt ngắt) + MediaRecorder
async function startSession(live, timeEl) {
  let stream = null, mr = null, chunks = [];
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    if (window.MediaRecorder) { mr = new MediaRecorder(stream); mr.ondataavailable = e => e.data.size && chunks.push(e.data); mr.start(); }
  } catch (e) {
    if (!SR) { toast('Không truy cập được micro. Hãy cho phép quyền micro.', 'bad'); return null; }
  }
  let finals = '', interim = '', running = true, r = null;
  const t0 = Date.now(); const tick = setInterval(() => { const s = Math.floor((Date.now() - t0) / 1000); timeEl.textContent = `⏺ ${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; }, 500);
  const show = () => { live.innerHTML = `<span lang="zh-CN">${esc(finals)}</span><span class="muted" lang="zh-CN">${esc(interim)}</span>` || ''; live.scrollTop = live.scrollHeight; };
  const begin = () => {
    if (!SR || !running) return;
    r = new SR(); r.lang = 'zh-CN'; r.continuous = true; r.interimResults = true;
    r.onresult = e => { interim = ''; for (let i = e.resultIndex; i < e.results.length; i++) { const t = e.results[i][0].transcript; if (e.results[i].isFinal) finals += t; else interim += t; } show(); };
    r.onerror = e => { if (e.error === 'not-allowed') { running = false; toast('Bạn chưa cho phép dùng micro.', 'bad'); } };
    r.onend = () => { if (running) setTimeout(begin, 150); };
    try { r.start(); } catch {}
  };
  begin();
  live.innerHTML = '<span class="muted">Đang ghi âm… hãy đọc to bài nói.</span>';
  return {
    stop: () => new Promise(res => {
      running = false; clearInterval(tick); timeEl.textContent = '';
      try { r && r.stop(); } catch {}
      const finish = () => { stream && stream.getTracks().forEach(t => t.stop()); const audioUrl = chunks.length ? URL.createObjectURL(new Blob(chunks, { type: chunks[0].type || 'audio/webm' })) : ''; setTimeout(() => res({ transcript: finals + interim, audioUrl }), 50); };
      if (mr && mr.state !== 'inactive') { mr.onstop = () => setTimeout(finish, 400); mr.stop(); } else setTimeout(finish, 600);
    }),
  };
}

// ════════════ Từ mới · Cấu trúc · Thẻ lật · Tự đặt câu ════════════
const knownOf = id => (store.s.spKnown || {})[id] || {};
function setKnown(id, h, v) { store.update(s => { s.spKnown = s.spKnown || {}; s.spKnown[id] = s.spKnown[id] || {}; s.spKnown[id][h] = v; }); }
const sentWith = (x, h) => x.s.filter(([zh]) => zh.includes(h));

function renderStudy(box, x) {
  const v = SPEAK_VOCAB[x.id] || { w: [], g: [] };
  const words = v.w.map(([h, p, vi]) => ({ h, p, vi }));
  box.innerHTML = `
  <section class="card vs-sec"><div class="row gap wrap" style="justify-content:space-between"><h2>📘 Từ vựng trong bài <small class="muted">(${words.length})</small></h2><span class="muted small" id="wkc"></span></div>
    <p class="muted small">Học như Quizlet: xem danh sách kèm 5 câu ví dụ mỗi từ, lật thẻ, học trắc nghiệm, làm bài kiểm tra và chơi trò chơi. Từ đánh dấu ✓/✗ được lưu trên trình duyệt.</p>
    <div id="vsBox"></div></section>
  <section class="card"><h2>🧩 Cấu trúc ngữ pháp trong bài <small class="muted">(${v.g.length})</small></h2>
    <div class="gs-list">${v.g.map(([f, ex, s, gid]) => { const g = gid && grammarById(gid); return `<div class="gs"><div class="gs-f" lang="zh-CN">${esc(f)}</div><div class="gs-x">${esc(ex)}${g ? ` · <a href="#/grammar/${g.id}">Xem bài ngữ pháp</a>` : ''}</div>${sentence(s, x.s.find(([zh]) => zh === s)?.[1] || '')}</div>`; }).join('')}</div></section>
  <section class="card" id="msSec"><h2>✍️ Tự đặt 5 câu & ghi âm</h2>
    <p class="muted small">Chọn một từ, tự viết 5 câu có dùng từ đó, bấm “Kiểm tra” để máy soát lỗi, rồi bấm 🎤 đọc to câu bạn viết – máy so giọng đọc với câu đã viết và cho bạn nghe lại. Câu viết được lưu trên trình duyệt; bản ghi âm chỉ giữ trong phiên này.</p>
    <label class="sel">Từ <select id="msWord" class="inp"></select></label><div id="msBox"></div></section>`;

  const drawCount = () => { const k = knownOf(x.id); $('#wkc', box).textContent = `Đã thuộc ${words.filter(w => k[w.h] === true).length}/${words.length}`; };
  drawCount();
  vocabSet($('#vsBox', box), words, {
    id: x.id, sent: x.s, known: () => knownOf(x.id), setKnown: (h, val) => setKnown(x.id, h, val),
    onChange: () => { drawCount(); drawMsOptions(); },
    onPractice: h => { $('#msWord', box).value = h; drawMs(); $('#msSec', box).scrollIntoView({ behavior: 'smooth' }); },
  });

  // ── tự đặt câu ──
  const drawMsOptions = () => {
    const k = knownOf(x.id), cur = $('#msWord', box).value;
    const sorted = [...words].sort((a, b) => (k[a.h] === false ? 0 : 1) - (k[b.h] === false ? 0 : 1));
    $('#msWord', box).innerHTML = sorted.map(w => `<option value="${esc(w.h)}">${k[w.h] === false ? '✗ ' : k[w.h] === true ? '✓ ' : ''}${esc(w.h)} (${esc(w.p)}) – ${esc(w.vi)}</option>`).join('');
    if (cur) $('#msWord', box).value = cur;
  };
  const drawMs = () => {
    const h = $('#msWord', box).value, w = words.find(z => z.h === h); if (!w) return;
    const mine = (store.s.mySent || {})[h] || [];
    const ref = sentWith(x, h)[0];
    const refs = ex5(h, sentWith(x, h));
    $('#msBox', box).innerHTML = `${ref ? `<div class="ms-ref"><span class="muted small">Câu mẫu trong bài:</span>${sentence(ref[0], ref[1])}</div>` : ''}
      <details class="vs-det"><summary>📖 Xem 5 câu ví dụ với “${esc(h)}” để tham khảo</summary><div class="ex-box">${refs.map(([zh, vi]) => exampleHtml(zh, vi)).join('')}</div></details>
      ${[0, 1, 2, 3, 4].map(n => `<div class="ms-row" data-n="${n}">
        <span class="ms-no">${n + 1}</span>
        <div class="ms-main"><input class="inp ms-in" lang="zh-CN" placeholder="Viết câu có từ “${esc(h)}”…" value="${esc(mine[n] || '')}">
          <div class="ms-py muted small"></div><div class="ms-out"></div></div>
        <div class="ms-act"><button class="mini ms-chk">Kiểm tra</button><button class="say ms-say" title="Nghe câu của bạn" aria-label="Nghe câu của bạn">${icon('vol')}</button><button class="say ms-rec" title="Ghi âm" aria-label="Ghi âm">${icon('mic')}</button></div>
      </div>`).join('')}
      <p class="muted small" id="msDone"></p>`;
    const done = () => { const arr = (store.s.mySent || {})[h] || []; const n = arr.filter(t => t && t.includes(h)).length; $('#msDone', box).textContent = `Đã viết ${n}/5 câu có dùng “${h}”.`; };
    $$('.ms-row', box).forEach(row => { const inp = $('.ms-in', row); const upd = () => { $('.ms-py', row).textContent = inp.value.trim() ? sentencePinyin(inp.value.trim()) : ''; }; upd();
      inp.oninput = () => { upd(); store.update(s => { s.mySent = s.mySent || {}; const a = s.mySent[h] || []; a[+row.dataset.n] = inp.value.trim(); s.mySent[h] = a; }); done(); }; });
    done();
  };
  drawMsOptions(); $('#msWord', box).value = (words.find(w => knownOf(x.id)[w.h] === false) || words[0] || {}).h || ''; drawMs();
  $('#msWord', box).onchange = drawMs;

  box.addEventListener('click', async e => {
    const row = e.target.closest('.ms-row'); if (!row) return;
    const h = $('#msWord', box).value, inp = $('.ms-in', row), t = inp.value.trim(), out = $('.ms-out', row);
    if (e.target.closest('.ms-say')) { if (t) speak(t); return; }
    if (e.target.closest('.ms-chk')) {
      if (!t) { out.innerHTML = '<span class="muted">Hãy viết một câu trước.</span>'; return; }
      const { issues } = checkSentence(t);
      out.innerHTML = `${t.includes(h) ? `<span class="ok-t">✓ Có dùng “${esc(h)}”</span>` : `<span class="bad-t">✗ Câu chưa có từ “${esc(h)}”</span>`}
        ${issues.length ? `<ul class="ms-iss">${issues.map(i => `<li class="${i.info ? 'info' : 'warn'}">${esc(i.msg)}</li>`).join('')}</ul>` : ' <span class="ok-t">· Không phát hiện lỗi phổ biến</span>'}`;
      return;
    }
    const rb = e.target.closest('.ms-rec'); if (!rb) return;
    if (!t) { out.innerHTML = '<span class="muted">Hãy viết câu trước rồi ghi âm.</span>'; return; }
    if (rb.classList.contains('rec')) { rb._stop && rb._stop(); return; }
    rb.classList.add('rec'); out.innerHTML = '<span class="muted">Đang ghi âm… đọc to câu bạn vừa viết' + (SR ? '' : ', bấm lại micro để dừng') + '</span>';
    try {
      const r = await recordClip(rb);
      let html = '';
      if (r.alts && r.alts.length) { const best = r.alts.map(a => ({ a, ...align(t, a) })).sort((p, q) => q.score - p.score)[0]; html += `<span class="score ${best.score >= 80 ? 'good' : best.score >= 50 ? 'mid' : 'bad'}">${best.score}%</span> <span class="muted small">Máy nghe được:</span> <span lang="zh-CN">${esc(best.a)}</span>`; }
      else if (SR) html += '<span class="muted">Không nghe rõ, hãy thử lại.</span>';
      if (r.url) html += `${recAudio(r.url)}`;
      out.innerHTML = html; logActivity(2);
    } catch (err) { out.innerHTML = `<span class="bad-t">${esc(err.message)}</span>`; }
    rb.classList.remove('rec');
  });
}

// Ghi một đoạn ngắn: nhận dạng giọng nói (nếu có) + thu âm để nghe lại
export async function recordClip(btn) {
  let stream = null, mr = null, chunks = [];
  try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }); if (window.MediaRecorder) { mr = new MediaRecorder(stream); mr.ondataavailable = e => e.data.size && chunks.push(e.data); mr.start(); } }
  catch { if (!SR) throw new Error('Không truy cập được micro. Hãy cho phép quyền micro.'); }
  const stopRec = () => new Promise(res => { const fin = () => { stream && stream.getTracks().forEach(t => t.stop()); res(chunks.length ? URL.createObjectURL(new Blob(chunks, { type: chunks[0].type || 'audio/webm' })) : ''); }; if (mr && mr.state !== 'inactive') { mr.onstop = fin; mr.stop(); } else fin(); });
  if (SR) { let alts = []; try { alts = await recognizeOnce(); } finally { var url = await stopRec(); } return { alts, url }; }
  await new Promise(res => { btn._stop = res; setTimeout(res, 15000); });
  btn._stop = null;
  return { alts: [], url: await stopRec() };
}

// ════════════ Bài nói của bạn: khung 5 phần × 3 câu, cấu trúc gợi ý, lưu trên trình duyệt ════════════
const fmtAt = t => new Date(t).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' });
const hanCount = t => [...t].filter(isHan).length;
const joinParts = ps => ps.map(t => (t || '').trim()).filter(Boolean).map(t => /[。！？!?.…]$/.test(t) ? t : t + '。').join('\n');
const mineOf = id => { const m = (store.s.mySpeech || {})[id] || {}; const parts = m.parts ? [...m.parts] : [m.text || '', '', '', '', '']; while (parts.length < 5) parts.push(''); return { vi: '', at: 0, versions: [], ...m, parts }; };
function setMine(id, fn) { store.update(s => { s.mySpeech = s.mySpeech || {}; const m = mineOf(id); fn(m); m.text = joinParts(m.parts); s.mySpeech[id] = m; }); }
// cấu trúc xuất hiện trong một nhóm câu
const structsIn = sents => SPEAK_STRUCT.filter(t => { const re = new RegExp(t.re); return sents.some(z => re.test(z)); }).map(t => ({ ...t, ex: sents.find(z => new RegExp(t.re).test(z)) }));

function renderMySpeech(box, x) {
  const vocab = ((SPEAK_VOCAB[x.id] || {}).w || []).map(([h, p, vi]) => ({ h, p, vi }));
  const parts = x.parts && x.parts.length ? x.parts : ['Mở đầu', 'Nội dung 1', 'Nội dung 2', 'Nội dung 3', 'Kết luận'];
  const model = parts.map((_, k) => x.s.slice(k * 3, k * 3 + 3));
  const longPart = k => (SPEAK_LONG[x.id] || []).filter(r => r[0] === k).map(r => [r[1], r[2]]);
  const fc = focusOf(x.id), focusSt = fc ? fc.ids.map(structById) : [];
  const allSt = structsIn(x.s.map(s => s[0]));
  const m = mineOf(x.id);
  box.innerHTML = `<div class="row gap wrap" style="justify-content:space-between"><h2>📝 Bài nói của bạn</h2><span class="muted small" id="myState"></span></div>
    <p class="muted small">Tự viết bài trả lời câu hỏi <b lang="zh-CN">${esc(x.q)}</b> (${esc(x.qvi)}) theo đúng khung của bài mẫu: <b>5 phần, mỗi phần 3 câu</b>. Mỗi phần có cấu trúc gợi ý (bấm để chèn khung câu) và 3 câu mẫu để tham khảo – hãy thay tên, thời gian, địa điểm, sở thích cho đúng bản thân. Bài <b>tự động lưu trên trình duyệt</b> khi bạn gõ; bấm “Lưu bản này” để giữ nhiều phiên bản.</p>
    <details class="vs-det my-stbox" open><summary>📐 Bảng cấu trúc để viết bài này</summary>
      ${fc ? `<p class="small"><b>Trọng tâm nhóm “${esc(fc.name)}”:</b></p><div class="my-stlist">${focusSt.map(t => stCard(t, x.s.find(([z]) => new RegExp(t.re).test(z))?.[0])).join('')}</div>` : ''}
      <p class="small"><b>Các cấu trúc khác dùng trong bài mẫu:</b></p>
      <div class="my-stlist">${allSt.filter(t => !focusSt.some(f => f.id === t.id)).map(t => stCard(t, t.ex)).join('')}</div>
    </details>
    <div class="my-parts">${parts.map((p, k) => { const st = structsIn(model[k].map(s => s[0])); return `<div class="my-part" data-k="${k}">
      <div class="my-ph"><span class="sp-pn">${NUM[k]}</span> <b>${esc(p)}</b> <span class="muted small my-pc"></span><span class="grow"></span><button class="mini my-dict" title="Nói thay vì gõ – AI ghi ra chữ vào ô này">🎤 Nói để AI ghi</button></div>
      ${st.length ? `<div class="my-pst"><span class="muted small">Cấu trúc gợi ý:</span> ${st.map(t => `<button class="chip sm my-frame" lang="zh-CN" data-frame="${esc(t.frame)}" title="${esc(t.vi)} – bấm để chèn khung câu">${esc(t.f)}</button>`).join('')}</div>` : ''}
      <details class="my-model"><summary>Xem câu mẫu</summary><p class="small muted">Khung 3 câu:</p><div class="ex-box">${model[k].map(([zh, vi]) => exampleHtml(zh, vi)).join('')}</div>${longPart(k).length ? `<p class="small muted">Trong bài hoàn chỉnh ~200 chữ:</p><div class="ex-box">${longPart(k).map(([zh, vi]) => exampleHtml(zh, vi)).join('')}</div>` : ''}<span class="row gap wrap"><button class="mini my-use">Dùng khung 3 câu làm nháp</button>${longPart(k).length ? '<button class="mini my-use" data-long="1">Dùng đoạn 200 chữ làm nháp</button>' : ''}</span></details>
      <textarea class="inp my-ptxt" lang="zh-CN" rows="3" placeholder="${esc(st.slice(0, 3).map(t => t.frame).join('') || '……。……。……。')}">${esc(m.parts[k] || '')}</textarea>
    </div>`; }).join('')}</div>
    ${vocab.length ? `<div class="my-chips"><span class="muted small">Từ vựng của bài (bấm để chèn vào ô đang viết):</span> ${vocab.map(w => `<button class="chip my-chip" data-h="${esc(w.h)}" title="${esc(w.p)} – ${esc(w.vi)}" lang="zh-CN">${esc(w.h)}</button>`).join('')}</div>` : ''}
    <div class="my-meter"><div class="my-bar"><span id="myBar"></span></div><span class="muted small" id="myCnt"></span></div>
    <details class="vs-det" ${m.vi ? 'open' : ''}><summary>🇻🇳 Ghi chú / bản dịch tiếng Việt (không bắt buộc)</summary>
      <textarea id="myVi" class="inp" rows="4" placeholder="Viết dàn ý hoặc nghĩa tiếng Việt của bài để tự kiểm tra…">${esc(m.vi)}</textarea></details>
    <div class="row gap wrap my-acts">
      <button class="btn" id="mySave">💾 Lưu bản này</button>
      <button class="btn ghost" id="myPlay">${icon('play')} Nghe bài của tôi</button><button class="btn ghost" id="myStop">${icon('stop')}</button>
      <button class="btn ghost" id="myChk">✔️ Kiểm tra lỗi</button>
      <button class="btn ghost" id="myType">⌨️ Luyện gõ bài này</button>
      <button class="btn ghost" id="myDl">⬇️ Tải về .txt</button>
      <button class="btn ghost" id="myClr">🗑️ Xóa</button>
    </div>
    <h3 class="sub">👀 Xem trước bài của bạn (có pinyin)</h3>
    <div id="myPrev" class="sp-text my-prev" style="--sp-size:1.35rem"></div>
    <div id="myChkOut"></div>
    <div class="my-rec">
      <h3 class="sub">${icon('mic')} Ghi âm bài của bạn</h3>
      <div class="row gap wrap"><button class="btn" id="myRStart">${icon('mic')} Bắt đầu đọc</button><button class="btn ghost" id="myRStop" disabled>Dừng & chấm điểm</button><span id="myRTime" class="muted"></span></div>
      <div id="myRLive" class="sp-live" aria-live="polite"></div><div id="myROut"></div>
    </div>
    <div id="myTyping"></div>
    <h3 class="sub">📂 Các bản đã lưu <small class="muted" id="myVerN"></small></h3>
    <div id="myVers"></div>`;

  const pts = $$('.my-ptxt', box), vi = $('#myVi', box);
  let active = pts[0];
  pts.forEach(t => t.addEventListener('focus', () => { active = t; }));
  const curParts = () => pts.map(t => t.value);
  const fullText = () => joinParts(curParts());
  const state = msg => { $('#myState', box).textContent = msg; };
  const info = () => { const mm = (store.s.mySpeech || {})[x.id]; state(mm && mm.at ? `Đã tự lưu lúc ${fmtAt(mm.at)}` : 'Chưa có nội dung'); };
  const sents = () => splitSentences(fullText());
  const drawPrev = () => {
    let base = 0, n = 0, html = '';
    curParts().forEach((p, k) => {
      const ss = splitSentences(p);
      $$('.my-pc', box)[k].textContent = ss.length ? `· ${ss.length}/3 câu${ss.length === 3 ? ' ✓' : ''}` : '';
      $$('.my-pc', box)[k].classList.toggle('ok-t', ss.length === 3);
      if (!ss.length) return;
      html += `<h3 class="sp-part"><span class="sp-pn">${NUM[k]}</span> ${esc(parts[k])}</h3>`;
      ss.forEach(zh => { const r = sentenceChars(zh, base); base += r.n; n++;
        html += `<div class="sp-row" data-zh="${esc(zh)}"><div class="sp-body"><div class="sp-zh" lang="zh-CN">${r.html}</div><div class="sp-res"></div></div><div class="sp-act"><button class="say my-say" title="Nghe câu này" aria-label="Nghe câu này">${icon('vol')}</button></div></div>`; });
    });
    $('#myPrev', box).innerHTML = html || '<p class="muted small">Bản xem trước có pinyin sẽ hiện ở đây khi bạn viết.</p>';
    const t = fullText(), c = hanCount(t), used = vocab.filter(w => t.includes(w.h)), done = curParts().filter(p => splitSentences(p).length >= 3).length;
    $('#myCnt', box).textContent = `${c} chữ · ${n}/15 câu · ${done}/5 phần đủ 3 câu${vocab.length ? ` · dùng ${used.length}/${vocab.length} từ của bài` : ''}`;
    $('#myBar', box).style.width = Math.min(100, n / 15 * 100) + '%';
    $$('.my-chip', box).forEach(ch => ch.classList.toggle('used', t.includes(ch.dataset.h)));
  };
  let tmr;
  const autosave = () => { clearTimeout(tmr); tmr = setTimeout(() => { setMine(x.id, mm => { mm.parts = curParts(); mm.vi = vi.value; mm.at = Date.now(); }); info(); }, 400); drawPrev(); };
  pts.forEach(t => { t.oninput = autosave; }); vi.oninput = autosave;
  const insert = (ta, str) => { const a = ta.selectionStart ?? ta.value.length, b = ta.selectionEnd ?? a; ta.value = ta.value.slice(0, a) + str + ta.value.slice(b); ta.focus(); ta.selectionStart = ta.selectionEnd = a + str.length; active = ta; autosave(); };

  box.addEventListener('click', e => {
    const fr = e.target.closest('.my-frame'); if (fr) { const pp = fr.closest('.my-part'); insert(pp ? $('.my-ptxt', pp) : active, fr.dataset.frame); return; }
    const us = e.target.closest('.my-use'); if (us) { const part = us.closest('.my-part'), ta = $('.my-ptxt', part), k = +part.dataset.k; if (ta.value.trim() && !confirm('Thay nội dung phần này bằng câu mẫu?')) return; ta.value = (us.dataset.long ? longPart(k) : model[k]).map(s => s[0]).join(''); autosave(); ta.focus(); toast('Đã chép câu mẫu – hãy sửa lại cho đúng với bản thân bạn.'); return; }
    const ch = e.target.closest('.my-chip'); if (ch) { insert(active, ch.dataset.h); return; }
    const sy = e.target.closest('.my-say'); if (sy) { const el = sy.closest('.sp-row'); speak(el.dataset.zh, { el }); }
    const dc = e.target.closest('.my-dict'); if (dc) dictate(dc);
  });
  // Nói thay vì gõ: AI Whisper nghe và ghi chữ vào phần đang viết
  let dictCtl = null;
  async function dictate(btn) {
    if (dictCtl) { dictCtl.stop(); return; }
    const ta = $('.my-ptxt', btn.closest('.my-part')), model = store.s.aiModel || AI_DEFAULT;
    aiPreload(model);
    try { dictCtl = await recordVoice({ maxSec: 60, silenceSec: 2 }); } catch { toast('Cần cho phép dùng micro.', 'bad'); return; }
    btn.classList.add('rec'); btn.textContent = '⏹ Đang nghe… bấm để dừng';
    const { blob, voiced } = await dictCtl.done; dictCtl = null;
    btn.classList.remove('rec');
    if (!voiced) { btn.textContent = '🎤 Nói để AI ghi'; toast('Không nghe thấy giọng nói.', 'bad'); return; }
    btn.textContent = '🤖 AI đang ghi…'; btn.disabled = true;
    try {
      const lines = await aiLong(await toPcm16k(await blob.arrayBuffer()), model);
      let t = lines.map(l => l.zh).join(''); if (t && !/[。！？!?…]$/.test(t)) t += '。';
      if (t) { ta.value = (ta.value.trim() ? ta.value.trim() : '') + t; autosave(); toast('AI đã ghi lời bạn nói vào ô – hãy kiểm tra lại.'); } else toast('AI không nhận ra chữ nào rõ ràng.', 'bad');
    } catch (e) { toast('AI không chạy được: ' + (e.message || e), 'bad'); }
    finally { btn.disabled = false; btn.textContent = '🎤 Nói để AI ghi'; }
  }

  const drawVers = () => {
    const v = mineOf(x.id).versions || [];
    $('#myVerN', box).textContent = v.length ? `(${v.length}/10)` : '';
    $('#myVers', box).innerHTML = v.length ? `<ul class="my-vers">${v.map((it, i) => { const t = it.parts ? joinParts(it.parts) : it.text || ''; return `<li><div><b>${fmtAt(it.at)}</b> · ${hanCount(t)} chữ<div class="muted small" lang="zh-CN">${esc(t.replace(/\n/g, '').slice(0, 60))}${t.length > 60 ? '…' : ''}</div></div>
      <span class="row gap"><button class="mini" data-load="${i}">Mở</button><button class="mini" data-del="${i}">Xóa</button></span></li>`; }).join('')}</ul>`
      : '<p class="muted small">Chưa có bản nào. Bấm “Lưu bản này” để giữ lại phiên bản hiện tại (tối đa 10 bản).</p>';
  };
  $('#mySave', box).onclick = () => {
    if (!fullText().trim()) { toast('Hãy viết bài nói trước khi lưu.', 'bad'); return; }
    setMine(x.id, mm => { mm.parts = curParts(); mm.vi = vi.value; mm.at = Date.now(); mm.versions = [{ parts: curParts(), vi: vi.value, at: Date.now() }, ...(mm.versions || [])].slice(0, 10); });
    logActivity(2); info(); drawVers(); toast('Đã lưu bài nói vào trình duyệt.');
  };
  $('#myVers', box).onclick = e => {
    const l = e.target.closest('[data-load]'), d = e.target.closest('[data-del]');
    if (l) { const it = mineOf(x.id).versions[+l.dataset.load]; const ps = it.parts || [it.text || '', '', '', '', '']; pts.forEach((t, k) => { t.value = ps[k] || ''; }); vi.value = it.vi || ''; autosave(); toast('Đã mở bản đã lưu.'); }
    if (d) { setMine(x.id, mm => mm.versions.splice(+d.dataset.del, 1)); drawVers(); }
  };
  $('#myClr', box).onclick = () => { if (!fullText() && !vi.value) return; if (!confirm('Xóa nội dung đang viết? (Các bản đã lưu vẫn được giữ)')) return; pts.forEach(t => { t.value = ''; }); vi.value = ''; autosave(); };
  $('#myDl', box).onclick = () => {
    if (!fullText().trim()) { toast('Chưa có nội dung để tải.', 'bad'); return; }
    const body = `${x.q}\n${x.qvi}\n\n` + curParts().map((p, k) => p.trim() ? `${NUM[k]} ${parts[k]}\n${p.trim()}\n${splitSentences(p).map(z => sentencePinyin(z)).join(' ')}` : '').filter(Boolean).join('\n\n') + (vi.value.trim() ? `\n\n${vi.value.trim()}` : '') + '\n';
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([body], { type: 'text/plain;charset=utf-8' })); a.download = `bai-noi-${x.id}.txt`; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  };
  $('#myPlay', box).onclick = () => { const rows = $$('#myPrev .sp-row', box); if (!rows.length) { toast('Hãy viết bài nói trước.', 'bad'); return; } logActivity(); speakSeq(rows.map(el => ({ text: el.dataset.zh, el })), { rate: store.s.settings.rate || 1, onItem: k => rows.forEach((r, j) => r.classList.toggle('now', j === k)) }); };
  $('#myStop', box).onclick = stopSeq;
  $('#myChk', box).onclick = () => {
    const ss = sents(), out = $('#myChkOut', box);
    if (!ss.length) { out.innerHTML = '<p class="muted">Hãy viết bài nói trước.</p>'; return; }
    const res = ss.map(z => ({ z, issues: checkSentence(z).issues.filter(i => !i.info) })).filter(r => r.issues.length);
    const short = curParts().map((p, k) => [k, splitSentences(p).length]).filter(([, n]) => n < 3);
    const usedSt = structsIn(ss);
    const blanks = curParts().map((p, k) => [k, p]).filter(([, p]) => /……|\.\.\./.test(p)).map(([k]) => `${NUM[k]} ${esc(parts[k])}`);
    out.innerHTML = `${blanks.length ? `<p class="note small">✏️ Còn chỗ “……” chưa điền ở: ${blanks.join(', ')} – hãy thay bằng thông tin của bạn.</p>` : ''}${short.length ? `<p class="note small">Khung bài: còn ${short.map(([k, n]) => `${NUM[k]} ${esc(parts[k])} (${n}/3 câu)`).join(', ')} chưa đủ 3 câu.</p>` : '<p class="ok-t">✓ Đủ 5 phần, mỗi phần 3 câu.</p>'}
      <p class="small">Cấu trúc bạn đã dùng (${usedSt.length}): <span lang="zh-CN">${usedSt.map(t => `<span class="chip sm">${esc(t.f)}</span>`).join(' ') || '—'}</span>${focusSt.length ? ` · Trọng tâm chưa dùng: <span lang="zh-CN">${focusSt.filter(t => !usedSt.some(u => u.id === t.id)).map(t => `<span class="chip sm">${esc(t.f)}</span>`).join(' ') || '✓ đã dùng đủ'}</span>` : ''}</p>
      ${res.length ? `<div class="note"><b>Có ${res.length}/${ss.length} câu nên xem lại:</b><ul class="ms-iss">${res.map(r => `<li><span lang="zh-CN">${esc(r.z)}</span><ul>${r.issues.map(i => `<li class="warn">${esc(i.msg)}</li>`).join('')}</ul></li>`).join('')}</ul><p class="muted small">Máy chỉ phát hiện các lỗi phổ biến theo quy tắc, hãy nhờ thầy cô xem lại thêm.</p></div>`
      : `<p class="ok-t">✓ Không phát hiện lỗi phổ biến trong ${ss.length} câu.</p>`}`;
  };
  $('#myType', box).onclick = () => {
    const ss = sents(); if (!ss.length) { toast('Hãy viết bài nói trước.', 'bad'); return; }
    typingTrainer($('#myTyping', box), { key: 'my' + x.id, sentences: ss.map(z => [z, '']) });
    $('#myTyping', box).scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // ghi âm & chấm theo chính bài của mình
  let rec = null;
  const paintRow = (el, marks) => $$('.cz', el).forEach((c, j) => { c.classList.remove('ok', 'tone', 'miss'); if (marks[j]) c.classList.add(marks[j]); });
  $('#myRStart', box).onclick = async () => {
    if (!sents().length) { toast('Hãy viết bài nói trước rồi ghi âm.', 'bad'); return; }
    stopSeq(); drawPrev(); $('#myROut', box).innerHTML = '';
    rec = await startSession($('#myRLive', box), $('#myRTime', box)); if (!rec) return;
    $('#myRStart', box).disabled = true; $('#myRStop', box).disabled = false;
  };
  $('#myRStop', box).onclick = async () => {
    if (!rec) return;
    $('#myRStop', box).disabled = true; $('#myRStart', box).disabled = false;
    const { transcript, audioUrl } = await rec.stop(); rec = null; $('#myRLive', box).innerHTML = '';
    const out = $('#myROut', box), audio = audioUrl ? `<p class="small muted">Nghe lại giọng của bạn:</p>${recAudio(audioUrl)}` : '';
    if (!SR || !transcript.trim()) { out.innerHTML = (SR ? '<p class="bad-t">Không nhận được giọng nói. Hãy kiểm tra micro và đọc to, rõ hơn.</p>' : '') + audio; return; }
    const rows = $$('#myPrev .sp-row', box), all = rows.map(r => r.dataset.zh).join(''), r = align(all, transcript);
    let from = 0;
    rows.forEach(el => { const n = $$('.cz', el).length, mk = r.marks.slice(from, from + n); from += n; paintRow(el, mk); const sc = n ? Math.round((mk.filter(v => v === 'ok').length + mk.filter(v => v === 'tone').length * 0.5) / n * 100) : 100; $('.sp-res', el).innerHTML = `<span class="score ${sc >= 80 ? 'good' : sc >= 50 ? 'mid' : 'bad'}">${sc}%</span>`; });
    setMine(x.id, mm => { mm.best = Math.max(mm.best || 0, r.score); });
    logActivity(5);
    out.innerHTML = `<div class="sp-sum"><div class="score-ring" style="--p:${r.score}"><span>${r.score}%</span></div><div><p>Đọc đúng <b>${r.ok}</b> chữ · gần đúng <b>${r.tone}</b> · điểm cao nhất với bài của bạn: <b>${mineOf(x.id).best}%</b></p>${audio}</div></div>
      <details class="small"><summary>Văn bản máy nghe được</summary><p lang="zh-CN">${esc(transcript)}</p></details>`;
  };

  info(); drawPrev(); drawVers();
}
function stCard(t, ex) {
  return `<div class="my-st"><div class="my-stf" lang="zh-CN">${esc(t.f)}</div><div class="small muted">${esc(t.vi)}</div>${ex ? `<div class="small my-stx" lang="zh-CN">${esc(ex)}</div>` : ''}<button class="mini my-frame" data-frame="${esc(t.frame)}" title="Chèn khung câu vào ô đang viết">＋ Khung: <span lang="zh-CN">${esc(t.frame)}</span></button></div>`;
}
