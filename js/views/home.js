import { store, streak, dueWords, today } from '../core/store.js';
import { lessonsOf, hskWords } from '../core/dict.js';
import { esc, wordCard } from '../core/ui.js';
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
      <p class="eyebrow">Học tiếng Trung từ HSK 1 đến HSK 3</p>
      <h1>${s.profile.name ? `Chào ${esc(s.profile.name)}, hôm nay học gì nào?` : 'Học để <em>nói được</em>, không chỉ để thuộc từ.'}</h1>
      <p class="lead">Mỗi bài kết thúc bằng một nhiệm vụ nói và viết về chủ đề thật. Bấm vào bất kỳ chữ Hán nào để xem nghĩa, pinyin và nghe phát âm.</p>
      ${s.profile.name ? '' : `<form class="name-form" id="nameF"><input class="inp" id="nm" placeholder="Tên của bạn" maxlength="30" aria-label="Tên của bạn"><button class="btn">Bắt đầu</button></form>`}
      <div class="row gap wrap">
        ${s.last ? `<a class="btn" href="${esc(s.last.route)}">Tiếp tục: ${esc(s.last.title)}</a>` : `<a class="btn" href="#/lesson/0">Học bài đầu tiên</a>`}
        <a class="btn ghost" href="#/placement">Kiểm tra trình độ</a>
      </div>
    </div>
    <div class="hero-seal" aria-hidden="true"><div class="seal">汉<br>语</div></div>
  </section>

  <section class="stats">
    <div class="stat"><b>${streak()}</b><span>ngày liên tiếp</span></div>
    <div class="stat"><b>${todayCount}/${s.profile.goal}</b><span>hoạt động hôm nay</span></div>
    <a class="stat link" href="#/review"><b>${due}</b><span>từ cần ôn</span></a>
    <div class="stat"><b>${learned}</b><span>từ đã gặp</span></div>
    <div class="stat"><b>${lessonsDone}</b><span>bài hoàn thành</span></div>
  </section>

  <div class="grid2">
    <section class="card">
      <h2>Lộ trình HSK</h2>
      ${[1, 2, 3].map(lv => { const p = levelProgress(lv); return `<a class="lv-row" href="#/course/${lv}"><span class="lv-badge lv${lv}">HSK ${lv}</span><span class="lv-info"><span>${p.done}/${p.total} bài · ${hskWords(lv).length} từ</span><span class="bar"><i style="width:${p.pct}%"></i></span></span><span class="chev">›</span></a>`; }).join('')}
      ${next ? `<p class="muted">Bài tiếp theo: <a href="#/lesson/${next.idx}">HSK ${next.level} · Bài ${next.no}: ${esc(next.t)}</a></p>` : '<p>Bạn đã hoàn thành toàn bộ HSK 1–3! 🎉</p>'}
    </section>
    <section class="card">
      <h2>Từ của ngày</h2>
      ${wordCard(wod.h)}
    </section>
  </div>

  <section>
    <h2 class="sec">Chọn cách học</h2>
    <div class="paths">
      ${[
        ['#/course/1', '📘', 'Học từ đầu', 'Theo thứ tự bài HSK 1 → 3'],
        ['#/placement', '🎯', 'Kiểm tra đầu vào', 'Xác định trình độ và gợi ý bài phù hợp'],
        ['#/vocab', '🀄', 'Học riêng từ vựng', 'Tra từ, nhóm chủ đề, nét viết'],
        ['#/grammar', '🧩', 'Học riêng ngữ pháp', `Thư viện cấu trúc HSK 1–3`],
        ['#/practice/speak', '🗣️', 'Giao tiếp theo chủ đề', 'Luyện nói, phản xạ và phát âm'],
        ['#/review', '🔁', 'Ôn kiến thức đã quên', 'Thẻ ghi nhớ lặp lại ngắt quãng'],
        ['#/exam', '📝', 'Luyện thi HSK', 'Đề thi thử có tính giờ'],
        ['#/community', '🤝', 'Góc đóng góp', 'Thêm từ, ví dụ, mẹo của riêng bạn'],
      ].map(([h, i, t, d]) => `<a class="path" href="${h}"><span class="pi">${i}</span><b>${t}</b><small>${d}</small></a>`).join('')}
    </div>
  </section>`;
  const f = root.querySelector('#nameF');
  if (f) f.onsubmit = e => { e.preventDefault(); const v = root.querySelector('#nm').value.trim(); if (v) { store.update(s => s.profile.name = v); home(root); } };
  return 'Trang chủ';
}
