import { store } from '../core/store.js';
import { hskWords, GRAMMAR, lessonsOf, pick } from '../core/dict.js';
import { $, toast } from '../core/ui.js';
import { Q, runQuiz } from '../core/quiz.js';
import { examHome, examGenLevel } from './myexam.js';

export function exam(root, lv) {
  if (lv) { root.innerHTML = '<p class="muted">Đang tạo đề…</p>'; examGenLevel(root, +lv); return 'Thi thử HSK'; }
  examHome(root); return 'Thi thử HSK';
}

export function placement(root) {
  root.innerHTML = `<h1>Kiểm tra trình độ đầu vào</h1>
  <div class="card note-card" id="intro"><p>18 câu (nghe, từ vựng, ngữ pháp) trải đều HSK 1 → 3, mất khoảng 5 phút. Không biết thì cứ chọn đại – kết quả sẽ gợi ý bài nên bắt đầu.</p><button class="btn" id="go">Bắt đầu</button></div><div id="pz"></div>`;
  $('#go', root).onclick = () => {
    $('#intro', root).remove();
    const keys = GRAMMAR.map(g => g.key);
    const qs = [1, 2, 3].flatMap(lv => {
      const ws = hskWords(lv); const gs = GRAMMAR.filter(g => g.level === lv);
      return [...pick(ws, 3).map(w => Q.meaning(w, ws)), Q.listen(pick(ws, 1)[0], ws), ...pick(gs, 2).map(g => Q.fill(pick(g.ex, 1)[0], g.key, keys))].filter(Boolean).map(q => ({ ...q, lv }));
    });
    runQuiz($('#pz', root), qs, { title: 'Kiểm tra đầu vào', review: false, onDone: (r, t, p, res) => {
      const by = { 1: [0, 0], 2: [0, 0], 3: [0, 0] }; res.forEach(({ q, ok }) => { by[q.lv][1]++; if (ok) by[q.lv][0]++; });
      const pct = l => by[l][1] ? by[l][0] / by[l][1] : 0;
      const start = pct(1) < 0.7 ? 1 : pct(2) < 0.7 ? 2 : pct(3) < 0.7 ? 3 : 4;
      const box = document.createElement('div'); box.className = 'card';
      box.innerHTML = `<h3>Kết quả</h3>${[1, 2, 3].map(l => `<div class="lv-row"><span class="lv-badge lv${l}">HSK ${l}</span><span class="lv-info"><span>${by[l][0]}/${by[l][1]}</span><span class="bar"><i style="width:${pct(l) * 100}%"></i></span></span></div>`).join('')}
        <p>${start === 4 ? 'Bạn đã nắm khá vững HSK 1–3! Hãy thử <a href="#/exam/3">đề thi thử HSK 3</a>.' : start === 1 ? 'Gợi ý: bắt đầu từ <b>HSK 1</b>.' : `Gợi ý: bắt đầu từ <b>HSK ${start}</b>.`}</p>
        <div class="row gap wrap">${start <= 3 ? `<a class="btn" href="#/lesson/${lessonsOf(start)[0].idx}">Học bài đầu HSK ${start}</a>` : ''}${start > 1 && start <= 3 ? `<button class="btn ghost" id="skip">Đánh dấu HSK ${[...Array(start - 1)].map((_, i) => i + 1).join(', ')} là đã học</button>` : ''}</div>`;
      $('#pz', root).appendChild(box);
      const sk = $('#skip', box); if (sk) sk.onclick = () => { store.update(s => { for (let l = 1; l < start; l++) for (const x of lessonsOf(l)) s.lessons[x.idx] = { ...(s.lessons[x.idx] || {}), done: true, steps: s.lessons[x.idx]?.steps || {}, skipped: true }; }); toast('Đã cập nhật lộ trình'); sk.remove(); };
    } });
  };
  return 'Kiểm tra đầu vào';
}
