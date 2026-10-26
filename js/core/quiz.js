// Bộ sinh câu hỏi và trình chạy bài tập/kiểm tra dùng chung
import { segment, shuffle, pick, sentencePinyin, entry } from './dict.js';
import { esc, say, icon, short, toast } from './ui.js';
import { speak } from './tts.js';
import { srsAdd, srsGrade, logActivity, logSkill } from './store.js';

const opts4 = (right, pool, key, n = 4) => {
  const others = shuffle(pool.filter(x => x[key] !== right[key] && short(x.vi) !== short(right.vi))).slice(0, n - 1);
  const all = shuffle([right, ...others]);
  return { all, ans: all.indexOf(right) };
};

export const Q = {
  meaning(w, pool) { const { all, ans } = opts4(w, pool, 'h'); return { type: 'mc', tag: 'Từ vựng', h: w.h, prompt: `Nghĩa của <span class="qz-h" lang="zh-CN">${esc(w.h)}</span> là gì?`, sub: '', options: all.map(x => esc(short(x.vi))), ans, explain: `${w.h} (${w.p}): ${w.vi}`, audio: w.h }; },
  hanzi(w, pool) { const { all, ans } = opts4(w, pool, 'h'); return { type: 'mc', tag: 'Từ vựng', h: w.h, prompt: `Chọn chữ Hán có nghĩa “${esc(short(w.vi))}”`, options: all.map(x => `<span lang="zh-CN" class="qz-opt-h">${esc(x.h)}</span>`), ans, explain: `${w.h} (${w.p}): ${w.vi}` }; },
  pinyin(w, pool) { const { all, ans } = opts4(w, pool.filter(x => x.p !== w.p), 'h'); return { type: 'mc', tag: 'Pinyin', h: w.h, prompt: `Pinyin đúng của <span class="qz-h" lang="zh-CN">${esc(w.h)}</span>?`, options: all.map(x => esc(x.p)), ans, explain: `${w.h} đọc là ${w.p} – ${w.vi}`, audio: w.h }; },
  listen(w, pool) { const { all, ans } = opts4(w, pool, 'h'); return { type: 'mc', tag: 'Nghe', h: w.h, listen: w.h, prompt: 'Nghe và chọn từ đúng', options: all.map(x => `<span lang="zh-CN" class="qz-opt-h">${esc(x.h)}</span>`), ans, explain: `${w.h} (${w.p}): ${w.vi}` }; },
  listenSent(s, pool) { const others = pick(pool.filter(x => x.zh !== s.zh), 3); const all = shuffle([s, ...others]); return { type: 'mc', tag: 'Nghe hiểu', listen: s.zh, prompt: 'Nghe câu và chọn nghĩa đúng', options: all.map(x => esc(x.vi)), ans: all.indexOf(s), explain: `${s.zh} — ${s.vi}` }; },
  translate(s, pool) { const others = pick(pool.filter(x => x.zh !== s.zh), 3); const all = shuffle([s, ...others]); return { type: 'mc', tag: 'Đọc hiểu', prompt: `Câu nào có nghĩa: “${esc(s.vi)}”?`, options: all.map(x => `<span lang="zh-CN">${esc(x.zh)}</span>`), ans: all.indexOf(s), explain: `${s.zh}\n${sentencePinyin(s.zh)}`, audio: s.zh }; },
  readMeaning(s, pool) { const others = pick(pool.filter(x => x.zh !== s.zh), 3); const all = shuffle([s, ...others]); return { type: 'mc', tag: 'Đọc hiểu', prompt: `<span lang="zh-CN" class="qz-sent">${esc(s.zh)}</span>`, sub: 'Câu trên có nghĩa là gì?', options: all.map(x => esc(x.vi)), ans: all.indexOf(s), explain: `${sentencePinyin(s.zh)}\n${s.vi}`, audio: s.zh }; },
  order(s) {
    const toks = segment(s.zh.replace(/[。！？，、：“”…]/g, ' ').trim()).map(t => t.t.trim()).filter(Boolean);
    if (toks.length < 3 || toks.length > 9) return null;
    return { type: 'order', tag: 'Sắp xếp câu', prompt: 'Sắp xếp các từ thành câu đúng', sub: esc(s.vi), tokens: shuffle(toks.map((t, i) => ({ t, i }))), answer: toks.join(''), full: s.zh, explain: `${s.zh}\n${sentencePinyin(s.zh)}`, audio: s.zh };
  },
  fill(ex, key, keys) {
    if (!ex[0].includes(key)) return null;
    const others = pick([...new Set(keys)].filter(k => k !== key && !k.includes(key) && !key.includes(k) && !ex[0].includes(k)), 3);
    const all = shuffle([key, ...others]);
    return { type: 'mc', tag: 'Ngữ pháp', prompt: `<span lang="zh-CN" class="qz-sent">${esc(ex[0].replace(key, '＿＿'))}</span>`, sub: esc(ex[1]), options: all.map(x => `<span lang="zh-CN">${esc(x)}</span>`), ans: all.indexOf(key), explain: `${ex[0]}\n${sentencePinyin(ex[0])}`, audio: ex[0] };
  },
  transform(t, kind) {
    const [aff, neg, qu] = t; const target = kind === 'neg' ? neg : qu;
    return { type: 'type', tag: 'Biến đổi câu', prompt: `<span lang="zh-CN" class="qz-sent">${esc(aff)}</span>`, sub: kind === 'neg' ? 'Viết lại thành câu PHỦ ĐỊNH (gõ chữ Hán)' : 'Viết lại thành câu NGHI VẤN (gõ chữ Hán)', answers: [target], explain: target, audio: target };
  },
};

const norm = s => s.replace(/[\s。．.！!？?，,、：:“”"]/g, '');

// ── Trình chạy bài tập ──
export function runQuiz(root, questions, { title = 'Bài tập', onDone, passPct = 0, timeLimit = 0, review = true } = {}) {
  questions = questions.filter(Boolean);
  let i = 0, right = 0, answered = false, endAt = timeLimit ? Date.now() + timeLimit * 1000 : 0, tick;
  const wrong = []; const results = [];
  if (!questions.length) { root.innerHTML = '<p class="muted">Chưa đủ dữ liệu để tạo bài tập.</p>'; return; }
  const draw = () => {
    if (i >= questions.length) return finish();
    answered = false;
    const q = questions[i];
    root.innerHTML = `<div class="quiz">
      <div class="qz-top"><span class="tag">${esc(q.tag || '')}</span><span>${i + 1}/${questions.length}</span>${endAt ? '<span class="timer" id="qz-time"></span>' : ''}</div>
      <div class="bar"><i style="width:${(i / questions.length) * 100}%"></i></div>
      <div class="qz-q">${q.listen ? `<button class="big-say" data-say="${esc(q.listen)}">${icon('vol')} Nghe</button>` : ''}<div class="qz-prompt">${q.prompt}</div>${q.sub ? `<div class="qz-sub">${q.sub}</div>` : ''}</div>
      <div class="qz-body"></div>
      <div class="qz-fb" aria-live="polite"></div>
      <div class="qz-nav"><button class="btn" id="qz-next" disabled>Tiếp tục</button></div>
    </div>`;
    const body = root.querySelector('.qz-body');
    if (q.type === 'mc') {
      body.innerHTML = `<div class="opts">${q.options.map((o, k) => `<button class="opt" data-k="${k}"><kbd>${k + 1}</kbd>${o}</button>`).join('')}</div>`;
      body.querySelectorAll('.opt').forEach(b => b.onclick = () => answer(+b.dataset.k === q.ans, b));
    } else if (q.type === 'order') {
      body.innerHTML = `<div class="order-ans" aria-label="Câu của bạn"></div><div class="order-pool">${q.tokens.map((t, k) => `<button class="tok" data-k="${k}" lang="zh-CN">${esc(t.t)}</button>`).join('')}</div><button class="btn sm ghost" id="ord-check">Kiểm tra</button>`;
      const ansEl = body.querySelector('.order-ans'), poolEl = body.querySelector('.order-pool');
      body.addEventListener('click', e => { const b = e.target.closest('.tok'); if (!b || answered) return; (b.parentElement === poolEl ? ansEl : poolEl).appendChild(b); });
      body.querySelector('#ord-check').onclick = () => { const got = [...ansEl.children].map(b => b.textContent).join(''); answer(norm(got) === norm(q.answer), null); };
    } else if (q.type === 'type') {
      body.innerHTML = `<input class="inp big" id="qz-in" lang="zh-CN" placeholder="Gõ câu trả lời…" autocomplete="off"><button class="btn sm ghost" id="ty-check">Kiểm tra</button>`;
      const inp = body.querySelector('#qz-in'); inp.focus();
      const go = () => answer(q.answers.some(a => norm(a) === norm(inp.value)), null);
      body.querySelector('#ty-check').onclick = go; inp.onkeydown = e => { if (e.key === 'Enter') go(); };
    }
    if (q.listen) setTimeout(() => speak(q.listen), 250);
    root.querySelector('#qz-next').onclick = () => { i++; draw(); };
    if (endAt) { clearInterval(tick); const upd = () => { const left = Math.max(0, endAt - Date.now()); const el = root.querySelector('#qz-time'); if (el) el.textContent = `${Math.floor(left / 60000)}:${String(Math.floor(left / 1000) % 60).padStart(2, '0')}`; if (!left) { clearInterval(tick); i = questions.length; finish(); } }; upd(); tick = setInterval(upd, 500); }
  };
  const answer = (ok, btn) => {
    if (answered) return; answered = true;
    const q = questions[i];
    if (ok) right++; else wrong.push(q);
    results.push({ q, ok }); logSkill(q.tag, ok);
    if (q.type === 'mc') root.querySelectorAll('.opt').forEach((b, k) => { b.disabled = true; if (k === q.ans) b.classList.add('ok'); });
    if (btn && !ok) btn.classList.add('bad');
    if (q.h) { if (!ok) srsAdd(q.h); else if (entry(q.h)) srsGrade(q.h, 4); }
    const fb = root.querySelector('.qz-fb');
    fb.className = 'qz-fb ' + (ok ? 'good' : 'bad');
    fb.innerHTML = `<b>${ok ? 'Chính xác!' : 'Chưa đúng.'}</b> ${q.type === 'order' && !ok ? `Đáp án: <span lang="zh-CN">${esc(q.full)}</span>` : ''}<div class="exp">${esc(q.explain || '').replace(/\n/g, '<br>')}</div>${q.audio ? say(q.audio, ' Nghe lại') : ''}`;
    root.querySelector('#qz-next').disabled = false; root.querySelector('#qz-next').focus();
    logActivity();
  };
  const finish = () => {
    clearInterval(tick);
    const pct = Math.round(right / questions.length * 100);
    const pass = pct >= passPct;
    root.innerHTML = `<div class="quiz done">
      <div class="score-ring" style="--p:${pct}"><span>${pct}%</span></div>
      <h3>${esc(title)}: ${right}/${questions.length} câu đúng</h3>
      <p>${passPct ? (pass ? 'Đạt yêu cầu. Làm tốt lắm!' : `Cần đạt ${passPct}% để hoàn thành. Hãy ôn lại và thử lần nữa.`) : (pct >= 80 ? 'Rất tốt!' : pct >= 50 ? 'Khá ổn, ôn thêm một chút nhé.' : 'Hãy ôn lại phần này nhé.')}</p>
      ${review && wrong.length ? `<details class="review"><summary>Xem lại ${wrong.length} câu sai</summary>${wrong.map(q => `<div class="rv"><div>${q.prompt}</div>${q.sub ? `<div class="muted">${q.sub}</div>` : ''}<div class="exp">${esc(q.explain || '').replace(/\n/g, '<br>')}</div></div>`).join('')}</details>` : ''}
      <div class="row gap center"><button class="btn ghost" id="qz-again">Làm lại</button></div>
    </div>`;
    root.querySelector('#qz-again').onclick = () => runQuiz(root, shuffle(questions), { title, onDone, passPct, timeLimit, review });
    onDone && onDone(right, questions.length, pass, results);
    if (pass && passPct) toast('Hoàn thành! 🎉', 'good');
  };
  root.onkeydown = null;
  draw();
  // phím tắt 1-4, Enter
  const keyh = e => {
    if (!root.isConnected) return document.removeEventListener('keydown', keyh);
    if (e.target.matches('input,textarea')) return;
    const n = +e.key; if (n >= 1 && n <= 4) { const b = root.querySelectorAll('.opt')[n - 1]; if (b && !b.disabled) b.click(); }
    if (e.key === 'Enter') { const nx = root.querySelector('#qz-next'); if (nx && !nx.disabled) nx.click(); }
  };
  if (root._keyh) document.removeEventListener('keydown', root._keyh);
  root._keyh = keyh;
  document.addEventListener('keydown', keyh);
}
