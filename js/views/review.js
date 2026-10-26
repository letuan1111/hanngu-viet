import { store, srsGrade, srsAdd, dueWords, masteryOf } from '../core/store.js';
import { entry, examplesFor, hskWords, shuffle, LESSON_LIST, sentencePinyin } from '../core/dict.js';
import { esc, say, icon, $, $$, short } from '../core/ui.js';
import { speak } from '../core/tts.js';

export function review(root, mode = 'due') {
  const s = store.s;
  const sets = {
    due: ['Đến hạn ôn', dueWords()],
    hard: ['Từ khó', Object.keys(s.hard)],
    saved: ['Từ đã lưu', Object.keys(s.saved)],
    all: ['Tất cả từ đang ôn', Object.keys(s.srs)],
    new: ['Từ mới', newWords(10)],
  };
  const [title, list0] = sets[mode] || sets.due;
  const list = shuffle(list0.filter(h => entry(h)));
  const counts = Object.fromEntries(Object.entries(sets).map(([k, v]) => [k, v[1].filter(h => entry(h)).length]));
  const mastered = Object.keys(s.srs).filter(h => masteryOf(h) === 3).length;
  root.innerHTML = `<div class="page-head"><h1>Ôn tập thông minh</h1></div>
  <p class="muted">Lặp lại ngắt quãng: từ bạn nhớ tốt sẽ xuất hiện thưa dần, từ hay quên sẽ quay lại sớm. Đã thuộc lâu dài: <b>${mastered}</b> từ.</p>
  <div class="tabs">${Object.entries(sets).map(([k, [n]]) => `<a class="tab ${k === mode ? 'on' : ''}" href="#/review/${k}">${n} <span class="cnt">${counts[k]}</span></a>`).join('')}</div>
  <div class="row gap wrap fc-modes"><span class="muted small">Kiểu thẻ:</span>${[['zh', 'Chữ Hán → Nghĩa'], ['vi', 'Nghĩa → Chữ Hán'], ['au', 'Nghe → Chữ & nghĩa'], ['mix', 'Trộn']].map(([k, n], i) => `<label class="chk"><input type="radio" name="fm" value="${k}" ${i === 3 ? 'checked' : ''}> ${n}</label>`).join('')}</div>
  <div id="fc"></div>`;
  let i = 0, done = 0;
  const fc = $('#fc', root);
  const modeOf = () => { const v = $('input[name=fm]:checked', root).value; return v === 'mix' ? ['zh', 'vi', 'au'][Math.random() * 3 | 0] : v; };
  const draw = () => {
    if (!list.length) { fc.innerHTML = `<div class="empty card"><h3>Không có từ nào ở mục này 🎉</h3><p>${mode === 'due' ? 'Bạn đã ôn hết từ đến hạn. Học thêm từ mới nhé!' : ''}</p><a class="btn" href="#/review/new">Học 10 từ mới</a></div>`; return; }
    if (i >= list.length) { fc.innerHTML = `<div class="empty card"><h3>Hoàn thành ${done} thẻ!</h3><p>Hẹn gặp lại ở lần ôn tiếp theo.</p><div class="row gap center"><a class="btn" href="#/review/due">Ôn từ đến hạn</a><a class="btn ghost" href="#/practice">Luyện tập thêm</a></div></div>`; return; }
    const h = list[i], w = entry(h), m = modeOf();
    const ex = examplesFor(h, 1)[0];
    const front = m === 'zh' ? `<div class="fc-h" lang="zh-CN">${esc(h)}</div>` : m === 'vi' ? `<div class="fc-vi">${esc(w.vi)}</div><div class="muted small">${esc(w.pos ? '' : '')}</div>` : `<button class="big-say" data-say="${esc(h)}">${icon('vol')} Nghe lại</button>`;
    fc.innerHTML = `<div class="flash">
      <div class="fc-top"><span>${i + 1}/${list.length}</span><span class="bar"><i style="width:${i / list.length * 100}%"></i></span></div>
      <div class="fc-card" id="card" tabindex="0">
        <div class="fc-front">${front}<p class="muted small">Nhớ lại rồi bấm “Lật thẻ” (phím cách)</p></div>
        <div class="fc-back" hidden>
          <div class="fc-h" lang="zh-CN" data-w="${esc(h)}">${esc(h)}</div><div class="fc-p">${esc(w.p)}</div><div class="fc-vi">${esc(w.vi)}</div>
          ${say(h)}
          ${ex ? `<div class="fc-ex"><div lang="zh-CN">${esc(ex.zh)} ${say(ex.zh)}</div><div class="muted small">${esc(sentencePinyin(ex.zh))}</div><div class="small">${esc(ex.vi)}</div></div>` : ''}
          <a class="small" href="#/word/${encodeURIComponent(h)}">Chi tiết từ ›</a>
        </div>
      </div>
      <div class="fc-btns"><button class="btn" id="flip">Lật thẻ</button></div>
      <div class="fc-grade" hidden>
        <button class="g g0" data-q="0">Quên<small>&lt; 10 phút</small></button>
        <button class="g g3" data-q="3">Khó<small>${nextIv(h, 3)}</small></button>
        <button class="g g4" data-q="4">Nhớ<small>${nextIv(h, 4)}</small></button>
        <button class="g g5" data-q="5">Dễ<small>${nextIv(h, 5)}</small></button>
      </div></div>`;
    if (m === 'au') speak(h);
    const flip = () => { $('.fc-back', fc).hidden = false; $('.fc-btns', fc).hidden = true; $('.fc-grade', fc).hidden = false; if (m !== 'au') speak(h); };
    $('#flip', fc).onclick = flip;
    $$('.g', fc).forEach(b => b.onclick = () => { srsGrade(h, +b.dataset.q); if (+b.dataset.q === 0) list.push(h); i++; done++; draw(); });
    fc.onkeydown = null;
  };
  const key = e => {
    if (!fc.isConnected) return document.removeEventListener('keydown', key);
    if (e.target.matches('input,textarea')) return;
    if (e.code === 'Space') { e.preventDefault(); $('#flip', fc)?.click(); }
    const map = { 1: 0, 2: 3, 3: 4, 4: 5 }; if (e.key in map && !$('.fc-grade', fc)?.hidden) $(`.g[data-q="${map[e.key]}"]`, fc)?.click();
  };
  document.addEventListener('keydown', key);
  if (mode === 'new') list.forEach(h => srsAdd(h));
  draw();
  return 'Ôn tập';
}
function nextIv(h, q) {
  const c = store.s.srs[h] || { ef: 2.5, iv: 0, reps: 0 };
  let iv = c.reps === 0 ? 1 : c.reps === 1 ? 3 : Math.round(c.iv * c.ef);
  if (q === 3) iv = Math.max(1, Math.round(iv * 0.6)); if (q === 5) iv = Math.round(iv * 1.3) || 2;
  return iv >= 30 ? `${Math.round(iv / 30)} tháng` : `${iv} ngày`;
}
function newWords(n) {
  const s = store.s;
  for (const l of LESSON_LIST) { const ws = [...l.words, ...l.extra].filter(h => !s.srs[h] && entry(h)); if (ws.length) return ws.slice(0, n); }
  return [];
}
