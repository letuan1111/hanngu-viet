// Đề thi tự tải lên: đúng cấu trúc HSK 1–3 (Nghe – Đọc – Viết), nhập đáp án, link âm thanh YouTube / mp3 / Google Drive
import { store, logActivity } from '../core/store.js';
import { esc, $, $$, toast } from '../core/ui.js';

// Cấu trúc đề HSK (chuẩn HSK 2.0): mỗi phần [từ câu, đến câu, kiểu đáp án, mô tả]
// kiểu: tf = Đúng/Sai · abc = A–C · af = A–F · ae = A–E · text = tự viết
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
const qList = lv => HSK[lv].secs.flatMap(s => s.parts.flatMap(([a, b, t, d]) => Array.from({ length: b - a + 1 }, (_, i) => ({ n: a + i, t, sec: s.k, desc: d }))));
const exams = () => store.s.myExams || [];
const byId = id => exams().find(e => e.id === id);
const saveExam = ex => store.update(s => { s.myExams = s.myExams || []; const i = s.myExams.findIndex(e => e.id === ex.id); if (i >= 0) s.myExams[i] = ex; else s.myExams.push(ex); });

// ── Chuẩn hóa đáp án ──
function normTok(tok, t) {
  const x = tok.trim().replace(/^\(?\d+\s*[.):\-–]\s*/, '').trim(); if (!x) return '';
  if (t === 'tf') { if (/^(✓|√|✔|v|t|true|y|yes|đ|d|đúng|dung|对|o)$/i.test(x)) return '✓'; if (/^(✗|×|✘|x|f|false|n|no|s|sai|错)$/i.test(x)) return '✗'; return null; }
  const L = x.toUpperCase(); return OPTS[t].includes(L) ? L : null;
}
// Dán nhanh: "1.✓ 2.× 3.B …" hoặc "✓✗BCA…" hoặc mỗi dòng một đáp án
export function parseQuick(text, qs) {
  const out = {}, bad = [];
  if (qs.every(q => q.t === 'text')) {
    let k = 0;
    for (const line of text.split('\n').map(l => l.trim()).filter(Boolean)) {
      const m = line.match(/^(\d{1,2})\s*[.):\-–]?\s*(.+)$/);
      if (m && qs.some(q => q.n === +m[1])) { out[+m[1]] = m[2].trim(); k = qs.findIndex(q => q.n === +m[1]) + 1; }
      else if (qs[k]) out[qs[k++].n] = line;
    }
    return { out, bad };
  }
  const numbered = [...text.matchAll(/(\d{1,2})\s*[.):\-–]?\s*([^\s\d,;、，.:)][^\s,;、，]*)/g)];
  if (numbered.length) {
    for (const [, n, v] of numbered) { const q = qs.find(z => z.n === +n); if (!q) continue; const r = normTok(v, q.t); if (r == null || r === '') bad.push(n); else out[q.n] = r; }
    return { out, bad };
  }
  let toks = text.split(/[\s,;、，]+/).filter(Boolean);
  if (toks.length === 1 && toks[0].length > 1) toks = [...toks[0]];
  toks.forEach((v, i) => { const q = qs[i]; if (!q) return; const r = normTok(v, q.t); if (r == null) bad.push(q.n); else if (r) out[q.n] = r; });
  return { out, bad };
}
const normText = s => String(s || '').replace(/[\s。．.，,！!？?、；;：:“”"'‘’（）()]/g, '');
const textOk = (ans, key) => !!normText(ans) && String(key).split(/\s*[|\/]\s*/).some(k => normText(k) === normText(ans));

// ── Nhận dạng link ──
export function mediaOf(url) {
  url = String(url || '').trim(); if (!url) return null;
  if (!/^https?:\/\//i.test(url)) return { kind: 'bad' };
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/|v\/))([\w-]{11})/i);
  if (yt) { const t = url.match(/[?&](?:t|start)=(\d+h)?(\d+m)?(\d+)s?/); const sec = t ? (parseInt(t[1]) || 0) * 3600 + (parseInt(t[2]) || 0) * 60 + (+t[3] || 0) : 0; return { kind: 'yt', id: yt[1], src: `https://www.youtube.com/embed/${yt[1]}?rel=0&modestbranding=1${sec ? `&start=${sec}` : ''}` }; }
  const gd = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:.*&)?id=)([\w-]{20,})/i);
  if (gd) return { kind: 'drive', src: `https://drive.google.com/file/d/${gd[1]}/preview` };
  if (/\.(png|jpe?g|gif|webp)(\?|#|$)/i.test(url)) return { kind: 'img', src: url };
  if (/\.pdf(\?|#|$)/i.test(url)) return { kind: 'pdf', src: url };
  if (/\.(mp3|m4a|wav|ogg|aac|opus|webm)(\?|#|$)/i.test(url)) return { kind: 'audio', src: url };
  return { kind: 'link', src: url };
}
function audioHtml(url) {
  const m = mediaOf(url); if (!m) return '';
  if (m.kind === 'yt') return `<div class="me-yt"><iframe src="${esc(m.src)}" title="Âm thanh phần nghe" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`;
  if (m.kind === 'drive') return `<iframe class="me-drive" src="${esc(m.src)}" title="Âm thanh phần nghe" allow="autoplay" loading="lazy"></iframe>`;
  if (m.kind === 'bad') return '<p class="bad-t">Link âm thanh không hợp lệ.</p>';
  return `<audio class="me-audio" controls preload="metadata" src="${esc(m.src)}"></audio><p class="muted small">Nếu không phát được, <a href="${esc(m.src)}" target="_blank" rel="noopener">mở link âm thanh trong tab mới</a>.</p>`;
}
function paperHtml(url) {
  const m = mediaOf(url); if (!m) return '';
  const open = `<a class="mini" href="${esc(url)}" target="_blank" rel="noopener">↗ Mở đề trong tab mới</a>`;
  if (m.kind === 'img') return `<div class="me-paper"><img src="${esc(m.src)}" alt="Đề thi" loading="lazy"></div>${open}`;
  if (m.kind === 'pdf' || m.kind === 'drive') return `<iframe class="me-pdf" src="${esc(m.src)}" title="Đề thi" loading="lazy"></iframe>${open}`;
  if (m.kind === 'yt') return `<div class="me-yt"><iframe src="${esc(m.src)}" title="Đề thi" allowfullscreen loading="lazy"></iframe></div>`;
  if (m.kind === 'bad') return '<p class="bad-t">Link đề không hợp lệ.</p>';
  return open;
}

// ── Danh sách đề tự tải (chèn vào trang Thi thử) ──
export function myExamSection() {
  const list = exams();
  return `<section class="card me-sec"><div class="row gap wrap" style="justify-content:space-between"><h2>📂 Đề thi của bạn</h2>
    <div class="row gap wrap"><a class="btn" href="#/exam/new">➕ Tải đề mới</a><label class="btn ghost me-imp">📥 Nhập tệp đề<input type="file" accept=".json,application/json" hidden></label></div></div>
    <p class="muted small">Tải đề HSK 1, 2, 3 đúng cấu trúc thi thật: nhập đáp án từng phần Nghe – Đọc – Viết, gắn link âm thanh phần nghe (YouTube, mp3 hoặc Google Drive) và link đề (PDF/ảnh). Đề được lưu trên trình duyệt của bạn; có thể xuất tệp để gửi bạn bè.</p>
    ${list.length ? `<div class="me-list">${list.map(e => { const qs = qList(e.level), have = qs.filter(q => e.key[q.n]).length, best = (e.tries || []).reduce((m, t) => Math.max(m, t.total), -1);
      return `<div class="me-item"><span class="lv-badge lv${e.level}">HSK ${e.level}</span><div class="me-info"><b>${esc(e.title)}</b><div class="muted small">${have}/${qs.length} đáp án · ${e.audio ? '🎧 có âm thanh' : 'chưa có âm thanh'}${e.paper ? ' · 📄 có đề' : ''}${best >= 0 ? ` · cao nhất ${best}/${HSK[e.level].secs.length * 100}` : ''}</div></div>
        <div class="me-act"><a class="btn sm" href="#/exam/take/${e.id}">Làm bài</a><a class="mini" href="#/exam/edit/${e.id}">Sửa</a><button class="mini" data-exp="${e.id}">Xuất tệp</button><button class="mini" data-del="${e.id}">Xóa</button></div></div>`; }).join('')}</div>`
      : '<p class="muted">Bạn chưa tải đề nào.</p>'}</section>`;
}
export function bindMyExamSection(root, rerender) {
  const sec = $('.me-sec', root); if (!sec) return;
  sec.addEventListener('click', e => {
    const ex = e.target.closest('[data-exp]'), del = e.target.closest('[data-del]');
    if (ex) { const x = byId(ex.dataset.exp); const blob = new Blob([JSON.stringify({ hannguExam: 1, ...x, tries: undefined }, null, 1)], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `de-hsk${x.level}-${x.title.replace(/[^\p{L}\p{N}]+/gu, '-').slice(0, 40)}.json`; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000); }
    if (del) { const x = byId(del.dataset.del); if (x && confirmDel(x)) { store.update(s => { s.myExams = s.myExams.filter(z => z.id !== x.id); }); toast('Đã xóa đề.'); rerender(); } }
  });
  $('.me-imp input', sec).onchange = async e => {
    const f = e.target.files[0]; if (!f) return;
    try {
      const d = JSON.parse(await f.text());
      if (!d || !HSK[d.level] || typeof d.key !== 'object') throw new Error();
      const ex = cleanExam({ ...d, id: 'e' + Date.now().toString(36) });
      saveExam(ex); toast(`Đã nhập đề “${ex.title}”.`, 'good'); rerender();
    } catch { toast('Tệp không đúng định dạng đề của HànNgữ Việt.', 'bad'); }
  };
}
let delArmed = null;
function confirmDel(x) { if (delArmed === x.id) { delArmed = null; return true; } delArmed = x.id; toast('Bấm “Xóa” lần nữa để xóa hẳn đề này.'); setTimeout(() => { if (delArmed === x.id) delArmed = null; }, 4000); return false; }
function cleanExam(d) {
  const lv = +d.level, qs = qList(lv), key = {};
  for (const q of qs) { const v = d.key[q.n]; if (v == null || v === '') continue; key[q.n] = q.t === 'text' ? String(v).slice(0, 120) : normTok(String(v), q.t) || undefined; if (!key[q.n]) delete key[q.n]; }
  const str = (v, n) => String(v || '').trim().slice(0, n);
  return { id: d.id, level: lv, title: str(d.title, 120) || `Đề HSK ${lv}`, note: str(d.note, 1000), audio: str(d.audio, 600), paper: str(d.paper, 600), audioW: str(d.audioW, 600), key, tries: Array.isArray(d.tries) ? d.tries.slice(-20) : [], at: d.at || Date.now() };
}

// ── Soạn / sửa đề ──
export function examEdit(root, id) {
  const old = id ? byId(id) : null;
  if (id && !old) { root.innerHTML = '<div class="empty"><h2>Không tìm thấy đề</h2><a class="btn" href="#/exam">Về Thi thử</a></div>'; return; }
  const d = old ? JSON.parse(JSON.stringify(old)) : { id: 'e' + Date.now().toString(36), level: 1, title: '', note: '', audio: '', paper: '', key: {}, tries: [] };
  root.innerHTML = `<nav class="crumb"><a href="#/exam">Thi thử</a> › ${old ? 'Sửa đề' : 'Tải đề mới'}</nav><h1>${old ? 'Sửa đề thi' : 'Tải đề thi mới'}</h1>
    <section class="card me-form">
      <div class="me-grid">
        <label>Tên đề <input class="inp" id="mTitle" maxlength="120" placeholder="Ví dụ: Đề HSK 1 – H10901" value="${esc(d.title)}"></label>
        <label>Cấp độ <select class="inp" id="mLv">${[1, 2, 3].map(l => `<option value="${l}" ${d.level === l ? 'selected' : ''}>HSK ${l} – ${qList(l).length} câu · ${HSK[l].min} phút</option>`).join('')}</select></label>
        <label class="wide">🎧 Link âm thanh phần nghe <input class="inp" id="mAudio" placeholder="YouTube (youtu.be/… , youtube.com/watch?v=…), file .mp3, hoặc Google Drive" value="${esc(d.audio)}"><span class="muted small">YouTube có thể thêm thời điểm bắt đầu, ví dụ ?t=30. Link Google Drive cần để chế độ “Bất kỳ ai có đường liên kết”.</span></label>
        <label class="wide">📄 Link đề thi (không bắt buộc) <input class="inp" id="mPaper" placeholder="Link PDF, ảnh, hoặc Google Drive của tờ đề" value="${esc(d.paper)}"></label>
        <label class="wide">Ghi chú <textarea class="inp" id="mNote" rows="2" maxlength="1000" placeholder="Nguồn đề, năm thi…">${esc(d.note)}</textarea></label>
      </div>
      <div id="mPrev"></div>
    </section>
    <div id="mSheet"></div>
    <div class="me-save card"><span class="muted" id="mStat"></span><span class="grow"></span><a class="btn ghost" href="#/exam">Hủy</a><button class="btn" id="mSave">💾 Lưu đề</button></div>`;
  const readKey = () => { $$('[data-n]', $('#mSheet', root)).forEach(el => { const n = +el.dataset.n; const v = el.tagName === 'INPUT' ? el.value.trim() : el.value; if (v) d.key[n] = v; else delete d.key[n]; }); };
  const stat = () => { const qs = qList(d.level); $('#mStat', root).textContent = `Đã nhập ${qs.filter(q => d.key[q.n]).length}/${qs.length} đáp án`; };
  const drawSheet = () => {
    const lv = d.level;
    $('#mSheet', root).innerHTML = HSK[lv].secs.map(s => {
      const qs = qList(lv).filter(q => q.sec === s.k);
      return `<section class="card me-secform"><div class="row gap wrap" style="justify-content:space-between"><h2>${esc(s.name)} <small class="muted">câu ${qs[0].n}–${qs.at(-1).n} · ${s.min} phút</small></h2></div>
        <details class="me-quick"><summary>⚡ Dán nhanh đáp án phần này</summary>
          <p class="muted small">${s.k === 'W' ? 'Mỗi dòng một đáp án theo thứ tự câu, hoặc dạng “71. 我们一起去吧。”. Nhiều đáp án đúng ngăn cách bằng dấu “|”.' : 'Dạng “1.✓ 2.× 3.B 4.A …” hoặc liệt kê theo thứ tự “✓ × ✓ B A C …”. Đúng có thể ghi ✓ √ V Đ 对, sai ghi × X S 错.'}</p>
          <textarea class="inp me-qtxt" rows="3" lang="zh-CN"></textarea><button class="mini me-qbtn" data-sec="${s.k}">Điền vào phiếu</button><span class="small me-qmsg"></span></details>
        ${s.parts.map(([a, b, t, desc]) => `<div class="me-part"><div class="me-ph"><b>Câu ${a}–${b}</b> · ${esc(desc)} <span class="muted small">(${TYPE_VI[t]})</span></div>
          <div class="me-qs ${t === 'text' ? 'txt' : ''}">${qList(lv).filter(q => q.n >= a && q.n <= b).map(q => t === 'text'
            ? `<label class="me-q"><span>${q.n}</span><input class="inp" lang="zh-CN" data-n="${q.n}" maxlength="120" value="${esc(d.key[q.n] || '')}" placeholder="${q.n <= 75 ? 'Câu hoàn chỉnh' : 'Chữ Hán'}"></label>`
            : `<label class="me-q"><span>${q.n}</span><select class="inp" data-n="${q.n}"><option value=""></option>${OPTS[t].map(o => `<option ${d.key[q.n] === o ? 'selected' : ''}>${o}</option>`).join('')}</select></label>`).join('')}</div></div>`).join('')}
      </section>`;
    }).join('');
    stat();
  };
  const prev = () => { $('#mPrev', root).innerHTML = d.audio ? `<div class="me-prev"><div class="muted small">Xem thử âm thanh:</div>${audioHtml(d.audio)}</div>` : ''; };
  drawSheet(); prev();
  $('#mLv', root).onchange = e => { readKey(); d.level = +e.target.value; const ok = new Set(qList(d.level).map(q => q.n)); for (const n of Object.keys(d.key)) if (!ok.has(+n)) delete d.key[n]; drawSheet(); };
  $('#mAudio', root).onchange = e => { d.audio = e.target.value.trim(); prev(); };
  $('#mSheet', root).addEventListener('change', () => { readKey(); stat(); });
  $('#mSheet', root).addEventListener('click', e => {
    const b = e.target.closest('.me-qbtn'); if (!b) return;
    const box = b.closest('.me-quick'), qs = qList(d.level).filter(q => q.sec === b.dataset.sec);
    const { out, bad } = parseQuick($('.me-qtxt', box).value, qs);
    readKey(); Object.assign(d.key, out); drawSheet();
    const nb = $(`.me-qbtn[data-sec="${b.dataset.sec}"]`, root).closest('.me-quick'); nb.open = true;
    $('.me-qmsg', nb).innerHTML = ` <span class="ok-t">Đã điền ${Object.keys(out).length} câu.</span>${bad.length ? ` <span class="bad-t">Không hiểu đáp án câu: ${bad.join(', ')}</span>` : ''}`;
  });
  $('#mSave', root).onclick = () => {
    readKey();
    d.title = $('#mTitle', root).value.trim(); d.audio = $('#mAudio', root).value.trim(); d.paper = $('#mPaper', root).value.trim(); d.note = $('#mNote', root).value.trim();
    if (!d.title) { toast('Hãy đặt tên cho đề.', 'bad'); $('#mTitle', root).focus(); return; }
    for (const [u, n] of [[d.audio, 'âm thanh'], [d.paper, 'đề thi']]) if (u && mediaOf(u).kind === 'bad') { toast(`Link ${n} phải bắt đầu bằng http:// hoặc https://`, 'bad'); return; }
    const ex = cleanExam(d); const have = Object.keys(ex.key).length;
    if (!have) { toast('Hãy nhập ít nhất một đáp án.', 'bad'); return; }
    saveExam(ex); toast(`Đã lưu đề (${have}/${qList(ex.level).length} đáp án).`, 'good');
    location.hash = '#/exam';
  };
  return old ? 'Sửa đề thi' : 'Tải đề thi mới';
}

// ── Làm bài ──
export function examTake(root, id) {
  const e = byId(id);
  if (!e) { root.innerHTML = '<div class="empty"><h2>Không tìm thấy đề</h2><a class="btn" href="#/exam">Về Thi thử</a></div>'; return; }
  const cfg = HSK[e.level], qs = qList(e.level);
  root.innerHTML = `<nav class="crumb"><a href="#/exam">Thi thử</a> › ${esc(e.title)}</nav>
    <h1>${esc(e.title)} <span class="lv-badge lv${e.level}">HSK ${e.level}</span></h1>
    ${e.note ? `<p class="muted">${esc(e.note)}</p>` : ''}
    <div class="card note-card" id="tIntro"><p>${qs.length} câu · ${cfg.min} phút (${cfg.secs.map(s => `${s.name.split(' ')[0]} ${s.min} phút`).join(' · ')}). Mỗi phần tính 100 điểm, đạt khi tổng từ ${cfg.pass}/${cfg.secs.length * 100}. Hết giờ bài sẽ tự nộp.</p>
      <div class="row gap wrap"><button class="btn" id="tGo">Bắt đầu làm bài</button><label class="chk"><input type="checkbox" id="tNoTime"> Không tính giờ (luyện tập)</label></div></div>
    <div id="tBody" hidden>
      <div class="me-timer card"><span>⏱ <b id="tT">--:--</b></span><span class="muted small" id="tDone"></span><span class="grow"></span><button class="btn" id="tSubmit">Nộp bài</button></div>
      <div class="me-layout">
        <div class="me-media">
          <section class="card"><h2>🎧 Âm thanh phần nghe</h2>${e.audio ? audioHtml(e.audio) : '<p class="muted small">Đề này chưa có link âm thanh.</p>'}
            <details class="small"><summary>Dùng tệp âm thanh trên máy</summary><input type="file" accept="audio/*" id="tFile"><p class="muted small">Tệp chỉ được dùng trong lần làm bài này, không tải lên đâu cả.</p><div id="tLocal"></div></details></section>
          ${e.paper ? `<section class="card"><h2>📄 Đề thi</h2>${paperHtml(e.paper)}</section>` : ''}
        </div>
        <form class="me-sheet" id="tForm">${cfg.secs.map(s => `<section class="card"><h2>${esc(s.name)}</h2>
          ${s.parts.map(([a, b, t, desc]) => `<div class="me-part"><div class="me-ph"><b>Câu ${a}–${b}</b> · ${esc(desc)}</div>
            ${qs.filter(q => q.n >= a && q.n <= b).map(q => t === 'text'
              ? `<div class="me-row txt" data-q="${q.n}"><span class="me-n">${q.n}</span><input class="inp" lang="zh-CN" name="q${q.n}" autocomplete="off" placeholder="${q.n <= 75 ? 'Viết câu hoàn chỉnh' : 'Viết chữ Hán'}"></div>`
              : `<div class="me-row" data-q="${q.n}"><span class="me-n">${q.n}</span><span class="me-bub">${OPTS[t].map(o => `<label><input type="radio" name="q${q.n}" value="${o}"><span>${o}</span></label>`).join('')}</span></div>`).join('')}</div>`).join('')}
          </section>`).join('')}</form>
      </div>
    </div>
    <div id="tRes"></div>`;
  let timer = 0, t0 = 0, limit = cfg.min * 60;
  const form = $('#tForm', root);
  const answered = () => qs.filter(q => { const v = new FormData(form).get('q' + q.n); return v && String(v).trim(); }).length;
  form.addEventListener('change', () => { $('#tDone', root).textContent = `Đã làm ${answered()}/${qs.length} câu`; });
  $('#tFile', root).onchange = ev => { const f = ev.target.files[0]; if (f) $('#tLocal', root).innerHTML = `<audio controls src="${URL.createObjectURL(f)}"></audio>`; };
  $('#tGo', root).onclick = () => {
    const free = $('#tNoTime', root).checked;
    $('#tIntro', root).remove(); $('#tBody', root).hidden = false; t0 = Date.now();
    $('#tDone', root).textContent = `Đã làm 0/${qs.length} câu`;
    const tick = () => {
      if (!root.isConnected || !$('#tT', root)) return clearInterval(timer);
      const el = (Date.now() - t0) / 1000, r = free ? el : limit - el;
      $('#tT', root).textContent = `${String(Math.floor(Math.max(0, r) / 60)).padStart(2, '0')}:${String(Math.floor(Math.max(0, r) % 60)).padStart(2, '0')}`;
      if (!free && r <= 300) $('.me-timer', root).classList.add('warn');
      if (!free && r <= 0) { toast('Hết giờ! Bài đã được nộp.'); submit(); }
    };
    tick(); timer = setInterval(tick, 1000);
  };
  $('#tSubmit', root).onclick = () => {
    const left = qs.length - answered();
    if (left && !$('#tSubmit', root).dataset.sure) { $('#tSubmit', root).dataset.sure = 1; toast(`Còn ${left} câu chưa làm. Bấm “Nộp bài” lần nữa để nộp.`); setTimeout(() => { const b = $('#tSubmit', root); if (b) delete b.dataset.sure; }, 4000); return; }
    submit();
  };
  function submit() {
    clearInterval(timer);
    const fd = new FormData(form), spent = Math.round((Date.now() - t0) / 1000);
    const per = {}, rows = [];
    for (const q of qs) {
      const key = e.key[q.n], ans = String(fd.get('q' + q.n) || '').trim();
      const ok = key ? (q.t === 'text' ? textOk(ans, key) : ans === key) : null;
      per[q.sec] = per[q.sec] || { ok: 0, n: 0 }; if (key) { per[q.sec].n++; if (ok) per[q.sec].ok++; }
      rows.push({ q, key, ans, ok });
    }
    const secScore = cfg.secs.map(s => ({ s, ...per[s.k], score: per[s.k].n ? Math.round(per[s.k].ok / per[s.k].n * 100) : null }));
    const total = secScore.reduce((t, x) => t + (x.score || 0), 0), max = cfg.secs.length * 100;
    const pass = total >= cfg.pass;
    const prevBest = (e.tries || []).reduce((m, t) => Math.max(m, t.total), -1);
    store.update(st => { const x = st.myExams.find(z => z.id === e.id); if (x) { x.tries = x.tries || []; x.tries.push({ at: Date.now(), total, secs: secScore.map(z => z.score), spent }); x.tries = x.tries.slice(-20); } st.tests.push({ kind: 'exam', level: e.level, score: total, total: max, at: Date.now(), custom: e.id }); });
    logActivity(10);
    $('#tBody', root).hidden = true;
    $('#tRes', root).innerHTML = `<section class="card"><div class="sp-sum"><div class="score-ring" style="--p:${Math.round(total / max * 100)}"><span>${total}</span></div>
        <div><h2>${pass ? '🎉 Đạt' : 'Chưa đạt'} · ${total}/${max} điểm</h2><p class="muted">Cần ${cfg.pass} điểm để đạt · thời gian làm ${Math.floor(spent / 60)} phút ${spent % 60} giây${prevBest >= 0 ? ` · lần cao nhất trước: ${prevBest}` : ''}</p>
        ${secScore.map(x => `<div class="lv-row"><span>${esc(x.s.name)}</span><span class="lv-info"><span>${x.score == null ? 'không có đáp án' : `${x.ok}/${x.n} câu · <b>${x.score}</b>/100`}</span><span class="bar"><i style="width:${x.score || 0}%"></i></span></span></div>`).join('')}
        <div class="row gap wrap" style="margin-top:10px"><a class="btn" href="#/exam/take/${e.id}" id="tAgain">Làm lại</a><a class="btn ghost" href="#/exam">Về danh sách đề</a></div></div></div></section>
      <section class="card"><h2>Đáp án chi tiết</h2><p class="muted small"><span class="me-k ok">đúng</span> <span class="me-k bad">sai</span> <span class="me-k skip">bỏ trống</span> <span class="me-k none">đề chưa có đáp án</span></p>
        ${cfg.secs.map(s => `<h3 class="sub">${esc(s.name)}</h3><div class="me-review">${rows.filter(r => r.q.sec === s.k).map(r => `<div class="me-rv ${r.ok == null ? 'none' : r.ok ? 'ok' : r.ans ? 'bad' : 'skip'} ${r.q.t === 'text' ? 'txt' : ''}" title="Câu ${r.q.n}"><b>${r.q.n}</b><span lang="zh-CN">${esc(r.ans || '–')}</span>${r.ok === false || (r.ok == null && r.key) ? `<i lang="zh-CN">→ ${esc(r.key)}</i>` : r.ok == null ? '<i>?</i>' : ''}</div>`).join('')}</div>`).join('')}
      </section>`;
    $('#tAgain', root).onclick = ev => { ev.preventDefault(); examTake(root, id); };
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  return `Làm đề: ${e.title}`;
}
