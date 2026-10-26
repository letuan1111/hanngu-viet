import { store } from '../core/store.js';
import { hskWords, sentenceBank, GRAMMAR, lessonsOf, pick, shuffle } from '../core/dict.js';
import { esc, $, toast } from '../core/ui.js';
import { Q, runQuiz } from '../core/quiz.js';
import { myExamSection, bindMyExamSection } from './myexam.js';

const CFG = { 1: { n: 20, min: 15 }, 2: { n: 25, min: 20 }, 3: { n: 30, min: 25 } };

function examQuestions(lv) {
  const ws = hskWords(lv), pool = [1, 2, 3].filter(x => x <= lv).flatMap(hskWords);
  const bank = sentenceBank().filter(x => x.level <= lv);
  const own = bank.filter(x => x.level === lv);
  const keys = GRAMMAR.map(g => g.key);
  const gs = GRAMMAR.filter(g => g.level === lv);
  const n = CFG[lv].n;
  const listening = [...pick(ws, Math.round(n * 0.2)).map(w => Q.listen(w, ws)), ...pick(own, Math.round(n * 0.2)).map(x => Q.listenSent(x, bank))];
  const reading = [...pick(ws, Math.round(n * 0.15)).map(w => Q.meaning(w, pool)), ...pick(gs, Math.round(n * 0.15)).map(g => Q.fill(pick(g.ex, 1)[0], g.key, keys)), ...pick(own, Math.round(n * 0.1)).map(x => Q.readMeaning(x, bank))];
  const writing = lv >= 2 ? pick(own, 14).map(Q.order).filter(Boolean).slice(0, Math.round(n * 0.2)) : pick(ws, Math.round(n * 0.2)).map(w => Q.hanzi(w, pool));
  const tag = (arr, t) => arr.filter(Boolean).map(q => ({ ...q, tag: `${t} · ${q.tag}` }));
  return [...tag(listening, 'Phần Nghe'), ...tag(reading, 'Phần Đọc'), ...tag(writing, lv >= 2 ? 'Phần Viết' : 'Phần Đọc')].slice(0, n);
}

export function exam(root, lv) {
  const tests = store.s.tests.filter(t => t.kind === 'exam');
  if (!lv) {
    root.innerHTML = `<div class="page-head"><h1>Thi thử HSK</h1></div>
    <p class="muted">Đề mô phỏng cấu trúc HSK (Nghe – Đọc – Viết) với từ vựng và ngữ pháp của từng cấp, có tính giờ. Mỗi lần thi là một đề ngẫu nhiên mới. Cần đạt 60% để đạt.</p>
    <div class="exam-grid">${[1, 2, 3].map(l => { const mine = tests.filter(t => t.level === l && !t.custom); const best = mine.reduce((m, t) => Math.max(m, Math.round(t.score / t.total * 100)), -1);
      return `<div class="card exam-card"><span class="lv-badge lv${l}">HSK ${l}</span><h3>${CFG[l].n} câu · ${CFG[l].min} phút</h3><p class="muted small">${l === 1 ? 'Nghe và Đọc' : 'Nghe, Đọc và Viết (sắp xếp câu)'}</p><p>${best >= 0 ? `Điểm cao nhất: <b>${best}%</b> (${mine.length} lần)` : 'Chưa thi'}</p><a class="btn" href="#/exam/${l}">Bắt đầu thi</a></div>`; }).join('')}</div>
    ${myExamSection()}
    ${tests.length ? `<h3 class="sub">Lịch sử</h3><table class="tbl"><tr><th>Ngày</th><th>Cấp</th><th>Điểm</th></tr>${tests.slice(-10).reverse().map(t => `<tr><td>${new Date(t.at).toLocaleDateString('vi')}</td><td>HSK ${t.level}${t.custom ? ' · đề của bạn' : ''}</td><td>${t.score}/${t.total} (${Math.round(t.score / t.total * 100)}%)</td></tr>`).join('')}</table>` : ''}`;
    bindMyExamSection(root, () => exam(root));
    return 'Thi thử HSK';
  }
  lv = +lv;
  root.innerHTML = `<nav class="crumb"><a href="#/exam">Thi thử</a> › HSK ${lv}</nav><h1>Đề thi thử HSK ${lv}</h1>
    <div class="card note-card" id="intro"><p>${CFG[lv].n} câu trong ${CFG[lv].min} phút. Phần nghe sẽ tự phát âm thanh – hãy bật loa. Hết giờ bài sẽ tự nộp.</p><button class="btn" id="go">Bắt đầu</button></div><div id="ez"></div>`;
  $('#go', root).onclick = () => {
    $('#intro', root).remove();
    runQuiz($('#ez', root), examQuestions(lv), { title: `Thi thử HSK ${lv}`, passPct: 60, timeLimit: CFG[lv].min * 60, onDone: (r, t, pass, res) => {
      store.update(s => s.tests.push({ kind: 'exam', level: lv, score: r, total: t, at: Date.now() }));
      const parts = {}; res.forEach(({ q, ok }) => { const p = q.tag.split(' · ')[0]; parts[p] = parts[p] || [0, 0]; parts[p][1]++; if (ok) parts[p][0]++; });
      $('#ez', root).insertAdjacentHTML('beforeend', `<div class="card"><h3>Kết quả theo phần</h3>${Object.entries(parts).map(([p, [a, b]]) => `<div class="lv-row"><span>${esc(p)}</span><span class="lv-info"><span>${a}/${b}</span><span class="bar"><i style="width:${a / b * 100}%"></i></span></span></div>`).join('')}</div>`);
    } });
  };
  return `Thi thử HSK ${lv}`;
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
