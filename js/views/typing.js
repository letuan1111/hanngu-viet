// Luyện gõ lại bài đọc: chạy từng câu, gõ đúng đến đâu chữ biến mất đến đó; có đồng hồ, chữ/phút, từ/phút, độ chính xác
import { store, logActivity } from '../core/store.js';
import { segment, charPinyins, isHan } from '../core/dict.js';
import { esc, icon, $, toast } from '../core/ui.js';
import { speak } from '../core/tts.js';

const tone = s => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ü/g, 'v');
const isKeyable = c => isHan(c) || /[0-9a-zA-Z]/.test(c);
const normHan = s => [...s].filter(isKeyable).join('').toLowerCase();
const normPy = s => tone(s).replace(/[^a-z0-9]/g, '');
const eq = (typed, key) => typed === key || (key === 'v' && typed === 'u');
const fmt = ms => { const s = Math.floor(ms / 1000); return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`; };

// Tách văn bản tự soạn thành câu
export function splitSentences(text) {
  return text.replace(/\r/g, '').split(/(?<=[。！？!?；;…])|\n+/).map(s => s.trim()).filter(s => [...s].some(isHan));
}

function buildUnits(zh) {
  const pys = charPinyins([...zh].filter(isHan).join('')) || [];
  let k = 0;
  const units = [...zh].map(c => {
    if (isHan(c)) { const p = pys[k++] || ''; return { c, py: p, kh: c, kp: normPy(p) }; }
    if (/[0-9a-zA-Z]/.test(c)) return { c, py: '', kh: c.toLowerCase(), kp: c.toLowerCase() };
    return { c, py: '', kh: '', kp: '' };
  });
  // ranh giới từ để tính từ/phút
  let i = 0; const wordEnds = [];
  for (const t of segment(zh)) { const n = [...t.t].length; if (t.han) wordEnds.push(i + n); i += n; }
  return { units, wordEnds, han: units.filter(u => isHan(u.c)).length };
}

/**
 * @param el   phần tử chứa
 * @param o    { key: mã lưu kỷ lục, sentences: [[zh, vi]], custom: bool }
 */
export function typingTrainer(el, o) {
  const opt = store.s.typeOpt || { mode: 'han', py: true, vi: true };
  const saveOpt = () => store.update(s => { s.typeOpt = { ...opt }; });
  el.innerHTML = `
    <div class="ty-tabs tabs" role="tablist"><button class="tab on" data-src="lesson">📄 Gõ lại bài đọc này</button><button class="tab" data-src="custom">✏️ Gõ nội dung tự tạo</button></div>
    <div class="ty-custom" hidden>
      <p class="muted small">Dán hoặc tự viết một đoạn tiếng Trung (tối đa 3.000 ký tự). Đoạn văn được tách thành từng câu theo dấu 。！？ hoặc xuống dòng, rồi chạy giống bài đọc. Nội dung được lưu trên trình duyệt của bạn.</p>
      <textarea class="inp ty-text" lang="zh-CN" rows="5" maxlength="3000" placeholder="Ví dụ: 我叫小明。我是越南人。我很喜欢学习汉语。">${esc(store.s.typeCustom || '')}</textarea>
      <div class="row gap wrap"><button class="btn ty-use">Bắt đầu gõ đoạn này</button><span class="muted small ty-cnt"></span></div>
    </div>
    <div class="ty-opts row gap wrap">
      <span class="seg" role="radiogroup" aria-label="Cách gõ"><label><input type="radio" name="tyMode" value="han" ${opt.mode === 'han' ? 'checked' : ''}><span>Gõ chữ Hán (bộ gõ tiếng Trung)</span></label><label><input type="radio" name="tyMode" value="py" ${opt.mode === 'py' ? 'checked' : ''}><span>Gõ pinyin (không cần dấu)</span></label></span>
      <label class="sw"><input type="checkbox" class="tyPy" ${opt.py ? 'checked' : ''}><span></span> Pinyin</label>
      <label class="sw"><input type="checkbox" class="tyVi" ${opt.vi ? 'checked' : ''}><span></span> Tiếng Việt</label>
    </div>
    <div class="ty-run"></div>`;
  const run = $('.ty-run', el);
  let sentences = o.sentences, srcKey = o.key, timer = 0;
  const tabs = el.querySelectorAll('.ty-tabs .tab');
  el.querySelector('.ty-tabs').onclick = e => {
    const b = e.target.closest('[data-src]'); if (!b) return;
    tabs.forEach(t => t.classList.toggle('on', t === b));
    const custom = b.dataset.src === 'custom';
    $('.ty-custom', el).hidden = !custom;
    if (custom) { const s = splitSentences($('.ty-text', el).value); if (s.length) { sentences = s.map(z => [z, '']); srcKey = 'custom'; start(); } else { stopTimer(); run.innerHTML = '<p class="muted">Hãy nhập nội dung rồi bấm “Bắt đầu gõ đoạn này”.</p>'; } }
    else { sentences = o.sentences; srcKey = o.key; start(); }
  };
  const cnt = () => { const s = splitSentences($('.ty-text', el).value); $('.ty-cnt', el).textContent = s.length ? `${s.length} câu · ${[...s.join('')].filter(isHan).length} chữ Hán` : ''; };
  $('.ty-text', el).oninput = () => { cnt(); store.update(s => { s.typeCustom = $('.ty-text', el).value; }); };
  cnt();
  $('.ty-use', el).onclick = () => {
    const s = splitSentences($('.ty-text', el).value);
    if (!s.length) { toast('Nội dung cần có chữ Hán.', 'bad'); return; }
    sentences = s.map(z => [z, '']); srcKey = 'custom'; start(); $('.ty-inp', el)?.focus();
  };
  el.querySelectorAll('[name=tyMode]').forEach(r => r.onchange = () => { opt.mode = r.value; saveOpt(); start(); });
  $('.tyPy', el).onchange = e => { opt.py = e.target.checked; saveOpt(); run.classList.toggle('no-py', !opt.py); };
  $('.tyVi', el).onchange = e => { opt.vi = e.target.checked; saveOpt(); run.classList.toggle('no-vi', !opt.vi); };
  const stopTimer = () => { clearInterval(timer); timer = 0; };

  function start() {
    stopTimer();
    const mode = opt.mode;
    const data = sentences.map(([zh, vi]) => ({ zh, vi, ...buildUnits(zh) }));
    const totalHan = data.reduce((s, d) => s + d.han, 0), totalWords = data.reduce((s, d) => s + d.wordEnds.length, 0);
    let si = 0, t0 = 0, doneHan = 0, doneWords = 0, good = 0, errs = 0, lastErrLen = -1, composing = false;
    run.className = `ty-run ${opt.py ? '' : 'no-py'} ${opt.vi ? '' : 'no-vi'}`;
    run.innerHTML = `
      <div class="ty-stats"><span>⏱ <b class="ty-t">00:00</b></span><span><b class="ty-cpm">0</b> chữ/phút</span><span><b class="ty-wpm">0</b> từ/phút</span><span>Chính xác <b class="ty-acc">100%</b></span><span>Câu <b class="ty-si">1</b>/${data.length}</span></div>
      <div class="bar"><i class="ty-bar" style="width:0"></i></div>
      <div class="ty-stage"><div class="ty-cur" lang="zh-CN" aria-live="polite"></div><div class="ty-vi"></div><div class="ty-next" lang="zh-CN"></div></div>
      <div class="ty-inrow"><input class="inp ty-inp" ${mode === 'han' ? 'lang="zh-CN"' : ''} autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="${mode === 'han' ? 'Gõ chữ Hán của câu trên…' : 'Gõ pinyin của câu trên, ví dụ: wo jiao xiaoming'}">
        <button class="say ty-say" title="Nghe câu này" aria-label="Nghe câu này">${icon('vol')}</button></div>
      <div class="row gap wrap ty-btns"><button class="mini ty-skip">Bỏ qua câu này</button><button class="mini ty-reset">↺ Bắt đầu lại</button><span class="muted small">${mode === 'han' ? 'Dấu câu được bỏ qua tự động. Đồng hồ chạy khi bạn gõ phím đầu tiên.' : 'Không cần gõ dấu thanh và dấu câu; “ü” gõ là v hoặc u.'}</span></div>
      <div class="ty-out"></div>`;
    const inp = $('.ty-inp', run), cur = $('.ty-cur', run);
    const kOf = u => mode === 'han' ? u.kh : u.kp;
    const drawSentence = () => {
      const d = data[si];
      cur.innerHTML = d.units.map((u, i) => `<span class="tu ${kOf(u) ? '' : 'pn'}" data-i="${i}"><span class="tp">${esc(u.py)}</span><span class="tz">${esc(u.c)}</span></span>`).join('');
      $('.ty-vi', run).textContent = d.vi || '';
      $('.ty-next', run).textContent = data[si + 1] ? 'Câu tiếp: ' + data[si + 1].zh : '';
      $('.ty-si', run).textContent = si + 1;
      inp.value = ''; lastErrLen = -1; update();
    };
    const stats = () => {
      const ms = t0 ? performance.now() - t0 : 0, min = ms / 60000;
      $('.ty-t', run).textContent = fmt(ms);
      $('.ty-cpm', run).textContent = min > 0.02 ? Math.round(doneHan / min) : 0;
      $('.ty-wpm', run).textContent = min > 0.02 ? Math.round(doneWords / min) : 0;
      $('.ty-acc', run).textContent = good + errs ? Math.round(good / (good + errs) * 100) + '%' : '100%';
      $('.ty-bar', run).style.width = (doneHan / Math.max(1, totalHan) * 100) + '%';
    };
    let sentHan = 0, sentWords = 0; // phần đã gõ trong câu hiện tại
    function update(fromInput) {
      const d = data[si]; if (!d) return;
      const typed = mode === 'han' ? normHan(inp.value) : normPy(inp.value);
      // so khớp tiền tố
      let p = 0, ui = 0, within = 0;
      const ends = []; let acc = 0; d.units.forEach(u => { acc += kOf(u).length; ends.push(acc); });
      const K = d.units.map(kOf).join('');
      while (p < typed.length && p < K.length && eq(typed[p], K[p])) p++;
      const wrong = typed.length > p;
      if (fromInput && wrong && typed.length > lastErrLen) { errs++; lastErrLen = typed.length; }
      if (!wrong) lastErrLen = -1;
      // đơn vị hoàn thành: đã gõ hết khóa; dấu câu đứng ngay sau phần đã gõ cũng biến mất
      let doneIdx = -1;
      for (let i = 0; i < d.units.length; i++) { if (ends[i] <= p && (kOf(d.units[i]) || i === 0 || doneIdx === i - 1)) doneIdx = i; else break; }
      const spans = cur.children;
      for (let i = 0; i < spans.length; i++) { spans[i].classList.toggle('gone', i <= doneIdx); spans[i].classList.remove('err', 'next'); }
      const nextI = doneIdx + 1; if (spans[nextI]) spans[nextI].classList.add(wrong ? 'err' : 'next');
      inp.classList.toggle('bad', wrong);
      sentHan = d.units.slice(0, doneIdx + 1).filter(u => isHan(u.c)).length;
      sentWords = d.wordEnds.filter(e => e <= doneIdx + 1).length;
      const baseHan = data.slice(0, si).reduce((s, x) => s + x.han, 0), baseW = data.slice(0, si).reduce((s, x) => s + x.wordEnds.length, 0);
      doneHan = baseHan + sentHan; doneWords = baseW + sentWords;
      good = data.slice(0, si).reduce((s, x) => s + x.units.map(kOf).join('').length, 0) + p;
      stats();
      if (p >= K.length && K.length) { cur.classList.add('ty-flash'); setTimeout(() => cur.classList.remove('ty-flash'), 300); si++; if (si >= data.length) return finish(); setTimeout(drawSentence, 120); }
    }
    inp.addEventListener('compositionstart', () => { composing = true; });
    inp.addEventListener('compositionend', () => { composing = false; onType(); });
    inp.addEventListener('input', e => { if (composing || e.isComposing) return; onType(); });
    function onType() {
      if (!t0) { t0 = performance.now(); timer = setInterval(() => { if (!el.isConnected) return stopTimer(); stats(); }, 250); }
      update(true);
    }
    $('.ty-say', run).onclick = () => data[si] && speak(data[si].zh);
    $('.ty-skip', run).onclick = () => { si++; if (si >= data.length) finish(); else drawSentence(); inp.focus(); };
    $('.ty-reset', run).onclick = () => { start(); $('.ty-inp', el)?.focus(); };
    function finish() {
      stopTimer();
      const ms = t0 ? performance.now() - t0 : 0, min = Math.max(ms / 60000, 1 / 60);
      const cpm = Math.round(doneHan / min), wpm = Math.round(doneWords / min), accu = good + errs ? Math.round(good / (good + errs) * 100) : 100;
      const k = `${srcKey}:${mode}`, prev = (store.s.typeBest || {})[k];
      const rec = !prev || cpm > prev.cpm;
      if (rec && doneHan) store.update(s => { s.typeBest = s.typeBest || {}; s.typeBest[k] = { cpm, wpm, acc: accu, ms, at: Date.now() }; });
      logActivity(3);
      run.innerHTML = `<div class="ty-end"><div class="ty-big"><b>${cpm}</b><span>chữ/phút</span></div><div class="ty-big"><b>${wpm}</b><span>từ/phút</span></div><div class="ty-big"><b>${accu}%</b><span>chính xác</span></div><div class="ty-big"><b>${fmt(ms)}</b><span>thời gian</span></div></div>
        <p class="ty-msg">${rec && doneHan ? '🏆 Kỷ lục mới cho bài này!' : `Kỷ lục của bạn: <b>${prev.cpm}</b> chữ/phút · ${prev.wpm} từ/phút · ${prev.acc}%`} <span class="muted small">(gõ ${mode === 'han' ? 'chữ Hán' : 'pinyin'} · ${doneHan}/${totalHan} chữ · ${doneWords}/${totalWords} từ · ${errs} lần gõ sai)</span></p>
        <button class="btn ty-again">↺ Gõ lại</button>`;
      $('.ty-again', run).onclick = () => { start(); $('.ty-inp', el)?.focus(); };
    }
    drawSentence();
  }
  start();
}
