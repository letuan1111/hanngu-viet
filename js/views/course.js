import { vocabSet } from './vocabset.js';
import { store, srsAdd, logActivity } from '../core/store.js';
import { HSK30_ORDER, READINGS, LESSON_LIST, lessonsOf, CHAPTERS, entry, grammarById, hskWords, shuffle, pick, segment, TOPICS, POS, sentenceBank, levelLabel } from '../core/dict.js';
import { CURRICULUM } from '../data/lessons.js';
import { GRAMMAR } from '../data/grammar.js';
import { esc, say, sentence, icon, toast, modal, writer, short, $, $$, gridSvg } from '../core/ui.js';
import { speakSeq, stopSeq, listen, SR } from '../core/tts.js';
import { Q, runQuiz } from '../core/quiz.js';
import { checkSentence } from '../core/checker.js';
import { levelProgress } from './home.js';

const STEPS = [['vocab', 'Từ vựng'], ['dialog', 'Hội thoại'], ['grammar', 'Ngữ pháp'], ['exercise', 'Bài tập'], ['test', 'Kiểm tra'], ['practice', 'Thực hành'], ['finish', 'Hoàn thành']];

export function course(root, lv = '1') {
  lv = +lv || 1;
  const s = store.s; const p = levelProgress(lv);
  const chapters = CHAPTERS[lv];
  root.innerHTML = `
  <div class="page-head"><h1>Khóa học HSK ${lv}</h1>
    <div class="tabs">${[1, 2, 3].map(x => `<a class="tab ${x === lv ? 'on' : ''}" href="#/course/${x}">HSK ${x}</a>`).join('')}</div></div>
  <p class="muted small">Chương trình áp dụng: <b>${esc(CURRICULUM.version)}</b>. ${esc(CURRICULUM.note)}</p>
  <div class="card lv-sum"><span class="lv-badge lv${lv}">HSK ${lv}</span><div class="grow"><b>${p.done}/${p.total} bài hoàn thành</b><span class="bar"><i style="width:${p.pct}%"></i></span></div>
    <a class="btn sm" href="#/exam/${lv}">Đánh giá cuối cấp</a></div>
  ${lv === 1 ? `<div class="feature-row">
    <a class="feature" href="#/pinyin"><span class="fi" lang="zh-CN">音</span><span><b>Bài 0 · Luyện phát âm</b><small>Thanh điệu, 23 thanh mẫu, 36 vận mẫu, biến điệu, bảng âm tiết – nên học trước bài 1</small></span></a>
    <a class="feature" href="#/hsk1-500"><span class="fi" lang="zh-CN">五百</span><span><b>Bảng 500 từ HSK 1</b><small>Chuẩn HSK 3.0 · ${HSK30_ORDER[1].filter(h => (s.known30 || {})[h]).length}/506 đã thuộc · tra, nghe, học kiểu Quizlet</small></span></a>
    <a class="feature" href="#/reading"><span class="fi" lang="zh-CN">读</span><span><b>Bài đọc theo cấu trúc</b><small>${READINGS.length} bài · mỗi bài luyện một cấu trúc ngữ pháp HSK 1, có câu hỏi đọc hiểu</small></span></a>
  </div>` : `<div class="feature-row">
    <a class="feature" href="#/hsk30/${lv}"><span class="fi" lang="zh-CN">${lv === 2 ? '二级' : '三级'}</span><span><b>Bảng từ vựng HSK ${lv} (chuẩn 3.0)</b><small>${HSK30_ORDER[lv].length} từ mới của cấp ${lv} · ${HSK30_ORDER[lv].filter(h => (s.known30 || {})[h]).length} đã thuộc · tra, nghe, 5 câu ví dụ, học kiểu Quizlet</small></span></a>
  </div>`}
  ${chapters.map((name, ci) => {
    const ls = LESSON_LIST.filter(l => l.level === lv && l.chapter === ci);
    const best = s.tests.filter(t => t.kind === 'chapter' && t.level === lv && t.ch === ci).reduce((m, t) => Math.max(m, Math.round(t.score / t.total * 100)), -1);
    return `<section class="chapter"><h2><small>Chương ${ci + 1}</small> ${esc(name)}</h2>
      <div class="lesson-list">${ls.map(l => { const st = s.lessons[l.idx] || {}; return `<a class="lesson-item ${st.done ? 'done' : ''}" href="#/lesson/${l.idx}">
        <span class="ln">${st.done ? icon('check') : l.no}</span><span class="lt"><b>${esc(l.t)}</b><small>${TOPICS[l.topic]?.[1] || ''} ${esc(TOPICS[l.topic]?.[0] || '')} · ${l.words.length + l.extra.length} từ · ${l.g.length} ngữ pháp</small></span>
        ${st.best != null ? `<span class="best">${st.best}%</span>` : ''}</a>`; }).join('')}
        <a class="lesson-item test" href="#/chapter/${lv}/${ci}"><span class="ln">✎</span><span class="lt"><b>Kiểm tra tổng kết chương ${ci + 1}</b><small>${best >= 0 ? `Điểm cao nhất: ${best}%` : 'Chưa làm'}</small></span></a>
      </div></section>`;
  }).join('')}`;
  return `HSK ${lv}`;
}

function wordsOf(l) { return [...l.words, ...l.extra].map(entry).filter(Boolean); }
function sentsOf(l) { return l.d.map(d => ({ zh: d[1], vi: d[2] })); }

export function lesson(root, idx, tab = 'vocab') {
  const l = LESSON_LIST[+idx]; if (!l) { root.innerHTML = '<p>Không có bài này.</p>'; return; }
  const s = store.s;
  store.update(s => { s.lessons[l.idx] = s.lessons[l.idx] || { steps: {} }; s.lessons[l.idx].steps[tab] = true; });
  const st = s.lessons[l.idx];
  const prev = LESSON_LIST[l.idx - 1], next = LESSON_LIST[l.idx + 1];
  root.innerHTML = `
  <nav class="crumb"><a href="#/course/${l.level}">HSK ${l.level}</a> › Chương ${l.chapter + 1}: ${esc(CHAPTERS[l.level][l.chapter])}</nav>
  <div class="lesson-head">
    <div><p class="eyebrow">Bài ${l.no} · ${TOPICS[l.topic]?.[1] || ''} ${esc(TOPICS[l.topic]?.[0] || '')}</p><h1>${esc(l.t)}</h1></div>
    ${st.done ? '<span class="done-badge">✓ Đã hoàn thành</span>' : ''}
  </div>
  <div class="steps" role="tablist">${STEPS.map(([k, n], i) => `<a role="tab" class="step ${k === tab ? 'on' : ''} ${st.steps?.[k] ? 'seen' : ''}" href="#/lesson/${l.idx}/${k}"><i>${i + 1}</i>${n}</a>`).join('')}</div>
  <div id="pane"></div>
  <div class="lesson-nav">
    ${prev ? `<a class="btn ghost" href="#/lesson/${prev.idx}">‹ Bài trước</a>` : '<span></span>'}
    ${(() => { const i = STEPS.findIndex(x => x[0] === tab); return i < STEPS.length - 1 ? `<a class="btn" href="#/lesson/${l.idx}/${STEPS[i + 1][0]}">Tiếp: ${STEPS[i + 1][1]} ›</a>` : next ? `<a class="btn" href="#/lesson/${next.idx}">Bài tiếp theo ›</a>` : ''; })()}
  </div>`;
  const pane = $('#pane', root);
  ({ vocab: paneVocab, dialog: paneDialog, grammar: paneGrammar, exercise: paneExercise, test: paneTest, practice: panePractice, finish: paneFinish }[tab] || paneVocab)(pane, l);
  return `HSK ${l.level} · Bài ${l.no}: ${l.t}`;
}

function wordTile(w) {
  return `<div class="wtile" data-w="${esc(w.h)}"><div class="wt-h" lang="zh-CN">${esc(w.h)}</div><div class="wt-p">${esc(w.p)}</div><div class="wt-vi">${esc(short(w.vi))}</div>
    <div class="wt-act no-pop">${say(w.h)}<button class="wbtn" data-write="${esc(w.h)}" title="Luyện viết">${icon('brush')}</button></div></div>`;
}
export function openWriteModal(h) {
  const chars = [...h];
  const m = modal(`<h3>Luyện viết: <span lang="zh-CN">${esc(h)}</span></h3><p class="muted small">Xem thứ tự nét, sau đó tự viết bằng chuột hoặc ngón tay. Nét màu đỏ là bộ thủ.</p>
    <div class="write-row">${chars.map((c, i) => `<div class="wbox"><div class="wgrid">${gridSvg()}<div id="wr${i}" class="wtarget"></div></div>
      <div class="row gap center"><button class="btn sm ghost" data-anim="${i}">${icon('play')} Xem nét</button><button class="btn sm" data-quiz="${i}">${icon('brush')} Tự viết</button></div><div class="wmsg" id="wm${i}"></div></div>`).join('')}</div>`, { wide: true });
  const ws = chars.map((c, i) => writer($(`#wr${i}`, m), c, { size: 180 }));
  m.addEventListener('click', e => {
    const a = e.target.closest('[data-anim]'); if (a) { ws[+a.dataset.anim]?.animateCharacter(); }
    const q = e.target.closest('[data-quiz]');
    if (q) { const i = +q.dataset.quiz, msg = $(`#wm${i}`, m); msg.textContent = 'Hãy viết từng nét theo đúng thứ tự…';
      ws[i]?.quiz({ onComplete: d => { msg.textContent = `Hoàn thành! Số lần sai: ${d.totalMistakes}`; logActivity(); }, onMistake: () => { msg.textContent = 'Sai nét, thử lại – sau 3 lần sẽ có gợi ý.'; } }); }
  });
}
document.addEventListener('click', e => { const b = e.target.closest('[data-write]'); if (b) { e.stopPropagation(); openWriteModal(b.dataset.write); } }, true);

function paneVocab(pane, l) {
  const main = l.words.map(entry).filter(Boolean), extra = l.extra.map(entry).filter(Boolean);
  pane.innerHTML = `<section class="card vs-sec lesson-ql"><h2>🃏 Học từ mới kiểu Quizlet</h2><p class="muted small">Toàn bộ ${main.length + extra.length} từ của bài: danh sách 5 câu ví dụ, thẻ lật, Học, Kiểm tra và trò chơi. Các thẻ từ chi tiết ở bên dưới.</p><div id="lqBox"></div></section>
    <div class="pane-tools"><p class="muted">Bấm vào thẻ để xem chi tiết. Biểu tượng cọ để luyện viết.</p><button class="btn sm" id="addAll">${icon('plus')} Thêm tất cả vào ôn tập</button></div>
    <div class="wgrid-list">${main.map(wordTile).join('')}</div>
    ${extra.length ? `<h3 class="sub">Từ HSK ${l.level} cùng chủ đề <span class="badge">Bổ sung</span></h3><div class="wgrid-list">${extra.map(wordTile).join('')}</div>` : ''}`;
  const qlKey = 'L' + l.idx;
  vocabSet($('#lqBox', pane), [...main, ...extra].map(w => ({ h: w.h, p: w.p, vi: w.vi })), {
    id: qlKey, sent: l.d.map(d => [d[1], d[2]]),
    known: () => (store.s.lessonKnown || {})[qlKey] || {},
    setKnown: (h, v) => store.update(s => { s.lessonKnown = s.lessonKnown || {}; s.lessonKnown[qlKey] = s.lessonKnown[qlKey] || {}; s.lessonKnown[qlKey][h] = v; if (v) { s.known30 = s.known30 || {}; s.known30[h] = true; } }),
  });
  $('#addAll', pane).onclick = () => { [...main, ...extra].forEach(w => srsAdd(w.h)); toast(`Đã thêm ${main.length + extra.length} từ vào ôn tập`); };
}

function paneDialog(pane, l) {
  pane.innerHTML = `<div class="player card">
      <button class="btn" id="playAll">${icon('play')} Nghe cả hội thoại</button>
      <button class="btn ghost" id="stopAll">${icon('stop')} Dừng</button>
      <label class="sel">Tốc độ <select id="rate">${[0.75, 1, 1.25].map(r => `<option value="${r}" ${r === store.s.settings.rate ? 'selected' : ''}>${r}x</option>`).join('')}</select></label>
      <label class="chk"><input type="checkbox" id="loop"> Lặp lại</label>
      <a class="btn sm ghost" href="#/settings">Chế độ hiển thị</a>
    </div>
    <div class="dialog">${l.d.map(([sp, zh, vi]) => sentence(zh, vi, { speaker: sp, role: sp === 'A' ? 0 : 1, extra: `<div class="sent-tools no-pop">${SR ? `<button class="mini" data-shadow="${esc(zh)}">${icon('mic')} Nói theo</button>` : ''}<button class="mini" data-hard="${esc(zh)}">${icon('flag')} Khó nghe</button><span class="shadow-res"></span></div>` })).join('')}</div>`;
  const play = async () => {
    const sents = $$('.sent', pane);
    const rate = +$('#rate', pane).value;
    do {
      await speakSeq(sents.map(el => ({ text: el.dataset.zh, role: +el.dataset.role, el, onBoundary: i => $$('.tk', el).forEach(t => t.classList.toggle('hl', i >= +t.dataset.i && i < +t.dataset.i + +t.dataset.n)) })), { rate, onItem: i => sents.forEach((s, k) => s.classList.toggle('now', k === i)) });
    } while ($('#loop', pane)?.checked && pane.isConnected && playing);
  };
  let playing = false;
  $('#playAll', pane).onclick = () => { playing = true; play(); logActivity(); };
  $('#stopAll', pane).onclick = () => { playing = false; stopSeq(); };
  $('#rate', pane).onchange = e => store.update(s => s.settings.rate = +e.target.value);
  pane.addEventListener('click', async e => {
    const h = e.target.closest('[data-hard]'); if (h) { store.update(s => s.hardAudio.push({ text: h.dataset.hard, at: Date.now() })); toast('Đã đánh dấu câu khó nghe – xem lại trong Luyện nghe'); return; }
    const sh = e.target.closest('[data-shadow]'); if (sh) shadow(sh.dataset.shadow, sh.parentElement.querySelector('.shadow-res'));
  });
}

export async function shadow(target, out) {
  out.innerHTML = '<span class="muted">Đang nghe… hãy đọc to câu này</span>';
  try {
    const res = await listen();
    if (!res.length) { out.innerHTML = '<span class="muted">Không nhận được giọng nói.</span>'; return; }
    const sc = Math.max(...res.map(r => similarity(r, target)));
    const best = res.sort((a, b) => similarity(b, target) - similarity(a, target))[0];
    out.innerHTML = `<span class="score ${sc >= 80 ? 'good' : sc >= 50 ? 'mid' : 'bad'}">${sc}%</span> <span lang="zh-CN">Máy nghe được: ${esc(best)}</span>`;
    logActivity();
  } catch (err) { out.innerHTML = `<span class="bad-t">${esc(err.message)}</span>`; }
}
export function similarity(a, b) {
  a = a.replace(/[^\p{Script=Han}]/gu, ''); b = b.replace(/[^\p{Script=Han}]/gu, '');
  if (!a || !b) return 0;
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return Math.max(0, Math.round((1 - dp[a.length][b.length] / Math.max(a.length, b.length)) * 100));
}

export function grammarBlock(g, { full = false } = {}) {
  return `<article class="gcard"><header><span class="badge">HSK ${g.level}</span><h3><a href="#/grammar/${g.id}">${esc(g.name)}</a></h3></header>
    <div class="formula" lang="zh-CN">${esc(g.formula)}</div>
    <p>${esc(g.explain)}</p>
    <div class="ex-list">${(full ? g.ex : g.ex.slice(0, 3)).map(e => sentence(e[0], e[1])).join('')}</div>
    ${g.limits ? `<p class="note"><b>Lưu ý:</b> ${esc(g.limits)}</p>` : ''}
    ${!full ? `<a class="more" href="#/grammar/${g.id}">Xem đầy đủ, lỗi sai thường gặp và bài tập ›</a>` : ''}
  </article>`;
}
function paneGrammar(pane, l) {
  pane.innerHTML = l.g.map(grammarById).filter(Boolean).map(g => grammarBlock(g)).join('');
}

function exerciseSet(l, n = 12) {
  const words = wordsOf(l); const pool = hskWords(l.level).concat(l.level > 1 ? hskWords(l.level - 1) : []);
  const sents = sentsOf(l); const bank = sentenceBank().filter(x => x.level <= l.level);
  const keys = GRAMMAR.map(g => g.key);
  const qs = [];
  pick(words, 4).forEach(w => qs.push(Q.meaning(w, pool)));
  pick(words, 2).forEach(w => qs.push(Q.pinyin(w, pool)));
  pick(words, 2).forEach(w => qs.push(Q.listen(w, pool)));
  pick(words, 1).forEach(w => qs.push(Q.hanzi(w, pool)));
  pick(sents, 2).forEach(x => qs.push(Q.order(x)));
  pick(sents, 1).forEach(x => qs.push(Q.translate(x, bank)));
  l.g.map(grammarById).forEach(g => { const e = pick(g.ex, 1)[0]; if (e) qs.push(Q.fill(e, g.key, keys)); });
  return shuffle(qs.filter(Boolean)).slice(0, n);
}
function paneExercise(pane, l) {
  pane.innerHTML = '<div id="qz"></div>';
  runQuiz($('#qz', pane), exerciseSet(l, 12), { title: 'Bài tập' });
}
function paneTest(pane, l) {
  const st = store.s.lessons[l.idx];
  pane.innerHTML = `<div class="card note-card"><b>Kiểm tra bài ${l.no}</b> – 10 câu, cần đạt từ 70% để mở khóa hoàn thành bài. ${st.best != null ? `Điểm cao nhất của bạn: <b>${st.best}%</b>` : ''}</div><div id="qz"></div>`;
  runQuiz($('#qz', pane), exerciseSet(l, 10), { title: 'Kiểm tra', passPct: 70, onDone: (r, t) => {
    const pct = Math.round(r / t * 100);
    store.update(s => { const x = s.lessons[l.idx]; x.best = Math.max(x.best ?? 0, pct); if (pct >= 70) x.passed = true; s.tests.push({ kind: 'lesson', level: l.level, idx: l.idx, score: r, total: t, at: Date.now() }); });
  } });
}

function panePractice(pane, l) {
  const words = wordsOf(l);
  const prompts = practicePrompts(l);
  pane.innerHTML = `
  <div class="card mission"><p class="eyebrow">Nhiệm vụ giao tiếp</p><h3>${esc(l.speak)}</h3>
    <p class="muted">Dùng ít nhất 5 từ và 1 cấu trúc ngữ pháp của bài. Gợi ý câu hỏi để tự trả lời:</p>
    <ol class="prompts">${prompts.map(p => `<li>${sentence(p[0], p[1])}</li>`).join('')}</ol>
    ${SR ? `<div class="speak-box"><button class="btn" id="rec">${icon('mic')} Bấm và nói</button><div id="said" class="said"></div></div>` : '<p class="muted small">Trình duyệt này không hỗ trợ nhận dạng giọng nói – hãy nói to rồi tự kiểm tra, hoặc dùng Chrome/Edge.</p>'}
  </div>
  <div class="card mission"><p class="eyebrow">Nhiệm vụ viết</p><h3>${esc(l.write)}</h3>
    <textarea id="wr" class="inp area" lang="zh-CN" rows="5" placeholder="Viết bằng chữ Hán ở đây…">${esc(store.s.journal.filter(j => j.lesson === l.idx).slice(-1)[0]?.text || '')}</textarea>
    <div class="row gap"><button class="btn" id="chk">Kiểm tra bài viết</button><span class="muted small" id="cnt"></span></div>
    <div id="wres"></div>
  </div>
  <div class="card"><b>Từ của bài để sử dụng:</b><div class="chips">${words.map(w => `<span class="chip" data-w="${esc(w.h)}" id="u-${esc(w.h)}">${esc(w.h)}</span>`).join(' ')}</div></div>`;
  const used = text => words.filter(w => text.includes(w.h));
  const mark = text => { $$('.chips .chip', pane).forEach(c => c.classList.toggle('used', text.includes(c.dataset.w))); };
  const ta = $('#wr', pane);
  ta.oninput = () => { $('#cnt', pane).textContent = `${[...ta.value].filter(c => /\p{Script=Han}/u.test(c)).length} chữ Hán · dùng ${used(ta.value).length} từ của bài`; mark(ta.value); };
  ta.oninput();
  $('#chk', pane).onclick = () => {
    const text = ta.value.trim(); if (!text) return;
    const sents = text.split(/(?<=[。！？!?])/).map(x => x.trim()).filter(Boolean);
    const res = sents.map(x => ({ x, ...checkSentence(x) }));
    const u = used(text);
    const gramUsed = l.g.map(grammarById).filter(g => text.includes(g.key));
    $('#wres', pane).innerHTML = `<div class="check-res">
      <p>${u.length >= 5 ? '✅' : '⚠️'} Đã dùng <b>${u.length}</b> từ của bài${u.length < 5 ? ' (mục tiêu: 5)' : ''}. ${gramUsed.length ? `✅ Có dùng cấu trúc: ${gramUsed.map(g => esc(g.name)).join(', ')}.` : '⚠️ Chưa thấy cấu trúc ngữ pháp của bài.'}</p>
      ${res.map(r => `<div class="ck-sent"><div lang="zh-CN">${esc(r.x)} ${say(r.x)}</div>${r.issues.length ? `<ul>${r.issues.map(i => `<li class="${i.info ? 'info' : 'warn'}">${esc(i.msg)} ${i.g ? `<a href="#/grammar/${i.g}">Xem ngữ pháp</a>` : ''}</li>`).join('')}</ul>` : '<div class="ok-t">Không phát hiện lỗi phổ biến.</div>'}</div>`).join('')}
      <p class="muted small">Đây là bộ kiểm tra theo quy tắc, chỉ phát hiện lỗi thường gặp; không thay thế giáo viên.</p></div>`;
    store.update(s => { s.journal.push({ lesson: l.idx, text, at: Date.now() }); s.lessons[l.idx].wrote = true; });
    logActivity(2);
  };
  const rec = $('#rec', pane);
  if (rec) rec.onclick = async () => {
    const out = $('#said', pane); out.innerHTML = '<span class="muted">Đang nghe…</span>';
    try {
      const r = await listen(); const t = r[0] || '';
      const u = used(t);
      out.innerHTML = t ? `<div lang="zh-CN" class="said-t">${esc(t)}</div><div>Bạn đã dùng ${u.length} từ của bài: ${u.map(w => esc(w.h)).join('、') || '—'}</div>` : '<span class="muted">Không nghe rõ, hãy thử lại.</span>';
      if (t) { store.update(s => s.lessons[l.idx].spoke = true); logActivity(2); }
    } catch (e) { out.innerHTML = `<span class="bad-t">${esc(e.message)}</span>`; }
  };
}
function practicePrompts(l) {
  // biến các câu hỏi trong hội thoại thành câu hỏi luyện nói
  const qs = l.d.filter(d => /[？?]$/.test(d[1])).map(d => [d[1], d[2]]);
  return qs.slice(0, 4);
}

function paneFinish(pane, l) {
  const st = store.s.lessons[l.idx];
  const steps = st.steps || {};
  const checks = [
    ['Đã học từ vựng', steps.vocab], ['Đã nghe hội thoại', steps.dialog], ['Đã học ngữ pháp', steps.grammar],
    ['Đạt bài kiểm tra (≥ 70%)', st.passed], ['Đã viết hoặc nói theo chủ đề', st.wrote || st.spoke],
  ];
  const can = st.passed && (st.wrote || st.spoke);
  const next = LESSON_LIST[l.idx + 1];
  pane.innerHTML = `<div class="card finish">
    <h3>Mục tiêu bài học</h3><p>Sau bài này, bạn có thể: <b>${esc(l.speak)}</b></p>
    <ul class="checklist">${checks.map(([t, ok]) => `<li class="${ok ? 'ok' : ''}">${ok ? '✓' : '○'} ${t}</li>`).join('')}</ul>
    ${st.done ? `<p class="ok-t">Bạn đã hoàn thành bài này.</p>` : can ? `<button class="btn" id="fin">Đánh dấu hoàn thành</button>` : `<p class="muted">Hoàn thành bài kiểm tra và nhiệm vụ thực hành để đánh dấu hoàn thành.</p><button class="btn ghost" id="fin">Vẫn đánh dấu hoàn thành</button>`}
    ${next ? `<p><a href="#/lesson/${next.idx}">Bài tiếp theo: HSK ${next.level} · ${esc(next.t)} ›</a></p>` : ''}
  </div>`;
  const b = $('#fin', pane); if (b) b.onclick = () => { store.update(s => { s.lessons[l.idx].done = true; s.lessons[l.idx].at = Date.now(); }); wordsOf(l).forEach(w => srsAdd(w.h)); logActivity(3); toast('Hoàn thành bài học! Từ vựng đã vào danh sách ôn tập.', 'good'); paneFinish(pane, l); };
}

export function chapterTest(root, lv, ch) {
  lv = +lv; ch = +ch;
  const ls = LESSON_LIST.filter(l => l.level === lv && l.chapter === ch);
  root.innerHTML = `<nav class="crumb"><a href="#/course/${lv}">HSK ${lv}</a></nav><h1>Kiểm tra chương ${ch + 1}: ${esc(CHAPTERS[lv][ch])}</h1><p class="muted">15 câu tổng hợp từ ${ls.length} bài. Cần đạt 70%.</p><div id="qz"></div>`;
  const qs = shuffle(ls.flatMap(l => exerciseSet(l, 6))).slice(0, 15);
  runQuiz($('#qz', root), qs, { title: 'Kiểm tra chương', passPct: 70, onDone: (r, t) => store.update(s => s.tests.push({ kind: 'chapter', level: lv, ch, score: r, total: t, at: Date.now() })) });
  return `Kiểm tra chương ${ch + 1} HSK ${lv}`;
}
