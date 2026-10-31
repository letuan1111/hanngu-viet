import { store, logActivity } from '../core/store.js';
import { READINGS, GRAMMAR, grammarById, lessonsWithGrammar, shuffle, sentencePinyin } from '../core/dict.js';
import { esc, say, $, $$ } from '../core/ui.js';
import { Q, runQuiz } from '../core/quiz.js';
import { checkSentence, analyse } from '../core/checker.js';
import { grammarBlock } from './course.js';

const plain = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');

export function grammarList(root) {
  const seen = store.s.grammarSeen;
  root.innerHTML = `<div class="page-head"><h1>Ngữ pháp HSK 1–3</h1><div class="row gap"><a class="btn sm ghost" href="#/check">Kiểm tra câu của bạn</a><a class="btn sm ghost" href="#/compare/g2-bi/g3-meiyou">So sánh hai cấu trúc</a></div></div>
  <div class="search-box"><input id="gq" class="inp big" placeholder="Tìm theo tiếng Việt hoặc tiếng Trung, ví dụ: so sánh, 把, sắp…" aria-label="Tìm ngữ pháp"></div>
  <div class="chips" id="gl">${[['0', 'Tất cả'], ['1', 'HSK 1'], ['2', 'HSK 2'], ['3', 'HSK 3'], ['seen', 'Đã học']].map(([k, n], i) => `<button class="chip ${i ? '' : 'on'}" data-k="${k}">${n}</button>`).join('')}</div>
  <div id="glist" class="glist"></div>`;
  let lv = '0';
  const draw = () => {
    const q = plain($('#gq', root).value.trim());
    const gs = GRAMMAR.filter(g => (lv === '0' || (lv === 'seen' ? seen[g.id] : g.level === +lv)) && (!q || plain(g.name + g.formula + g.explain + g.usage + (g.topic || '') + g.ex.map(e => e[0]).join('')).includes(q)));
    $('#glist', root).innerHTML = [1, 2, 3].map(L => { const x = gs.filter(g => g.level === L); return x.length ? `<h3 class="sub">HSK ${L}</h3>${x.map(g => `<a class="grow-row" href="#/grammar/${g.id}"><span class="gname">${seen[g.id] ? '✓ ' : ''}${esc(g.name)}</span><span class="gform" lang="zh-CN">${esc(g.formula)}</span></a>`).join('')}` : ''; }).join('') || '<p class="muted">Không tìm thấy cấu trúc phù hợp.</p>';
  };
  $('#gq', root).oninput = draw;
  $('#gl', root).onclick = e => { const b = e.target.closest('.chip'); if (!b) return; lv = b.dataset.k; $$('#gl .chip', root).forEach(x => x.classList.toggle('on', x === b)); draw(); };
  draw();
  return 'Ngữ pháp';
}

export function grammarExercises(g) {
  const keys = GRAMMAR.map(x => x.key);
  const qs = [];
  g.ex.forEach(e => qs.push(Q.fill(e, g.key, keys)));
  g.ex.forEach(e => qs.push(Q.order({ zh: e[0], vi: e[1] })));
  (g.transform || []).forEach(t => { qs.push(Q.transform(t, 'neg')); qs.push(Q.transform(t, 'q')); });
  return shuffle(qs.filter(Boolean)).slice(0, 8);
}

export function grammarDetail(root, id) {
  const g = grammarById(id); if (!g) { root.innerHTML = '<p>Không có cấu trúc này.</p>'; return; }
  store.update(s => s.grammarSeen[id] = true);
  const cmp = g.compare && grammarById(g.compare[0]);
  const ls = lessonsWithGrammar(id);
  const i = GRAMMAR.indexOf(g), prev = GRAMMAR[i - 1], next = GRAMMAR[i + 1];
  root.innerHTML = `<nav class="crumb"><a href="#/grammar">Ngữ pháp</a> › HSK ${g.level}</nav>
  <div class="gd">
    ${grammarBlock(g, { full: true })}
    <section class="card"><h2>Cách sử dụng</h2><p>${esc(g.usage)}</p>${g.topic ? `<p><b>Chủ đề giao tiếp:</b> ${esc(g.topic)}</p>` : ''}</section>
    ${g.mistakes?.length ? `<section class="card"><h2>Lỗi sai thường gặp</h2>${g.mistakes.map(m => `<div class="mist"><div class="wrong" lang="zh-CN">✗ ${esc(m[0])}</div><div class="right" lang="zh-CN">✓ ${esc(m[1])} ${say(m[1])}</div><div class="muted small">${esc(m[2])}</div></div>`).join('')}</section>` : ''}
    ${cmp ? `<section class="card"><h2>So sánh với cấu trúc tương tự</h2><p><a href="#/grammar/${cmp.id}">${esc(cmp.name)}</a> <span lang="zh-CN" class="muted">${esc(cmp.formula)}</span></p>${g.compare[1] ? `<p>${esc(g.compare[1])}</p>` : ''}<a class="btn sm ghost" href="#/compare/${g.id}/${cmp.id}">Xem so sánh song song</a></section>` : ''}
    <section class="card"><h2>Bài tập áp dụng</h2><p class="muted small">Điền từ, sắp xếp câu${g.transform ? ', biến đổi khẳng định → phủ định → nghi vấn' : ''}.</p><div id="gqz"></div></section>
    <section class="card"><h2>Tự đặt câu</h2><p class="muted small">Đặt một câu dùng cấu trúc này, hệ thống sẽ kiểm tra theo quy tắc.</p>
      <div class="row gap"><input id="own" class="inp grow" lang="zh-CN" placeholder="Ví dụ: ${esc(g.ex[0][0])}"><button class="btn" id="ownb">Kiểm tra</button></div><div id="ownr"></div></section>
    ${READINGS.filter(r => r.g === g.id).map(r => `<section class="card"><h2>Bài đọc luyện cấu trúc này</h2><a class="lk" href="#/reading/${r.id}">${esc(r.t)} ›</a></section>`).join('')}
    ${ls.length ? `<section class="card"><h2>Bài học liên quan</h2>${ls.map(l => `<a class="lk" href="#/lesson/${l.idx}/grammar">HSK ${l.level} · Bài ${l.no}: ${esc(l.t)}</a>`).join('')}</section>` : ''}
    <div class="lesson-nav">${prev ? `<a class="btn ghost" href="#/grammar/${prev.id}">‹ ${esc(prev.name)}</a>` : '<span></span>'}${next ? `<a class="btn ghost" href="#/grammar/${next.id}">${esc(next.name)} ›</a>` : ''}</div>
  </div>`;
  runQuiz($('#gqz', root), grammarExercises(g), { title: g.name });
  const go = () => { const v = $('#own', root).value; $('#ownr', root).innerHTML = checkHtml(v, g); logActivity(); };
  $('#ownb', root).onclick = go; $('#own', root).onkeydown = e => { if (e.key === 'Enter') go(); };
  return g.name;
}

export function checkHtml(v, g) {
  if (!v.trim()) return '';
  const { issues } = checkSentence(v);
  const parts = analyse(v);
  const usesKey = g ? v.includes(g.key) : null;
  return `<div class="check-res">
    ${g ? `<p>${usesKey ? '✅ Câu có dùng' : '⚠️ Câu chưa dùng'} từ khóa <b lang="zh-CN">${esc(g.key)}</b>.</p>` : ''}
    ${issues.length ? `<ul>${issues.map(i => `<li class="${i.info ? 'info' : 'warn'}">${esc(i.msg)} ${i.g ? `<a href="#/grammar/${i.g}">Xem</a>` : ''}</li>`).join('')}</ul>` : '<p class="ok-t">Không phát hiện lỗi phổ biến.</p>'}
    <div class="analyse">${parts.map(p => `<span class="an an-${p.pos}" data-w="${esc(p.t)}"><b lang="zh-CN">${esc(p.t)}</b><small>${esc(p.label)}</small></span>`).join('')}</div>
    <div class="muted small">${esc(sentencePinyin(v))} ${say(v)}</div>
    <p class="muted small">Công cụ kiểm tra theo quy tắc cho các lỗi phổ biến ở HSK 1–3 (không phải AI), nên không bắt được mọi lỗi.</p></div>`;
}

export function grammarCompare(root, a, b) {
  const A = grammarById(a), B = grammarById(b);
  const sel = (id, name) => `<select class="inp" id="${name}">${GRAMMAR.map(g => `<option value="${g.id}" ${g.id === id ? 'selected' : ''}>HSK ${g.level} · ${esc(g.name)}</option>`).join('')}</select>`;
  root.innerHTML = `<nav class="crumb"><a href="#/grammar">Ngữ pháp</a> › So sánh</nav><h1>So sánh hai cấu trúc</h1>
  <div class="cmp-sel">${sel(a, 'ca')}<span>và</span>${sel(b, 'cb')}</div>
  <div class="cmp">${[A, B].map(g => g ? `<div class="cmp-col">${grammarBlock(g, { full: true })}${g.mistakes?.length ? `<div class="mist"><div class="wrong">✗ ${esc(g.mistakes[0][0])}</div><div class="right">✓ ${esc(g.mistakes[0][1])}</div><div class="muted small">${esc(g.mistakes[0][2])}</div></div>` : ''}</div>` : '').join('')}</div>
  ${A?.compare?.[0] === b && A.compare[1] ? `<div class="card note-card"><b>Điểm khác nhau chính:</b> ${esc(A.compare[1])}</div>` : B?.compare?.[0] === a && B.compare[1] ? `<div class="card note-card"><b>Điểm khác nhau chính:</b> ${esc(B.compare[1])}</div>` : ''}`;
  const ch = () => location.hash = `#/compare/${$('#ca', root).value}/${$('#cb', root).value}`;
  $('#ca', root).onchange = ch; $('#cb', root).onchange = ch;
  return 'So sánh ngữ pháp';
}

export function checkerView(root) {
  root.innerHTML = `<h1>Kiểm tra & phân tích câu</h1>
  <p class="muted">Gõ một câu tiếng Trung. Hệ thống tách từ, phân loại từ loại và cảnh báo các lỗi ngữ pháp thường gặp của người Việt ở trình độ HSK 1–3.</p>
  <div class="row gap"><input id="cin" class="inp big grow" lang="zh-CN" placeholder="Ví dụ: 我是很高兴。"><button class="btn" id="cb">Kiểm tra</button></div>
  <div class="chips small">${['我是很高兴。', '他比我很高。', '我工作在医院。', '你叫什么名字吗？', '我有二个哥哥。', '他说汉语说得很好。'].map(x => `<button class="chip" data-try="${x}" lang="zh-CN">${x}</button>`).join('')}</div>
  <div id="cout"></div>`;
  const go = () => { $('#cout', root).innerHTML = checkHtml($('#cin', root).value); };
  $('#cb', root).onclick = go; $('#cin', root).onkeydown = e => { if (e.key === 'Enter') go(); };
  root.onclick = e => { const t = e.target.closest('[data-try]'); if (t) { $('#cin', root).value = t.dataset.try; go(); } };
  return 'Kiểm tra câu';
}
