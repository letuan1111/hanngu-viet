// Luyện phát âm: thanh điệu, thanh mẫu, vận mẫu, biến điệu, bảng âm tiết, luyện nghe phân biệt, quy tắc viết pinyin
import { store, logActivity } from '../core/store.js';
import { esc, icon, $, $$ } from '../core/ui.js';
import { speak, speakSeq, stopSeq, listen, SR } from '../core/tts.js';
import { TONES, TONE_SETS, TONE_PAIRS, SANDHI, INITIALS, FINALS, PAIRS, RULES } from '../data/pinyin.js';
import { SYL } from '../data/syllables.js';

const TABS = [['', 'Bắt đầu'], ['thanh-dieu', 'Thanh điệu'], ['thanh-mau', 'Thanh mẫu'], ['van-mau', 'Vận mẫu'], ['bien-dieu', 'Biến điệu'], ['bang', 'Bảng âm tiết'], ['phan-biet', 'Luyện nghe'], ['quy-tac', 'Quy tắc viết']];
const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
const PP = () => window.pinyinPro;
const pyNum = t => { try { return PP().pinyin(t, { type: 'array', toneType: 'num', toneSandhi: false, nonZh: 'removed' }).filter(Boolean); } catch { return []; } };
const done = () => store.s.pyDone || {};
const markDone = k => store.update(s => { s.pyDone = s.pyDone || {}; s.pyDone[k] = 1; });

// một dòng ví dụ: chữ · pinyin · nghĩa · nghe · ghi âm
const exRow = ([h, p, vi]) => `<div class="pr-ex" data-h="${esc(h)}"><button class="say pr-say" data-say="${esc(h)}" aria-label="Nghe ${esc(h)}">${icon('vol')}</button><span class="pr-h" lang="zh-CN">${esc(h)}</span><span class="pr-p">${esc(p)}</span><span class="pr-vi">${esc(vi || '')}</span>${SR ? `<button class="say pr-mic" aria-label="Ghi âm ${esc(h)}">${icon('mic')}</button>` : ''}<span class="pr-res"></span></div>`;
const exList = ex => `<div class="pr-exs">${ex.map(exRow).join('')}</div>`;
const playAll = ex => `<button class="mini pr-all" data-all="${esc(JSON.stringify(ex.map(e => e[0])))}">${icon('play')} Nghe tất cả</button>`;

// Biểu đồ độ cao thanh điệu (thang 5 mức)
function toneSvg(pitch, w = 120, h = 70) {
  const x = i => 10 + i * (w - 20) / (pitch.length - 1), y = v => h - 8 - (v - 1) * (h - 16) / 4;
  const d = pitch.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ');
  return `<svg class="pr-tone" viewBox="0 0 ${w} ${h}" aria-hidden="true">${[1, 2, 3, 4, 5].map(v => `<line x1="6" x2="${w - 6}" y1="${y(v)}" y2="${y(v)}"/>`).join('')}<path d="${d}"/></svg>`;
}

function soundCard(it, kind) {
  const k = kind + ':' + it.s, ok = done()[k];
  return `<article class="pr-card ${ok ? 'done' : ''}" id="s-${esc(it.s.replace(/[^\w]/g, '_'))}" data-k="${esc(k)}">
    <header><span class="pr-sym" lang="en">${esc(it.s)}</span>${it.ipa ? `<span class="pr-ipa">[${esc(it.ipa)}]</span>` : ''}<span class="grow"></span>${playAll(it.ex)}<button class="mini pr-ok ${ok ? 'on' : ''}" data-k="${esc(k)}">${ok ? '✓ Đã luyện' : 'Đánh dấu đã luyện'}</button></header>
    <dl class="pr-how"><dt>Cách đọc</dt><dd>${esc(it.how)}</dd><dt>So với tiếng Việt</dt><dd>${esc(it.vn)}</dd>${it.err ? `<dt>Lỗi hay gặp</dt><dd class="pr-err">${esc(it.err)}</dd>` : ''}</dl>
    ${exList(it.ex)}</article>`;
}
function groupNav(groups) { return `<nav class="pr-jump">${groups.map(g => g.items.map(it => `<a href="#" data-jump="s-${esc(it.s.replace(/[^\w]/g, '_'))}" class="${done()[(groups === INITIALS ? 'tm:' : 'vm:') + it.s] ? 'on' : ''}">${esc(it.s.split(' ')[0])}</a>`).join('')).join('<span class="pr-sep"></span>')}</nav>`; }

const PAGES = {
  '': () => `<section class="pr-intro">
      <div class="pr-formula"><div><b lang="en">m</b><small>thanh mẫu<br>(phụ âm đầu)</small></div><i>+</i><div><b lang="en">a</b><small>vận mẫu<br>(phần vần)</small></div><i>+</i><div><b>ˉ</b><small>thanh điệu</small></div><i>=</i><div class="res"><b lang="en">mā</b><small lang="zh-CN">妈 · mẹ</small></div></div>
      <p>Mỗi chữ Hán đọc thành một âm tiết. Pinyin là bảng chữ Latinh ghi cách đọc đó, gồm <b>23 thanh mẫu</b>, <b>36 vận mẫu</b> và <b>4 thanh điệu</b> cùng thanh nhẹ. Tiếng Việt cũng có thanh điệu nên bạn có lợi thế, nhưng có vài âm không có trong tiếng Việt và vài chữ cái đọc khác hẳn tiếng Việt – đó là chỗ cần luyện kỹ.</p>
      <h2>Lộ trình gợi ý</h2>
      <ol class="pr-path">
        <li><a href="#/pinyin/thanh-dieu"><b>Thanh điệu</b><span>4 thanh và thanh nhẹ, luyện theo từng cặp thanh.</span></a></li>
        <li><a href="#/pinyin/thanh-mau"><b>Thanh mẫu</b><span>23 phụ âm đầu, chú ý nhóm bật hơi và uốn lưỡi.</span></a></li>
        <li><a href="#/pinyin/van-mau"><b>Vận mẫu</b><span>Nguyên âm đơn, kép, vần mũi, vần có i, u, ü.</span></a></li>
        <li><a href="#/pinyin/bien-dieu"><b>Biến điệu</b><span>Thanh 3 đi liền, 不, 一 và âm cuốn lưỡi 儿.</span></a></li>
        <li><a href="#/pinyin/phan-biet"><b>Luyện nghe phân biệt</b><span>Nghe và chọn đúng giữa các âm dễ nhầm với người Việt.</span></a></li>
        <li><a href="#/pinyin/bang"><b>Bảng âm tiết</b><span>Toàn bộ ${Object.keys(SYL).length} âm tiết, bấm để nghe 4 thanh.</span></a></li>
      </ol>
      <h2>5 điểm người Việt cần nhớ</h2>
      <ul class="pr-keys">
        <li><b>b d g</b> không rung họng, đọc gần <b>p t c</b> tiếng Việt; <b>p t k</b> là bản bật hơi của chúng.</li>
        <li><b>q</b> đọc gần “ch” bật hơi, <b>x</b> gần “x”, <b>c</b> là “ts” bật hơi – không đọc theo kiểu tiếng Việt.</li>
        <li><b>zh ch sh r</b> phải cong lưỡi; <b>z c s</b> thì không.</li>
        <li><b>e</b> đọc gần “ơ”, <b>ian</b> đọc “iên”, <b>ü</b> chu môi như “uy”.</li>
        <li><b>Thanh 1</b> phải cao, <b>thanh 4</b> bắt đầu cao rồi rơi mạnh, <b>thanh 3</b> quan trọng nhất là thấp.</li>
      </ul>
      ${SR ? '<p class="note">Bấm 🔊 để nghe mẫu, bấm 🎤 rồi đọc to – máy sẽ cho biết bạn đọc đúng âm và đúng thanh chưa.</p>' : '<p class="note">Trình duyệt này chưa hỗ trợ nhận dạng giọng nói nên không kiểm tra phát âm được. Hãy dùng <b>Edge</b> hoặc <b>Chrome</b> trên máy tính để dùng nút 🎤.</p>'}
    </section>`,
  'thanh-dieu': () => `<p class="lead">Tiếng Trung có 4 thanh và thanh nhẹ. Cùng một âm “ma” đọc 4 thanh là 4 chữ khác nghĩa hoàn toàn. Đường kẻ trong biểu đồ cho thấy độ cao giọng (1 thấp nhất, 5 cao nhất).</p>
    <div class="pr-tones">${TONES.map(t => `<article class="pr-card pr-tcard t${t.n}"><header><span class="pr-sym">${t.n ? t.name : t.name}</span><span class="pr-ipa">${t.n ? `dấu ${t.mark} · độ cao ${t.pitch.join('')}` : 'không dấu'}</span><span class="grow"></span>${playAll(t.ex)}</header>
      ${toneSvg(t.pitch)}<dl class="pr-how"><dt>Cách đọc</dt><dd>${esc(t.how)}</dd><dt>So với tiếng Việt</dt><dd>${esc(t.vn)}</dd><dt>Mẹo</dt><dd class="pr-err">${esc(t.tip)}</dd></dl>${exList(t.ex)}</article>`).join('')}</div>
    <h2>Luyện 4 thanh trên cùng một âm</h2><p class="muted small">Bấm vào một hàng để nghe lần lượt cả 4 thanh, hoặc bấm từng chữ.</p>
    <div class="pr-sets">${TONE_SETS.map(set => `<div class="pr-set"><button class="mini pr-all" data-all="${esc(JSON.stringify(set.map(x => x[0])))}">${icon('play')}</button>${set.map(([h, p], i) => `<button class="pr-syl t${i + 1}" data-say="${esc(h)}"><span lang="zh-CN">${esc(h)}</span><small>${esc(p)}</small></button>`).join('')}</div>`).join('')}</div>
    <h2>Kết hợp hai thanh</h2><p class="muted small">Luyện 16 tổ hợp thanh điệu qua từ hai âm tiết – đây là cách nhanh nhất để nói tự nhiên.</p>
    <div class="pr-pairs">${TONE_PAIRS.map(([t, ex]) => `<div class="pr-pair"><b>${t}</b>${ex.map(([h, p, vi]) => `<button class="pr-w" data-say="${esc(h)}" title="${esc(vi)}"><span lang="zh-CN">${esc(h)}</span><small>${esc(p)}</small></button>`).join('')}</div>`).join('')}</div>`,
  'thanh-mau': () => `<p class="lead">Thanh mẫu là phụ âm đầu của âm tiết. Chú ý ba cặp <b>không bật hơi – bật hơi</b>: b/p, d/t, g/k, j/q, zh/ch, z/c. Đặt tờ giấy trước miệng: âm bật hơi làm giấy rung mạnh.</p>
    ${groupNav(INITIALS)}${INITIALS.map(g => `<section class="pr-group"><h2>${esc(g.g)}</h2><p class="muted">${esc(g.d)}</p>${g.items.map(it => soundCard(it, 'tm')).join('')}</section>`).join('')}`,
  'van-mau': () => `<p class="lead">Vận mẫu là phần vần của âm tiết. Nhiều vần đọc giống tiếng Việt, nhưng cần chú ý <b>e</b>, <b>ü</b>, <b>ian</b>, <b>-i</b> sau z c s / zh ch sh r, và phân biệt <b>-n / -ng</b>.</p>
    ${groupNav(FINALS)}${FINALS.map(g => `<section class="pr-group"><h2>${esc(g.g)}</h2><p class="muted">${esc(g.d)}</p>${g.items.map(it => soundCard(it, 'vm')).join('')}</section>`).join('')}`,
  'bien-dieu': () => `<p class="lead">Khi nói liền, một số thanh điệu thay đổi. Pinyin trong sách thường vẫn viết thanh gốc, nên bạn cần nhớ các quy tắc dưới đây.</p>
    ${SANDHI.map(x => `<article class="pr-card"><header><span class="pr-sym pr-sym-sm">${esc(x.t)}</span><span class="grow"></span>${playAll(x.ex)}</header><p class="pr-rule">${esc(x.rule)}</p>${exList(x.ex)}</article>`).join('')}`,
  'bang': () => {
    const INI = ['', 'b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h', 'j', 'q', 'x', 'zh', 'ch', 'sh', 'r', 'z', 'c', 's'];
    const FIN = ['a', 'o', 'e', 'i', 'u', 'v', 'ai', 'ei', 'ao', 'ou', 'an', 'en', 'ang', 'eng', 'ong', 'er', 'ia', 'ie', 'iao', 'iu', 'ian', 'in', 'iang', 'ing', 'iong', 'ua', 'uo', 'uai', 'ui', 'uan', 'un', 'uang', 'ueng', 've', 'van', 'vn'];
    const spell = (i, f) => {
      if (!i) { const M = { i: 'yi', ia: 'ya', ie: 'ye', iao: 'yao', iu: 'you', ian: 'yan', in: 'yin', iang: 'yang', ing: 'ying', iong: 'yong', u: 'wu', ua: 'wa', uo: 'wo', uai: 'wai', ui: 'wei', uan: 'wan', un: 'wen', uang: 'wang', ueng: 'weng', v: 'yu', ve: 'yue', van: 'yuan', vn: 'yun' }; return M[f] || f; }
      if (/^[jqx]$/.test(i) && /^v/.test(f)) return i + f.replace('v', 'u');
      return i + f;
    };
    const show = s => s.replace(/v/g, 'ü');
    return `<p class="lead">Bảng đầy đủ các âm tiết tiếng Trung phổ thông (${Object.keys(SYL).length} âm tiết). Hàng là thanh mẫu, cột là vận mẫu. Bấm vào một ô để nghe 4 thanh của âm tiết đó.</p>
      <div class="pr-tbl-wrap"><table class="pr-tbl"><thead><tr><th></th>${FIN.map(f => `<th>${show(f)}</th>`).join('')}</tr></thead><tbody>${INI.map(i => `<tr><th>${i || '∅'}</th>${FIN.map(f => { const s = spell(i, f); return SYL[s] ? `<td><button class="pr-cell" data-syl="${s}">${show(s)}</button></td>` : '<td></td>'; }).join('')}</tr>`).join('')}</tbody></table></div>
      <div class="pr-pop" id="sylPop" hidden></div>`;
  },
  'phan-biet': () => `<p class="lead">Nghe máy đọc một chữ rồi chọn pinyin đúng. Các câu hỏi tập trung vào những âm người Việt hay nhầm. Mỗi lượt 10 câu.</p>
    <div class="pr-quiz-pick"><label class="sel">Nhóm âm <select id="qGroup"><option value="all">Tất cả các nhóm</option>${PAIRS.map((g, i) => `<option value="${i}">${esc(g.t)}</option>`).join('')}<option value="tone">Nhận biết thanh điệu (bảng âm tiết)</option></select></label><button class="btn" id="qStart">Bắt đầu</button></div>
    <div id="quiz"></div>
    <h2>Các cặp âm dễ nhầm</h2>
    <div class="pr-mp">${PAIRS.map(g => `<div class="pr-mpg"><h3>${esc(g.t)}</h3>${g.p.map(row => `<div class="pr-mprow">${row.map(([h, p]) => `<button class="pr-w" data-say="${esc(h)}"><span lang="zh-CN">${esc(h)}</span><small>${esc(p)}</small></button>`).join('<i>–</i>')}</div>`).join('')}</div>`).join('')}</div>`,
  'quy-tac': () => `<p class="lead">Những quy tắc viết pinyin giúp bạn đọc đúng khi gặp từ mới.</p><ol class="pr-rules">${RULES.map(([t, d]) => `<li><b>${esc(t)}</b><p>${esc(d)}</p></li>`).join('')}</ol>`,
};

export function pronounce(root, tab = '') {
  if (!(tab in PAGES)) tab = '';
  const total = INITIALS.reduce((s, g) => s + g.items.length, 0) + FINALS.reduce((s, g) => s + g.items.length, 0);
  const n = Object.keys(done()).length;
  root.innerHTML = `<div class="page-head"><div><h1>Luyện phát âm</h1><p class="muted">Bài 0 – học trước khi vào HSK 1. Đã luyện <b>${n}</b>/${total} âm.</p></div></div>
    <nav class="tabs pr-tabs">${TABS.map(([k, t]) => `<a class="tab ${k === tab ? 'on' : ''}" href="#/pinyin${k ? '/' + k : ''}">${t}</a>`).join('')}</nav>
    <div class="pr-body">${PAGES[tab]()}</div>
    ${tab !== 'quy-tac' ? (() => { const i = TABS.findIndex(t => t[0] === tab), nx = TABS[i + 1]; return nx ? `<div class="lesson-nav"><span></span><a class="btn" href="#/pinyin/${nx[0]}">Tiếp: ${nx[1]} ›</a></div>` : ''; })() : '<div class="lesson-nav"><span></span><a class="btn" href="#/lesson/0">Vào bài 1 HSK 1 ›</a></div>'}`;

  root.onclick = async e => {
    const j = e.target.closest('[data-jump]'); if (j) { e.preventDefault(); document.getElementById(j.dataset.jump)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
    const all = e.target.closest('[data-all]'); if (all) { const list = JSON.parse(all.dataset.all); speakSeq(list.map(t => ({ text: t }))); logActivity(); return; }
    const ok = e.target.closest('.pr-ok'); if (ok) { markDone(ok.dataset.k); ok.classList.add('on'); ok.textContent = '✓ Đã luyện'; ok.closest('.pr-card').classList.add('done'); const a = $(`.pr-jump a[data-jump="${ok.closest('.pr-card').id}"]`, root); if (a) a.classList.add('on'); return; }
    const cell = e.target.closest('.pr-cell'); if (cell) { sylPop(root, cell); return; }
    const mic = e.target.closest('.pr-mic'); if (mic) { checkSay(mic); return; }
  };
  if (tab === 'phan-biet') { $('#qStart', root).onclick = () => runQuiz(root, $('#qGroup', root).value); }
  return 'Luyện phát âm';
}

// ô bảng âm tiết → 4 thanh
function sylPop(root, cell) {
  const pop = $('#sylPop', root), s = cell.dataset.syl, chars = [...SYL[s]];
  const mark = t => { try { return PP().convert(s.replace(/v/g, 'ü') + t, { format: 'numToSymbol' }); } catch { return s + t; } };
  pop.innerHTML = `<div class="pr-pop-in"><b>${s.replace(/v/g, 'ü')}</b>${chars.map((c, i) => c === '-' ? `<span class="pr-syl off"><small>${mark(i + 1)}</small>–</span>` : `<button class="pr-syl t${i + 1}" data-say="${c}"><span lang="zh-CN">${c}</span><small>${mark(i + 1)}</small></button>`).join('')}<button class="mini pr-all" data-all="${esc(JSON.stringify(chars.filter(c => c !== '-')))}">${icon('play')} Cả 4 thanh</button><button class="mini" id="popX">Đóng</button></div>`;
  pop.hidden = false;
  $$('.pr-cell.sel', root).forEach(x => x.classList.remove('sel')); cell.classList.add('sel');
  $('#popX', pop).onclick = () => { pop.hidden = true; cell.classList.remove('sel'); };
  const first = chars.find(c => c !== '-'); if (first) speakSeq(chars.filter(c => c !== '-').map(t => ({ text: t })));
}

// Ghi âm và so sánh pinyin
async function checkSay(btn) {
  const row = btn.closest('.pr-ex'), h = row.dataset.h, out = $('.pr-res', row);
  if (btn.classList.contains('rec')) return;
  btn.classList.add('rec'); out.innerHTML = '<span class="muted">Đang nghe…</span>'; stopSeq();
  try {
    const alts = await listen();
    const want = pyNum(h), base = s => s.replace(/\d/, ''), tone = s => (s.match(/\d/) || ['0'])[0];
    let best = null;
    for (const a of alts) {
      const got = pyNum(a); if (!got.length) continue;
      const sameSyl = got.length === want.length && got.every((g, i) => base(g) === base(want[i]));
      const sameTone = sameSyl && got.every((g, i) => tone(g) === tone(want[i]) || tone(want[i]) === '0' || tone(g) === '0');
      const sc = sameTone ? 2 : sameSyl ? 1 : 0;
      if (!best || sc > best.sc) best = { a, sc, got };
    }
    if (!best) out.innerHTML = '<span class="muted">Không nghe rõ, thử lại gần micro hơn.</span>';
    else {
      const gp = (() => { try { return PP().pinyin(best.a, { toneSandhi: false }); } catch { return ''; } })();
      out.innerHTML = best.sc === 2 ? '<span class="ok-t">✓ Chuẩn</span>' : best.sc === 1 ? `<span class="pr-warn">Đúng âm, chưa đúng thanh – máy nghe: ${esc(gp)}</span>` : `<span class="bad-t">Chưa đúng – máy nghe: <span lang="zh-CN">${esc(best.a)}</span> (${esc(gp)})</span>`;
      logActivity();
    }
  } catch (err) { out.innerHTML = `<span class="bad-t">${esc(err.message)}</span>`; }
  btn.classList.remove('rec');
}

// Bài luyện nghe phân biệt
function runQuiz(root, group) {
  const box = $('#quiz', root);
  let qs;
  if (group === 'tone') {
    const syls = shuffle(Object.entries(SYL).filter(([, c]) => !c.includes('-'))).slice(0, 10);
    qs = syls.map(([s, c]) => { const t = Math.random() * 4 | 0; const opts = [1, 2, 3, 4].map(n => { try { return PP().convert(s.replace(/v/g, 'ü') + n, { format: 'numToSymbol' }); } catch { return s + n; } }); return { say: c[t], opts, ans: t, tip: `${c[t]} – ${opts[t]}` }; });
  } else {
    const groups = group === 'all' ? PAIRS : [PAIRS[+group]];
    const rows = shuffle(groups.flatMap(g => g.p.map(r => ({ r, t: g.t }))));
    qs = Array.from({ length: 10 }, (_, i) => { const { r, t } = rows[i % rows.length]; const k = Math.random() * r.length | 0; const opts = r.map(x => x[1]); return { say: r[k][0], opts, ans: k, tip: `${r[k][0]} – ${r[k][1]} (${t})` }; });
  }
  let i = 0, score = 0;
  const draw = () => {
    if (i >= qs.length) {
      box.innerHTML = `<div class="pr-qend"><b>${score}/${qs.length}</b><p>${score >= 9 ? 'Tai bạn rất tốt!' : score >= 6 ? 'Khá tốt, luyện thêm các cặp còn nhầm.' : 'Hãy nghe lại các cặp âm bên dưới rồi thử lại.'}</p><button class="btn" id="qAgain">Làm lượt mới</button></div>`;
      $('#qAgain', box).onclick = () => runQuiz(root, group); logActivity(2); return;
    }
    const q = qs[i];
    box.innerHTML = `<div class="pr-q"><div class="pr-qtop"><span>Câu ${i + 1}/${qs.length}</span><span>Đúng ${score}</span></div>
      <button class="big-say" id="qPlay">${icon('vol')} Nghe</button>
      <div class="pr-qopts">${q.opts.map((o, k) => `<button class="opt" data-k="${k}"><kbd>${k + 1}</kbd>${esc(o)}</button>`).join('')}</div><div class="pr-qfb"></div></div>`;
    const play = () => speak(q.say, { rate: 0.85 });
    $('#qPlay', box).onclick = play; setTimeout(play, 200);
    $$('.opt', box).forEach(b => b.onclick = () => {
      if ($('.opt:disabled', box)) return;
      const k = +b.dataset.k, ok = k === q.ans; if (ok) score++;
      $$('.opt', box).forEach(x => { x.disabled = true; if (+x.dataset.k === q.ans) x.classList.add('ok'); });
      if (!ok) b.classList.add('bad');
      $('.pr-qfb', box).innerHTML = `<p class="${ok ? 'ok-t' : 'bad-t'}">${ok ? 'Đúng!' : 'Chưa đúng.'} <span lang="zh-CN">${esc(q.tip)}</span></p><button class="btn" id="qNext">Câu tiếp</button>`;
      $('#qNext', box).onclick = () => { i++; draw(); };
    });
  };
  draw();
  box.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
