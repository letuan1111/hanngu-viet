import { store, srsAdd } from '../core/store.js';
import { allWords, lookup, entry, search, examplesFor, collocations, confusables, lessonsWithWord, TOPICS, POS, levelLabel, isHan, charPinyin, sentencePinyin, GRAMMAR, hskWords, pick, shuffle } from '../core/dict.js';
import { esc, say, sentence, icon, toast, writer, charInfo, short, $, $$, gridSvg, modal } from '../core/ui.js';
import { MNEMONICS, RADICALS } from '../data/radicals.js';
import { Q, runQuiz } from '../core/quiz.js';
import { logActivity } from '../core/store.js';

const REPO = 'https://github.com/letuan1111/hanngu-viet';

// Đồng nghĩa (~) / trái nghĩa (↔) phổ biến ở HSK 1–3
const ANT = [['大','小'],['多','少'],['冷','热'],['高','矮'],['长','短'],['快','慢'],['远','近'],['贵','便宜'],['胖','瘦'],['新','旧'],['来','去'],['买','卖'],['开','关'],['上','下'],['前面','后面'],['左边','右边'],['早上','晚上'],['哭','笑'],['难','容易'],['饿','饱'],['对','错'],['男','女'],['东','西'],['黑','白'],['年轻','老'],['开始','结束'],['忘记','记得'],['高兴','难过'],['借','还'],['上班','下班'],['起床','睡觉'],['问','回答'],['进','出'],['干净','脏'],['今天','昨天'],['以前','以后'],['高','低'],['安静','热闹']];
const SYN = [['喜欢','爱'],['觉得','认为'],['帮助','帮忙'],['漂亮','美'],['非常','特别'],['经常','总是'],['可以','能'],['想','要'],['告诉','说'],['知道','了解'],['马上','一会儿'],['房间','屋子'],['宾馆','饭店'],['照相机','相机'],['终于','最后'],['已经','早就']];
const rel = (h, list) => list.filter(p => p.includes(h)).map(p => p[0] === h ? p[1] : p[0]).filter(x => entry(x));

export function dictionary(root) {
  const s = store.s;
  root.innerHTML = `<div class="page-head"><h1>Từ vựng</h1><a class="btn sm ghost" href="#/topics">Học theo nhóm chủ đề</a></div>
  <div class="search-box"><input id="q" class="inp big" placeholder="Tìm bằng chữ Hán, pinyin (không cần dấu) hoặc tiếng Việt…" autocomplete="off" aria-label="Tìm từ"></div>
  <div class="filters">
    <div class="chips" id="lv">${[['all', 'Tất cả'], ['1', 'HSK 1'], ['2', 'HSK 2'], ['3', 'HSK 3'], ['extra', 'Mở rộng'], ['community', 'Của bạn'], ['saved', '★ Đã lưu'], ['hard', '⚑ Từ khó']].map(([k, n], i) => `<button class="chip ${i ? '' : 'on'}" data-k="${k}">${n}</button>`).join('')}</div>
    <select id="tp" class="inp sm"><option value="">Mọi chủ đề</option>${Object.entries(TOPICS).map(([k, [n]]) => `<option value="${k}">${n}</option>`).join('')}</select>
  </div>
  <div id="cnt" class="muted small"></div><div id="list" class="wlist"></div><div class="center"><button class="btn ghost" id="more" hidden>Xem thêm</button></div>`;
  let lv = 'all', limit = 80;
  const draw = () => {
    const q = $('#q', root).value; const tp = $('#tp', root).value;
    let ws = q ? search(q) : allWords().sort((a, b) => (a.level || 9) - (b.level || 9));
    ws = ws.filter(w => lv === 'all' ? true : lv === 'saved' ? s.saved[w.h] : lv === 'hard' ? s.hard[w.h] : lv === 'extra' ? w.source === 'extra' : lv === 'community' ? w.source === 'community' : w.level === +lv && w.source === 'hsk');
    if (tp) ws = ws.filter(w => w.topics.includes(tp));
    $('#cnt', root).textContent = `${ws.length} từ`;
    $('#list', root).innerHTML = ws.slice(0, limit).map(w => `<a class="wrow" href="#/word/${encodeURIComponent(w.h)}"><span class="wr-h" lang="zh-CN">${esc(w.h)}</span><span class="wr-p">${esc(w.p)}</span><span class="wr-vi">${esc(w.vi)}</span><span class="badge ${w.source}">${levelLabel(w)}</span><span class="no-pop">${say(w.h)}</span></a>`).join('') || '<p class="muted">Không tìm thấy. Bạn có thể <a href="#/community/add">tự thêm từ mới</a>.</p>';
    $('#more', root).hidden = ws.length <= limit;
  };
  $('#q', root).oninput = () => { limit = 80; draw(); };
  $('#tp', root).onchange = draw;
  $('#lv', root).onclick = e => { const b = e.target.closest('.chip'); if (!b) return; lv = b.dataset.k; $$('#lv .chip', root).forEach(x => x.classList.toggle('on', x === b)); draw(); };
  $('#more', root).onclick = () => { limit += 80; draw(); };
  draw();
  return 'Từ vựng';
}

export function word(root, h) {
  const ws = lookup(h);
  if (!ws.length && ![...h].every(isHan)) { root.innerHTML = `<p>Không tìm thấy “${esc(h)}”.</p>`; return; }
  const w = ws[0] || { h, p: charPinyin(h), vi: '', pos: '', level: 0, source: 'char', topics: [] };
  const s = store.s;
  const ex = examplesFor(h, 8);
  const col = collocations(h);
  const conf = confusables(h);
  const ls = lessonsWithWord(h);
  const ants = rel(h, ANT), syns = rel(h, SYN);
  const gram = GRAMMAR.filter(g => g.key === h || g.formula.includes(h));
  const mistakes = GRAMMAR.flatMap(g => (g.mistakes || []).filter(m => m[0].includes(h) || m[1].includes(h)).map(m => ({ m, g })));
  const tips = s.community.tips.filter(t => t.h === h);
  const chars = [...h].filter(isHan);
  srsSeen(h);
  root.innerHTML = `
  <nav class="crumb"><a href="#/vocab">Từ vựng</a> › ${esc(h)}</nav>
  <section class="word-hero">
    <div class="wh-main"><div class="wh-h" lang="zh-CN">${esc(h)}</div><div class="wh-p">${esc(w.p)}</div>
      <div class="row gap">${say(h, ' Nghe')}${say(h, ' Chậm 0.75x').replace('data-say', 'data-rate="0.75" data-say')}</div></div>
    <div class="wh-info">
      <div class="row gap wrap"><span class="badge ${w.source}">${w.source === 'char' ? 'Chữ đơn' : levelLabel(w)}</span>${w.pos ? `<span class="pos">${esc(POS[w.pos])}</span>` : ''}${w.topics.map(t => TOPICS[t] ? `<a class="chip" href="#/topics/${t}">${TOPICS[t][1]} ${TOPICS[t][0]}</a>` : '').join('')}</div>
      <ol class="meanings">${ws.length ? ws.map(x => `<li><b>${esc(x.vi)}</b>${ws.length > 1 ? ` <span class="muted">(${esc(x.p)}, ${esc(POS[x.pos] || '')})</span>` : ''}</li>`).join('') : `<li class="muted">${esc(charInfo(h).d[6] ? 'Nghĩa (tiếng Anh): ' + charInfo(h).d[6] : 'Chưa có nghĩa')}</li>`}</ol>
      ${w.source === 'community' ? '<p class="note">Từ do bạn đóng góp – chưa được kiểm chứng như từ HSK.</p>' : ''}
      ${w.source === 'extra' ? '<p class="note">Từ mở rộng / tên riêng xuất hiện trong bài, nằm ngoài danh sách HSK 1–3.</p>' : ''}
      <div class="row gap wrap">
        <button class="btn sm ${s.saved[h] ? '' : 'ghost'}" id="bSave">${icon('star')} ${s.saved[h] ? 'Đã lưu' : 'Lưu từ'}</button>
        <button class="btn sm ${s.hard[h] ? '' : 'ghost'}" id="bHard">${icon('flag')} ${s.hard[h] ? 'Từ khó' : 'Đánh dấu khó'}</button>
        <button class="btn sm ghost" id="bSrs">${icon('plus')} ${s.srs[h] ? 'Đang trong danh sách ôn' : 'Thêm vào ôn tập'}</button>
        <button class="btn sm ghost" id="bRep">Báo lỗi nội dung</button>
      </div>
    </div>
  </section>

  <div class="word-grid">
    <section class="card"><h2>Cách dùng</h2>
      <p>${usageText(w)}</p>
      ${gram.length ? `<p>Cấu trúc liên quan: ${gram.map(g => `<a href="#/grammar/${g.id}">${esc(g.name)}</a>`).join(' · ')}</p>` : ''}
      ${syns.length || ants.length ? `<p>${syns.length ? `<b>Đồng nghĩa / gần nghĩa:</b> ${syns.map(x => `<span class="chip" data-w="${x}">${x}</span>`).join(' ')} ` : ''}${ants.length ? `<b>Trái nghĩa:</b> ${ants.map(x => `<span class="chip" data-w="${x}">${x}</span>`).join(' ')}` : ''}</p>` : ''}
      ${col.length ? `<p><b>Kết hợp thường gặp:</b> ${col.map(c => `<span class="chip" data-w="${esc(c.h)}">${esc(c.h)}</span>`).join(' ')}</p>` : ''}
    </section>

    <section class="card span2"><h2>Câu ví dụ <small class="muted">(${ex.length})</small></h2>
      ${ex.length ? ex.map(e => sentence(e.zh, e.vi, { extra: `<div class="src">${esc(e.src)}</div>` })).join('') : ''}
      ${ex.length < 3 ? `<p class="muted">Chưa đủ 3 ví dụ cho từ này. <a href="#/community/example?h=${encodeURIComponent(h)}">Thêm ví dụ của bạn</a></p>` : ''}
    </section>

    <section class="card span2"><h2>Ghi nhớ thông minh & nét viết</h2>
      <div class="chars">${chars.map((c, i) => charBlock(c, i)).join('')}</div>
      ${MNEMONICS[h] && h.length > 1 ? tipList(MNEMONICS[h]) : ''}
      ${tips.length ? `<h3 class="sub">Mẹo của bạn</h3>${tips.map(t => `<div class="tip meo"><span class="tip-tag">Mẹo cá nhân</span>${esc(t.text)}</div>`).join('')}` : ''}
      <form id="tipF" class="row gap"><input class="inp" id="tipIn" placeholder="Viết mẹo ghi nhớ của riêng bạn cho từ này…" maxlength="300"><button class="btn sm">Lưu mẹo</button></form>
      <p class="muted small">Phần “Cấu tạo chữ” dựa trên tư liệu văn tự học (Make Me a Hanzi). Phần “Mẹo liên tưởng” chỉ giúp ghi nhớ, không phải lịch sử chữ viết.</p>
    </section>

    ${conf.length ? `<section class="card"><h2>Dễ nhầm lẫn</h2>${conf.map(c => `<div class="conf"><a href="#/word/${encodeURIComponent(c.h)}" lang="zh-CN">${esc(c.h)}</a> <span class="muted">${esc(c.p)}</span> – ${esc(short(c.vi))} <small class="muted">· ${esc(c.why)}</small></div>`).join('')}</section>` : ''}
    ${mistakes.length ? `<section class="card"><h2>Lỗi thường gặp</h2>${mistakes.slice(0, 4).map(({ m, g }) => `<div class="mist"><div class="wrong" lang="zh-CN">✗ ${esc(m[0])}</div><div class="right" lang="zh-CN">✓ ${esc(m[1])}</div><div class="muted small">${esc(m[2])} <a href="#/grammar/${g.id}">${esc(g.name)}</a></div></div>`).join('')}</section>` : ''}
    <section class="card"><h2>Có trong bài học</h2>${ls.length ? ls.slice(0, 8).map(l => `<a class="lk" href="#/lesson/${l.idx}">HSK ${l.level} · Bài ${l.no}: ${esc(l.t)}</a>`).join('') : '<p class="muted">Chưa xuất hiện trong bài học nào.</p>'}</section>
  </div>`;
  // nét viết
  const writers = chars.map((c, i) => writer($(`#cw${i}`, root), c, { size: 140 }));
  root.onclick = e => {
    const a = e.target.closest('[data-anim]'); if (a) writers[+a.dataset.anim]?.animateCharacter();
    const q = e.target.closest('[data-quiz]'); if (q) { const i = +q.dataset.quiz; const m = $(`#cm${i}`, root); m.textContent = 'Viết từng nét theo thứ tự…'; writers[i]?.quiz({ onComplete: d => { m.textContent = `Xong! Sai ${d.totalMistakes} lần.`; logActivity(); } }); }
  };
  $('#bSave', root).onclick = () => { store.update(s => s.saved[h] ? delete s.saved[h] : s.saved[h] = true); word(root, h); };
  $('#bHard', root).onclick = () => { store.update(s => s.hard[h] ? delete s.hard[h] : s.hard[h] = true); if (store.s.hard[h]) srsAdd(h); word(root, h); };
  $('#bSrs', root).onclick = () => { srsAdd(h); toast('Đã thêm vào ôn tập'); word(root, h); };
  $('#bRep', root).onclick = () => reportDialog(h, w);
  $('#tipF', root).onsubmit = e => { e.preventDefault(); const t = $('#tipIn', root).value.trim(); if (t.length < 4) return; store.update(s => s.community.tips.push({ h, text: t, at: Date.now() })); toast('Đã lưu mẹo'); word(root, h); };
  return `${h} – ${short(w.vi)}`;
}
function srsSeen() {}

function usageText(w) {
  const m = {
    'đg': 'Động từ – thường đứng sau chủ ngữ, trước tân ngữ. Phủ định bằng 不 (hiện tại/thói quen) hoặc 没 (đã xảy ra).',
    t: 'Tính từ – làm vị ngữ trực tiếp, thường có 很 phía trước (không dùng 是). Làm định ngữ: tính từ + 的 + danh từ.',
    d: 'Danh từ – làm chủ ngữ hoặc tân ngữ; khi đếm cần số từ + lượng từ đứng trước.',
    p: 'Phó từ – đứng sau chủ ngữ, trước động từ hoặc tính từ.', n: 'Năng nguyện động từ – đứng trước động từ chính để diễn tả khả năng, mong muốn, sự cần thiết.',
    l: 'Lượng từ – đứng giữa số từ (hoặc 这/那) và danh từ.', s: 'Số từ – kết hợp với lượng từ trước danh từ.', 'đt': 'Đại từ – thay cho danh từ, có thể làm chủ ngữ, tân ngữ.',
    tr: 'Trợ từ – không mang nghĩa từ vựng độc lập, đứng sau từ/câu để biểu thị ngữ pháp hoặc ngữ khí.', gi: 'Giới từ – tạo cụm giới từ đứng trước động từ.',
    lt: 'Liên từ – nối các vế câu.', c: 'Cụm từ / câu giao tiếp – dùng nguyên cụm trong hội thoại.',
  };
  return esc(m[w.pos] || 'Xem các câu ví dụ bên dưới để hiểu cách dùng.');
}
function tipList(list) {
  return list.map(([k, t]) => `<div class="tip ${k}"><span class="tip-tag">${k === 'goc' ? 'Cấu tạo có căn cứ' : 'Mẹo liên tưởng'}</span>${esc(t)}</div>`).join('');
}
function charBlock(c, i) {
  const ci = charInfo(c); const d = ci.d;
  const sem = d[3], pho = d[4];
  const radName = ci.rad ? `${ci.rad[0]} – ${ci.rad[1]}` : '';
  return `<div class="char-b">
    <div class="wgrid sm">${gridSvg()}<div id="cw${i}" class="wtarget"></div></div>
    <div class="row gap center"><button class="mini" data-anim="${i}">${icon('play')} Nét</button><button class="mini" data-quiz="${i}">${icon('brush')} Viết</button></div>
    <div class="wmsg" id="cm${i}"></div>
    <div class="char-info">
      <div><b lang="zh-CN" class="ci-c" data-c="${esc(c)}">${esc(c)}</b> ${esc(charPinyin(c))} ${entry(c) ? `– ${esc(short(entry(c).vi))}` : ''}</div>
      ${d[0] ? `<div><span class="muted">Bộ thủ:</span> <span lang="zh-CN">${esc(d[0])}</span> ${esc(radName)}</div>` : ''}
      ${ci.comps.length ? `<div><span class="muted">Thành phần:</span> ${ci.comps.map(x => `<button class="chip ch" data-c="${esc(x)}">${esc(x)}</button>`).join(' ')}</div>` : ''}
      ${ci.type ? `<div class="tip goc"><span class="tip-tag">Cấu tạo chữ</span>${esc(ci.type)}${sem ? ` · phần nghĩa: <b lang="zh-CN">${esc(sem)}</b>${RADICALS[sem] ? ` (${esc(RADICALS[sem][1])})` : entry(sem) ? ` (${esc(short(entry(sem).vi))})` : ''}` : ''}${pho ? ` · phần âm: <b lang="zh-CN">${esc(pho)}</b> (${esc(charPinyin(pho))})` : ''}</div>` : ''}
      ${MNEMONICS[c] ? tipList(MNEMONICS[c]) : ''}
    </div></div>`;
}
function reportDialog(h, w) {
  const m = modal(`<h3>Báo lỗi nội dung: <span lang="zh-CN">${esc(h)}</span></h3>
    <p class="muted small">Ghi chú được lưu trên trình duyệt của bạn. Nếu muốn báo cho người quản trị website, bấm “Gửi lên GitHub”.</p>
    <select id="rt" class="inp"><option>Sai pinyin</option><option>Sai nghĩa</option><option>Sai ví dụ</option><option>Sai cấp độ HSK</option><option>Khác</option></select>
    <textarea id="rx" class="inp area" rows="3" placeholder="Mô tả lỗi và đề xuất sửa…"></textarea>
    <div class="row gap"><button class="btn" id="rs">Lưu ghi chú</button><a class="btn ghost" id="rg" target="_blank" rel="noopener">Gửi lên GitHub</a></div>`);
  const upd = () => { $('#rg', m).href = `${REPO}/issues/new?title=${encodeURIComponent(`[Báo lỗi] ${h} – ${$('#rt', m).value}`)}&body=${encodeURIComponent(`Từ: ${h} (${w.p})\nNghĩa hiện tại: ${w.vi}\n\nMô tả: ${$('#rx', m).value}`)}`; };
  m.addEventListener('input', upd); upd();
  $('#rs', m).onclick = () => { store.update(s => s.community.reports.push({ h, type: $('#rt', m).value, text: $('#rx', m).value, at: Date.now() })); toast('Đã lưu báo lỗi'); m.remove(); };
}

export function topics(root, key) {
  const all = allWords().filter(w => w.source !== 'extra');
  if (!key) {
    root.innerHTML = `<div class="page-head"><h1>Học từ vựng theo nhóm</h1></div><p class="muted">Mỗi từ chỉ lưu một bản dữ liệu nhưng có thể nằm trong nhiều nhóm.</p>
    <div class="topic-grid">${Object.entries(TOPICS).map(([k, [n, i]]) => { const c = all.filter(w => w.topics.includes(k)).length; return c ? `<a class="topic" href="#/topics/${k}"><span class="ti">${i}</span><b>${n}</b><small>${c} từ</small></a>` : ''; }).join('')}</div>`;
    return 'Nhóm từ vựng';
  }
  const [n, i] = TOPICS[key] || ['?', ''];
  const ws = all.filter(w => w.topics.includes(key)).sort((a, b) => a.level - b.level);
  root.innerHTML = `<nav class="crumb"><a href="#/topics">Nhóm từ</a> › ${esc(n)}</nav>
  <div class="page-head"><h1>${i} ${esc(n)}</h1><div class="row gap"><button class="btn sm" id="tq">Kiểm tra nhanh</button><button class="btn sm ghost" id="ta">${icon('plus')} Thêm tất cả vào ôn tập</button></div></div>
  <div id="tqz"></div>
  ${[1, 2, 3, 9].map(lv => { const g = ws.filter(w => (w.source === 'community' ? 9 : w.level) === lv); return g.length ? `<h3 class="sub">${lv === 9 ? 'Từ bạn đóng góp' : 'HSK ' + lv}</h3><div class="wgrid-list">${g.map(w => `<div class="wtile" data-w="${esc(w.h)}"><div class="wt-h" lang="zh-CN">${esc(w.h)}</div><div class="wt-p">${esc(w.p)}</div><div class="wt-vi">${esc(short(w.vi))}</div><div class="wt-act no-pop">${say(w.h)}<a class="wbtn" href="#/word/${encodeURIComponent(w.h)}" title="Chi tiết">›</a></div></div>`).join('')}</div>` : ''; }).join('')}`;
  $('#ta', root).onclick = () => { ws.forEach(w => srsAdd(w.h)); toast(`Đã thêm ${ws.length} từ`); };
  $('#tq', root).onclick = () => { const pool = ws.length >= 4 ? ws : all; runQuiz($('#tqz', root), pick(ws, 10).map((w, k) => (k % 3 === 0 ? Q.listen : k % 3 === 1 ? Q.meaning : Q.hanzi)(w, pool)), { title: n }); $('#tqz', root).scrollIntoView({ behavior: 'smooth' }); };
  return n;
}
