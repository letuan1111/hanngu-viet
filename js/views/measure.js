// Danh sách lượng từ (量词): lọc theo cấp, tìm kiếm, nghe, ví dụ bấm được từng từ, luyện chọn lượng từ đúng
import { store, logActivity } from '../core/store.js';
import { keepState, takeState } from '../core/nav.js';
import { sentencePinyin, shuffle } from '../core/dict.js';
import { esc, say, sentence, $, $$ } from '../core/ui.js';
import { speak } from '../core/tts.js';
import { MEASURES } from '../data/measure.js';

const strip = s => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
// pinyin của cụm 一 + lượng từ (+ danh từ): ghép từng phần để không bị tách sai (一个人 → yí gè rén), có biến điệu của 一
const yi = p => (/[àèìòùǜ]/.test(p) ? 'yí' : 'yì');
const phrasePy = (m, n) => m.k === 'v' ? `${sentencePinyin(n)} ${yi(m.p)} ${m.p}` : `${yi(m.p)} ${m.p} ${sentencePinyin(n)}`;
const LV = { 1: 'HSK 1', 2: 'HSK 2', 3: 'HSK 3', 4: 'Mở rộng' };
const FILTERS = [['all', 'Tất cả'], ['1', 'HSK 1'], ['2', 'HSK 2'], ['3', 'HSK 3'], ['4', 'Mở rộng'], ['v', 'Động lượng từ (đếm số lần)']];

export function measureList(root) {
  root.innerHTML = `<nav class="crumb"><a href="#/vocab">Từ vựng</a> › Lượng từ</nav>
  <div class="page-head"><div><p class="eyebrow">量词 · liàngcí</p><h1>Danh sách lượng từ</h1></div><button class="btn sm" id="mwQuizBtn">🎯 Luyện chọn lượng từ</button></div>
  <section class="card mw-rule">
    <h2>📐 Cách dùng</h2>
    <ul>
      <li><b>Số / 这 / 那 / 哪 / 几 + lượng từ + danh từ</b>: <span lang="zh-CN">三<b>本</b>书</span> (ba quyển sách), <span lang="zh-CN">这<b>件</b>衣服</span> (chiếc áo này). Tiếng Trung không đếm thẳng “三书”.</li>
      <li>Trước lượng từ, số 2 dùng <b lang="zh-CN">两</b>, không dùng 二: <span lang="zh-CN">两个人</span>, không nói <s lang="zh-CN">二个人</s>.</li>
      <li>Không nhớ lượng từ riêng thì có thể tạm dùng <b lang="zh-CN">个</b>; trong bài thi và văn viết nên dùng đúng lượng từ.</li>
      <li><b>Động lượng từ</b> đếm số lần của hành động, đứng sau động từ: <span lang="zh-CN">去过两<b>次</b></span> (đã đi hai lần), <span lang="zh-CN">再说一<b>遍</b></span> (nói lại một lượt).</li>
    </ul>
  </section>
  <div id="mwQuiz"></div>
  <div class="search-box"><input id="mwQ" class="inp big" placeholder="Tìm lượng từ, pinyin, nghĩa hoặc danh từ đi kèm (vd: 书, xe, tiao)…" autocomplete="off" aria-label="Tìm lượng từ"></div>
  <div class="chips" id="mwLv">${FILTERS.map(([k, n]) => `<button class="chip" data-k="${k}">${n}</button>`).join('')}</div>
  <div class="muted small" id="mwCnt"></div>
  <div class="mw-grid" id="mwList"></div>`;
  let lv = 'all';
  const st0 = takeState();
  if (st0) { lv = st0.lv || 'all'; $('#mwQ', root).value = st0.q || ''; }
  keepState(() => ({ lv, q: $('#mwQ', root).value }));
  const draw = () => {
    $$('#mwLv .chip', root).forEach(c => c.classList.toggle('on', c.dataset.k === lv));
    const q = strip($('#mwQ', root).value.trim());
    const list = MEASURES.filter(m => (lv === 'all' || (lv === 'v' ? m.k === 'v' : m.lv === +lv)) &&
      (!q || [m.h, m.p, m.use, ...m.nouns].some(x => strip(x).replace(/\s/g, '').includes(q.replace(/\s/g, '')))));
    $('#mwCnt', root).textContent = `${list.length} lượng từ`;
    $('#mwList', root).innerHTML = list.map(card).join('') || '<p class="muted">Không tìm thấy lượng từ phù hợp.</p>';
  };
  $('#mwLv', root).onclick = e => { const c = e.target.closest('[data-k]'); if (!c) return; lv = c.dataset.k; draw(); };
  $('#mwQ', root).oninput = draw;
  $('#mwList', root).addEventListener('click', e => { const n = e.target.closest('.mw-n'); if (n) speak(n.dataset.say); });
  $('#mwQuizBtn', root).onclick = () => quiz($('#mwQuiz', root));
  draw();
  return 'Lượng từ';
}

function card(m) {
  const phrase = n => (m.k === 'v' ? `${n}一${m.h}` : `一${m.h}${n}`);
  return `<article class="card mw-card" data-h="${esc(m.h)}">
    <div class="mw-top"><span class="mw-h" lang="zh-CN">${esc(m.h)}</span><span class="mw-p">${esc(m.p)}</span>${say(m.h)}<span class="grow"></span><span class="badge">${LV[m.lv]}</span>${m.k === 'v' ? '<span class="badge">Động lượng từ</span>' : ''}</div>
    <div class="mw-use">Dùng cho: <b>${esc(m.use)}</b></div>
    ${m.nouns.length ? `<div class="mw-ns">${m.nouns.map(n => { const ph = phrase(n); return `<button class="mw-n" data-say="${esc(ph)}" title="Bấm để nghe"><span lang="zh-CN">${esc(ph)}</span><small>${esc(phrasePy(m, n))}</small></button>`; }).join('')}</div>` : ''}
    ${sentence(m.ex, m.exVi)}
  </article>`;
}

// Luyện tập: cho danh từ, chọn lượng từ đúng (đáp án nhiễu không được là lượng từ hợp lệ cho danh từ đó)
function quiz(box) {
  const ok = {}; MEASURES.forEach(m => m.nouns.forEach(n => { (ok[n] = ok[n] || new Set()).add(m.h); }));
  const pool = MEASURES.filter(m => m.k === 'd' && m.nouns.length && m.h !== '个' && m.h !== '些');
  const qs = shuffle(pool).slice(0, 10).map(m => {
    const n = shuffle(m.nouns)[0];
    const wrong = shuffle(MEASURES.filter(x => x.k === 'd' && !ok[n].has(x.h) && x.h !== '些')).slice(0, 3).map(x => x.h);
    return { n, m, opts: shuffle([m.h, ...wrong]) };
  });
  let i = 0, score = 0;
  const show = () => {
    if (i >= qs.length) {
      const best = Math.max(store.s.mwBest || 0, score);
      store.update(s => { s.mwBest = best; }); logActivity(2);
      box.innerHTML = `<section class="card mw-qz"><h2>🎯 Kết quả: ${score}/${qs.length}</h2><p class="muted">Điểm cao nhất của bạn: <b>${best}/${qs.length}</b></p><div class="row gap"><button class="btn" id="mwAgain">↺ Làm bộ khác</button><button class="btn ghost" id="mwClose">Đóng</button></div></section>`;
      $('#mwAgain', box).onclick = () => quiz(box); $('#mwClose', box).onclick = () => { box.innerHTML = ''; };
      return;
    }
    const q = qs[i];
    box.innerHTML = `<section class="card mw-qz"><div class="row gap wrap" style="justify-content:space-between"><h2>🎯 Chọn lượng từ đúng</h2><span class="muted">Câu ${i + 1}/${qs.length} · đúng ${score}</span></div>
      <div class="mw-qq" lang="zh-CN">一 <span class="mw-blank">？</span> ${esc(q.n)} <small>${esc(sentencePinyin(q.n))}</small></div>
      <div class="mw-opts">${q.opts.map(o => `<button class="btn ghost mw-o" data-o="${esc(o)}" lang="zh-CN">${esc(o)}</button>`).join('')}</div>
      <div class="mw-fb small"></div><button class="btn ghost sm" id="mwClose">Đóng</button></section>`;
    $('#mwClose', box).onclick = () => { box.innerHTML = ''; };
    let done = false;
    $('.mw-opts', box).onclick = e => {
      const b = e.target.closest('.mw-o'); if (!b || done) return; done = true;
      const right = ok[q.n].has(b.dataset.o); if (right) score++;
      $$('.mw-o', box).forEach(x => { if (ok[q.n].has(x.dataset.o)) x.classList.add('good'); else if (x === b) x.classList.add('bad'); x.disabled = true; });
      $('.mw-blank', box).textContent = right ? b.dataset.o : q.m.h;
      speak(`一${right ? b.dataset.o : q.m.h}${q.n}`);
      $('.mw-fb', box).innerHTML = `${right ? '<span class="ok-t">✓ Đúng rồi!</span>' : '<span class="bad-t">✗ Chưa đúng.</span>'} <b lang="zh-CN">${esc(q.m.h)}</b> (${esc(q.m.p)}) dùng cho ${esc(q.m.use)}. <button class="btn sm" id="mwNext">${i + 1 < qs.length ? 'Câu tiếp ›' : 'Xem kết quả'}</button>`;
      $('#mwNext', box).onclick = () => { i++; show(); };
    };
  };
  show();
  box.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
