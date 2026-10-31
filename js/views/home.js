import { store, streak, dueWords, today } from '../core/store.js';
import { lessonsOf, hskWords } from '../core/dict.js';
import { esc, wordCard, writer, gridSvg } from '../core/ui.js';
import { VOCAB } from '../data/vocab.js';

export function levelProgress(lv) {
  const ls = lessonsOf(lv); const done = ls.filter(l => store.s.lessons[l.idx]?.done).length;
  return { done, total: ls.length, pct: Math.round(done / ls.length * 100) };
}

export function home(root) {
  const s = store.s;
  const due = dueWords().length;
  const learned = Object.keys(s.srs).length;
  const lessonsDone = Object.values(s.lessons).filter(l => l.done).length;
  const hsk = VOCAB.filter(v => v.source === 'hsk');
  const wod = hsk[Number(today().replace(/-/g, '')) % hsk.length];
  const next = (() => { for (const lv of [1, 2, 3]) for (const l of lessonsOf(lv)) if (!s.lessons[l.idx]?.done) return l; return null; })();
  const todayCount = s.activity[today()] || 0;
  root.innerHTML = `
  <section class="hero">
    <div class="hero-text">
      <h1>${s.profile.name ? `Chào ${esc(s.profile.name)}, hôm nay mình học gì?` : 'Học để nói được, không chỉ để thuộc từ.'}</h1>
      <p class="lead">Tiếng Trung phổ thông từ con số 0 đến HSK 3, giải thích bằng tiếng Việt. Mỗi bài kết thúc bằng một nhiệm vụ nói và viết về chủ đề thật. Bấm vào chữ Hán bất kỳ để xem nghĩa, pinyin và nghe phát âm.</p>
      ${s.profile.name ? '' : `<form class="name-form" id="nameF"><input class="inp" id="nm" placeholder="Tên của bạn" maxlength="30" aria-label="Tên của bạn"><button class="btn">Lưu tên</button></form>`}
      <div class="row gap wrap hero-cta">
        ${s.last ? `<a class="btn" href="${esc(s.last.route)}">Tiếp tục: ${esc(s.last.title)}</a>` : `<a class="btn" href="#/pinyin">Bắt đầu từ phát âm</a><a class="btn ghost" href="#/lesson/0">Vào bài 1</a>`}
        <a class="btn ghost" href="#/placement">Kiểm tra trình độ</a>
      </div>
    </div>
    <figure class="hero-grid" aria-label="Chữ Hán đang được viết từng nét">
      <div class="tzg">${gridSvg()}<div class="tzg-w" id="heroW"></div></div>
      <figcaption id="heroCap"></figcaption>
    </figure>
  </section>

  <section class="stats" aria-label="Tiến độ của bạn">
    <div class="stat"><b>${streak()}</b><span>ngày học liên tiếp</span></div>
    <div class="stat"><b>${todayCount}<small>/${s.profile.goal}</small></b><span>hoạt động hôm nay</span></div>
    <a class="stat link" href="#/review"><b>${due}</b><span>từ đến hạn ôn</span></a>
    <div class="stat"><b>${learned}</b><span>từ đã gặp</span></div>
    <div class="stat"><b>${lessonsDone}</b><span>bài đã xong</span></div>
  </section>

  <div class="grid2 home-main">
    <section class="card">
      <h2>Lộ trình HSK</h2>
      ${[1, 2, 3].map(lv => { const p = levelProgress(lv); return `<a class="lv-row" href="#/course/${lv}"><span class="lv-badge lv${lv}">HSK ${lv}</span><span class="lv-info"><span>${p.done}/${p.total} bài · ${hskWords(lv).length} từ</span><span class="bar"><i style="width:${p.pct}%"></i></span></span><span class="chev">›</span></a>`; }).join('')}
      ${next ? `<p class="next-up">Bài tiếp theo<a href="#/lesson/${next.idx}"><b>HSK ${next.level} · Bài ${next.no}</b> ${esc(next.t)}</a></p>` : '<p>Bạn đã hoàn thành toàn bộ HSK 1–3!</p>'}
    </section>
    <section class="card wod">
      <h2>Từ của ngày</h2>
      ${wordCard(wod.h)}
    </section>
  </div>

  <section>
    <h2 class="sec">Chọn cách học</h2>
    <div class="paths">
      ${[
        ['#/pinyin', '音', 'Luyện phát âm', 'Bài 0: thanh điệu, thanh mẫu, vận mẫu'],
        ['#/course/1', '学', 'Học từ đầu', 'Theo thứ tự bài HSK 1 → 3'],
        ['#/placement', '测', 'Kiểm tra đầu vào', 'Biết mình đang ở đâu, nên học bài nào'],
        ['#/vocab', '词', 'Từ vựng', 'Tra từ, nhóm chủ đề, thứ tự nét viết'],
        ['#/grammar', '法', 'Ngữ pháp', 'Thư viện cấu trúc HSK 1–3'],
        ['#/speaking', '说', 'Luyện nói theo chủ đề', '32 bài nói mẫu, ghi âm chấm từng chữ'],
        ['#/listen', '听', 'Luyện nghe với file của bạn', 'Tải mp3, xem nội dung nghe, làm câu hỏi'],
        ['#/review', '复', 'Ôn tập', 'Thẻ ghi nhớ lặp lại ngắt quãng'],
        ['#/exam', '考', 'Thi thử HSK', 'Đề đúng cấu trúc HSK 1, 2, 3 có tính giờ'],
        ['#/community', '友', 'Góc đóng góp', 'Thêm ví dụ, mẹo, hội thoại của riêng bạn'],
      ].map(([h, c, t, d]) => `<a class="path" href="${h}"><span class="pi" lang="zh-CN">${c}</span><span><b>${t}</b><small>${d}</small></span></a>`).join('')}
    </div>
  </section>`;
  heroWriter(root);
  const f = root.querySelector('#nameF');
  if (f) f.onsubmit = e => { e.preventDefault(); const v = root.querySelector('#nm').value.trim(); if (v) { store.update(s => s.profile.name = v); home(root); } };
  return 'Trang chủ';
}

// Chữ Hán tự viết từng nét trong ô 田字格 ở đầu trang
const HERO = [['学', 'xué', 'học'], ['说', 'shuō', 'nói'], ['汉', 'hàn', 'Hán'], ['写', 'xiě', 'viết'], ['读', 'dú', 'đọc']];
function heroWriter(root) {
  const el = root.querySelector('#heroW'), cap = root.querySelector('#heroCap'); if (!el) return;
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let i = 0;
  const caption = () => { const [c, p, v] = HERO[i]; cap.innerHTML = `<span lang="zh-CN">${c}</span> <span class="py">${p}</span> ${v}`; };
  const size = Math.min(240, el.clientWidth || 240);
  const w = writer(el, HERO[0][0], { size, showCharacter: still, extra: { padding: 14, strokeAnimationSpeed: 0.9, delayBetweenStrokes: 160, showOutline: true } });
  caption();
  if (!w || still) return;
  const run = () => {
    if (!el.isConnected) return;
    w.animateCharacter({ onComplete: () => setTimeout(() => {
      if (!el.isConnected) return;
      i = (i + 1) % HERO.length; caption();
      w.setCharacter(HERO[i][0]).then(() => { w.hideCharacter(); setTimeout(run, 250); });
    }, 1800) });
  };
  setTimeout(run, 300);
}
