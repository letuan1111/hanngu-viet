import { store, srsAdd, logActivity } from '../core/store.js';
import { hsk30List, READINGS, grammarById, POS, TOPICS, IN30, pick, shuffle } from '../core/dict.js';
import { esc, say, sentence, icon, toast, $, $$ } from '../core/ui.js';
import { Q, runQuiz } from '../core/quiz.js';
import { speakSeq, stopSeq } from '../core/tts.js';

const plain = s => (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/\s/g, '');

// ── Bảng 500 từ HSK 1 (chuẩn HSK 3.0) ──
export function hsk500(root) {
  const list = hsk30List();
  const known = () => store.s.known30 || {};
  root.innerHTML = `<nav class="crumb"><a href="#/course/1">HSK 1</a> › Bảng 500 từ</nav>
  <div class="page-head"><div><p class="eyebrow">Chuẩn HSK 3.0 · cấp 1</p><h1>Bảng 500 từ vựng HSK 1</h1></div>
    <div class="row gap wrap"><button class="btn sm" id="learn">${icon('plus')} Học 20 từ chưa thuộc</button><button class="btn sm ghost" id="test">Kiểm tra nhanh</button><a class="btn sm ghost" href="#/reading">Bài đọc theo cấu trúc</a></div></div>
  <p class="muted small">Danh sách cấp 1 theo Tiêu chuẩn trình độ tiếng Trung quốc tế (HSK 3.0, 2021): 500 từ (506 mục do một số từ có biến thể). Bao gồm toàn bộ 150 từ HSK 1 cũ cùng nhiều từ HSK 2–3 cũ. Bấm vào chữ Hán để tra, đánh dấu ✓ những từ đã thuộc.</p>
  <div class="card lv-sum"><div class="grow"><b id="kc"></b><span class="bar"><i id="kb"></i></span></div></div>
  <div class="filters">
    <input id="q30" class="inp" placeholder="Tìm chữ Hán, pinyin hoặc nghĩa…" style="max-width:340px">
    <div class="chips" id="f30">${[['all', 'Tất cả'], ['todo', 'Chưa thuộc'], ['known', 'Đã thuộc'], ['new', 'Mới so với HSK 2.0']].map(([k, n], i) => `<button class="chip ${i ? '' : 'on'}" data-k="${k}">${n}</button>`).join('')}</div>
    <select id="t30" class="inp sm"><option value="">Mọi chủ đề</option>${Object.entries(TOPICS).map(([k, [n]]) => `<option value="${k}">${n}</option>`).join('')}</select>
  </div>
  <div class="tbl-wrap"><table class="tbl t500"><thead><tr><th>#</th><th>Chữ Hán</th><th>Pinyin</th><th>Nghĩa tiếng Việt</th><th class="hide-sm">Từ loại</th><th></th><th title="Đã thuộc">✓</th></tr></thead><tbody id="tb"></tbody></table></div>
  <div class="row gap center" id="pg"></div><div id="qz30"></div>`;
  let filter = 'all', page = 0; const PER = 100;
  const rows = () => {
    const q = plain($('#q30', root).value), tp = $('#t30', root).value, k = known();
    return list.filter(w => (filter === 'all' || (filter === 'known' ? k[w.h] : filter === 'todo' ? !k[w.h] : w.source === 'hsk30'))
      && (!tp || w.topics?.includes(tp)) && (!q || w.h.includes($('#q30', root).value.trim()) || plain(w.p).includes(q) || plain(w.vi).includes(q)));
  };
  const draw = () => {
    const k = known(), all = rows(), n = Object.keys(k).filter(h => IN30.has(h)).length;
    $('#kc', root).textContent = `Đã thuộc ${n}/${list.length} từ`; $('#kb', root).style.width = `${n / list.length * 100}%`;
    const pages = Math.ceil(all.length / PER); page = Math.min(page, Math.max(0, pages - 1));
    $('#tb', root).innerHTML = all.slice(page * PER, page * PER + PER).map(w => `<tr class="${k[w.h] ? 'kn' : ''}">
      <td class="muted">${w.no}</td><td><span class="t-h" lang="zh-CN" data-w="${esc(w.h)}">${esc(w.h)}</span>${w.source === 'hsk30' ? ' <span class="badge hsk30">mới</span>' : ''}</td>
      <td class="t-p">${esc(w.p)}</td><td>${esc(w.vi)}</td><td class="hide-sm muted small">${esc(POS[w.pos] || '')}</td>
      <td>${say(w.h)}</td><td><input type="checkbox" class="kn-box" data-h="${esc(w.h)}" ${k[w.h] ? 'checked' : ''} aria-label="Đã thuộc ${esc(w.h)}"></td></tr>`).join('') || '<tr><td colspan="7" class="muted">Không có từ phù hợp.</td></tr>';
    $('#pg', root).innerHTML = pages > 1 ? [...Array(pages)].map((_, i) => `<button class="chip ${i === page ? 'on' : ''}" data-pg="${i}">${i * PER + 1}–${Math.min(all.length, (i + 1) * PER)}</button>`).join('') : '';
  };
  $('#q30', root).oninput = () => { page = 0; draw(); };
  $('#t30', root).onchange = () => { page = 0; draw(); };
  root.onclick = e => {
    const f = e.target.closest('#f30 .chip'); if (f) { filter = f.dataset.k; page = 0; $$('#f30 .chip', root).forEach(x => x.classList.toggle('on', x === f)); draw(); }
    const p = e.target.closest('[data-pg]'); if (p) { page = +p.dataset.pg; draw(); $('.tbl-wrap', root).scrollIntoView({ behavior: 'smooth' }); }
  };
  root.onchange = e => { const b = e.target.closest('.kn-box'); if (b) { store.update(s => { s.known30 = s.known30 || {}; if (b.checked) s.known30[b.dataset.h] = true; else delete s.known30[b.dataset.h]; }); b.closest('tr').classList.toggle('kn', b.checked); const n = Object.keys(known()).length; $('#kc', root).textContent = `Đã thuộc ${n}/${list.length} từ`; $('#kb', root).style.width = `${n / list.length * 100}%`; logActivity(); } };
  $('#learn', root).onclick = () => { const todo = list.filter(w => !known()[w.h] && !store.s.srs[w.h]).slice(0, 20); todo.forEach(w => srsAdd(w.h)); toast(`Đã thêm ${todo.length} từ vào ôn tập`); location.hash = '#/review/all'; };
  $('#test', root).onclick = () => {
    const src = rows().length >= 10 ? rows() : list;
    runQuiz($('#qz30', root), pick(src, 10).map((w, i) => (i % 3 === 0 ? Q.listen : i % 3 === 1 ? Q.meaning : Q.hanzi)(w, list)), { title: 'Kiểm tra 500 từ', onDone: (r, t, p, res) => {
      store.update(s => { s.known30 = s.known30 || {}; res.forEach(({ q, ok }) => { if (ok && q.h) s.known30[q.h] = true; }); }); draw();
    } });
    $('#qz30', root).scrollIntoView({ behavior: 'smooth' });
  };
  draw();
  return 'Bảng 500 từ HSK 1';
}

// ── Bài đọc theo cấu trúc ngữ pháp ──
export function readings(root, id) {
  const done = store.s.readDone || {};
  if (!id) {
    root.innerHTML = `<nav class="crumb"><a href="#/course/1">HSK 1</a> › Bài đọc</nav>
    <div class="page-head"><div><p class="eyebrow">HSK 1</p><h1>Bài đọc theo cấu trúc ngữ pháp</h1></div><a class="btn sm ghost" href="#/hsk1-500">Bảng 500 từ</a></div>
    <p class="muted">Mỗi bài đọc tập trung vào một cấu trúc ngữ pháp HSK 1, dùng từ vựng trong bảng 500 từ. Đọc, nghe, rồi trả lời câu hỏi đọc hiểu.</p>
    <div class="reading-list">${READINGS.map((r, i) => { const g = grammarById(r.g); return `<a class="lesson-item ${done[r.id] ? 'done' : ''}" href="#/reading/${r.id}"><span class="ln">${done[r.id] ? icon('check') : i + 1}</span><span class="lt"><b>${esc(r.t)}</b><small><span lang="zh-CN">${esc(g?.formula || '')}</span> · ${esc(g?.name || '')}</small></span>${done[r.id] ? `<span class="best">${done[r.id]}%</span>` : ''}</a>`; }).join('')}</div>`;
    return 'Bài đọc HSK 1';
  }
  const i = READINGS.findIndex(r => r.id === id), r = READINGS[i];
  if (!r) { root.innerHTML = '<p>Không có bài đọc này.</p>'; return; }
  const g = grammarById(r.g); const prev = READINGS[i - 1], next = READINGS[i + 1];
  const isDialog = r.p.every(x => /^[A-Z甲乙]：|^[一-鿿]{1,3}：/.test(x[0]));
  root.innerHTML = `<nav class="crumb"><a href="#/reading">Bài đọc HSK 1</a> › ${esc(r.t)}</nav>
  <div class="lesson-head"><div><p class="eyebrow">Bài đọc ${i + 1} · Cấu trúc trọng tâm</p><h1>${esc(r.t)}</h1></div></div>
  <div class="card gfocus"><span class="formula" lang="zh-CN">${esc(g.formula)}</span><div><b><a href="#/grammar/${g.id}">${esc(g.name)}</a></b><p class="small">${esc(g.explain)}</p></div></div>
  <div class="player card"><button class="btn" id="pa">${icon('play')} Nghe cả bài</button><button class="btn ghost" id="ps">${icon('stop')} Dừng</button>
    <label class="chk"><input type="checkbox" id="hv" checked> Ẩn nghĩa tiếng Việt (tự đọc hiểu)</label><label class="chk"><input type="checkbox" id="hk" checked> Tô đậm cấu trúc</label></div>
  <div class="dialog reading-text">${r.p.map(([zh, vi]) => { const m = zh.match(/^([^：]{1,4})：(.*)$/); return m ? sentence(m[2], vi, { speaker: m[1], role: /^(B|阿兰)$/.test(m[1]) ? 1 : 0 }) : sentence(zh, vi); }).join('')}</div>
  <h2 class="sub">Câu hỏi đọc hiểu</h2><div id="rq"></div>
  <div class="lesson-nav">${prev ? `<a class="btn ghost" href="#/reading/${prev.id}">‹ ${esc(prev.t)}</a>` : '<span></span>'}${next ? `<a class="btn" href="#/reading/${next.id}">${esc(next.t)} ›</a>` : ''}</div>`;
  const sents = $$('.reading-text .sent', root);
  const hv = $('#hv', root), hk = $('#hk', root);
  const applyHide = () => sents.forEach(s => s.classList.toggle('hide-vi', hv.checked));
  const applyKey = () => sents.forEach(s => $$('.tk', s).forEach(t => t.classList.toggle('key', hk.checked && [g.key, '没' + g.key, '不' + g.key].includes(t.dataset.w))));
  hv.onchange = applyHide; hk.onchange = applyKey; applyHide(); applyKey();
  $('#pa', root).onclick = () => { logActivity(); speakSeq(sents.map(el => ({ text: el.dataset.zh, role: +el.dataset.role, el, onBoundary: k => $$('.tk', el).forEach(t => t.classList.toggle('hl', k >= +t.dataset.i && k < +t.dataset.i + +t.dataset.n)) })), { onItem: k => sents.forEach((s, j) => s.classList.toggle('now', j === k)) }); };
  $('#ps', root).onclick = stopSeq;
  // câu hỏi đọc hiểu + 2 câu áp dụng cấu trúc
  const qs = r.q.map(([qt, opts, ans]) => { const o = opts.map((x, k) => ({ x, k })); const sh = shuffle(o); return { type: 'mc', tag: 'Đọc hiểu', prompt: esc(qt), options: sh.map(y => esc(y.x)), ans: sh.findIndex(y => y.k === ans), explain: `Đáp án: ${opts[ans]}` }; });
  const withKey = r.p.filter(x => x[0].includes(g.key));
  const keys = ['是', '吗', '呢', '很', '不', '的', '有', '在', '个', '会', '能', '想', '了', '都', '太', '去', '怎么', '没', '号'];
  pick(withKey, 2).forEach(x => { const zh = x[0].replace(/^[^：]{1,4}：/, ''); const fq = Q.fill([zh, x[1]], g.key, keys); if (fq) qs.push(fq); });
  runQuiz($('#rq', root), qs, { title: 'Đọc hiểu', onDone: (a, t) => store.update(s => { s.readDone = s.readDone || {}; s.readDone[r.id] = Math.max(s.readDone[r.id] || 0, Math.round(a / t * 100)); }) });
  return `Bài đọc: ${r.t}`;
}
