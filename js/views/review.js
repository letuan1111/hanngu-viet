import { store, srsGrade, srsAdd, dueWords, masteryOf } from '../core/store.js';
import { entry, examplesFor, hskWords, shuffle, LESSON_LIST, sentencePinyin } from '../core/dict.js';
import { esc, say, icon, $, $$, short } from '../core/ui.js';
import { speak } from '../core/tts.js';
import { vocabSet } from './vocabset.js';

export function review(root, mode = 'due') {
  const s = store.s;
  const mine = Object.keys(s.srs).sort((a, b) => (s.srs[b].added || 0) - (s.srs[a].added || 0));
  const sets = {
    mine: ['⭐ Từ tôi đã thêm', mine],
    due: ['Đến hạn ôn', dueWords()],
    hard: ['Từ khó', Object.keys(s.hard)],
    saved: ['Từ đã lưu', Object.keys(s.saved)],
    all: ['Tất cả từ đang ôn', Object.keys(s.srs)],
    new: ['Từ mới', newWords(10)],
  };
  const [title, list0] = sets[mode] || sets.due;
  const list = mode === 'mine' ? list0.filter(h => entry(h)) : shuffle(list0.filter(h => entry(h)));
  const counts = Object.fromEntries(Object.entries(sets).map(([k, v]) => [k, v[1].filter(h => entry(h)).length]));
  const mastered = Object.keys(s.srs).filter(h => masteryOf(h) === 3).length;
  root.innerHTML = `<div class="page-head"><h1>Ôn tập thông minh</h1></div>
  <p class="muted">Lặp lại ngắt quãng: từ bạn nhớ tốt sẽ xuất hiện thưa dần, từ hay quên sẽ quay lại sớm. Đã thuộc lâu dài: <b>${mastered}</b> từ.</p>
  <div class="tabs">${Object.entries(sets).map(([k, [n]]) => `<a class="tab ${k === mode ? 'on' : ''}" href="#/review/${k}">${n} <span class="cnt">${counts[k]}</span></a>`).join('')}</div>
  ${mode === 'mine' && list.length ? `<section class="card vs-sec" id="mineQl"><div class="row gap wrap" style="justify-content:space-between;align-items:center"><h2>🃏 Quizlet – học bằng chính các từ bạn đã thêm</h2>
      <label class="sel">Bộ từ <select id="mqG" class="inp sm"><option value="all">Tất cả (${list.length})</option><option value="new">20 từ mới thêm nhất</option><option value="todo">Từ chưa thuộc</option><option value="due">Từ đến hạn ôn</option></select></label></div>
      <p class="muted small">Thẻ lật, Học, Kiểm tra, Ghép thẻ, Sao băng, Đúng hay sai – chỉ dùng các từ & cụm từ bạn tự lưu. Từ đánh dấu ✓ được ghi nhớ trên trình duyệt.</p>
      <div id="mqBox"></div></section>` : ''}
  ${mode === 'mine' ? mineList(list) : ''}
  <div class="row gap wrap fc-modes"><span class="muted small">Kiểu thẻ:</span>${[['zh', 'Chữ Hán → Nghĩa'], ['vi', 'Nghĩa → Chữ Hán'], ['au', 'Nghe → Chữ & nghĩa'], ['mix', 'Trộn']].map(([k, n], i) => `<label class="chk"><input type="radio" name="fm" value="${k}" ${i === 3 ? 'checked' : ''}> ${n}</label>`).join('')}</div>
  <div id="fc"></div>`;
  let i = 0, done = 0;
  const fc = $('#fc', root);
  if (mode === 'mine' && list.length) {
    const mk = () => s.mineKnown || {};
    const pickSet = () => { const v = $('#mqG', root).value, now = Date.now(); const ws = v === 'new' ? list.slice(0, 20) : v === 'todo' ? list.filter(h => !mk()[h]) : v === 'due' ? list.filter(h => s.srs[h] && s.srs[h].due <= now) : list; return ws.map(h => { const w = entry(h); return { h, p: w.p, vi: w.vi }; }); };
    const sent = Object.values(s.myPhrases || {}).filter(x => x.ex).map(x => [x.ex, '']);
    const startQl = () => { const ws = pickSet(); if (!ws.length) { $('#mqBox', root).innerHTML = '<p class="muted">Bộ này chưa có từ nào.</p>'; return; } vocabSet($('#mqBox', root), ws, { id: 'mine', sent, known: () => mk(), setKnown: (h, v) => store.update(st => { st.mineKnown = st.mineKnown || {}; if (v) st.mineKnown[h] = true; else delete st.mineKnown[h]; }) }); };
    $('#mqG', root).onchange = startQl; startQl();
  }
  root.addEventListener('click', e => {
    const d = e.target.closest('[data-unsrs]'); if (!d) return;
    const h = d.dataset.unsrs; if (!confirm(`Bỏ “${h}” khỏi danh sách ôn tập?`)) return;
    store.update(st => { delete st.srs[h]; if (st.myPhrases) delete st.myPhrases[h]; });
    review(root, mode);
  });
  const modeOf = () => { const v = $('input[name=fm]:checked', root).value; return v === 'mix' ? ['zh', 'vi', 'au'][Math.random() * 3 | 0] : v; };
  const draw = () => {
    if (!list.length) { fc.innerHTML = `<div class="empty card"><h3>Không có từ nào ở mục này 🎉</h3><p>${mode === 'due' ? 'Bạn đã ôn hết từ đến hạn. Học thêm từ mới nhé!' : ''}</p><a class="btn" href="#/review/new">Học 10 từ mới</a></div>`; return; }
    if (i >= list.length) { fc.innerHTML = `<div class="empty card"><h3>Hoàn thành ${done} thẻ!</h3><p>Hẹn gặp lại ở lần ôn tiếp theo.</p><div class="row gap center"><a class="btn" href="#/review/due">Ôn từ đến hạn</a><a class="btn ghost" href="#/practice">Luyện tập thêm</a></div></div>`; return; }
    const h = list[i], w = entry(h), m = modeOf();
    const exs = examplesFor(h, 5).filter(e => !/B：/.test(e.zh)); const ex0 = exs[Math.random() * exs.length | 0]; const ex = ex0 && { zh: ex0.zh.replace(/^[AB]：/, ''), vi: ex0.vi.replace(/^[AB]: /, '') };
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

// Danh sách từ / cụm từ người học tự thêm (mới nhất ở trên)
function mineList(list) {
  const s = store.s, now = Date.now(), fmt = t => t ? new Date(t).toLocaleDateString('vi-VN') : '';
  if (!list.length) return `<div class="card note">Chưa có từ nào. Khi đọc bài, bấm vào một từ rồi chọn <b>⭐ Lưu vào ôn tập</b>, bật <b>⚡ Bấm từ là lưu</b>, hoặc bôi đen một cụm từ để lưu – tất cả sẽ hiện ở đây.</div>`;
  return `<section class="card rv-mine"><div class="row gap wrap" style="justify-content:space-between;align-items:center"><h2>⭐ Từ & cụm từ bạn đã thêm <small class="muted">(${list.length})</small></h2><span class="muted small">Mới thêm ở trên · thẻ ôn ở phía dưới</span></div>
    <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Từ</th><th>Pinyin</th><th>Nghĩa</th><th>Trạng thái</th><th></th></tr></thead><tbody>
    ${list.map(h => { const w = entry(h), c = s.srs[h], m = masteryOf(h), ex = s.myPhrases?.[h]?.ex;
      return `<tr><td><b lang="zh-CN" class="tk" data-w="${esc(h)}" style="cursor:pointer">${esc(h)}</b>${w.source === 'mine' ? ' <span class="badge">cụm</span>' : ''}${ex ? `<div class="small muted" lang="zh-CN">${esc(ex)}</div>` : ''}</td><td>${esc(w.p)}</td><td>${esc(short(w.vi))}</td>
        <td class="small">${c.due <= now ? '<span class="bad-t">Đến hạn ôn</span>' : `Ôn lại ${fmt(c.due)}`}<br><span class="muted">${['Mới', 'Đang học', 'Khá nhớ', 'Thuộc lâu'][m]}${c.added ? ' · thêm ' + fmt(c.added) : ''}</span></td>
        <td class="nowrap">${say(h)} <button class="mini" data-unsrs="${esc(h)}" title="Bỏ khỏi ôn tập">🗑️</button></td></tr>`; }).join('')}
    </tbody></table></div></section>`;
}
