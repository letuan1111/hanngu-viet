// Thi thử HSK 1–3: đề tự sinh đúng cấu trúc · tải bộ đề PDF + đáp án + lời thoại + mp3 · link YouTube / mp3 / Google Drive
import { store, logActivity } from '../core/store.js';
import { sentencePinyin } from '../core/dict.js';
import { esc, $, $$, toast, modal } from '../core/ui.js';
import { speak, stopSeq } from '../core/tts.js';
import { generate, GEN_PARTS } from './hskgen.js';

// ══════════ Cấu trúc đề (chuẩn HSK 2.0) ══════════
// mỗi phần: [từ câu, đến câu, kiểu đáp án, mô tả] · kiểu: tf = ✓/✗ · abc · af = A–F · ae = A–E · text = tự viết
export const HSK = {
  1: { min: 40, pass: 120, secs: [
    { k: 'L', name: 'Nghe 听力', min: 15, parts: [[1, 5, 'tf', 'Nghe – nhìn tranh, phán đoán đúng sai'], [6, 10, 'abc', 'Nghe – chọn tranh A/B/C'], [11, 15, 'af', 'Nghe – ghép hội thoại với tranh A–F'], [16, 20, 'abc', 'Nghe – chọn đáp án A/B/C']] },
    { k: 'R', name: 'Đọc 阅读', min: 17, parts: [[21, 25, 'tf', 'Đọc – từ và tranh, đúng hay sai'], [26, 30, 'af', 'Đọc – ghép câu với tranh A–F'], [31, 35, 'af', 'Đọc – ghép câu hỏi với câu trả lời A–F'], [36, 40, 'af', 'Đọc – chọn từ điền vào chỗ trống A–F']] },
  ] },
  2: { min: 55, pass: 120, secs: [
    { k: 'L', name: 'Nghe 听力', min: 25, parts: [[1, 10, 'tf', 'Nghe – nhìn tranh, phán đoán đúng sai'], [11, 15, 'af', 'Nghe – ghép hội thoại với tranh A–F'], [16, 20, 'ae', 'Nghe – ghép hội thoại với tranh A–E'], [21, 30, 'abc', 'Nghe – hội thoại ngắn, chọn A/B/C'], [31, 35, 'abc', 'Nghe – hội thoại dài, chọn A/B/C']] },
    { k: 'R', name: 'Đọc 阅读', min: 22, parts: [[36, 40, 'af', 'Đọc – ghép câu với tranh A–F'], [41, 45, 'af', 'Đọc – chọn từ điền vào chỗ trống A–F'], [46, 50, 'tf', 'Đọc – phán đoán câu ★ đúng hay sai'], [51, 55, 'af', 'Đọc – ghép câu A–F'], [56, 60, 'ae', 'Đọc – ghép câu A–E']] },
  ] },
  3: { min: 90, pass: 180, secs: [
    { k: 'L', name: 'Nghe 听力', min: 35, parts: [[1, 5, 'af', 'Nghe – ghép hội thoại với tranh A–F'], [6, 10, 'ae', 'Nghe – ghép hội thoại với tranh A–E'], [11, 20, 'tf', 'Nghe – phán đoán câu ★ đúng hay sai'], [21, 30, 'abc', 'Nghe – hội thoại ngắn, chọn A/B/C'], [31, 40, 'abc', 'Nghe – hội thoại dài, chọn A/B/C']] },
    { k: 'R', name: 'Đọc 阅读', min: 30, parts: [[41, 45, 'af', 'Đọc – ghép câu A–F'], [46, 50, 'ae', 'Đọc – ghép câu A–E'], [51, 55, 'af', 'Đọc – chọn từ điền vào chỗ trống A–F'], [56, 60, 'ae', 'Đọc – chọn từ điền vào chỗ trống A–E'], [61, 70, 'abc', 'Đọc hiểu – chọn A/B/C']] },
    { k: 'W', name: 'Viết 书写', min: 15, parts: [[71, 75, 'text', 'Viết – sắp xếp từ thành câu hoàn chỉnh'], [76, 80, 'text', 'Viết – nhìn pinyin viết chữ Hán']] },
  ] },
};
const OPTS = { tf: ['✓', '✗'], abc: ['A', 'B', 'C'], af: ['A', 'B', 'C', 'D', 'E', 'F'], ae: ['A', 'B', 'C', 'D', 'E'] };
const TYPE_VI = { tf: 'Đúng ✓ / Sai ✗', abc: 'A–C', af: 'A–F', ae: 'A–E', text: 'Viết chữ' };
export const qList = lv => HSK[lv].secs.flatMap(s => s.parts.flatMap(([a, b, t, d]) => Array.from({ length: b - a + 1 }, (_, i) => ({ n: a + i, t, sec: s.k, desc: d }))));
const maxScore = lv => HSK[lv].secs.length * 100;
const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

// ══════════ Lưu bộ đề trong IndexedDB (ảnh trang đề, file mp3 lưu ngay trên máy) ══════════
const DB = {
  db: null,
  open() { return this.db ? Promise.resolve(this.db) : new Promise((res, rej) => { const r = indexedDB.open('hanngu-exam', 1); r.onupgradeneeded = () => r.result.createObjectStore('sets', { keyPath: 'id' }); r.onsuccess = () => res(this.db = r.result); r.onerror = () => rej(r.error); }); },
  async tx(mode, fn) { const db = await this.open(); return new Promise((res, rej) => { const t = db.transaction('sets', mode), q = fn(t.objectStore('sets')); t.oncomplete = () => res(q && q.result); t.onerror = () => rej(t.error); }); },
  put(s) { return this.tx('readwrite', st => st.put(s)); },
  get(id) { return this.tx('readonly', st => st.get(id)); },
  all() { return this.tx('readonly', st => st.getAll()); },
  del(id) { return this.tx('readwrite', st => st.delete(id)); },
};
async function migrateOld() { // đề nhập bằng link ở phiên bản trước (lưu trong localStorage)
  const old = store.s.myExams; if (!old || !old.length) return;
  for (const e of old) { const yt = mediaOf(e.audio); await DB.put({ id: e.id, level: e.level, name: e.title, note: e.note, created: e.at || Date.now(), key: e.key, yt: yt && yt.kind === 'yt' ? { id: yt.id, t: yt.t } : undefined, audioUrl: yt && yt.kind === 'yt' ? '' : e.audio, paperUrl: e.paper, pages: [], transcript: [], tries: e.tries || [] }); }
  store.update(s => { delete s.myExams; });
}

// ══════════ Đáp án ══════════
function normTok(tok, t) {
  const x = String(tok).trim().replace(/^\(?\d+\s*[.):\-–．、]\s*/, '').trim(); if (!x) return '';
  if (t === 'tf') { if (/^(✓|√|✔|v|t|true|y|yes|đ|d|đúng|dung|对|o)$/i.test(x)) return '✓'; if (/^(✗|×|✘|✕|x|f|false|n|no|s|sai|错)$/i.test(x)) return '✗'; return null; }
  const L = x.toUpperCase(); return OPTS[t].includes(L) ? L : null;
}
export function parseQuick(text, qs) {
  const out = {}, bad = [];
  if (qs.every(q => q.t === 'text')) {
    let k = 0;
    for (const ln of text.split('\n').map(l => l.trim()).filter(Boolean)) {
      const m = ln.match(/^(\d{1,2})\s*[.):\-–．、]?\s*(.+)$/);
      if (m && qs.some(q => q.n === +m[1])) { out[+m[1]] = m[2].trim(); k = qs.findIndex(q => q.n === +m[1]) + 1; }
      else if (qs[k]) out[qs[k++].n] = ln;
    }
    return { out, bad };
  }
  const numbered = [...text.matchAll(/(\d{1,2})\s*[.):\-–．、]?\s*([^\s\d,;、，.:)．][^\s,;、，]*)/g)];
  if (numbered.length) {
    for (const [, n, v] of numbered) { const q = qs.find(z => z.n === +n); if (!q) continue; const r = normTok(v, q.t); if (r == null || r === '') bad.push(n); else out[q.n] = r; }
    return { out, bad };
  }
  let toks = text.split(/[\s,;、，]+/).filter(Boolean);
  if (toks.length === 1 && toks[0].length > 1) toks = [...toks[0]];
  toks.forEach((v, i) => { const q = qs[i]; if (!q) return; const r = normTok(v, q.t); if (r == null) bad.push(q.n); else if (r) out[q.n] = r; });
  return { out, bad };
}
// Đọc đáp án từ chữ trích ra trong file PDF đáp án
export function parseKeyText(text, lv) {
  const qs = qList(lv), key = {};
  const flat = text.replace(/[ \t　]+/g, ' ');
  for (const m of flat.matchAll(/(\d{1,2})\s*[．.、:：]\s*([×√✓✗✕✔xXA-Fa-f对错])(?![A-Za-z])/g)) {
    const q = qs.find(z => z.n === +m[1]); if (!q || q.t === 'text' || key[q.n]) continue;
    const r = normTok(m[2], q.t); if (r) key[q.n] = r;
  }
  const tq = qs.filter(q => q.t === 'text');
  if (tq.length) for (const m of flat.matchAll(/(\d{2})\s*[．.、:：]\s*([^]*?)(?=\s\d{1,2}\s*[．.、:：]|\n|$)/g)) {
    const n = +m[1]; if (!tq.some(q => q.n === n) || key[n]) continue;
    const v = m[2].replace(/\s+/g, '').trim(); if (/\p{Script=Han}/u.test(v)) key[n] = v.slice(0, 80);
  }
  return key;
}
const normText = s => String(s || '').replace(/[\s。．.，,！!？?、；;：:“”"'‘’（）()]/g, '');
const textOk = (ans, key) => !!normText(ans) && String(key).split(/\s*[|\/]\s*/).some(k => normText(k) === normText(ans));
export function grade(lv, key, ans) {
  const per = {}, rows = [];
  for (const q of qList(lv)) {
    const k = key[q.n], a = String(ans[q.n] || '').trim();
    const ok = k ? (q.t === 'text' ? textOk(a, k) : a === k) : null;
    per[q.sec] = per[q.sec] || { ok: 0, n: 0 }; if (k) { per[q.sec].n++; if (ok) per[q.sec].ok++; }
    rows.push({ q, key: k, ans: a, ok });
  }
  const secs = HSK[lv].secs.map(s => ({ s, ...per[s.k], score: per[s.k].n ? Math.round(per[s.k].ok / per[s.k].n * 100) : null }));
  const total = secs.reduce((t, x) => t + (x.score || 0), 0);
  return { rows, secs, total, max: maxScore(lv), pass: total >= HSK[lv].pass, noKey: rows.some(r => !r.key) };
}
function cleanKey(k, lv) { const out = {}; for (const q of qList(lv)) { const v = k && k[q.n]; if (v == null || v === '') continue; const r = q.t === 'text' ? String(v).slice(0, 120) : normTok(String(v).replace(/^Y$/, '✓').replace(/^N$/, '✗'), q.t); if (r) out[q.n] = r; } return out; }

// ══════════ Link âm thanh / đề ══════════
export function parseYT(u) {
  u = String(u || '').trim(); if (!u) return null;
  const m = u.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/|v\/))([\w-]{11})/i) || u.match(/^([\w-]{11})$/); if (!m) return null;
  const t = u.match(/[?&#](?:t|start)=(\d+h)?(\d+m)?(\d+)s?/);
  return { id: m[1], t: t ? (parseInt(t[1]) || 0) * 3600 + (parseInt(t[2]) || 0) * 60 + (+t[3] || 0) : 0 };
}
export function mediaOf(url) {
  url = String(url || '').trim(); if (!url) return null;
  if (/youtu/i.test(url)) { const yt = parseYT(url); if (yt) return { kind: 'yt', ...yt }; }
  if (!/^https?:\/\//i.test(url)) return { kind: 'bad' };
  const gd = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:.*&)?id=)([\w-]{20,})/i);
  if (gd) return { kind: 'drive', src: `https://drive.google.com/file/d/${gd[1]}/preview` };
  if (/\.(png|jpe?g|gif|webp)(\?|#|$)/i.test(url)) return { kind: 'img', src: url };
  if (/\.pdf(\?|#|$)/i.test(url)) return { kind: 'pdf', src: url };
  if (/\.(mp3|m4a|wav|ogg|aac|opus|webm)(\?|#|$)/i.test(url)) return { kind: 'audio', src: url };
  return { kind: 'link', src: url };
}
const ytSrc = (yt, auto) => `https://www.youtube.com/embed/${yt.id}?rel=0&modestbranding=1&playsinline=1${yt.t ? `&start=${yt.t}` : ''}${auto ? '&autoplay=1' : ''}`;
function paperHtml(url) {
  const m = mediaOf(url); if (!m) return '';
  const open = `<a class="mini" href="${esc(url)}" target="_blank" rel="noopener">↗ Mở đề trong tab mới</a>`;
  if (m.kind === 'img') return `<div class="me-paper"><img src="${esc(m.src)}" alt="Đề thi" loading="lazy"></div>${open}`;
  if (m.kind === 'pdf' || m.kind === 'drive') return `<iframe class="me-pdf" src="${esc(m.src)}" title="Đề thi" loading="lazy"></iframe>${open}`;
  return open;
}

// ══════════ PDF (pdf.js tải khi cần) ══════════
let pdfLib = null;
function loadPdfJs() {
  if (!pdfLib) pdfLib = new Promise((res, rej) => { const s = document.createElement('script'); s.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js'; s.onload = () => { window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'; res(window.pdfjsLib); }; s.onerror = () => { pdfLib = null; rej(new Error('Không tải được bộ đọc PDF (cần có mạng).')); }; document.head.appendChild(s); });
  return pdfLib;
}
const PDF_ASSETS = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/';
async function openPdf(file) { const L = await loadPdfJs(); return L.getDocument({ data: new Uint8Array(await file.arrayBuffer()), cMapUrl: PDF_ASSETS + 'cmaps/', cMapPacked: true, standardFontDataUrl: PDF_ASSETS + 'standard_fonts/' }).promise; }
async function renderPages(pdf, list, onp) {
  const out = [];
  for (let k = 0; k < list.length; k++) {
    const pg = await pdf.getPage(list[k]), vp0 = pg.getViewport({ scale: 1 }), vp = pg.getViewport({ scale: Math.min(2.4, 1350 / vp0.width) });
    const cv = document.createElement('canvas'); cv.width = Math.round(vp.width); cv.height = Math.round(vp.height);
    const g = cv.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, cv.width, cv.height);
    await pg.render({ canvasContext: g, viewport: vp }).promise;
    out.push(await new Promise(r => cv.toBlob(r, 'image/jpeg', 0.82))); cv.width = cv.height = 0;
    onp && onp(k + 1, list.length);
  }
  return out;
}
async function pdfText(file) { const pdf = await openPdf(file); let s = ''; for (let i = 1; i <= pdf.numPages; i++) { const tc = await (await pdf.getPage(i)).getTextContent(); s += tc.items.map(x => x.str).join(' ') + '\n'; } return s; }
// Sách nhiều đề đã biết cấu trúc: web tự tách đề + có sẵn đáp án
const BOOKS = [{ id: 'hsk1-wj', level: 1, name: 'Sách HSK1 (王江)', pages: 173, tests: 10, first: 19, step: 10, len: 10, cover: true, tr: [119, 122, 125, 129, 132, 136, 139, 142, 146, 149, 152],
  keys: ['NYYNNABABCFCADEABCBANNYNYEFDCADBFAEDACFB', 'NNNYNCBAABCEFBABCBCBYNNYYFABEDCAEFBFABCD', 'YYNNNABBABCDAFBBACCANYYNNDACFBFEBADCADFB', 'NYNNYCABBBDAFBEABCBANYNYNBECFAEDAFBCADFB', 'NNYNYBCBBBEAFBCBBCACNYNNYBCADEEDFACDACFB', 'YYNNNACBCACABDEBBACAYNYNNDBEAFDFACEDBFAC', 'NNYNNACBACDAFCBCBABCNYNYYDAFBCCDFABBDFAC', 'NNNYYACBBCBDFAEABACBNNYYYCABDEDFBEABADFC', 'NNYNYACCBCAEFBCCBBBANNNYYCFEADDFCAEADBFC', 'NYNYNAABACCFAEDBBAACNNYYNDAEBFDEBACCDFBA'] }];
const keyFromStr = s => { const k = {}; [...s].forEach((c, i) => { k[i + 1] = c === 'Y' ? '✓' : c === 'N' ? '✗' : c; }); return k; };

// ══════════ Tiện ích ══════════
const fmtT = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
const bestOf = s => (s.tries || []).reduce((m, t) => Math.max(m, t.total), -1);
const alive = (root, hash) => root.isConnected && location.hash === hash;
let armed = null;
function confirmTwice(id, msg = 'Bấm “Xóa” lần nữa để xóa hẳn.') { if (armed === id) { armed = null; return true; } armed = id; toast(msg); setTimeout(() => { if (armed === id) armed = null; }, 4000); return false; }
const urls = []; const objURL = b => { const u = URL.createObjectURL(b); urls.push(u); return u; }; const freeURLs = () => { while (urls.length) URL.revokeObjectURL(urls.pop()); };
const showImages = (list, title) => modal(`<h2>${esc(title)}</h2><div class="pages">${(list || []).map(b => `<img src="${objURL(b)}" alt="${esc(title)}">`).join('')}</div>`, { wide: true });

// ══════════ Trang Thi thử ══════════
export async function examHome(root) {
  const hash = location.hash;
  root.innerHTML = `<div class="page-head"><h1>Thi thử HSK</h1></div>
    <p class="muted">Làm đề HSK 1, 2, 3 đúng cấu trúc đề thi thật (Nghe – Đọc – Viết), có tính giờ và chấm điểm theo thang HSK. Để web tự soạn đề mới, hoặc tải bộ đề của bạn lên (PDF đề, đáp án, lời thoại, file nghe mp3, link YouTube).</p>
    <section class="card ex-gen"><h2>🎲 Đề tự sinh</h2><p class="muted small">Mỗi lần bấm là một đề mới: có tranh, phần nghe đọc 2 lần như đề thật, bật/tắt pinyin, giải thích tiếng Việt khi xem lại.</p>
      <div class="exam-grid">${[1, 2, 3].map(l => `<div class="exam-card"><span class="lv-badge lv${l}">HSK ${l}</span><h3>${qList(l).length} câu · ${HSK[l].min} phút</h3><p class="muted small">${HSK[l].secs.map(s => `${s.name.split(' ')[0]} ${qList(l).filter(q => q.sec === s.k).length} câu`).join(' · ')}<br>Đạt từ ${HSK[l].pass}/${maxScore(l)} điểm</p><button class="btn" data-gen="${l}">Tạo đề mới & thi</button></div>`).join('')}</div></section>
    <div class="ex-two">
      <section class="card"><h2>▶ Dán link YouTube để thi</h2><p class="muted small">Dán link video đề thi HSK (video có câu hỏi + phần nghe). Web tạo phiếu trả lời đúng cấu trúc cấp đã chọn và đồng hồ.</p>
        <div class="ex-ytrow"><input class="inp" id="ytNew" placeholder="https://www.youtube.com/watch?v=…"><select class="inp" id="ytLv">${[1, 2, 3].map(l => `<option value="${l}">HSK ${l}</option>`).join('')}</select></div>
        <input class="inp" id="ytName" placeholder="Tên bộ đề (không bắt buộc)" style="width:100%;margin:8px 0"><div class="row gap wrap"><button class="btn" id="ytGo">Tạo bài thi</button><span class="small bad-t" id="ytMsg"></span></div></section>
      <section class="card"><h2>📤 Tải bộ đề lên</h2>
        <div class="drop" id="drop"><b>Kéo thả file hoặc cả thư mục vào đây</b><div class="muted small">Đề .pdf · Đáp án (tên có “答案” / “đáp án”) · Lời thoại (“听力材料” / “lời thoại”) · File nghe .mp3 · hoặc cả cuốn sách nhiều đề (.pdf)</div>
          <div class="row gap wrap" style="justify-content:center;margin-top:10px"><label class="btn sm">Chọn file<input type="file" id="fFiles" multiple accept=".pdf,.mp3,.m4a,.wav,.ogg,audio/*,application/pdf" hidden></label><label class="btn sm ghost">Chọn cả thư mục<input type="file" id="fDir" webkitdirectory multiple hidden></label></div></div>
        <label class="sel" style="margin-top:8px">Cấp độ <select id="upLv"><option value="auto">Tự nhận theo mã đề (H1…, H2…, H3…)</option>${[1, 2, 3].map(l => `<option value="${l}">HSK ${l}</option>`).join('')}</select></label>
        <p class="muted small">Tải được nhiều bộ cùng lúc – web tự nhóm theo mã đề (ví dụ H11003, H21005, H31001). Không có mp3? Tải đề lên rồi gắn link YouTube. Hoặc <a href="#/exam/new">tạo đề bằng link và nhập đáp án thủ công</a>.</p></section>
    </div>
    <div id="sets"><p class="muted">Đang tải bộ đề…</p></div>
    <p class="muted small">Điểm: mỗi phần 100 điểm. HSK 1 và HSK 2: Nghe + Đọc = 200, đạt từ 120. HSK 3: Nghe + Đọc + Viết = 300, đạt từ 180. Đề tải lên chỉ lưu trên trình duyệt này, không gửi đi đâu. · <a href="#/placement">Kiểm tra trình độ đầu vào</a></p>`;
  $$('[data-gen]', root).forEach(b => b.onclick = () => examGenLevel(root, b.dataset.gen));
  $('#ytGo', root).onclick = async () => {
    const v = parseYT($('#ytNew', root).value); if (!v) { $('#ytMsg', root).textContent = 'Link chưa đúng – hãy dán link video YouTube.'; return; }
    const lv = +$('#ytLv', root).value;
    const s = { id: 'y' + Date.now().toString(36), level: lv, name: $('#ytName', root).value.trim() || `Đề YouTube HSK ${lv} · ${new Date().toLocaleDateString('vi-VN')}`, created: Date.now(), yt: v, pages: [], transcript: [], key: {}, tries: [] };
    await DB.put(s); toast('Đã tạo bài thi. Nhập đáp án để được chấm điểm (có thể nhập sau).', 'good'); location.hash = '#/exam/edit/' + s.id;
  };
  const take = fl => fl && fl.length && importFiles([...fl], $('#upLv', root).value, () => alive(root, hash) && examHome(root));
  $('#fFiles', root).onchange = e => take(e.target.files);
  $('#fDir', root).onchange = e => take(e.target.files);
  const d = $('#drop', root);
  d.ondragover = e => { e.preventDefault(); d.classList.add('over'); };
  d.ondragleave = () => d.classList.remove('over');
  d.ondrop = async e => { e.preventDefault(); d.classList.remove('over'); take(await dropFiles(e.dataTransfer)); };

  let sets = [];
  try { await migrateOld(); sets = (await DB.all()).sort((a, b) => b.created - a.created); } catch (e) { console.error(e); }
  if (!alive(root, hash)) return;
  const mine = sets.filter(s => !s.generated), gens = sets.filter(s => s.generated);
  const badge = s => { const b = bestOf(s); return b >= 0 ? `<span class="badge ${b >= HSK[s.level].pass ? 'ok' : 'bad'}">Cao nhất ${b}/${maxScore(s.level)}</span> <span class="muted small">${s.tries.length} lần thi</span>` : ''; };
  $('#sets', root).innerHTML = `<h2 class="sub">Bộ đề của bạn</h2>
    ${mine.length ? `<div class="set-grid">${mine.map(s => { const nk = Object.keys(s.key || {}).length;
      return `<div class="card set" data-id="${s.id}"><div class="row gap"><span class="lv-badge lv${s.level}">HSK ${s.level}</span><h3>${esc(s.name)}</h3></div>
        <div class="muted small">${s.pages && s.pages.length ? s.pages.length + ' trang đề' : s.paperUrl ? 'đề qua link' : s.yt ? 'đề trong video' : 'chưa có tờ đề'} · ${s.yt ? '▶ nghe qua YouTube' : s.audio ? '🔊 có file nghe' : s.audioUrl ? '🔗 nghe qua link' : '⚠ chưa có file nghe'} · ${nk}/${qList(s.level).length} đáp án${s.transcript && s.transcript.length ? ' · có lời thoại' : ''}</div>
        <div>${badge(s)}</div>
        <div class="row gap wrap"><a class="btn sm" href="#/exam/do/${s.id}">Bắt đầu thi</a><label class="mini">${s.audio ? 'Đổi file nghe' : 'Gắn file nghe'}<input type="file" accept="audio/*,.mp3,.m4a,.wav" data-mp3 hidden></label><a class="mini" href="#/exam/edit/${s.id}">Đáp án & link</a>${s.transcript && s.transcript.length ? '<button class="mini" data-tr>Lời thoại</button>' : ''}${!(s.pages && s.pages.length) && !s.audio ? '<button class="mini" data-exp>Xuất tệp</button>' : ''}<button class="mini" data-del>Xóa</button></div></div>`; }).join('')}</div>`
      : '<p class="muted">Chưa có bộ đề nào. Hãy tải lên file của một bộ đề, dán link YouTube, hoặc nhập tệp đề bạn bè gửi.</p>'}
    <label class="mini me-imp" style="margin-top:8px">📥 Nhập tệp đề (.json)<input type="file" accept=".json,application/json" hidden></label>
    ${gens.length ? `<h2 class="sub">Đề tự sinh đã làm</h2><div class="set-grid">${gens.slice(0, 9).map(s => `<div class="card set" data-id="${s.id}"><div class="row gap"><span class="lv-badge lv${s.level}">HSK ${s.level}</span><h3>${esc(s.name)}</h3></div><div>${badge(s) || '<span class="muted small">Chưa nộp bài</span>'}</div>
      <div class="row gap wrap"><a class="btn sm ghost" href="#/exam/do/${s.id}">Làm lại</a>${s.tries.length ? `<a class="mini" href="#/exam/do/${s.id}?review">Xem lại bài</a>` : ''}<button class="mini" data-del>Xóa</button></div></div>`).join('')}</div>` : ''}`;
  $('#sets', root).onclick = async e => {
    const card = e.target.closest('.set'); const id = card && card.dataset.id;
    if (e.target.closest('[data-del]')) { if (confirmTwice(id)) { await DB.del(id); toast('Đã xóa.'); examHome(root); } return; }
    if (e.target.closest('[data-tr]')) { showImages((await DB.get(id)).transcript, 'Lời thoại'); return; }
    if (e.target.closest('[data-exp]')) { const s = await DB.get(id); const blob = new Blob([JSON.stringify({ hannguExam: 2, ...s, tries: [] }, null, 1)], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `de-hsk${s.level}-${s.name.replace(/[^\p{L}\p{N}]+/gu, '-').slice(0, 40)}.json`; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000); }
  };
  $('#sets', root).onchange = async e => {
    if (e.target.matches('[data-mp3]')) { const f = e.target.files[0]; if (!f) return; const s = await DB.get(e.target.closest('.set').dataset.id); s.audio = f; s.audioName = f.name; await DB.put(s); toast('Đã gắn file nghe ' + f.name, 'good'); examHome(root); }
    if (e.target.closest('.me-imp')) {
      const f = e.target.files[0]; if (!f) return;
      try {
        const d = JSON.parse(await f.text()), lv = +d.level; if (!HSK[lv] || typeof d.key !== 'object') throw 0;
        const am = mediaOf(d.audio || d.audioUrl);
        await DB.put({ id: 'i' + Date.now().toString(36), level: lv, name: String(d.name || d.title || 'Đề nhập').slice(0, 120), note: String(d.note || '').slice(0, 1000), created: Date.now(), key: cleanKey(d.key, lv),
          yt: d.yt && d.yt.id ? { id: String(d.yt.id).slice(0, 11), t: +d.yt.t || 0 } : am && am.kind === 'yt' ? { id: am.id, t: am.t } : undefined,
          audioUrl: am && am.kind !== 'yt' && am.kind !== 'bad' ? String(d.audio || d.audioUrl).slice(0, 600) : '', paperUrl: String(d.paperUrl || d.paper || '').slice(0, 600), pages: [], transcript: [], tries: [] });
        toast('Đã nhập đề.', 'good'); examHome(root);
      } catch { toast('Tệp không đúng định dạng đề.', 'bad'); }
    }
  };
  return 'Thi thử HSK';
}

// ══════════ Nhập file ══════════
async function dropFiles(dt) {
  const items = [...(dt.items || [])].map(i => i.webkitGetAsEntry && i.webkitGetAsEntry()).filter(Boolean);
  if (!items.length) return [...dt.files];
  const out = [];
  const walk = async (en, path) => {
    if (en.isFile) await new Promise(r => en.file(f => { try { Object.defineProperty(f, 'relPath', { value: path + f.name }); } catch {} out.push(f); r(); }, r));
    else if (en.isDirectory) { const rd = en.createReader(); let batch; do { batch = await new Promise(r => rd.readEntries(r, () => r([]))); for (const c of batch) await walk(c, path + en.name + '/'); } while (batch.length); }
  };
  for (const en of items) await walk(en, '');
  return out;
}
function progress(title) {
  const m = modal(`<h2>${esc(title)}</h2><p class="muted" id="impMsg">Chuẩn bị…</p><div class="bar"><i id="impBar" style="width:0"></i></div><p class="muted small">Đừng đóng trang trong lúc đọc file.</p>`);
  $('.close', m).remove();
  return { set: (t, p) => { $('#impMsg', m).textContent = t; if (p != null) $('#impBar', m).style.width = Math.round(p * 100) + '%'; }, close: () => m.remove() };
}
function askSplit(pdf, file, lv0) {
  return new Promise(res => {
    const n = pdf.numPages;
    const m = modal(`<h2>Chia sách thành các đề</h2><p class="muted small">File “${esc(file.name)}” có ${n} trang. Nhập vị trí các đề (xem số trang trong trình đọc PDF). Đáp án nhập sau ở nút “Đáp án & link” của mỗi đề.</p>
      <div class="me-grid"><label>Tên sách <input class="inp" id="spName" value="${esc(file.name.replace(/\.pdf$/i, ''))}"></label><label>Cấp độ <select class="inp" id="spLv">${[1, 2, 3].map(l => `<option value="${l}" ${lv0 === l ? 'selected' : ''}>HSK ${l}</option>`).join('')}</select></label>
      <label>Số đề <input class="inp" id="spN" type="number" min="1" value="10"></label><label>Đề 1 bắt đầu ở trang <input class="inp" id="spFirst" type="number" min="1" max="${n}" value="1"></label>
      <label>Mỗi đề dài (trang) <input class="inp" id="spLen" type="number" min="1" value="10"></label><label class="chk"><input id="spCover" type="checkbox" checked> Bỏ trang bìa đầu mỗi đề</label></div>
      <p class="small bad-t" id="spMsg"></p><div class="row gap" style="justify-content:flex-end"><button class="btn ghost" id="spCancel">Hủy</button><button class="btn" id="spGo">Tách đề</button></div>`);
    let fin = false; const done = v => { if (fin) return; fin = true; m.remove(); res(v); };
    m.addEventListener('click', e => { if (e.target === m || e.target.closest('.close')) done(null); });
    $('#spCancel', m).onclick = () => done(null);
    $('#spGo', m).onclick = () => {
      const tests = +$('#spN', m).value, first = +$('#spFirst', m).value, len = +$('#spLen', m).value;
      if (!(tests >= 1 && first >= 1 && len >= 1) || first + tests * len - 1 > n) { $('#spMsg', m).textContent = `Số trang vượt quá ${n} trang của file – hãy kiểm tra lại.`; return; }
      done({ level: +$('#spLv', m).value, name: $('#spName', m).value.trim() || file.name, tests, first, step: len, len, cover: $('#spCover', m).checked });
    };
  });
}
export async function importFiles(files, lvSel, done) {
  files = files.filter(f => /\.(pdf|mp3|m4a|wav|ogg)$/i.test(f.name));
  if (!files.length) return toast('Không thấy file .pdf hoặc .mp3', 'bad');
  const forced = lvSel === 'auto' ? 0 : +lvSel;
  let made = 0, P = null;
  try {
    // sách nhiều đề (PDF > 30 trang): tách thành từng đề
    for (const f of files.filter(f => /\.pdf$/i.test(f.name) && f.size > 3e6)) {
      const pdf = await openPdf(f);
      if (pdf.numPages <= 30) continue;
      files = files.filter(x => x !== f);
      const prof = BOOKS.find(b => b.pages === pdf.numPages) || await askSplit(pdf, f, forced || 1); if (!prof) continue;
      P = progress(`Đang tách ${prof.name}…`);
      for (let t = 0; t < prof.tests; t++) {
        const st = prof.first + prof.step * t, pages = range(st + (prof.cover ? 1 : 0), st + prof.len - 1), trp = prof.tr ? range(prof.tr[t], prof.tr[t + 1]) : [], tot = pages.length + trp.length;
        const imgs = await renderPages(pdf, pages, i => P.set(`Đề ${t + 1}/${prof.tests}: trang ${i}/${pages.length}`, (t + i / tot) / prof.tests));
        const tr = trp.length ? await renderPages(pdf, trp, i => P.set(`Đề ${t + 1}/${prof.tests}: lời thoại ${i}/${trp.length}`, (t + (pages.length + i) / tot) / prof.tests)) : [];
        await DB.put({ id: 'b' + Date.now().toString(36) + t, level: prof.level, code: 'Đề ' + (t + 1), name: `${prof.name} · Đề ${t + 1}`, created: Date.now() - t, pages: imgs, transcript: tr, audio: null, key: prof.keys && prof.keys[t] ? keyFromStr(prof.keys[t]) : {}, tries: [] });
        made++;
      }
      P.close(); P = null;
    }
    // nhóm theo mã đề (H11003…) hoặc theo thư mục
    const groups = new Map();
    for (const f of files) {
      const path = f.relPath || f.webkitRelativePath || f.name, m = path.match(/H([1-6])\d{4}/i), dir = path.includes('/') ? path.split('/').slice(-2, -1)[0] : '';
      const k = m ? m[0].toUpperCase() : (dir || 'Bộ đề');
      if (!groups.has(k)) groups.set(k, { code: k, dir, lv: m ? +m[1] : 0, files: [] });
      groups.get(k).files.push(f);
    }
    if (groups.size) {
      P = progress('Đang đọc bộ đề…'); let gi = 0;
      for (const g of groups.values()) {
        gi++;
        const lv = forced || (g.lv >= 1 && g.lv <= 3 ? g.lv : 1);
        const pdfs = g.files.filter(f => /\.pdf$/i.test(f.name)), audio = g.files.find(f => !/\.pdf$/i.test(f.name));
        const keyF = pdfs.find(f => /答案|dap ?an|đáp án|answer|key/i.test(f.name));
        const trF = pdfs.find(f => /听力材料|听力|loi thoai|lời thoại|transcript|script/i.test(f.name) && f !== keyF);
        const examF = pdfs.filter(f => f !== keyF && f !== trF).sort((a, b) => b.size - a.size)[0];
        if (!examF && !audio && !keyF) continue;
        const pre = `Bộ ${gi}/${groups.size} (${g.code}): `;
        let imgs = [];
        if (examF) { const pe = await openPdf(examF); imgs = await renderPages(pe, range(1, pe.numPages), (i, n) => P.set(pre + `đọc trang đề ${i}/${n}`, (gi - 1 + i / n * .7) / groups.size)); }
        let key = {};
        if (keyF) { P.set(pre + 'đọc đáp án', (gi - 1 + .75) / groups.size); key = parseKeyText(await pdfText(keyF), lv); }
        let tr = [];
        if (trF) { const p2 = await openPdf(trF); tr = await renderPages(p2, range(1, p2.numPages), (i, n) => P.set(pre + `đọc lời thoại ${i}/${n}`, (gi - 1 + .8 + i / n * .2) / groups.size)); }
        await DB.put({ id: 's' + Date.now().toString(36) + gi, level: lv, code: g.code, name: (g.dir && !g.dir.includes(g.code) ? g.dir + ' · ' : '') + g.code, created: Date.now(), pages: imgs, transcript: tr, audio: audio || null, audioName: audio ? audio.name : '', key, tries: [], lvGuess: !forced && !g.lv });
        made++;
      }
      P.close(); P = null;
    }
  } catch (e) { console.error(e); P && P.close(); toast('Lỗi khi đọc file: ' + e.message, 'bad'); }
  if (made) toast(`Đã thêm ${made} bộ đề. Kiểm tra đáp án ở nút “Đáp án & link”.`, 'good');
  done && done();
}

// ══════════ Soạn / sửa đáp án & link ══════════
export async function examEdit(root, id) {
  const hash = location.hash;
  root.innerHTML = '<p class="muted">Đang tải…</p>';
  let d = id ? await DB.get(id).catch(() => null) : null;
  if (!alive(root, hash)) return;
  if (id && !d) { root.innerHTML = '<div class="empty"><h2>Không tìm thấy đề</h2><a class="btn" href="#/exam">Về Thi thử</a></div>'; return; }
  const isNew = !d;
  d = d || { id: 'm' + Date.now().toString(36), level: 1, name: '', note: '', created: Date.now(), key: {}, pages: [], transcript: [], tries: [] };
  const audioLink = d.yt ? `https://youtu.be/${d.yt.id}${d.yt.t ? '?t=' + d.yt.t : ''}` : (d.audioUrl || '');
  root.innerHTML = `<nav class="crumb"><a href="#/exam">Thi thử</a> › ${isNew ? 'Tạo đề' : 'Đáp án & link'}</nav><h1>${isNew ? 'Tạo đề bằng link' : esc(d.name)}</h1>
    ${d.lvGuess ? '<p class="note">Bộ đề này không có mã đề nên web chưa biết cấp độ – hãy chọn đúng cấp ở dưới.</p>' : ''}
    <section class="card me-form"><div class="me-grid">
      <label>Tên đề <input class="inp" id="mTitle" maxlength="120" placeholder="Ví dụ: Đề HSK 2 – H21003" value="${esc(d.name)}"></label>
      <label>Cấp độ <select class="inp" id="mLv">${[1, 2, 3].map(l => `<option value="${l}" ${d.level === l ? 'selected' : ''}>HSK ${l} – ${qList(l).length} câu · ${HSK[l].min} phút</option>`).join('')}</select></label>
      <label class="wide">🎧 Link file nghe <input class="inp" id="mAudio" placeholder="YouTube (youtu.be/…), file .mp3, hoặc Google Drive" value="${esc(audioLink)}"><span class="muted small">${d.audio ? `Đang có file nghe trên máy: ${esc(d.audioName || 'mp3')}. Nếu điền link, link sẽ được dùng thay. ` : ''}YouTube có thể thêm thời điểm bắt đầu, ví dụ ?t=30. Link Google Drive cần để chế độ “Bất kỳ ai có đường liên kết”.</span></label>
      <label class="wide">📄 Link tờ đề (không bắt buộc) <input class="inp" id="mPaper" placeholder="Link PDF, ảnh hoặc Google Drive" value="${esc(d.paperUrl || '')}">${d.pages && d.pages.length ? `<span class="muted small">Đã có ${d.pages.length} trang đề tải từ PDF.</span>` : ''}</label>
      <label class="wide">Ghi chú <textarea class="inp" id="mNote" rows="2" maxlength="1000" placeholder="Nguồn đề, năm thi…">${esc(d.note || '')}</textarea></label>
    </div></section>
    <div id="mSheet"></div>
    <div class="me-save card"><span class="muted" id="mStat"></span><span class="grow"></span><a class="btn ghost" href="#/exam">Hủy</a><button class="btn ghost" id="mSave">💾 Lưu</button><button class="btn" id="mSaveGo">Lưu & thi</button></div>`;
  const key = { ...d.key };
  const readKey = () => $$('[data-n]', $('#mSheet', root)).forEach(el => { const n = +el.dataset.n, v = el.value.trim(); if (v) key[n] = v; else delete key[n]; });
  const stat = () => { const qs = qList(d.level); $('#mStat', root).textContent = `Đã nhập ${qs.filter(q => key[q.n]).length}/${qs.length} đáp án`; };
  const drawSheet = () => {
    const lv = d.level;
    $('#mSheet', root).innerHTML = HSK[lv].secs.map(s => { const qs = qList(lv).filter(q => q.sec === s.k);
      return `<section class="card me-secform"><h2>${esc(s.name)} <small class="muted">câu ${qs[0].n}–${qs.at(-1).n} · ${s.min} phút</small></h2>
        <details class="me-quick"><summary>⚡ Dán nhanh đáp án phần này</summary>
          <p class="muted small">${s.k === 'W' ? 'Mỗi dòng một đáp án theo thứ tự câu, hoặc dạng “71. 我们一起去吧。”. Nhiều đáp án đúng ngăn cách bằng dấu “|”.' : 'Dạng “1.✓ 2.× 3.B …” hoặc liệt kê theo thứ tự “✓ × ✓ B A C …”. Đúng ghi ✓ √ V Đ 对, sai ghi × X S 错.'}</p>
          <textarea class="inp me-qtxt" rows="3" lang="zh-CN"></textarea><button class="mini me-qbtn" data-sec="${s.k}">Điền vào phiếu</button><span class="small me-qmsg"></span></details>
        ${s.parts.map(([a, b, t, desc]) => `<div class="me-part"><div class="me-ph"><b>Câu ${a}–${b}</b> · ${esc(desc)} <span class="muted small">(${TYPE_VI[t]})</span></div>
          <div class="me-qs ${t === 'text' ? 'txt' : ''}">${range(a, b).map(n => t === 'text'
            ? `<label class="me-q"><span>${n}</span><input class="inp" lang="zh-CN" data-n="${n}" maxlength="120" value="${esc(key[n] || '')}" placeholder="${n <= 75 ? 'Câu hoàn chỉnh' : 'Chữ Hán'}"></label>`
            : `<label class="me-q"><span>${n}</span><select class="inp" data-n="${n}"><option value=""></option>${OPTS[t].map(o => `<option ${key[n] === o ? 'selected' : ''}>${o}</option>`).join('')}</select></label>`).join('')}</div></div>`).join('')}</section>`; }).join('');
    stat();
  };
  drawSheet();
  $('#mLv', root).onchange = e => { readKey(); d.level = +e.target.value; const ok = new Set(qList(d.level).map(q => q.n)); for (const n of Object.keys(key)) if (!ok.has(+n)) delete key[n]; drawSheet(); };
  $('#mSheet', root).addEventListener('change', () => { readKey(); stat(); });
  $('#mSheet', root).addEventListener('click', e => {
    const b = e.target.closest('.me-qbtn'); if (!b) return;
    const box = b.closest('.me-quick'), sec = b.dataset.sec;
    const { out, bad } = parseQuick($('.me-qtxt', box).value, qList(d.level).filter(q => q.sec === sec));
    readKey(); Object.assign(key, out); drawSheet();
    const nb = $(`.me-qbtn[data-sec="${sec}"]`, root).closest('.me-quick'); nb.open = true;
    $('.me-qmsg', nb).innerHTML = ` <span class="ok-t">Đã điền ${Object.keys(out).length} câu.</span>${bad.length ? ` <span class="bad-t">Không hiểu đáp án câu: ${bad.join(', ')}</span>` : ''}`;
  });
  const save = async go => {
    readKey();
    const name = $('#mTitle', root).value.trim(), au = $('#mAudio', root).value.trim(), pa = $('#mPaper', root).value.trim();
    if (!name) { toast('Hãy đặt tên cho đề.', 'bad'); $('#mTitle', root).focus(); return; }
    const am = mediaOf(au), pm = mediaOf(pa);
    if ((am && am.kind === 'bad') || (pm && pm.kind === 'bad')) { toast('Link phải bắt đầu bằng http:// hoặc https://', 'bad'); return; }
    Object.assign(d, { name, note: $('#mNote', root).value.trim().slice(0, 1000), paperUrl: pa.slice(0, 600), key: cleanKey(key, d.level), lvGuess: false });
    if (am && am.kind === 'yt') { d.yt = { id: am.id, t: am.t }; d.audioUrl = ''; } else { delete d.yt; d.audioUrl = au.slice(0, 600); }
    if (!Object.keys(d.key).length) toast('Chưa có đáp án – vẫn làm bài được nhưng không chấm điểm.');
    await DB.put(d); if (Object.keys(d.key).length) toast('Đã lưu.', 'good');
    location.hash = go ? '#/exam/do/' + d.id : '#/exam';
  };
  $('#mSave', root).onclick = () => save(false); $('#mSaveGo', root).onclick = () => save(true);
  return isNew ? 'Tạo đề thi' : 'Đáp án đề thi';
}

// ══════════ Làm bài ══════════
export async function examDo(root, id) {
  const hash = location.hash, review = /\?review/.test(hash);
  root.innerHTML = '<p class="muted">Đang tải đề…</p>';
  freeURLs();
  const s = await DB.get(id).catch(() => null);
  if (!alive(root, hash)) return;
  if (!s) { root.innerHTML = '<div class="empty"><h2>Không tìm thấy đề</h2><a class="btn" href="#/exam">Về Thi thử</a></div>'; return; }
  document.title = s.name + ' · HànNgữ Việt';
  if (s.generated) return genExam(root, s, review && s.tries.length ? s.tries.at(-1) : null);
  return sheetExam(root, s);
}
export async function examGenLevel(root, lv) { const s = generate(lv); await DB.put(s); location.hash = '#/exam/do/' + s.id; }

async function saveTry(s, ans, g, spent) {
  s.tries = s.tries || []; s.tries.push({ at: Date.now(), total: g.total, secs: g.secs.map(x => x.score), spent, ans }); s.tries = s.tries.slice(-20);
  try { await DB.put(s); } catch (e) { console.error(e); }
  store.update(st => st.tests.push({ kind: 'exam', level: s.level, score: g.total, total: g.max, at: Date.now(), custom: s.generated ? undefined : s.id }));
  logActivity(10);
}
function scoreHead(s, g, spent, prevBest) {
  return `<div class="ex-score">
    <div><span class="muted small">Tổng điểm</span><b class="${g.pass ? 'ok-t' : 'bad-t'}">${g.total}/${g.max}</b><span class="badge ${g.pass ? 'ok' : 'bad'}">${g.pass ? 'ĐẠT' : 'CHƯA ĐẠT'} (≥ ${HSK[s.level].pass})</span></div>
    ${g.secs.map(x => `<div><span class="muted small">${esc(x.s.name)}</span><b>${x.score == null ? '–' : x.score + '/100'}</b><span class="muted small">${x.n ? `${x.ok}/${x.n} câu đúng` : 'chưa có đáp án'}</span></div>`).join('')}
    <div><span class="muted small">Thời gian</span><b>${fmtT(spent)}</b>${prevBest >= 0 ? `<span class="muted small">Lần cao nhất trước: ${prevBest}</span>` : ''}</div></div>
    ${g.noKey ? '<p><span class="badge bad">Bộ đề thiếu đáp án một số câu – điểm chưa đầy đủ</span></p>' : ''}`;
}
function timerBar(root, min, free, onUp) {
  const t0 = Date.now(); let h = 0;
  const tick = () => {
    const el = $('#tT', root); if (!el || !root.isConnected) return clearInterval(h);
    const sec = (Date.now() - t0) / 1000, r = free ? sec : min * 60 - sec;
    el.textContent = fmtT(Math.max(0, Math.floor(r)));
    if (!free && r <= 300) $('.me-timer', root)?.classList.add('warn');
    if (!free && r <= 0) { clearInterval(h); toast('Hết giờ! Bài đã được nộp.'); onUp(); }
  };
  tick(); h = setInterval(tick, 1000);
  return { stop: () => clearInterval(h), spent: () => Math.round((Date.now() - t0) / 1000) };
}
const introHtml = (s, extra = '') => `<div class="card note-card" id="tIntro"><p><b>Cấu trúc HSK ${s.level}:</b> ${HSK[s.level].secs.map(x => `${x.name} ${qList(s.level).filter(q => q.sec === x.k).length} câu (${x.min} phút)`).join(' · ')}. Tổng thời gian ${HSK[s.level].min} phút, hết giờ bài tự nộp.</p>${extra}
  <div class="row gap wrap"><button class="btn" id="tGo">▶ Bắt đầu thi</button><label class="chk"><input type="checkbox" id="tFree"> Không tính giờ (luyện tập)</label></div></div>`;
const answeredN = ans => Object.values(ans).filter(v => v && String(v).trim()).length;

// ── Đề tải lên / link: tờ đề + phiếu trả lời ──
function sheetExam(root, s) {
  const lv = s.level, qs = qList(lv), ans = {};
  const am = !s.yt && s.audioUrl ? mediaOf(s.audioUrl) : null;
  const audioHtml = s.yt ? `<div class="me-yt"><iframe id="ytf" data-src="${esc(ytSrc(s.yt, true))}" src="${esc(ytSrc(s.yt, false))}" title="File nghe" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>`
    : am && am.kind === 'drive' ? `<iframe class="me-drive" src="${esc(am.src)}" title="File nghe" allow="autoplay"></iframe>`
    : am ? `<audio id="au" controls preload="auto" src="${esc(am.src || s.audioUrl)}"></audio><div class="muted small">Không phát được? <a href="${esc(s.audioUrl)}" target="_blank" rel="noopener">Mở link âm thanh</a></div>`
    : s.audio ? `<audio id="au" controls preload="auto" src="${objURL(s.audio)}"></audio><div class="muted small">🔊 ${esc(s.audioName || 'File nghe')}</div>` : '';
  const hasKey = Object.keys(s.key || {}).length;
  root.innerHTML = `<nav class="crumb"><a href="#/exam">Thi thử</a> › ${esc(s.name)}</nav>
    <h1>${esc(s.name)} <span class="lv-badge lv${lv}">HSK ${lv}</span></h1>${s.note ? `<p class="muted">${esc(s.note)}</p>` : ''}
    ${introHtml(s, `<p class="muted small">Bấm “Bắt đầu” để chạy đồng hồ và phát file nghe. Chọn đáp án trên phiếu trả lời${lv === 3 ? ', phần Viết gõ chữ Hán vào ô' : ''}, rồi bấm “Nộp bài”.${hasKey ? '' : ' <b>Đề chưa có đáp án nên sẽ không chấm điểm được</b> – <a href="#/exam/edit/' + s.id + '">nhập đáp án</a>.'}</p>`)}
    <div id="tBody" hidden>
      <div class="me-timer card"><span>⏱ <b id="tT">--:--</b></span><span class="muted small">Đã làm <span class="tCnt">0/${qs.length}</span></span><span class="grow"></span><button class="btn" id="tSubmit">Nộp bài</button></div>
      <div class="ex-layout">
        <div class="ex-paper">${audioHtml ? `<div class="ex-audiobox">${audioHtml}</div>` : `<p class="note">⚠ Bộ đề chưa có file nghe. <a href="#/exam/edit/${s.id}">Gắn link</a> hoặc chọn tệp bên dưới.</p>`}
          <details class="small ex-local"><summary>Dùng tệp âm thanh trên máy</summary><input type="file" accept="audio/*" id="tFile"><div id="tLocal"></div></details>
          ${s.pages && s.pages.length ? `<div class="pages">${s.pages.map((b, i) => `<img src="${objURL(b)}" alt="Trang ${i + 1}" loading="lazy">`).join('')}</div>` : s.paperUrl ? paperHtml(s.paperUrl) : s.yt ? '<p class="muted small">Câu hỏi nằm trong video.</p>' : '<p class="muted small">Chưa có tờ đề. Bạn có thể mở đề giấy/PDF ở nơi khác và trả lời trên phiếu.</p>'}</div>
        <aside class="card ex-sheet" id="sheet"><div class="ex-handle" id="hdl"><span>📝 Phiếu trả lời <span class="tCnt">0/${qs.length}</span></span><span>▲</span></div>
          ${HSK[lv].secs.map(sec => `<div class="ex-ptitle big">${esc(sec.name)}</div>${sec.parts.map(([a, b, t, desc]) => `<div class="ex-ptitle">Câu ${a}–${b} · ${esc(desc.split(' – ')[1] || desc)}</div>${range(a, b).map(n => t === 'text'
            ? `<div class="ex-qrow txt"><b>${n}.</b><input class="inp" lang="zh-CN" data-tn="${n}" autocomplete="off" placeholder="${n <= 75 ? 'Viết câu hoàn chỉnh' : 'Chữ Hán'}"></div>`
            : `<div class="ex-qrow"><b>${n}.</b>${OPTS[t].map(o => `<button class="ex-op" data-n="${n}" data-v="${o}">${o}</button>`).join('')}</div>`).join('')}`).join('')}`).join('')}
          <button class="btn" style="width:100%;margin-top:14px" id="sub2">Nộp bài</button></aside>
      </div>
    </div><div id="tRes"></div>`;
  const cnt = () => $$('.tCnt', root).forEach(x => x.textContent = `${answeredN(ans)}/${qs.length}`);
  $('#hdl', root).onclick = () => $('#sheet', root).classList.toggle('open');
  $('#sheet', root).addEventListener('click', e => { const b = e.target.closest('.ex-op'); if (!b) return; const n = +b.dataset.n; ans[n] = ans[n] === b.dataset.v ? '' : b.dataset.v; $$(`.ex-op[data-n="${n}"]`, root).forEach(x => x.classList.toggle('on', x.dataset.v === ans[n])); cnt(); });
  $('#sheet', root).addEventListener('input', e => { const i = e.target.closest('[data-tn]'); if (i) { ans[+i.dataset.tn] = i.value; cnt(); } });
  $('#tFile', root).onchange = ev => { const f = ev.target.files[0]; if (f) $('#tLocal', root).innerHTML = `<audio controls autoplay src="${objURL(f)}"></audio>`; };
  let tm = null;
  const submit = async () => {
    tm && tm.stop(); $$('audio', root).forEach(a => a.pause()); const f = $('#ytf', root); if (f) f.src = 'about:blank';
    const spent = tm ? tm.spent() : 0, prev = bestOf(s), g = grade(lv, s.key || {}, ans);
    await saveTry(s, { ...ans }, g, spent);
    $('#tBody', root).hidden = true; window.scrollTo({ top: 0, behavior: 'smooth' });
    $('#tRes', root).innerHTML = `<section class="card">${scoreHead(s, g, spent, prev)}
      <div class="row gap wrap"><button class="btn" id="redo">Thi lại</button>${s.transcript && s.transcript.length ? '<button class="btn ghost" id="trB">Xem lời thoại</button>' : ''}${s.pages && s.pages.length ? '<button class="btn ghost" id="pgB">Xem đề</button>' : ''}<a class="btn ghost" href="#/exam/edit/${s.id}">Sửa đáp án</a><a class="btn ghost" href="#/exam">Về danh sách</a></div></section>
      <section class="card"><h2>Chi tiết từng câu</h2><p class="muted small"><span class="me-k ok">đúng</span> <span class="me-k bad">sai</span> <span class="me-k skip">bỏ trống</span> <span class="me-k none">đề chưa có đáp án</span></p>
        ${HSK[lv].secs.map(sec => `<h3 class="sub">${esc(sec.name)}</h3><div class="me-review">${g.rows.filter(r => r.q.sec === sec.k).map(r => `<div class="me-rv ${r.ok == null ? 'none' : r.ok ? 'ok' : r.ans ? 'bad' : 'skip'} ${r.q.t === 'text' ? 'txt' : ''}"><b>${r.q.n}</b><span lang="zh-CN">${esc(r.ans || '–')}</span>${r.ok === false ? `<i lang="zh-CN">→ ${esc(r.key)}</i>` : r.ok == null ? '<i>?</i>' : ''}</div>`).join('')}</div>`).join('')}</section>`;
    $('#redo', root).onclick = () => examDo(root, s.id);
    if ($('#trB', root)) $('#trB', root).onclick = () => showImages(s.transcript, 'Lời thoại');
    if ($('#pgB', root)) $('#pgB', root).onclick = () => showImages(s.pages, 'Đề thi');
  };
  const ask = () => { const left = qs.length - answeredN(ans); if (left && !confirmTwice('sub' + s.id, `Còn ${left} câu chưa làm. Bấm “Nộp bài” lần nữa để nộp.`)) return; submit(); };
  $('#tSubmit', root).onclick = ask; $('#sub2', root).onclick = ask;
  $('#tGo', root).onclick = () => {
    $('#tIntro', root).classList.add('gone-intro'); const free = $('#tFree', root).checked; $('#tIntro', root).remove(); $('#tBody', root).hidden = false;
    tm = timerBar(root, HSK[lv].min, free, submit);
    const f = $('#ytf', root); if (f) f.src = f.dataset.src;
    const au = $('#au', root); if (au) au.play().catch(() => toast('Bấm ▶ trên trình phát để nghe'));
  };
  return s.name;
}

// ── Đề tự sinh ──
let clipMap = null;
const loadClips = () => clipMap || (clipMap = fetch('audio/hsk1/manifest.json').then(r => r.json()).catch(() => ({})));
let playTok = 0;
async function playItems(items, root) {
  const my = ++playTok; stopSeq();
  const m = await loadClips();
  for (let rep = 0; rep < 2; rep++) {
    for (const it of items) {
      if (my !== playTok || !root.isConnected) return;
      const h = m[it.who + '|' + it.t];
      if (h) await new Promise(res => { const a = new Audio('audio/hsk1/' + h + '.mp3'); a.onended = res; a.onerror = res; a.play().catch(res); });
      else await speak(it.t, { role: it.who === '男' ? 1 : 0, rate: 0.9 });
      await new Promise(r => setTimeout(r, 450));
    }
    if (rep === 0) await new Promise(r => setTimeout(r, 1200));
  }
}
const pyOf = t => esc(sentencePinyin(String(t).replace(/^[AB]：/gm, '')));
const zhBlock = (t, big) => `<div class="g-zh ${big ? 'big' : ''}">${String(t).split('\n').map(l => `<div class="g-line"><div class="g-py" data-py>${pyOf(l)}</div><div lang="zh-CN">${esc(l)}</div></div>`).join('')}</div>`;
const AF = 'ABCDEF';

function genExam(root, s, reviewTry) {
  const lv = s.level, Q = s.questions, P = GEN_PARTS[lv];
  const ans = reviewTry ? { ...reviewTry.ans } : {};
  const isRev = !!reviewTry, noPy = store.s.examPy === false;
  const stCls = (q, v) => !isRev ? (ans[q.n] === v ? 'on' : '') : (v === q.ans ? 'right' : ans[q.n] === v ? 'wrong' : '');
  const dis = isRev ? 'disabled' : '';
  const groupHtml = q => `<div class="g-group ${q.groupKind}">${q.group.map((x, i) => `<div><b>${AF[i]}</b>${q.groupKind === 'pic' ? `<span class="g-pic">${x}</span>` : zhBlock(x, q.groupKind === 'word')}</div>`).join('')}</div>`;
  const opBtns = q => OPTS[q.type].map(v => `<button class="ex-op ${stCls(q, v)}" data-n="${q.n}" data-v="${v}" ${dis}>${v}</button>`).join('');
  const qHtml = q => {
    const play = q.audio ? `<button class="play" data-play="${q.n}">▶ Nghe</button>` : '';
    let body;
    if (q.type === 'tf' && q.pic) body = `<div class="g-tf"><span class="g-pic">${q.pic}</span>${q.word ? zhBlock(q.word, true) : ''}<span class="grow"></span><span class="g-ops">${opBtns(q)}</span></div>`;
    else if (q.type === 'tf') body = `${q.text ? `<div class="g-text">${zhBlock(q.text)}</div>` : ''}<div class="g-tf"><span class="g-star">★</span>${zhBlock(q.star)}<span class="grow"></span><span class="g-ops">${opBtns(q)}</span></div>`;
    else if (q.pics) body = `<div class="g-pics">${q.pics.map((e, i) => `<button class="g-choice ${stCls(q, AF[i])}" data-n="${q.n}" data-v="${AF[i]}" ${dis}><b>${AF[i]}</b><span class="g-pic">${e}</span></button>`).join('')}</div>`;
    else if (q.opts) body = `${q.text ? `<div class="g-text">${zhBlock(q.text)}</div>` : ''}${q.qtext ? `<div class="g-text g-qq"><span class="g-star">★</span>${zhBlock(q.qtext)}</div>` : ''}<div class="g-pics">${q.opts.map((o, i) => `<button class="g-choice ${stCls(q, AF[i])}" data-n="${q.n}" data-v="${AF[i]}" ${dis}><b>${AF[i]}</b>${zhBlock(o, true)}</button>`).join('')}</div>`;
    else if (q.pieces) body = `<div class="g-pieces">${q.pieces.map(p => `<span lang="zh-CN">${esc(p)}</span>`).join('')}</div><input class="inp g-in" lang="zh-CN" data-tn="${q.n}" value="${esc(ans[q.n] || '')}" placeholder="Viết câu hoàn chỉnh…" ${dis} autocomplete="off">`;
    else if (q.pyw) { const [a, b] = q.pyw.split(/（.+?）/); body = `<div class="g-pyw" lang="zh-CN">${esc(a)}<span class="g-blank"><i>${esc(q.py)}</i><input class="inp" data-tn="${q.n}" value="${esc(ans[q.n] || '')}" maxlength="2" ${dis} autocomplete="off" aria-label="Chữ Hán cho ${esc(q.py)}"></span>${esc(b)}</div>`; }
    else body = `${q.text ? `<div class="g-text">${zhBlock(q.text)}</div>` : ''}<div class="g-ops">${opBtns(q)}</div>`;
    let exp = '';
    if (isRev) { const a = ans[q.n] || '', ok = q.type === 'text' ? textOk(a, q.ans) : a === q.ans;
      exp = `<div class="g-exp ${ok ? 'ok' : 'bad'}">${ok ? '✅ Đúng' : '❌ ' + (a ? 'Sai' : 'Bỏ trống')} · Đáp án: <b lang="zh-CN">${esc(q.ans)}</b>${a && !ok ? ` · bạn chọn <span lang="zh-CN">${esc(a)}</span>` : ''}<div class="g-expt">${esc(q.exp).replace(/\n/g, '<br>')}</div></div>`; }
    return `<div class="g-q-card" id="q${q.n}"><div class="g-qh"><span class="g-n">${q.n}.</span>${play}</div>${body}${exp}</div>`;
  };
  let html = '', cur = '', lastG = '';
  Q.forEach((q, i) => {
    if (q.part !== cur) { cur = q.part; lastG = ''; html += `<section class="g-part"><h2>${esc(P[cur][0])}</h2><p class="muted small">${esc(P[cur][1])}</p>`; }
    if (q.gid && q.gid !== lastG) { lastG = q.gid; html += groupHtml(q); }
    html += qHtml(q);
    if (!Q[i + 1] || Q[i + 1].part !== cur) html += '</section>';
  });
  const tops = `<nav class="crumb"><a href="#/exam">Thi thử</a> › ${esc(s.name)}</nav>
    <div class="row gap wrap" style="justify-content:space-between;align-items:center"><h1>${esc(s.name)} <span class="lv-badge lv${lv}">HSK ${lv}</span></h1><label class="sw"><input type="checkbox" id="pyT" ${noPy ? '' : 'checked'}><span></span> Pinyin</label></div>`;
  if (isRev) {
    const g = grade(lv, s.key, ans);
    root.innerHTML = `${tops}<section class="card">${scoreHead(s, g, reviewTry.spent || 0, -1)}<div class="row gap wrap"><button class="btn" id="again">🎲 Làm đề HSK ${lv} mới</button><button class="btn ghost" id="redoG">Làm lại đề này</button><a class="btn ghost" href="#/exam">Về Thi thử</a></div></section>
      <p class="muted small">Xem lại: đáp án đúng tô xanh, câu chọn sai tô đỏ, mỗi câu có lời thoại và giải thích tiếng Việt. Bấm ▶ Nghe để nghe lại.</p><div class="g-wrap ${noPy ? 'no-py' : ''}">${html}</div>`;
    $('#again', root).onclick = () => examGenLevel(root, lv);
    $('#redoG', root).onclick = () => { window.scrollTo(0, 0); genExam(root, s, null); };
  } else {
    root.innerHTML = `${tops}${introHtml(s, '<p class="muted small">Phần nghe: bấm <b>▶ Nghe</b> ở mỗi câu (mỗi lần bấm đọc 2 lần như đề thật). Bật/tắt pinyin ở góc trên.</p>')}
      <div id="tBody" hidden><div class="me-timer card"><span>⏱ <b id="tT">--:--</b></span><span class="muted small">Đã làm <span class="tCnt">0/${Q.length}</span></span><span class="grow"></span><button class="btn" id="tSubmit">Nộp bài</button></div>
      <div class="g-wrap ${noPy ? 'no-py' : ''}">${html}</div><button class="btn" style="margin-top:16px" id="sub2">Nộp bài</button></div>`;
  }
  $('#pyT', root).onchange = e => { store.update(st => { st.examPy = e.target.checked; }); $('.g-wrap', root).classList.toggle('no-py', !e.target.checked); };
  const cnt = () => $$('.tCnt', root).forEach(x => x.textContent = `${answeredN(ans)}/${Q.length}`);
  root.onclick = async e => {
    const pb = e.target.closest('[data-play]');
    if (pb) { const q = Q[+pb.dataset.play - 1]; $$('[data-play]', root).forEach(x => x.disabled = true); pb.textContent = '🔊 Đang đọc…';
      try { await playItems(q.audio, root); } catch {} $$('[data-play]', root).forEach(x => x.disabled = false); pb.textContent = '▶ Nghe lại'; return; }
    if (isRev) return;
    const b = e.target.closest('[data-n][data-v]'); if (!b) return;
    const n = +b.dataset.n; ans[n] = ans[n] === b.dataset.v ? '' : b.dataset.v;
    $$(`[data-n="${n}"][data-v]`, root).forEach(x => x.classList.toggle('on', x.dataset.v === ans[n])); cnt();
  };
  root.oninput = isRev ? null : e => { const i = e.target.closest('[data-tn]'); if (i) { ans[+i.dataset.tn] = i.value; cnt(); } };
  if (isRev) return s.name;
  let tm = null;
  const submit = async () => { tm && tm.stop(); playTok++; stopSeq(); const g = grade(lv, s.key, ans), spent = tm ? tm.spent() : 0; await saveTry(s, { ...ans }, g, spent); window.scrollTo(0, 0); genExam(root, s, s.tries.at(-1)); };
  const ask = () => { const left = Q.length - answeredN(ans); if (left && !confirmTwice('sub' + s.id, `Còn ${left} câu chưa làm. Bấm “Nộp bài” lần nữa để nộp.`)) return; submit(); };
  $('#tSubmit', root).onclick = ask; $('#sub2', root).onclick = ask;
  $('#tGo', root).onclick = () => { const free = $('#tFree', root).checked; $('#tIntro', root).remove(); $('#tBody', root).hidden = false; tm = timerBar(root, HSK[lv].min, free, submit); };
  return s.name;
}
