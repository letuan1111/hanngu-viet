import { store, srsAdd, logActivity } from './store.js';
import { rebuild, tokensWithPinyin, entry, lookup, examplesFor, collocations, charPinyin, CHARS, isHan, levelLabel, POS, sentencePinyin, GRAMMAR } from './dict.js';
import { SPEAK_STRUCT } from '../data/speaking.js';
import { speak } from './tts.js';
import { RADICALS } from '../data/radicals.js';

// Bản ghi âm của người học: trình phát + nút xóa (xóa khỏi trang và giải phóng bộ nhớ)
export const recAudio = url => url ? `<span class="rec-a"><audio controls src="${url}"></audio><button class="mini rec-del" type="button" title="Xóa bản ghi này" aria-label="Xóa bản ghi này">🗑️ Xóa</button></span>` : '';
if (typeof document !== 'undefined') document.addEventListener('click', e => {
  const b = e.target.closest && e.target.closest('.rec-del'); if (!b) return;
  e.preventDefault(); e.stopPropagation();
  const w = b.closest('.rec-a'), a = w && w.querySelector('audio');
  if (a) { try { a.pause(); if (a.src.startsWith('blob:')) URL.revokeObjectURL(a.src); } catch {} }
  if (w) w.outerHTML = '<span class="muted small rec-gone">🗑️ Đã xóa bản ghi</span>';
}, true);
export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const $ = (s, r = document) => r.querySelector(s);
export const $$ = (s, r = document) => [...r.querySelectorAll(s)];
export const short = vi => (vi || '').split(/[;,(]/)[0].trim();

// ── Hiển thị câu có thể bấm vào từng từ ──
export function zhTokens(zh, { gloss = true } = {}) {
  let off = 0;
  return tokensWithPinyin(zh).map(t => {
    const start = off; off += t.t.length;
    if (!t.han) return `<span class="pn">${esc(t.t)}</span>`;
    const g = gloss && t.w ? `<i class="gl">${esc(short(t.w.vi))}</i>` : '';
    return `<span class="tk${t.w ? '' : ' unk'}${store.s.srs[t.t] ? ' in-srs' : ''}" data-w="${esc(t.t)}" data-i="${start}" data-n="${t.t.length}"><ruby><span class="hz">${esc(t.t)}</span><rt>${esc(t.py || '')}</rt></ruby>${g}</span>`;
  }).join('');
}
export function say(text, label = '') {
  return `<button class="say" data-say="${esc(text)}" title="Nghe" aria-label="Nghe phát âm">${icon('vol')}${label}</button>`;
}
export function sentence(zh, vi, { speaker = '', role = 0, extra = '' } = {}) {
  return `<div class="sent" data-zh="${esc(zh)}" data-role="${role}">
    ${speaker ? `<span class="spk spk${role}">${esc(speaker)}</span>` : ''}
    <div class="sent-body">
      <div class="zh">${zhTokens(zh)}</div>
      <div class="py-line">${esc(sentencePinyin(zh))}</div>
      ${vi ? `<div class="vi">${esc(vi)}</div>` : ''}
      ${extra}
    </div>
    <div class="sent-act">${say(zh)}<button class="peek" title="Hiện pinyin / nghĩa" aria-label="Hiện pinyin và nghĩa">${icon('eye')}</button></div>
  </div>`;
}

// Ví dụ dạng hội thoại "A：…B：…" → tách thành các dòng có người nói
export function exampleHtml(zh, vi, opts = {}) {
  if (!/[AB]：/.test(zh)) return sentence(zh, vi, opts);
  const zs = zh.split(/(?=[AB]：)/).filter(Boolean), vs = (vi || '').split(/(?=[AB]: )/).filter(Boolean);
  return `<div class="ex-dialog">${zs.map((z, i) => { const sp = z[0]; return sentence(z.slice(2), (vs[i] || '').replace(/^[AB]: /, ''), { ...opts, speaker: sp, role: sp === 'B' ? 1 : 0, extra: i === zs.length - 1 ? opts.extra || '' : '' }); }).join('')}</div>`;
}
export function applyDisplay() {
  const s = store.s.settings, b = document.body.classList;
  b.toggle('py-off', s.pinyin === 'off'); b.toggle('py-tap', s.pinyin === 'tap'); b.toggle('py-line-mode', s.pinyin === 'line');
  b.toggle('vi-off', s.meaning === 'off'); b.toggle('vi-tap', s.meaning === 'tap');
  b.toggle('hz-off', !s.hanzi); b.toggle('split', !!s.split);
  document.documentElement.style.setProperty('--zh-scale', s.fontSize || 1);
  const FONT = { kai: "'LXGW WenKai Screen', KaiTi, STKaiti, 'Kaiti SC', 'Noto Serif SC', serif", song: "'Noto Serif SC', 'Songti SC', SimSun, serif", hei: "'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif" };
  document.documentElement.style.setProperty('--zh', FONT[s.zhFont] || FONT.kai);
  const t = s.theme === 'auto' ? '' : s.theme; document.documentElement.dataset.theme = t;
}

// ── Icon nhỏ (SVG nội tuyến) ──
const ICONS = {
  vol: '<path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 8.5a4.5 4.5 0 0 1 0 7M18.5 6a8 8 0 0 1 0 12" fill="none"/>',
  eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" fill="none"/><circle cx="12" cy="12" r="3"/>',
  star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
  plus: '<path d="M12 5v14M5 12h14" fill="none"/>', x: '<path d="M6 6l12 12M18 6L6 18" fill="none"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3" fill="none"/>',
  flag: '<path d="M5 21V4h11l-1.5 4L16 12H5" fill="none"/>', repeat: '<path d="M4 12a8 8 0 0 1 14-5l2 2M20 12a8 8 0 0 1-14 5l-2-2M20 4v5h-5M4 20v-5h5" fill="none"/>',
  check: '<path d="M5 12l5 5 9-10" fill="none"/>', brush: '<path d="M14 4l6 6-9 9H5v-6z" fill="none"/>', play: '<path d="M7 4l13 8-13 8z"/>', stop: '<rect x="6" y="6" width="12" height="12" rx="1"/>',
};
export const icon = (n, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n] || ''}</svg>`;

// ── Thông báo ngắn, hộp thoại ──
export function toast(msg, kind = '') {
  const t = document.createElement('div'); t.className = `toast ${kind}`; t.textContent = msg;
  document.body.appendChild(t); requestAnimationFrame(() => t.classList.add('in'));
  setTimeout(() => { t.classList.remove('in'); setTimeout(() => t.remove(), 300); }, 2400);
}
export function modal(html, { wide = false } = {}) {
  closePop();
  const m = document.createElement('div'); m.className = 'modal-wrap';
  m.innerHTML = `<div class="modal ${wide ? 'wide' : ''}" role="dialog"><button class="close" aria-label="Đóng">${icon('x')}</button>${html}</div>`;
  m.addEventListener('click', e => { if (e.target === m || e.target.closest('.close')) m.remove(); });
  document.body.appendChild(m); return m;
}

// ── Cửa sổ thông tin khi bấm vào từ / chữ ──
// ── Ngữ pháp liên quan đến một từ / có trong một câu ──
const hanParts = t => String(t || '').match(/\p{Script=Han}+/gu) || [];
export const grammarOfWord = h => GRAMMAR.filter(g => g.key === h || hanParts(g.name).includes(h));
export const structsOfWord = h => SPEAK_STRUCT.filter(t => hanParts(t.f).includes(h));
export function grammarInText(z) {
  const out = [];
  const NOISY = new Set(['g1-liandong', 'g3-chongdie', 'g1-num', 'g1-time']); // từ khóa quá chung, dễ nhận nhầm
  const RE = { 'g3-yue': /越来越|越.{1,8}越/ }; // tránh nhận nhầm như 越南
  for (const g of GRAMMAR) { if (NOISY.has(g.id)) continue; if (RE[g.id]) { if (RE[g.id].test(z)) out.push(g); continue; } const keys = g.id === 'g1-bu' ? ['不', '没'] : [g.key]; if (keys.some(k => k && z.includes(k))) out.push(g); }
  return out.sort((a, b) => b.level - a.level);
}
export const structsInText = z => SPEAK_STRUCT.filter(t => { try { return new RegExp(t.re).test(z); } catch { return false; } });
let pop = null;
export function closePop() { if (pop) { pop.remove(); pop = null; } }
export function wordCard(h, { full = false } = {}) {
  const ws = lookup(h); const w = ws[0];
  const s = store.s;
  if (!w) return charCard(h);
  const ex = examplesFor(h, full ? 6 : 2);
  const col = collocations(h).slice(0, 5);
  const chars = [...h].filter(isHan);
  return `<div class="wc">
    <div class="wc-head">
      <div><div class="wc-h" lang="zh-CN">${esc(h)}</div><div class="wc-p">${esc(w.p)}</div></div>
      <div class="wc-meta"><span class="badge ${w.source}">${levelLabel(w)}</span><span class="pos">${esc(POS[w.pos] || '')}</span></div>
    </div>
    <div class="wc-vi">${ws.map(x => esc(x.vi) + (ws.length > 1 ? ` <small>(${esc(x.p)})</small>` : '')).join('<br>')}</div>
    <div class="row gap">${say(h, ' Nghe')}${say(h, ' Chậm').replace('data-say', 'data-rate="0.7" data-say')}</div>
    ${ex.length ? `<div class="wc-ex">${ex.map(e => `<div class="mini-ex"><div lang="zh-CN">${esc(e.zh.replace(/^[AB]：/, ''))} ${say(e.zh.replace(/^[AB]：/, ''))}</div><div class="mini-py">${esc(sentencePinyin(e.zh.replace(/^[AB]：/, '')))}</div><div class="mini-vi">${esc(e.vi)}</div></div>`).join('')}</div>` : ''}
    ${col.length ? `<div class="wc-col"><b>Kết hợp thường gặp:</b> ${col.map(c => `<span class="chip" data-w="${esc(c.h)}">${esc(c.h)}</span>`).join(' ')}</div>` : ''}
    ${(() => { const gs = grammarOfWord(h), st = structsOfWord(h).slice(0, 4); return gs.length || st.length ? `<div class="wc-gr"><b>📐 Ngữ pháp liên quan:</b> ${gs.map(g => `<a class="chip" href="#/grammar/${g.id}" title="${esc(g.formula || '')}">HSK${g.level} · ${esc(g.name)}</a>`).join(' ')} ${st.map(t => `<span class="chip" title="${esc(t.vi)}" lang="zh-CN">${esc(t.f)}</span>`).join(' ')}</div>` : `<div class="wc-gr muted small">📐 Từ này không gắn với điểm ngữ pháp riêng nào.</div>`; })()}
    ${chars.length > 1 ? `<div class="wc-chars"><b>Từng chữ:</b> ${chars.map(c => `<button class="chip ch" data-c="${esc(c)}">${esc(c)} <small>${esc(charPinyin(c))}</small></button>`).join(' ')}</div>` : ''}
    <div class="wc-act">
      <a class="btn sm" href="#/word/${encodeURIComponent(h)}">Xem đầy đủ</a>
      <button class="btn sm ghost" data-act="save" data-h="${esc(h)}">${icon('star')} ${s.saved[h] ? 'Đã lưu' : 'Lưu từ'}</button>
      <button class="btn sm ${s.srs[h] ? 'ghost' : ''}" data-act="srs" data-h="${esc(h)}">${s.srs[h] ? '✓ Đang ôn – bỏ' : icon('plus') + ' Lưu vào ôn tập'}</button>
      <button class="btn sm ghost" data-act="hard" data-h="${esc(h)}">${icon('flag')} ${s.hard[h] ? 'Từ khó ✓' : 'Đánh dấu khó'}</button>
    </div>
  </div>`;
}
export function charInfo(c) {
  const d = CHARS[c] || [];
  const rad = d[0] && RADICALS[d[0]];
  const types = { pictographic: 'Chữ tượng hình', ideographic: 'Chữ hội ý / chỉ sự', pictophonetic: 'Chữ hình thanh (một phần chỉ nghĩa, một phần gợi âm)' };
  return { d, rad, type: types[d[2]] || '', comps: [...(d[1] || '')].filter(isHan) };
}
export function charCard(c) {
  const w = entry(c); const ci = charInfo(c);
  return `<div class="wc">
    <div class="wc-head"><div><div class="wc-h" lang="zh-CN">${esc(c)}</div><div class="wc-p">${esc(charPinyin(c))}</div></div>
    <div class="wc-meta">${w ? `<span class="badge ${w.source}">${levelLabel(w)}</span>` : '<span class="badge">Chữ đơn</span>'}</div></div>
    <div class="wc-vi">${w ? esc(w.vi) : ci.d[6] ? `<span class="muted">Nghĩa gốc (tiếng Anh, từ Make Me a Hanzi): ${esc(ci.d[6])}</span>` : '<span class="muted">Chưa có nghĩa tiếng Việt trong từ điển.</span>'}</div>
    <div class="row gap">${say(c, ' Nghe')}</div>
    ${ci.d[0] ? `<div class="wc-col"><b>Bộ thủ:</b> <span lang="zh-CN">${esc(ci.d[0])}</span> ${ci.rad ? `– ${esc(ci.rad[0])} (${esc(ci.rad[1])})` : ''}</div>` : ''}
    ${ci.comps.length ? `<div class="wc-col"><b>Thành phần:</b> ${ci.comps.map(x => `<button class="chip ch" data-c="${esc(x)}">${esc(x)}</button>`).join(' ')} ${ci.type ? `<span class="muted">· ${ci.type}</span>` : ''}</div>` : ''}
    <div class="wc-act"><a class="btn sm" href="#/word/${encodeURIComponent(c)}">Nét viết & ghi nhớ</a></div>
  </div>`;
}
export function openPop(anchor, html) {
  closePop();
  pop = document.createElement('div'); pop.className = 'pop'; pop.innerHTML = `<button class="close" aria-label="Đóng">${icon('x')}</button>` + html;
  document.body.appendChild(pop);
  const mobile = window.innerWidth < 640;
  if (mobile) pop.classList.add('sheet');
  else {
    const r = anchor.getBoundingClientRect(); const pw = pop.offsetWidth, ph = pop.offsetHeight;
    let x = Math.min(Math.max(12, r.left + r.width / 2 - pw / 2), window.innerWidth - pw - 12);
    let y = r.bottom + 8; if (y + ph > window.innerHeight - 12) y = Math.max(12, r.top - ph - 8);
    pop.style.left = x + 'px'; pop.style.top = (y + window.scrollY) + 'px';
  }
}

// ── Lưu từ / cụm từ vào mục Ôn tập ──
function unsave(h) { store.update(s => { delete s.srs[h]; if (s.myPhrases && s.myPhrases[h]) delete s.myPhrases[h]; }); rebuild(); }
function markSaved(h) { $$('.tk').forEach(el => { if (el.dataset.w === h) el.classList.toggle('in-srs', !!store.s.srs[h]); }); }
export function savePhrase(h, { vi = '', ex = '' } = {}) {
  h = h.trim(); if (!h) return;
  if (!entry(h)) { store.update(s => { s.myPhrases = s.myPhrases || {}; s.myPhrases[h] = { p: sentencePinyin(h), vi, ex, at: Date.now() }; }); rebuild(); }
  srsAdd(h); markSaved(h); logActivity();
}
export const quickSaveOn = () => !!store.s.quickSave;
export function setQuickSave(on) { store.update(s => { s.quickSave = !!on; }); drawQuickBadge(); }
function drawQuickBadge() {
  let b = document.getElementById('qsBadge');
  if (!store.s.quickSave) { b && b.remove(); return; }
  if (!b) { b = document.createElement('div'); b.id = 'qsBadge'; b.className = 'qs-badge'; document.body.appendChild(b); }
  b.innerHTML = `⚡ <b>Lưu nhanh</b>: bấm vào từ là lưu vào Ôn tập · <a href="#/review/mine">Xem từ đã lưu</a> <button type="button" class="mini" id="qsOff">Tắt</button>`;
  b.querySelector('#qsOff').onclick = () => setQuickSave(false);
}
// Bôi đen một cụm chữ Hán → hiện nút lưu cụm từ
let selBox = null;
function closeSel() { if (selBox) { selBox.remove(); selBox = null; } }
function onSelect() {
  const sel = window.getSelection(); if (!sel || sel.isCollapsed || !sel.rangeCount) return;
  const frag = sel.getRangeAt(0).cloneContents(); frag.querySelectorAll('rt, rp, .gl, .tp, .py-line, .vi, button').forEach(x => x.remove());
  const raw = frag.textContent.replace(/[\sA-Za-zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜü0-9]+/g, ''), h = raw.replace(/^[^\p{Script=Han}]+|[^\p{Script=Han}]+$/gu, '');
  const n = [...h].filter(isHan).length; if (n < 2 || n > 20) return;
  const node = sel.anchorNode && (sel.anchorNode.nodeType === 1 ? sel.anchorNode : sel.anchorNode.parentElement);
  if (!node || node.closest('input, textarea, .pop, .sel-save')) return;
  const host = node.closest('.sent, .ls-line, .sp-row, .zh, [lang="zh-CN"]'); if (!host) return;
  const ctx = (host.closest('.sent, .ls-line, .sp-row') || host).getAttribute('data-zh') || '';
  closeSel();
  const r = sel.getRangeAt(0).getBoundingClientRect();
  selBox = document.createElement('div'); selBox.className = 'sel-save';
  const has = !!entry(h), saved = !!store.s.srs[h];
  selBox.innerHTML = `<div><b lang="zh-CN">${esc(h)}</b> <span class="muted small">${esc(sentencePinyin(h))}</span></div>
    ${has ? `<div class="small">${esc(short(entry(h).vi))}</div>` : `<input class="inp sel-vi" placeholder="Nghĩa tiếng Việt (không bắt buộc)">`}
    <div class="row gap"><button type="button" class="btn sm sel-ok">${saved ? '✓ Đã có trong Ôn tập' : '⭐ Lưu cụm này vào Ôn tập'}</button><button type="button" class="mini sel-x">Đóng</button></div>`;
  document.body.appendChild(selBox);
  const w = Math.min(320, window.innerWidth - 24);
  selBox.style.left = Math.max(12, Math.min(window.innerWidth - w - 12, r.left + r.width / 2 - w / 2)) + 'px';
  selBox.style.top = (r.bottom + 8 + window.scrollY) + 'px'; selBox.style.width = w + 'px';
  selBox.querySelector('.sel-x').onclick = closeSel;
  selBox.querySelector('.sel-ok').onclick = () => { if (!saved) { savePhrase(h, { vi: selBox.querySelector('.sel-vi')?.value.trim() || '', ex: ctx }); toast(`Đã lưu “${h}” vào mục Ôn tập`); } closeSel(); window.getSelection()?.removeAllRanges(); };
}

// ── Xử lý sự kiện chung (ủy quyền) ──
export function initGlobalEvents() {
  drawQuickBadge();
  document.addEventListener('mouseup', () => setTimeout(onSelect, 10));
  document.addEventListener('touchend', () => setTimeout(onSelect, 300));
  document.addEventListener('mousedown', e => { if (selBox && !e.target.closest('.sel-save')) closeSel(); });
  document.addEventListener('click', e => {
    const t = e.target;
    const sayBtn = t.closest('[data-say]');
    if (sayBtn) { e.preventDefault(); const sent = sayBtn.closest('.sent'); speak(sayBtn.dataset.say, { rate: sayBtn.dataset.rate ? +sayBtn.dataset.rate * store.s.settings.rate : undefined, el: sent || sayBtn, role: sent ? +sent.dataset.role : 0, onBoundary: sent ? hl(sent) : null }); logActivity(); return; }
    const peek = t.closest('.peek'); if (peek) { peek.closest('.sent').classList.toggle('show-all'); return; }
    if (pop && t.closest('.pop .close')) { closePop(); return; }
    const act = t.closest('[data-act]');
    if (act && act.dataset.h) {
      const h = act.dataset.h;
      if (act.dataset.act === 'save') store.update(s => { if (s.saved[h]) delete s.saved[h]; else s.saved[h] = true; });
      if (act.dataset.act === 'hard') store.update(s => { if (s.hard[h]) delete s.hard[h]; else { s.hard[h] = true; } });
      if (act.dataset.act === 'srs') { if (store.s.srs[h]) { unsave(h); toast('Đã bỏ khỏi danh sách ôn tập'); } else { srsAdd(h); toast("Đã lưu – xem ở Ôn tập › ⭐ Từ tôi đã thêm"); } markSaved(h); }
      if (act.dataset.act === 'hard' && store.s.hard[h]) srsAdd(h);
      const card = act.closest('.wc'); if (card && pop && pop.contains(card)) { pop.innerHTML = `<button class="close">${icon('x')}</button>` + wordCard(h); }
      else if (card) { card.outerHTML = wordCard(h, { full: true }); }
      return;
    }
    const c = t.closest('[data-c]'); if (c) { e.preventDefault(); openPop(c, charCard(c.dataset.c)); return; }
    const w = t.closest('[data-w]');
    if (w && !t.closest('.no-pop')) {
      const sent = w.closest('.sent');
      if (sent && (document.body.classList.contains('py-tap') || document.body.classList.contains('vi-tap')) && !sent.classList.contains('show-all') && e.detail === 1 && sent.dataset.tapfirst !== '1') {
        // chế độ ẩn: bấm lần đầu để hiện, bấm tiếp để tra từ
        sent.classList.add('show-all'); sent.dataset.tapfirst = '1'; return;
      }
      if (store.s.quickSave && !store.s.srs[w.dataset.w] && !w.closest('.pop')) { savePhrase(w.dataset.w); toast(`⭐ Đã lưu “${w.dataset.w}” vào Ôn tập – bấm lần nữa để xem nghĩa`); return; }
      openPop(w, wordCard(w.dataset.w)); return;
    }
    if (pop && !t.closest('.pop')) closePop();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closePop(); $$('.modal-wrap').forEach(m => m.remove()); } });
}
// tô sáng chữ đang được đọc
export function hl(sent) {
  const toks = $$('.tk', sent);
  return (i) => { toks.forEach(t => t.classList.toggle('hl', i >= +t.dataset.i && i < +t.dataset.i + +t.dataset.n)); };
}

// ── Viết chữ Hán (Hanzi Writer) ──
export function writer(el, ch, opts = {}) {
  if (!window.HanziWriter) { el.innerHTML = '<p class="muted">Không tải được thư viện nét viết (cần kết nối mạng).</p>'; return null; }
  try {
    return window.HanziWriter.create(el, ch, {
      width: opts.size || 160, height: opts.size || 160, padding: 6, showOutline: true,
      strokeColor: getComputedStyle(document.body).getPropertyValue('--ink').trim() || '#222',
      radicalColor: '#c4302b', outlineColor: getComputedStyle(document.body).getPropertyValue('--line').trim() || '#ddd',
      delayBetweenStrokes: 220, strokeAnimationSpeed: 1.1, showCharacter: opts.showCharacter ?? true,
      highlightColor: '#2f8f6b', drawingColor: '#2f6fb0', charDataLoader: loadStrokes, ...opts.extra,
      onLoadCharDataError: () => { el.innerHTML = '<p class="muted">Chưa có dữ liệu nét cho chữ này.</p>'; },
    });
  } catch { return null; }
}
// Dữ liệu nét: ưu tiên tệp trong website, nếu thiếu thì lấy từ CDN
function loadStrokes(ch, ok, fail) {
  fetch(`strokes/${ch}.json`).then(r => r.ok ? r.json() : Promise.reject()).catch(() => fetch(`https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0.1/${ch}.json`).then(r => r.ok ? r.json() : Promise.reject()))
    .then(ok).catch(fail);
}
export function gridSvg() { return `<svg class="grid" viewBox="0 0 100 100" aria-hidden="true"><path d="M0 0L100 100M100 0L0 100M50 0V100M0 50H100"/></svg>`; }
