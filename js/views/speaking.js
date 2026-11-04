// Luyện nói theo chủ đề: bài nói mẫu 3 cột (Tiếng Trung – Tiếng Việt – Pinyin), bật/tắt pinyin & nghĩa, nghe mẫu, ghi âm và chấm từng chữ
import { store, logActivity } from '../core/store.js';
import { SPEAK_GROUPS, SPEAK_ITEMS, SPEAK_VOCAB, SPEAK_STRUCT, SPEAK_FOCUS, SPEAK_INTRO } from '../data/speaking.js';
import { segment, charPinyins, isHan, sentencePinyin, grammarById } from '../core/dict.js';
import { esc, icon, $, $$, toast, applyDisplay, say, sentence, zhTokens, recAudio } from '../core/ui.js';
import { vocabSet } from './vocabset.js';
import { typingTrainer, splitSentences } from './typing.js';
import { AI_DEFAULT, aiModelOptions, aiPreload, aiLong, toPcm16k, recordVoice, onAIStatus } from '../core/ai.js';
import { speak, speakSeq, stopSeq, SR } from '../core/tts.js';

const FONTS = [['kai', 'Khải thư 楷体 (chuẩn sách giáo khoa)'], ['song', 'Tống thể 宋体 (chữ in)'], ['hei', 'Hắc thể 黑体 (không chân)']];
const strip = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ü/g, 'v');

// ── Danh sách chủ đề ──
export const NUM = ['①', '②', '③', '④', '⑤', '⑥'];
export const structById = id => SPEAK_STRUCT.find(t => t.id === id);
export const focusOf = id => SPEAK_FOCUS.find(f => f.qs.includes(id));
export function speakingList(root) {
  const best = store.s.speakBest2 || {};
  root.innerHTML = `<div class="page-head"><div><h1>Luyện nói theo chủ đề</h1></div></div>
  <p class="muted">${esc(SPEAK_INTRO)} Đọc với pinyin và nghĩa tiếng Việt, tắt dần khi đã quen, nghe giọng mẫu, rồi ghi âm để máy chấm từng chữ. </p>
  <section class="card sp-focus"><h2>🧭 Học theo nhóm cấu trúc – không cần thuộc từng câu riêng lẻ</h2>
    <p class="muted small">${SPEAK_ITEMS.length} chủ đề có tổng cộng ${SPEAK_ITEMS.reduce((a, x) => a + x.s.length, 0)} câu mẫu, nhưng nhiều câu dùng lại cùng cấu trúc. Hãy học theo nhóm:</p>
    <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Nhóm</th><th>Câu hỏi</th><th>Cấu trúc trọng tâm</th></tr></thead><tbody>
    ${SPEAK_FOCUS.map(f => `<tr><td><b>${esc(f.name)}</b></td><td>${f.qs.map(q => `<a href="#/speaking/${q}">${q}</a>`).join(', ')}</td><td lang="zh-CN">${f.ids.map(id => { const t = structById(id); return `<span class="chip sm" title="${esc(t.vi)}">${esc(t.f)}</span>`; }).join(' ')}</td></tr>`).join('')}
    </tbody></table></div></section>
  ${SPEAK_GROUPS.map(([g, name, ic]) => { const items = SPEAK_ITEMS.filter(x => x.g === g); return `<section class="chapter"><h2 class="grp-h">${ic} Nhóm ${g} – ${esc(name)} <span class="grp-n">${items.length} bài</span></h2>
    <div class="lesson-list">${items.map(x => `<a class="lesson-item ${best[x.id] >= 80 ? 'done' : ''}" href="#/speaking/${x.id}"><span class="ln">${best[x.id] >= 80 ? icon('check') : x.id}</span><span class="lt"><b lang="zh-CN" class="sp-q">${esc(x.q)}</b><small>${esc(x.qvi)}</small></span>${best[x.id] != null ? `<span class="best">${best[x.id]}%</span>` : ''}</a>`).join('')}</div></section>`; }).join('')}`;
  return 'Luyện nói theo chủ đề';
}

// Hiển thị câu theo từng chữ (để tô màu kết quả), gom chữ theo từ để tra nghĩa
export function sentenceChars(zh, base) {
  const arr = charPinyins([...zh].filter(isHan).join('')) || [];
  let k = 0, html = '';
  for (const t of segment(zh)) {
    if (!t.han) { html += `<span class="pn">${esc(t.t)}</span>`; continue; }
    const chars = [...t.t].map(c => `<span class="cz" data-k="${base + k}">${esc(c)}</span>`);
    const py = t.w && t.t.length > 1 ? t.w.p : [...t.t].map((_, j) => arr[k + j] || '').join(' ');
    html += `<span class="tk" data-w="${esc(t.t)}"><ruby>${chars.join('')}<rt>${esc(py)}</rt></ruby></span>`;
    k += t.t.length;
  }
  return { html, n: k };
}

// So khớp chữ đọc được với văn bản: đúng chữ/đúng âm = đúng; cùng âm khác thanh = sai thanh; còn lại = thiếu/sai
export function align(target, said) {
  const T = [...target].filter(isHan), S = [...said].filter(isHan);
  if (!T.length) return { marks: [], score: 0 };
  const tp = charPinyins(T.join('')) || T, sp = charPinyins(S.join('')) || S;
  const sim = (i, j) => T[i] === S[j] || tp[i] === sp[j] ? 2 : strip(tp[i]) === strip(sp[j]) ? 1 : 0;
  const n = T.length, m = S.length, dp = Array.from({ length: n + 1 }, () => new Int16Array(m + 1));
  for (let i = 1; i <= n; i++) for (let j = 1; j <= m; j++) { const s = sim(i - 1, j - 1); dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1], s ? dp[i - 1][j - 1] + s : 0); }
  const marks = Array(n).fill('miss'); let i = n, j = m;
  while (i > 0 && j > 0) { const s = sim(i - 1, j - 1); if (s && dp[i][j] === dp[i - 1][j - 1] + s) { marks[i - 1] = s === 2 ? 'ok' : 'tone'; i--; j--; } else if (dp[i - 1][j] >= dp[i][j - 1]) i--; else j--; }
  const ok = marks.filter(x => x === 'ok').length, tone = marks.filter(x => x === 'tone').length;
  return { marks, score: Math.round((ok + tone * 0.5) / n * 100), ok, tone };
}

// ── Trang bài nói ──
export function speakingItem(root, id, mode) {
  const x0 = SPEAK_ITEMS.find(i => i.id === +id); if (!x0) { root.innerHTML = '<p>Không có bài này.</p>'; return; }
  // bài hoàn chỉnh ~200 chữ dùng chung giao diện; điểm & luyện gõ lưu riêng
  const x = x0;
  const bk = x0.id, sfx = '';
  const hanN = [...x.s.map(r => r[0]).join('')].filter(isHan).length;
  const st = store.s.settings, opt = store.s.speakOpt || { py: true, vi: true, size: 1.5 };
  const idx = SPEAK_ITEMS.indexOf(x), prev = SPEAK_ITEMS[idx - 1], next = SPEAK_ITEMS[idx + 1];
  const g = SPEAK_GROUPS.find(gg => gg[0] === x.g) || ['', '', ''];
  let base = 0;
  const rows = `<div class="sp-thead" aria-hidden="true"><span>Tiếng Trung</span><span class="sp-hvi">Tiếng Việt</span><span class="sp-hpy">Pinyin</span><span></span></div>` + x.s.map(([zh, vi, py], i) => { const r = sentenceChars(zh, base); const row = `<div class="sp-row" data-i="${i}" data-zh="${esc(zh)}" data-from="${base}" data-n="${r.n}">
      <div class="sp-body"><div class="sp-zh" lang="zh-CN">${r.html}</div><div class="sp-res"></div></div>
      <div class="sp-vi">${esc(vi)}</div>
      <div class="sp-py">${esc(py || sentencePinyin(zh))}</div>
      <div class="sp-act"><button class="say sp-play" title="Nghe câu này" aria-label="Nghe câu này">${icon('vol')}</button>${SR ? `<button class="say sp-mic" title="Ghi âm câu này" aria-label="Ghi âm câu này">${icon('mic')}</button>` : ''}</div></div>`; base += r.n; return row; }).join('');
  const qr = sentenceChars(x.q, 100000);
  root.innerHTML = `<nav class="crumb"><a href="#/speaking">Luyện nói</a> › ${g[2]} ${esc(g[1])}</nav>
  <div class="sp-head card"><p class="eyebrow">Câu hỏi ${x.id} · Nhóm ${g[0]} – ${esc(g[1])}</p><div class="sp-qbig" lang="zh-CN">${qr.html}</div><div class="sp-qvi">${esc(x.qvi)}</div>
    ${focusOf(x.id) ? `<p class="small sp-fc"><b>Cấu trúc trọng tâm (nhóm “${esc(focusOf(x.id).name)}”):</b> <span lang="zh-CN">${focusOf(x.id).ids.map(id => `<span class="chip sm" title="${esc(structById(id).vi)}">${esc(structById(id).f)}</span>`).join(' ')}</span></p>` : ''}
    <p class="muted small">${x.s.length} câu · ${hanN} chữ. Có thể thay tên, thời gian, địa điểm, sở thích cho đúng bản thân.</p>
    ${x.note ? `<p class="note small">💡 ${esc(x.note)}</p>` : ''}</div>
  <div class="sp-bar card" role="toolbar" aria-label="Tùy chọn hiển thị">
    <label class="sw"><input type="checkbox" id="oPy" ${opt.py ? 'checked' : ''}><span></span> Pinyin</label>
    <label class="sw"><input type="checkbox" id="oVi" ${opt.vi ? 'checked' : ''}><span></span> Tiếng Việt</label>
    <label class="sel">Phông <select id="oFont">${FONTS.map(([k, n]) => `<option value="${k}" ${st.zhFont === k ? 'selected' : ''}>${n}</option>`).join('')}</select></label>
    <span class="row gap"><button class="mini" id="aMinus" aria-label="Chữ nhỏ hơn">A−</button><button class="mini" id="aPlus" aria-label="Chữ to hơn">A+</button></span>
    <span class="grow"></span>
    <button class="btn sm" id="pAll">${icon('play')} Nghe cả bài</button><button class="btn sm ghost" id="pStop">${icon('stop')}</button>
    <label class="sel">Tốc độ <select id="pRate">${[0.75, 1, 1.25].map(r => `<option ${r === (st.rate || 1) ? 'selected' : ''} value="${r}">${r}x</option>`).join('')}</select></label>
  </div>
  <article class="sp-text sp-3col card ${opt.py ? '' : 'no-py'} ${opt.vi ? '' : 'no-vi'}" style="--sp-size:${opt.size}rem">${rows}</article>
  <section class="card sp-ai">
    <h2>${icon('mic')} Ghi âm & chấm phát âm</h2>
    <p class="muted small">Bấm <b>Bắt đầu nói</b> rồi đọc bài mẫu hoặc tự trả lời bằng lời của mình. Máy <b>ghi ra chữ bạn nói</b> (kèm pinyin, nghĩa) và khi chọn so sánh sẽ tô màu từng chữ: <span class="lg ok">đúng</span> <span class="lg tone">gần đúng – kiểm tra thanh điệu</span> <span class="lg miss">thiếu hoặc sai</span>. Bấm 🎤 cạnh từng câu để luyện riêng câu đó.</p>
    <div class="row gap wrap ls-sbar">
      <label class="sel">Nhận dạng bằng <select id="aiEng"><option value="ai">🤖 AI Whisper trên máy (chuẩn hơn, lần đầu cần tải mô hình)</option>${SR ? `<option value="sr" ${store.s.speakEng === 'sr' ? 'selected' : ''}>⚡ Trình duyệt Chrome/Edge (nhanh, không cần tải)</option>` : ''}</select></label>
      <label class="sel ai-only">AI <select id="aiModelSel">${aiModelOptions(store.s.aiModel || AI_DEFAULT)}</select></label>
      <label class="sel">So sánh với <select id="aiCmp"><option value="sample">Bài mẫu đang xem</option><option value="none">Không so sánh – chỉ ghi ra tôi nói gì</option></select></label>
      <label class="chk ai-only"><input type="checkbox" id="aiAuto" checked> Tự dừng khi im lặng 3 giây</label>
    </div>
    <div class="row gap wrap" style="align-items:center"><button class="btn big" id="aiGo">🎤 Bắt đầu nói</button><span class="tp-vu"><span id="aiVu"></span></span><span class="muted" id="aiTime"></span></div>
    <div id="aiLive" class="sp-live" aria-live="polite"></div>
    <div class="small ai-status" id="aiStat"></div>
    <div id="aiOut"></div>
  </section>
  <section class="card ty-sec"><h2>⌨️ Luyện gõ lại bài đọc</h2>
    <p class="muted small">Gõ lại từng câu của bài: gõ đúng đến chữ nào, chữ đó biến mất khỏi câu mẫu; gõ xong một câu sẽ tự chuyển sang câu tiếp. Đồng hồ tính tốc độ theo chữ/phút và từ/phút.</p>
    <div id="typing"></div></section>
  <div id="study"></div>
  <div class="lesson-nav">${prev ? `<a class="btn ghost" href="#/speaking/${prev.id}${sfx}">‹ Câu ${prev.id}</a>` : '<span></span>'}${next ? `<a class="btn" href="#/speaking/${next.id}${sfx}">Câu ${next.id} ›</a>` : ''}</div>`;

  const text = $('.sp-text', root), srows = $$('.sp-row', root);
  const saveOpt = () => store.update(s => s.speakOpt = { py: $('#oPy', root).checked, vi: $('#oVi', root).checked, size: opt.size });
  $('#oPy', root).onchange = e => { text.classList.toggle('no-py', !e.target.checked); saveOpt(); };
  $('#oVi', root).onchange = e => { text.classList.toggle('no-vi', !e.target.checked); saveOpt(); };
  $('#oFont', root).onchange = e => { store.update(s => s.settings.zhFont = e.target.value); applyDisplay(); };
  const size = d => { opt.size = Math.min(2.6, Math.max(1.1, +(opt.size + d).toFixed(2))); text.style.setProperty('--sp-size', opt.size + 'rem'); saveOpt(); };
  $('#aMinus', root).onclick = () => size(-0.15); $('#aPlus', root).onclick = () => size(0.15);
  $('#pAll', root).onclick = () => { logActivity(); speakSeq(srows.map(el => ({ text: el.dataset.zh, el, onBoundary: hlBoundary(el) })), { rate: +$('#pRate', root).value, onItem: k => { srows.forEach((r, j) => r.classList.toggle('now', j === k)); if (k >= 0) srows[k].scrollIntoView({ block: 'center', behavior: 'smooth' }); } }); };
  $('#pStop', root).onclick = stopSeq;
  $('#pRate', root).onchange = e => store.update(s => s.settings.rate = +e.target.value);
  function hlBoundary(el) {
    // charIndex tính theo cả câu (gồm dấu câu) → quy về chỉ số chữ Hán
    const zh = el.dataset.zh; const map = []; let h = 0; [...zh].forEach((c, i) => { map[i] = isHan(c) ? h++ : -1; });
    const cs = $$('.cz', el);
    return (i, len) => { const idxs = new Set(); for (let t = i; t < i + Math.max(1, len); t++) if (map[t] >= 0) idxs.add(map[t]); cs.forEach((c, j) => c.classList.toggle('hl', idxs.has(j))); };
  }

  // tô màu kết quả lên các chữ
  const paint = (el, marks) => { $$('.cz', el).forEach((c, j) => { c.classList.remove('ok', 'tone', 'miss', 'hl'); if (marks[j]) c.classList.add(marks[j]); }); };
  const badge = s => `<span class="score ${s >= 80 ? 'good' : s >= 50 ? 'mid' : 'bad'}">${s}%</span>`;

  // ── Ghi âm từng câu ──
  root.onclick = async e => {
    const a = e.target.closest('[data-goto]'); if (a) { e.preventDefault(); const el = srows[+a.dataset.goto]; el.scrollIntoView({ block: 'center', behavior: 'smooth' }); el.classList.add('flash-row'); setTimeout(() => el.classList.remove('flash-row'), 1600); return; }
    const pl = e.target.closest('.sp-play'); if (pl) { const el = pl.closest('.sp-row'); speak(el.dataset.zh, { el, rate: +$('#pRate', root).value, onBoundary: hlBoundary(el) }); return; }
    const mic = e.target.closest('.sp-mic'); if (!mic) return;
    const el = mic.closest('.sp-row'), out = $('.sp-res', el);
    if (mic.classList.contains('rec')) return;
    mic.classList.add('rec'); out.innerHTML = '<span class="muted">Đang nghe… đọc to câu này</span>';
    try {
      const said = await recognizeOnce();
      const best = said.map(s => ({ s, ...align(el.dataset.zh, s) })).sort((a, b) => b.score - a.score)[0];
      if (!best || !best.s) { out.innerHTML = '<span class="muted">Không nghe rõ, hãy thử lại gần micro hơn.</span>'; }
      else { paint(el, best.marks); out.innerHTML = `${badge(best.score)} <span class="muted small">Máy nghe được:</span> <span lang="zh-CN">${esc(best.s)}</span>`; logActivity(); }
    } catch (err) { out.innerHTML = `<span class="bad-t">${esc(err.message)}</span>`; }
    mic.classList.remove('rec');
  };

  typingTrainer($('#typing', root), { key: 'sp' + bk, sentences: x.s });
  renderStudy($('#study', root), x0);
  bindAI();
  // ── AI ghi âm: ghi ra người học nói gì, so với bài mẫu / bài tự viết ──
  function bindAI() {
    const go = $('#aiGo', root), out = $('#aiOut', root), stat = $('#aiStat', root), vu = $('#aiVu', root), tm = $('#aiTime', root);
    const off = onAIStatus(h => { if (document.body.contains(stat)) stat.innerHTML = h; else off(); });
    $('#aiModelSel', root).onchange = e => store.update(s => { s.aiModel = e.target.value; });
    const eng = $('#aiEng', root), live = $('#aiLive', root);
    const syncEng = () => { $$('.sp-ai .ai-only', root).forEach(el => { el.hidden = eng.value !== 'ai'; }); };
    eng.onchange = () => { store.update(s => { s.speakEng = eng.value; }); syncEng(); }; syncEng();
    let ctl = null, sess = null;
    const idle = () => { go.classList.remove('rec'); go.textContent = '🎤 Bắt đầu nói'; vu.style.width = '0'; };
    go.onclick = async () => {
      if (ctl) { ctl.stop(); return; }
      if (sess) { // dừng nhận dạng của trình duyệt
        const s0 = sess; sess = null; idle(); const { transcript, audioUrl } = await s0.stop(); live.innerHTML = '';
        const audioH = audioUrl ? recAudio(audioUrl) : '', said = transcript.replace(/\s+/g, '');
        if (!said) { out.innerHTML = `<p class="bad-t">Không nhận được giọng nói. Hãy kiểm tra micro và đọc to, rõ hơn.</p>${audioH}`; return; }
        return show(said, audioH, 'Máy');
      }
      stopSeq(); out.innerHTML = '';
      if (eng.value === 'sr') {
        sess = await startSession(live, tm); if (!sess) return;
        go.classList.add('rec'); go.textContent = '⏹ Dừng & chấm điểm'; return;
      }
      const model = $('#aiModelSel', root).value; aiPreload(model);
      try { ctl = await recordVoice({ maxSec: 180, silenceSec: $('#aiAuto', root).checked ? 3 : 0, onLevel: v => { vu.style.width = Math.min(100, v / 0.15 * 100) + '%'; }, onTime: t => { tm.textContent = `⏺ ${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`; } }); }
      catch { toast('Cần cho phép dùng micro.', 'bad'); return; }
      go.classList.add('rec'); go.textContent = '⏹ Đang ghi – bấm để dừng';
      const { blob, voiced } = await ctl.done; ctl = null;
      idle();
      const url = URL.createObjectURL(blob), audioH = `${recAudio(url)}`;
      if (!voiced) { out.innerHTML = `<p class="bad-t">Không nghe thấy giọng nói – hãy nói to hơn, gần micro.</p>${audioH}`; tm.textContent = ''; return; }
      out.innerHTML = `<p class="muted">🤖 AI đang nghe bản ghi…</p>${audioH}`;
      let lines;
      try { lines = await aiLong(await toPcm16k(await blob.arrayBuffer()), model, { onPart: (k, n) => { out.firstElementChild.textContent = `🤖 AI đang nghe… ${k}/${n} đoạn`; } }); }
      catch (e) { out.innerHTML = `<p class="bad-t">AI không nghe được (${esc(e.message || e)}).</p>${audioH}`; return; }
      tm.textContent = '';
      const said = lines.map(l => l.zh).join('');
      if (!said) { out.innerHTML = `<p class="bad-t">AI không nhận ra chữ nào rõ ràng.</p>${audioH}`; return; }
      show(said, audioH, '🤖 AI');
    };
    function show(said, audioH, who) {
      const sents = splitSentences(said).length ? splitSentences(said) : [said];
      let cmpH = '';
      const mode = $('#aiCmp', root).value;
      const rowsEl = mode === 'sample' ? srows : [];
      if (mode !== 'none' && rowsEl.length) {
        const all = rowsEl.map(r => r.dataset.zh).join(''), r = align(all, said);
        let from = 0;
        const weak = [];
        rowsEl.forEach((el, k) => { const n = $$('.cz', el).length, m = r.marks.slice(from, from + n); from += n; paint(el, m); const sc = n ? Math.round((m.filter(v => v === 'ok').length + m.filter(v => v === 'tone').length * 0.5) / n * 100) : 100; const rs = $('.sp-res', el); if (rs) rs.innerHTML = badge(sc); if (sc < 70) weak.push([k, sc, el.dataset.zh]); });
        cmpH = `<div class="sp-sum"><div class="score-ring" style="--p:${r.score}"><span>${r.score}%</span></div><div><p>So với bài mẫu: đúng <b>${r.ok}</b> chữ · gần đúng <b>${r.tone}</b>. Các chữ đã được tô màu trong bài mẫu ở trên.</p></div></div>`
          + (mode === 'sample' ? (weak.length ? `<h3 class="sub">Câu nên luyện lại (${weak.length})</h3><ul class="weak">${weak.map(([k, sc, z]) => `<li><a href="#" data-goto="${k}">Câu ${k + 1}: <span lang="zh-CN">${esc(z)}</span></a> ${badge(sc)}</li>`).join('')}</ul>` : '<p class="ok-t small">Không có câu nào dưới 70%. Giỏi lắm!</p>') : '');
        if (mode === 'sample') store.update(s => { s.speakBest2 = s.speakBest2 || {}; s.speakBest2[bk] = Math.max(s.speakBest2[bk] || 0, r.score); });
      }
      out.innerHTML = `<div class="at-res"><div class="row gap wrap" style="justify-content:space-between;align-items:center"><b>🗣️ ${who} nghe được bạn nói (${[...said].filter(isHan).length} chữ):</b><span class="row gap"><button class="mini" id="aiCopy">📋 Sao chép</button><button class="mini" id="aiClr">🗑️ Xóa</button></span></div>
        ${sents.map(z => `<div class="sent at-said"><div class="sent-body"><div class="zh">${zhTokens(z)}</div></div><div class="sent-act"><button class="say ai-say" data-z="${esc(z)}" title="Nghe máy đọc câu này" aria-label="Nghe">${icon('vol')}</button></div></div>`).join('')}
        <div class="small muted">Giọng của bạn:</div>${audioH}${cmpH}</div>`;
      logActivity(5);
      out.onclick = e => { const b = e.target.closest('.ai-say'); if (b) speak(b.dataset.z); };
      $('#aiClr', out).onclick = () => { $$('audio', out).forEach(a => { try { URL.revokeObjectURL(a.src); } catch {} }); out.innerHTML = ''; rowsEl.forEach(el => { paint(el, []); const rs = $('.sp-res', el); if (rs) rs.innerHTML = ''; }); };
      $('#aiCopy', out).onclick = async () => { try { await navigator.clipboard.writeText(said); toast('Đã sao chép.'); } catch { toast('Không sao chép được.', 'bad'); } };
    }
  }
  return `Luyện nói: ${x.q}`;
}

// Nhận dạng một câu (trả về các phương án)
export function recognizeOnce() {
  return new Promise((res, rej) => {
    if (!SR) return rej(new Error('Trình duyệt không hỗ trợ nhận dạng giọng nói (hãy dùng Chrome hoặc Edge).'));
    stopSeq();
    const r = new SR(); r.lang = 'zh-CN'; r.interimResults = false; r.maxAlternatives = 5;
    let got = false;
    r.onresult = e => { got = true; res([...e.results[0]].map(a => a.transcript)); };
    r.onerror = e => rej(new Error(e.error === 'not-allowed' ? 'Bạn chưa cho phép dùng micro.' : e.error === 'no-speech' ? 'Không nghe thấy giọng nói, hãy thử lại.' : 'Lỗi nhận dạng: ' + e.error));
    r.onend = () => { if (!got) res([]); };
    r.start();
  });
}

// Phiên ghi âm cả bài: nhận dạng liên tục (tự khởi động lại khi trình duyệt ngắt) + MediaRecorder
async function startSession(live, timeEl) {
  let stream = null, mr = null, chunks = [];
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    if (window.MediaRecorder) { mr = new MediaRecorder(stream); mr.ondataavailable = e => e.data.size && chunks.push(e.data); mr.start(); }
  } catch (e) {
    if (!SR) { toast('Không truy cập được micro. Hãy cho phép quyền micro.', 'bad'); return null; }
  }
  let finals = '', interim = '', running = true, r = null;
  const t0 = Date.now(); const tick = setInterval(() => { const s = Math.floor((Date.now() - t0) / 1000); timeEl.textContent = `⏺ ${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; }, 500);
  const show = () => { live.innerHTML = `<span lang="zh-CN">${esc(finals)}</span><span class="muted" lang="zh-CN">${esc(interim)}</span>` || ''; live.scrollTop = live.scrollHeight; };
  const begin = () => {
    if (!SR || !running) return;
    r = new SR(); r.lang = 'zh-CN'; r.continuous = true; r.interimResults = true;
    r.onresult = e => { interim = ''; for (let i = e.resultIndex; i < e.results.length; i++) { const t = e.results[i][0].transcript; if (e.results[i].isFinal) finals += t; else interim += t; } show(); };
    r.onerror = e => { if (e.error === 'not-allowed') { running = false; toast('Bạn chưa cho phép dùng micro.', 'bad'); } };
    r.onend = () => { if (running) setTimeout(begin, 150); };
    try { r.start(); } catch {}
  };
  begin();
  live.innerHTML = '<span class="muted">Đang ghi âm… hãy đọc to bài nói.</span>';
  return {
    stop: () => new Promise(res => {
      running = false; clearInterval(tick); timeEl.textContent = '';
      try { r && r.stop(); } catch {}
      const finish = () => { stream && stream.getTracks().forEach(t => t.stop()); const audioUrl = chunks.length ? URL.createObjectURL(new Blob(chunks, { type: chunks[0].type || 'audio/webm' })) : ''; setTimeout(() => res({ transcript: finals + interim, audioUrl }), 50); };
      if (mr && mr.state !== 'inactive') { mr.onstop = () => setTimeout(finish, 400); mr.stop(); } else setTimeout(finish, 600);
    }),
  };
}

// ════════════ Từ mới · Cấu trúc · Thẻ lật · Tự đặt câu ════════════
const knownOf = id => (store.s.spKnown2 || {})[id] || {};
function setKnown(id, h, v) { store.update(s => { s.spKnown2 = s.spKnown2 || {}; s.spKnown2[id] = s.spKnown2[id] || {}; s.spKnown2[id][h] = v; }); }

function renderStudy(box, x) {
  const v = SPEAK_VOCAB[x.id] || { w: [], g: [] };
  const words = v.w.map(([h, p, vi]) => ({ h, p, vi }));
  box.innerHTML = `
  <section class="card vs-sec"><div class="row gap wrap" style="justify-content:space-between"><h2>📘 Từ vựng trong bài <small class="muted">(${words.length})</small></h2><span class="muted small" id="wkc"></span></div>
    <p class="muted small">Học như Quizlet: xem danh sách kèm 5 câu ví dụ mỗi từ, lật thẻ, học trắc nghiệm, làm bài kiểm tra và chơi trò chơi. Từ đánh dấu ✓/✗ được lưu trên trình duyệt.</p>
    <div id="vsBox"></div></section>
  <section class="card"><h2>🧩 Cấu trúc ngữ pháp trong bài <small class="muted">(${v.g.length})</small></h2>
    <div class="gs-list">${v.g.map(([f, ex, s, gid]) => { const g = gid && grammarById(gid); return `<div class="gs"><div class="gs-f" lang="zh-CN">${esc(f)}</div><div class="gs-x">${esc(ex)}${g ? ` · <a href="#/grammar/${g.id}">Xem bài ngữ pháp</a>` : ''}</div>${sentence(s, x.s.find(([zh]) => zh === s)?.[1] || '')}</div>`; }).join('')}</div></section>`;


  const drawCount = () => { const k = knownOf(x.id); $('#wkc', box).textContent = `Đã thuộc ${words.filter(w => k[w.h] === true).length}/${words.length}`; };
  drawCount();
  vocabSet($('#vsBox', box), words, {
    id: x.id, sent: x.s, known: () => knownOf(x.id), setKnown: (h, val) => setKnown(x.id, h, val),
    onChange: drawCount,
  });
}

// Ghi một đoạn ngắn: nhận dạng giọng nói (nếu có) + thu âm để nghe lại
export async function recordClip(btn) {
  let stream = null, mr = null, chunks = [];
  try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }); if (window.MediaRecorder) { mr = new MediaRecorder(stream); mr.ondataavailable = e => e.data.size && chunks.push(e.data); mr.start(); } }
  catch { if (!SR) throw new Error('Không truy cập được micro. Hãy cho phép quyền micro.'); }
  const stopRec = () => new Promise(res => { const fin = () => { stream && stream.getTracks().forEach(t => t.stop()); res(chunks.length ? URL.createObjectURL(new Blob(chunks, { type: chunks[0].type || 'audio/webm' })) : ''); }; if (mr && mr.state !== 'inactive') { mr.onstop = fin; mr.stop(); } else fin(); });
  if (SR) { let alts = []; try { alts = await recognizeOnce(); } finally { var url = await stopRec(); } return { alts, url }; }
  await new Promise(res => { btn._stop = res; setTimeout(res, 15000); });
  btn._stop = null;
  return { alts: [], url: await stopRec() };
}
