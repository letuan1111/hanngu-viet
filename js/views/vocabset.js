// Bộ học từ vựng kiểu Quizlet: Danh sách (5 ví dụ/từ) · Thẻ lật · Học · Kiểm tra · Ghép thẻ · Sao băng · Đúng/Sai
import { store, logActivity } from '../core/store.js';
import { curatedExamples, examplesFor, shuffle, segment } from '../core/dict.js';
import { SPEAK_VOCAB } from '../data/speaking.js';
import { esc, icon, $, $$, say, exampleHtml } from '../core/ui.js';
import { speak, speakSeq } from '../core/tts.js';

const strip = s => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ü/g, 'v').replace(/[^a-z0-9v]/g, '');
const shortVi = vi => (vi || '').split(/[;,]/)[0].trim();
const MODES = [
  ['list', '📋', 'Danh sách'], ['flash', '🃏', 'Thẻ lật'], ['learn', '🎯', 'Học'], ['test', '📝', 'Kiểm tra'],
  ['match', '🧩', 'Ghép thẻ'], ['grav', '☄️', 'Sao băng'], ['tf', '⚡', 'Đúng hay sai'],
];
const ALL = (() => { const m = new Map(); for (const v of Object.values(SPEAK_VOCAB)) for (const [h, p, vi] of v.w) if (!m.has(h)) m.set(h, { h, p, vi }); return [...m.values()]; })();

// 5 câu ví dụ cho một từ (ưu tiên câu chuẩn, thiếu thì lấy từ kho câu)
export function ex5(h, extra = []) {
  const out = [], seen = new Set();
  const add = (zh, vi) => { zh = zh.replace(/^[AB]：/, ''); if (!seen.has(zh)) { seen.add(zh); out.push([zh, vi.replace(/^[AB]: /, '')]); } };
  for (const e of curatedExamples(h)) add(e.zh, e.vi);
  for (const [zh, vi] of extra) if (out.length < 5) add(zh, vi);
  if (out.length < 5) for (const e of examplesFor(h, 10)) if (out.length < 5) add(e.zh, e.vi);
  return out.slice(0, 5);
}
// Khoảng trống cho câu điền từ
function blankOf(zh, h) {
  const toks = segment(zh); const k = toks.findIndex(t => t.t === h);
  if (k >= 0) return toks.map((t, i) => i === k ? '<span class="vs-blank">＿＿</span>' : esc(t.t)).join('');
  const i = zh.indexOf(h); return i < 0 ? null : esc(zh.slice(0, i)) + '<span class="vs-blank">＿＿</span>' + esc(zh.slice(i + h.length));
}

/**
 * @param el     phần tử chứa
 * @param words  [{h,p,vi}]
 * @param o      { id, sent: [[zh,vi]] (câu trong bài), known(), setKnown(h,v), onChange(), onPractice(h) }
 */
export function vocabSet(el, words, o) {
  const ctx = { cleanup: null, key: null, mode: 'flash' };
  const exOf = h => ex5(h, o.sent.filter(([zh]) => zh.includes(h)));
  const best = m => ((store.s.spGame || {})[o.id] || {})[m];
  const setBest = (m, v, lower) => { const b = best(m); if (b == null || (lower ? v < b : v > b)) { store.update(s => { s.spGame = s.spGame || {}; s.spGame[o.id] = s.spGame[o.id] || {}; s.spGame[o.id][m] = v; }); return true; } return false; };
  const distract = (w, key, n = 3) => {
    const pool = shuffle(words.filter(x => x.h !== w.h && x[key] !== w[key]));
    const more = shuffle(ALL.filter(x => x.h !== w.h && x[key] !== w[key] && !pool.includes(x)));
    const seen = new Set([w[key]]), out = [];
    for (const x of [...pool, ...more]) { if (out.length >= n) break; if (!seen.has(x[key])) { seen.add(x[key]); out.push(x); } }
    return out;
  };
  const choices = (w, key) => shuffle([w, ...distract(w, key)]);

  el.innerHTML = `<div class="tabs vs-tabs" role="tablist">${MODES.map(([m, ic, t]) => `<button class="tab" role="tab" data-m="${m}">${ic} ${t}</button>`).join('')}</div><div class="vs-body"></div>`;
  const body = $('.vs-body', el);
  const go = m => {
    if (ctx.cleanup) { ctx.cleanup(); ctx.cleanup = null; }
    ctx.key = null; ctx.mode = m;
    $$('.vs-tabs .tab', el).forEach(b => { b.classList.toggle('on', b.dataset.m === m); b.setAttribute('aria-selected', b.dataset.m === m); });
    if (!words.length) { body.innerHTML = '<p class="muted">Bài này chưa có từ mới.</p>'; return; }
    ({ list, flash, learn, test, match, grav, tf })[m]();
  };
  $('.vs-tabs', el).onclick = e => { const b = e.target.closest('[data-m]'); if (b) go(b.dataset.m); };
  const keyh = e => {
    if (!el.isConnected) { document.removeEventListener('keydown', keyh); ctx.cleanup && ctx.cleanup(); return; }
    if (!ctx.key || e.target.matches('input,textarea,select')) return;
    const r = body.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) return;
    ctx.key(e);
  };
  document.addEventListener('keydown', keyh);
  const changed = () => o.onChange && o.onChange();
  const mark = (h, v) => { o.setKnown(h, v); changed(); };
  const ring = (n, t) => `<div class="score-ring" style="--p:${t ? Math.round(n / t * 100) : 0}"><span>${n}/${t}</span></div>`;

  // ───────── Danh sách + 5 ví dụ ─────────
  function list() {
    const k = o.known();
    body.innerHTML = `<div class="row gap wrap" style="justify-content:space-between;margin-bottom:8px"><span class="muted small">Bấm “5 ví dụ” để xem câu mẫu của từng từ. Mỗi câu đều có pinyin, nghĩa và nút nghe.</span><button class="mini" id="vsAll">Mở tất cả ví dụ</button></div>
      <div class="vs-list">${words.map(w => `<div class="vs-item ${k[w.h] === true ? 'kn' : k[w.h] === false ? 'unk' : ''}" data-h="${esc(w.h)}">
        <div class="vs-row"><span class="t-h vs-h" lang="zh-CN" data-w="${esc(w.h)}">${esc(w.h)}</span><span class="t-p">${esc(w.p)}</span><span class="vs-vi">${esc(w.vi)}</span>
          <span class="vs-act">${say(w.h)}${k[w.h] === true ? '<span class="st ok">✓</span>' : k[w.h] === false ? '<span class="st no">✗</span>' : ''}<button class="mini vs-ex">5 ví dụ ▾</button></span></div>
        <div class="ex-box" hidden></div></div>`).join('')}</div>`;
    const open = (it, on) => { const b = $('.ex-box', it); if (on && !b.innerHTML) b.innerHTML = exOf(it.dataset.h).map(([zh, vi], i) => `<div class="vs-exn">${i + 1}</div>${exampleHtml(zh, vi)}`).join('') + `<button class="mini vs-play5">${icon('vol')} Nghe cả 5 câu</button>`; b.hidden = !on; $('.vs-ex', it).textContent = on ? '5 ví dụ ▴' : '5 ví dụ ▾'; };
    body.onclick = e => {
      const it = e.target.closest('.vs-item');
      if (e.target.closest('#vsAll')) { const on = e.target.textContent.startsWith('Mở'); $$('.vs-item', body).forEach(x => open(x, on)); e.target.textContent = on ? 'Thu gọn tất cả' : 'Mở tất cả ví dụ'; return; }
      if (it && e.target.closest('.vs-ex')) open(it, $('.ex-box', it).hidden);
      if (it && e.target.closest('.vs-play5')) speakSeq(exOf(it.dataset.h).map(([zh]) => ({ text: zh })));
    };
  }

  // ───────── Thẻ lật ─────────
  function flash() {
    body.onclick = null;
    body.innerHTML = `<div class="row gap wrap" style="justify-content:flex-end"><label class="sel">Mặt trước <select id="fcFront"><option value="h">Chữ Hán</option><option value="vi">Nghĩa tiếng Việt</option><option value="au">Nghe âm</option></select></label><label class="chk"><input type="checkbox" id="fcShuf" checked> Trộn thẻ</label></div><div id="fcBox"></div>`;
    let deck = [], i = 0, res = {}, exOpen = false;
    const start = l => { deck = $('#fcShuf', body).checked ? shuffle(l) : [...l]; i = 0; res = {}; draw(); };
    const draw = () => {
      const fb = $('#fcBox', body);
      if (i >= deck.length) return summary();
      const w = deck[i], mode = $('#fcFront', body).value, ex = exOf(w.h);
      const yes = Object.values(res).filter(Boolean).length, no = Object.values(res).filter(r => r === false).length;
      fb.innerHTML = `<div class="ql">
        <div class="ql-top"><span class="ql-no">✗ ${no}</span><span>${i + 1} / ${deck.length}</span><span class="ql-yes">✓ ${yes}</span></div>
        <div class="bar"><i style="width:${i / deck.length * 100}%"></i></div>
        <div class="ql-card" tabindex="0" role="button" aria-label="Bấm để lật thẻ"><div class="ql-inner">
          <div class="ql-face ql-front">${mode === 'vi' ? `<div class="ql-vi">${esc(w.vi)}</div>` : mode === 'au' ? `<div class="ql-au">${icon('vol')}<span>Bấm loa để nghe lại</span></div>` : `<div class="ql-h" lang="zh-CN">${esc(w.h)}</div>`}<div class="ql-hint">Bấm vào thẻ hoặc phím cách để lật</div></div>
          <div class="ql-face ql-back"><div class="ql-h sm" lang="zh-CN">${esc(w.h)}</div><div class="ql-p">${esc(w.p)}</div><div class="ql-vi">${esc(w.vi)}</div>
            ${ex[0] ? `<div class="ql-ex"><div lang="zh-CN">${esc(ex[0][0])}</div><div class="small muted">${esc(ex[0][1])}</div></div>` : ''}</div></div>
          <button class="say ql-say" data-say="${esc(w.h)}" aria-label="Nghe">${icon('vol')}</button></div>
        <div class="ql-btns"><button class="ql-b no" id="qlNo">✗ Chưa thuộc <kbd>←</kbd></button><button class="ql-b yes" id="qlYes">✓ Đã thuộc <kbd>→</kbd></button></div>
        <details class="vs-det" ${exOpen ? 'open' : ''}><summary>📖 5 câu ví dụ với “${esc(w.h)}”</summary><div class="ex-box">${ex.map(([zh, vi]) => exampleHtml(zh, vi)).join('')}</div></details></div>`;
      $('.vs-det', fb).ontoggle = e => { exOpen = e.target.open; };
      if (mode === 'au') speak(w.h);
      const card = $('.ql-card', fb);
      card.onclick = e => { if (e.target.closest('.ql-say')) return; card.classList.toggle('flipped'); if (card.classList.contains('flipped') && mode !== 'au') speak(w.h); };
      const m = ok => { res[w.h] = ok; mark(w.h, ok); i++; logActivity(); draw(); };
      $('#qlNo', fb).onclick = () => m(false); $('#qlYes', fb).onclick = () => m(true);
    };
    const summary = () => {
      const unk = deck.filter(w => res[w.h] === false), ok = deck.length - unk.length;
      $('#fcBox', body).innerHTML = `<div class="ql-sum"><div class="sp-sum">${ring(ok, deck.length)}
        <div><h3>${unk.length ? `Bạn còn ${unk.length} từ chưa thuộc` : 'Tuyệt vời! Bạn đã thuộc hết các từ.'}</h3><p class="muted">${unk.length ? 'Đọc to 5 câu của mỗi từ bên dưới vài lần để nhớ từ trong ngữ cảnh, rồi học lại hoặc chơi trò chơi.' : 'Thử chế độ Kiểm tra hoặc một trò chơi để chắc chắn nhé.'}</p>
        <div class="row gap wrap">${unk.length ? `<button class="btn" id="reUnk">Học lại ${unk.length} từ chưa thuộc</button>` : ''}<button class="btn ghost" id="reAll">Học lại tất cả</button>${unk.length && o.onPractice ? '<button class="btn ghost" id="toMs">Tự đặt câu với từ chưa thuộc</button>' : ''}</div></div></div>
        ${unk.map(w => `<div class="unk-w"><div class="unk-h"><span lang="zh-CN" class="t-h" data-w="${esc(w.h)}">${esc(w.h)}</span> <span class="t-p">${esc(w.p)}</span> – ${esc(w.vi)} ${say(w.h)}</div>
          <div class="muted small">5 câu để học thuộc:</div><div class="ex-box">${exOf(w.h).map(([zh, vi]) => exampleHtml(zh, vi)).join('')}</div></div>`).join('')}</div>`;
      const q = s => $(s, body);
      if (q('#reUnk')) q('#reUnk').onclick = () => start(unk);
      q('#reAll').onclick = () => start(words);
      if (q('#toMs')) q('#toMs').onclick = () => o.onPractice(unk[0].h);
    };
    $('#fcFront', body).onchange = draw;
    $('#fcShuf', body).onchange = () => start(words);
    ctx.key = e => {
      const card = $('.ql-card', body); if (!card) return;
      if (e.code === 'Space') { e.preventDefault(); card.click(); }
      if (e.key === 'ArrowLeft') $('#qlNo', body)?.click();
      if (e.key === 'ArrowRight') $('#qlYes', body)?.click();
    };
    start(words);
  }

  // ───────── Học (trắc nghiệm → đảo chiều → gõ pinyin, câu sai lặp lại) ─────────
  function learn() {
    body.onclick = null;
    const k = o.known();
    const st = new Map(words.map(w => [w.h, 0])); // 0: chọn nghĩa · 1: chọn chữ · 2: gõ pinyin · 3: đã nắm
    let queue = shuffle([...words.filter(w => k[w.h] !== true), ...words.filter(w => k[w.h] === true)]), round = [], wrong = new Set(), timer = null;
    ctx.cleanup = () => clearTimeout(timer);
    const nextRound = () => { round = queue.filter(w => st.get(w.h) < 3).slice(0, 7); };
    nextRound();
    const draw = () => {
      if (!el.isConnected) return;
      const done = [...st.values()].filter(v => v >= 3).length;
      if (done === words.length) return finish();
      if (!round.some(w => st.get(w.h) < 3)) { queue = shuffle(queue); nextRound(); }
      const w = round.find(x => st.get(x.h) < 3); round.push(round.splice(round.indexOf(w), 1)[0]);
      const lv = st.get(w.h);
      const head = `<div class="lr-top"><span>Đã nắm <b>${done}</b>/${words.length}</span><span class="lr-dots">${words.map(x => `<i class="lv${st.get(x.h)}"></i>`).join('')}</span></div><div class="bar"><i style="width:${done / words.length * 100}%"></i></div>`;
      if (lv < 2) {
        const opts = choices(w, lv === 0 ? 'vi' : 'h');
        body.innerHTML = `${head}<div class="qz-q">${lv === 0 ? `<div class="qz-prompt">Chọn nghĩa đúng</div><div class="qz-h" lang="zh-CN">${esc(w.h)}</div> ${say(w.h)}` : `<div class="qz-prompt">Chọn chữ Hán có nghĩa</div><div class="lr-vi">${esc(w.vi)}</div>`}</div>
          <div class="opts">${opts.map((x, i) => `<button class="opt" data-h="${esc(x.h)}"><kbd>${i + 1}</kbd>${lv === 0 ? esc(x.vi) : `<span class="qz-opt-h" lang="zh-CN">${esc(x.h)}</span>`}</button>`).join('')}</div><div class="lr-fb"></div>`;
        if (lv === 0) speak(w.h);
        const pickOpt = b => {
          if ($('.opt:disabled', body)) return;
          $$('.opt', body).forEach(x => { x.disabled = true; if (x.dataset.h === w.h) x.classList.add('ok'); });
          answer(b.dataset.h === w.h, w, b);
        };
        $$('.opt', body).forEach(b => b.onclick = () => pickOpt(b));
        ctx.key = e => { const n = +e.key; if (n >= 1 && n <= 4) { const b = $$('.opt', body)[n - 1]; b && pickOpt(b); } else if (e.key === 'Enter') $('.lr-next', body)?.click(); };
      } else {
        body.innerHTML = `${head}<div class="qz-q"><div class="qz-prompt">Gõ pinyin của từ có nghĩa</div><div class="lr-vi">${esc(w.vi)}</div><div class="muted small">Không cần dấu thanh, ví dụ: nihao · có thể gõ chữ Hán</div></div>
          <form class="lr-type"><input class="inp" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Nhập pinyin…"><button class="btn">Trả lời</button><button type="button" class="btn ghost lr-skip">Không biết</button></form><div class="lr-fb"></div>`;
        const inp = $('input', body); inp.focus();
        $('.lr-type', body).onsubmit = e => { e.preventDefault(); if (inp.disabled) return; const v = inp.value.trim(); if (!v) return; inp.disabled = true; answer(v === w.h || strip(v) === strip(w.p), w, null, v); };
        $('.lr-skip', body).onclick = () => { if (inp.disabled) return; inp.disabled = true; answer(false, w, null, ''); };
        ctx.key = e => { if (e.key === 'Enter') $('.lr-next', body)?.click(); };
      }
    };
    const answer = (ok, w, btn, typed) => {
      const ex = exOf(w.h)[0];
      if (ok) { st.set(w.h, st.get(w.h) + 1); if (st.get(w.h) >= 3 && !wrong.has(w.h)) mark(w.h, true); }
      else { wrong.add(w.h); st.set(w.h, Math.max(0, st.get(w.h) - 1)); btn && btn.classList.add('bad'); }
      $('.lr-fb', body).innerHTML = `<div class="qz-fb ${ok ? 'good' : 'bad'}"><b>${ok ? 'Chính xác!' : typed ? `Chưa đúng – bạn gõ “${esc(typed)}”.` : 'Chưa đúng.'}</b>
        <div><span class="t-h" lang="zh-CN">${esc(w.h)}</span> <span class="t-p">${esc(w.p)}</span> – ${esc(w.vi)} ${say(w.h)}</div>
        ${ex ? `<div class="ex-box">${exampleHtml(ex[0], ex[1])}</div>` : ''}${ok ? '' : '<p class="muted small">Từ này sẽ được hỏi lại.</p>'}</div>
        <div class="qz-nav"><button class="btn lr-next">Tiếp tục <kbd>Enter</kbd></button></div>`;
      $('.lr-next', body).onclick = () => { clearTimeout(timer); draw(); };
      if (ok) { speak(w.h); timer = setTimeout(draw, 1300); }
      logActivity();
    };
    const finish = () => {
      ctx.key = null;
      const bad = words.filter(w => wrong.has(w.h));
      body.innerHTML = `<div class="sp-sum">${ring(words.length - bad.length, words.length)}<div><h3>Bạn đã nắm hết ${words.length} từ!</h3>
        <p class="muted">${bad.length ? `Có ${bad.length} từ bạn từng trả lời sai – xem lại 5 câu ví dụ của chúng bên dưới.` : 'Không sai câu nào. Xuất sắc!'}</p>
        <div class="row gap wrap"><button class="btn" id="lrAgain">Học lại</button><button class="btn ghost" data-go="test">Làm bài kiểm tra</button><button class="btn ghost" data-go="match">Chơi Ghép thẻ</button></div></div></div>
        ${bad.map(w => `<div class="unk-w"><div class="unk-h"><span lang="zh-CN" class="t-h">${esc(w.h)}</span> <span class="t-p">${esc(w.p)}</span> – ${esc(w.vi)} ${say(w.h)}</div><div class="ex-box">${exOf(w.h).map(([zh, vi]) => exampleHtml(zh, vi)).join('')}</div></div>`).join('')}`;
      $('#lrAgain', body).onclick = learn;
      body.onclick = e => { const g = e.target.closest('[data-go]'); if (g) go(g.dataset.go); };
    };
    draw();
  }

  // ───────── Kiểm tra (cả bài trên một trang, nộp rồi chấm) ─────────
  function test() {
    body.onclick = null;
    const n = Math.min(words.length, 20);
    const types = ['mcVi', 'mcH', 'tf', 'listen', 'fill', 'write'];
    const qs = shuffle(words).slice(0, n).map((w, i) => {
      let t = types[i % types.length];
      const ex = exOf(w.h).find(([zh]) => blankOf(zh, w.h));
      if (t === 'fill' && !ex) t = 'mcVi';
      const q = { w, t };
      if (t === 'mcVi') q.opts = choices(w, 'vi');
      if (t === 'mcH' || t === 'listen') q.opts = choices(w, 'h');
      if (t === 'fill') { q.ex = ex; q.opts = choices(w, 'h'); }
      if (t === 'tf') { q.truth = Math.random() < .5; q.shown = q.truth ? w : distract(w, 'vi', 1)[0] || w; if (q.shown === w) q.truth = true; }
      return q;
    });
    const optHtml = (q, i) => `<div class="opts">${q.opts.map(x => `<label class="opt"><input type="radio" name="q${i}" value="${esc(x.h)}"> ${q.t === 'mcVi' ? esc(x.vi) : `<span class="qz-opt-h" lang="zh-CN">${esc(x.h)}</span>`}</label>`).join('')}</div>`;
    body.innerHTML = `<p class="muted small">${n} câu, gồm chọn nghĩa, chọn chữ, đúng/sai, nghe, điền từ vào câu và viết pinyin. Làm xong bấm “Nộp bài”.</p>
      <form class="ts">${qs.map((q, i) => `<div class="ts-q" data-i="${i}"><div class="ts-n">${i + 1}/${n} · ${({ mcVi: 'Chọn nghĩa', mcH: 'Chọn chữ Hán', tf: 'Đúng hay sai', listen: 'Nghe và chọn', fill: 'Điền từ vào câu', write: 'Viết pinyin' })[q.t]}</div>
        ${q.t === 'mcVi' ? `<div class="ts-p"><span class="qz-h" lang="zh-CN">${esc(q.w.h)}</span></div>${optHtml(q, i)}`
        : q.t === 'mcH' ? `<div class="ts-p lr-vi">${esc(q.w.vi)}</div>${optHtml(q, i)}`
        : q.t === 'listen' ? `<div class="ts-p"><button type="button" class="big-say" data-say="${esc(q.w.h)}">${icon('vol')} Nghe</button></div>${optHtml(q, i)}`
        : q.t === 'fill' ? `<div class="ts-p qz-sent" lang="zh-CN">${blankOf(q.ex[0], q.w.h)}</div><div class="muted small">${esc(q.ex[1])}</div>${optHtml(q, i)}`
        : q.t === 'tf' ? `<div class="ts-p"><span class="qz-h" lang="zh-CN">${esc(q.w.h)}</span> = <b>${esc(q.shown.vi)}</b></div><div class="opts tf2"><label class="opt"><input type="radio" name="q${i}" value="1"> ✓ Đúng</label><label class="opt"><input type="radio" name="q${i}" value="0"> ✗ Sai</label></div>`
        : `<div class="ts-p"><span class="qz-h" lang="zh-CN">${esc(q.w.h)}</span> <span class="muted">(${esc(q.w.vi)})</span></div><input class="inp" name="q${i}" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Gõ pinyin (không cần dấu)">`}
        <div class="ts-fb"></div></div>`).join('')}
      <div class="qz-nav"><button class="btn">Nộp bài</button></div></form>`;
    $('.ts', body).onsubmit = e => {
      e.preventDefault();
      const fd = new FormData(e.target); let score = 0; const bad = [];
      qs.forEach((q, i) => {
        const v = (fd.get('q' + i) || '').toString().trim();
        const ok = q.t === 'tf' ? v !== '' && (v === '1') === q.truth : q.t === 'write' ? !!v && (v === q.w.h || strip(v) === strip(q.w.p)) : v === q.w.h;
        if (ok) score++; else bad.push(q.w);
        const qe = $(`.ts-q[data-i="${i}"]`, body); qe.classList.add(ok ? 'ok' : 'bad');
        $$('input', qe).forEach(x => { x.disabled = true; const lab = x.closest('.opt'); if (lab && x.value === q.w.h) lab.classList.add('ok'); if (lab && x.checked && !ok) lab.classList.add('bad'); });
        $('.ts-fb', qe).innerHTML = ok ? '<span class="ok-t">✓ Đúng</span>' : `<span class="bad-t">✗ Đáp án:</span> <span lang="zh-CN" class="t-h">${esc(q.w.h)}</span> <span class="t-p">${esc(q.w.p)}</span> – ${esc(q.w.vi)}${q.t === 'tf' ? ` (câu này ${q.truth ? 'Đúng' : 'Sai'})` : ''}`;
        if (!ok) mark(q.w.h, false);
      });
      $('.qz-nav', body).remove();
      const pct = Math.round(score / qs.length * 100);
      const top = document.createElement('div');
      top.innerHTML = `<div class="sp-sum">${ring(score, qs.length)}<div><h3>${pct >= 90 ? 'Xuất sắc!' : pct >= 70 ? 'Khá lắm!' : 'Cần ôn thêm'} · ${pct}%</h3><p class="muted">${bad.length ? `Các từ làm sai đã được đánh dấu “Chưa thuộc”.` : 'Bạn làm đúng tất cả.'}</p>
        <div class="row gap wrap"><button class="btn" id="tsAgain">Làm bài mới</button>${bad.length ? '<button class="btn ghost" data-go="learn">Học lại từ sai</button>' : ''}</div></div></div>`;
      body.prepend(top); $('#tsAgain', body).onclick = test;
      body.onclick = ev => { const g = ev.target.closest('[data-go]'); if (g) go(g.dataset.go); };
      setBest('test', pct); logActivity(2); top.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
  }

  // ───────── Ghép thẻ (tính giờ) ─────────
  function match() {
    body.onclick = null;
    const seenVi = new Set(), set = shuffle(words).filter(w => { const k = shortVi(w.vi); if (seenVi.has(k)) return false; seenVi.add(k); return true; }).slice(0, 6);
    const tiles = shuffle(set.flatMap(w => [{ h: w.h, side: 'h', txt: w.h }, { h: w.h, side: 'v', txt: shortVi(w.vi) }]));
    let t0 = 0, pen = 0, sel = null, left = set.length, raf = 0, ended = false;
    const b = best('match');
    body.innerHTML = `<div class="mt-top"><span>⏱ <b id="mtT">0.0</b> giây</span><span class="muted small">Ghép chữ Hán với nghĩa. Ghép sai +1 giây.${b != null ? ` Kỷ lục: <b>${b.toFixed(1)}s</b>` : ''}</span></div>
      <div class="mt-grid">${tiles.map((x, i) => `<button class="mt-t ${x.side === 'h' ? 'zh' : ''}" data-i="${i}" ${x.side === 'h' ? 'lang="zh-CN"' : ''}>${esc(x.txt)}</button>`).join('')}</div>`;
    const tick = () => { if (ended || !el.isConnected) return; if (t0) $('#mtT', body).textContent = ((performance.now() - t0) / 1000 + pen).toFixed(1); raf = requestAnimationFrame(tick); };
    ctx.cleanup = () => { ended = true; cancelAnimationFrame(raf); };
    body.onclick = e => {
      const btn = e.target.closest('.mt-t'); if (!btn || btn.classList.contains('gone') || ended) return;
      if (!t0) { t0 = performance.now(); tick(); }
      const x = tiles[btn.dataset.i];
      if (!sel) { sel = btn; btn.classList.add('sel'); if (x.side === 'h') speak(x.h); return; }
      if (sel === btn) { sel.classList.remove('sel'); sel = null; return; }
      const y = tiles[sel.dataset.i];
      if (x.h === y.h && x.side !== y.side) {
        [btn, sel].forEach(z => { z.classList.remove('sel'); z.classList.add('hit'); setTimeout(() => z.classList.add('gone'), 250); });
        sel = null; left--;
        if (!left) {
          ended = true; cancelAnimationFrame(raf);
          const sec = (performance.now() - t0) / 1000 + pen, rec = setBest('match', +sec.toFixed(1), true);
          setTimeout(() => { body.innerHTML = `<div class="game-end"><div class="ge-big">${sec.toFixed(1)}s</div><h3>${rec ? '🏆 Kỷ lục mới!' : 'Hoàn thành!'}</h3><p class="muted">Kỷ lục của bạn: ${best('match').toFixed(1)} giây${pen ? ` · bị cộng ${pen} giây vì ghép sai` : ''}</p>
            <div class="mt-rev">${set.map(w => `<div><span lang="zh-CN" class="t-h">${esc(w.h)}</span> <span class="t-p">${esc(w.p)}</span> – ${esc(w.vi)} ${say(w.h)}</div>`).join('')}</div>
            <button class="btn" id="mtAgain">Chơi lại</button></div>`; $('#mtAgain', body).onclick = match; logActivity(); }, 350);
        }
      } else {
        pen++; [btn, sel].forEach(z => { z.classList.remove('sel'); z.classList.add('miss'); setTimeout(() => z.classList.remove('miss'), 450); }); sel = null;
      }
    };
  }

  // ───────── Sao băng: nghĩa rơi xuống, chọn chữ Hán trước khi chạm đất ─────────
  function grav() {
    body.onclick = null;
    const b = best('grav');
    body.innerHTML = `<div class="game-intro"><h3>☄️ Sao băng</h3><p class="muted">Nghĩa tiếng Việt rơi từ trên xuống. Chọn đúng chữ Hán (phím 1–4) trước khi sao băng chạm đất. Có 3 mạng, càng đúng sao băng rơi càng nhanh.${b != null ? `<br>Kỷ lục: <b>${b}</b> điểm` : ''}</p><button class="btn" id="gvGo">Bắt đầu</button></div>`;
    $('#gvGo', body).onclick = play;
    function play() {
      let score = 0, lives = 3, combo = 0, speed = 9000, raf = 0, ended = false, cur = null, t0 = 0, locked = false, missed = [];
      let bag = [];
      const nextW = () => { if (!bag.length) bag = shuffle(words); return bag.pop(); };
      body.innerHTML = `<div class="gv-hud"><span>Điểm <b id="gvS">0</b></span><span id="gvC" class="gv-combo"></span><span id="gvL">❤️❤️❤️</span></div>
        <div class="gv-area"><div class="gv-met"><span></span></div><div class="gv-ground"></div></div><div class="opts gv-opts"></div>`;
      const area = $('.gv-area', body), met = $('.gv-met', body), optsEl = $('.gv-opts', body);
      ctx.cleanup = () => { ended = true; cancelAnimationFrame(raf); };
      const spawn = () => {
        if (ended) return;
        cur = nextW(); locked = false;
        met.className = 'gv-met'; $('span', met).textContent = shortVi(cur.vi);
        met.style.left = (10 + Math.random() * 50) + '%';
        optsEl.innerHTML = choices(cur, 'h').map((x, i) => `<button class="opt" data-h="${esc(x.h)}"><kbd>${i + 1}</kbd><span class="qz-opt-h" lang="zh-CN">${esc(x.h)}</span></button>`).join('');
        t0 = performance.now(); loop();
      };
      const loop = () => {
        if (ended || !el.isConnected) return;
        const p = (performance.now() - t0) / speed;
        met.style.top = `calc(${Math.min(p, 1)} * (100% - 56px))`;
        if (p >= 1 && !locked) return hit(false, null);
        raf = requestAnimationFrame(loop);
      };
      const hit = (ok, btn) => {
        if (locked) return; locked = true; cancelAnimationFrame(raf);
        $$('.opt', optsEl).forEach(x => { x.disabled = true; if (x.dataset.h === cur.h) x.classList.add('ok'); });
        if (ok) { combo++; score += 10 + Math.min(combo - 1, 10) * 2; speed = Math.max(3200, speed - 350); met.classList.add('boom'); speak(cur.h); }
        else { combo = 0; lives--; btn && btn.classList.add('bad'); met.classList.add('crash'); missed.push(cur); bag.unshift(cur); }
        $('#gvS', body).textContent = score; $('#gvL', body).textContent = '❤️'.repeat(Math.max(lives, 0)) + '🖤'.repeat(3 - Math.max(lives, 0));
        $('#gvC', body).textContent = combo > 1 ? `Chuỗi ×${combo}` : '';
        if (!ok) $('span', met).innerHTML = `<b lang="zh-CN">${esc(cur.h)}</b> ${esc(cur.p)}`;
        setTimeout(() => { if (ended) return; lives <= 0 ? over() : spawn(); }, ok ? 450 : 1400);
      };
      optsEl.onclick = e => { const bt = e.target.closest('.opt'); if (bt && !bt.disabled) hit(bt.dataset.h === cur.h, bt); };
      ctx.key = e => { const n = +e.key; if (n >= 1 && n <= 4) { const bt = $$('.opt', optsEl)[n - 1]; bt && !bt.disabled && hit(bt.dataset.h === cur.h, bt); } };
      const over = () => {
        ended = true; ctx.key = null;
        const rec = score > 0 && setBest('grav', score);
        const uniq = [...new Map(missed.map(w => [w.h, w])).values()];
        uniq.forEach(w => mark(w.h, false));
        body.innerHTML = `<div class="game-end"><div class="ge-big">${score}</div><h3>${rec ? '🏆 Kỷ lục mới!' : 'Hết mạng!'}</h3><p class="muted">Kỷ lục: ${best('grav') ?? 0} điểm</p>
          ${uniq.length ? `<div class="mt-rev"><div class="muted small">Từ bạn để rơi:</div>${uniq.map(w => `<div><span lang="zh-CN" class="t-h">${esc(w.h)}</span> <span class="t-p">${esc(w.p)}</span> – ${esc(w.vi)} ${say(w.h)}</div>`).join('')}</div>` : ''}
          <button class="btn" id="gvAgain">Chơi lại</button></div>`;
        $('#gvAgain', body).onclick = play; logActivity();
      };
      spawn();
    }
  }

  // ───────── Đúng hay sai: 60 giây ─────────
  function tf() {
    body.onclick = null;
    const b = best('tf');
    body.innerHTML = `<div class="game-intro"><h3>⚡ Đúng hay sai</h3><p class="muted">60 giây. Mỗi thẻ ghép một chữ Hán với một nghĩa – bấm Đúng (→) hoặc Sai (←) thật nhanh. Trả lời sai trừ 3 giây.${b != null ? `<br>Kỷ lục: <b>${b}</b> câu đúng` : ''}</p><button class="btn" id="tfGo">Bắt đầu</button></div>`;
    $('#tfGo', body).onclick = play;
    function play() {
      let end = performance.now() + 60000, score = 0, total = 0, ended = false, cur, truth, iv = 0; const mist = [];
      body.innerHTML = `<div class="gv-hud"><span>Đúng <b id="tfS">0</b></span><span id="tfT" class="tf-time">60</span><span class="muted small" id="tfN"></span></div>
        <div class="bar tf-bar"><i id="tfB" style="width:100%"></i></div>
        <div class="tf-card"><div class="qz-h" lang="zh-CN" id="tfH"></div><div class="tf-eq">=</div><div class="lr-vi" id="tfV"></div></div>
        <div class="ql-btns"><button class="ql-b no" id="tfNo">✗ Sai <kbd>←</kbd></button><button class="ql-b yes" id="tfYes">✓ Đúng <kbd>→</kbd></button></div>`;
      ctx.cleanup = () => { ended = true; clearInterval(iv); };
      const next = () => {
        cur = words[Math.random() * words.length | 0]; truth = Math.random() < .5;
        const shown = truth ? cur : (distract(cur, 'vi', 1)[0] || cur); if (shown === cur) truth = true;
        $('#tfH', body).textContent = cur.h; $('#tfV', body).textContent = shortVi(shown.vi); cur._shown = shown;
        const c = $('.tf-card', body); c.classList.remove('ok', 'bad'); void c.offsetWidth;
      };
      const ans = v => {
        if (ended) return; total++;
        const c = $('.tf-card', body);
        if (v === truth) { score++; c.classList.add('ok'); } else { end -= 3000; c.classList.add('bad'); mist.push({ w: cur, shown: cur._shown, truth }); }
        $('#tfS', body).textContent = score; $('#tfN', body).textContent = `${total} thẻ`;
        setTimeout(() => !ended && next(), 160);
      };
      $('#tfNo', body).onclick = () => ans(false); $('#tfYes', body).onclick = () => ans(true);
      ctx.key = e => { if (e.key === 'ArrowLeft') { e.preventDefault(); ans(false); } if (e.key === 'ArrowRight') { e.preventDefault(); ans(true); } };
      iv = setInterval(() => {
        if (!el.isConnected) { ended = true; return clearInterval(iv); }
        const r = Math.max(0, end - performance.now());
        $('#tfT', body).textContent = Math.ceil(r / 1000); $('#tfB', body).style.width = r / 600 + '%';
        if (r <= 0) over();
      }, 100);
      const over = () => {
        ended = true; clearInterval(iv); ctx.key = null;
        const rec = score > 0 && setBest('tf', score);
        body.innerHTML = `<div class="game-end"><div class="ge-big">${score}</div><h3>${rec ? '🏆 Kỷ lục mới!' : 'Hết giờ!'}</h3><p class="muted">${score}/${total} thẻ đúng · Kỷ lục: ${best('tf') ?? 0}</p>
          ${mist.length ? `<div class="mt-rev"><div class="muted small">Thẻ trả lời sai:</div>${mist.map(m => `<div><span lang="zh-CN" class="t-h">${esc(m.w.h)}</span> <span class="t-p">${esc(m.w.p)}</span> – ${esc(m.w.vi)} ${say(m.w.h)} <span class="muted small">(thẻ ghi “${esc(shortVi(m.shown.vi))}” là ${m.truth ? 'Đúng' : 'Sai'})</span></div>`).join('')}</div>` : ''}
          <button class="btn" id="tfAgain">Chơi lại</button></div>`;
        $('#tfAgain', body).onclick = play; logActivity();
      };
      next();
    }
  }

  go('flash');
  return { go };
}
