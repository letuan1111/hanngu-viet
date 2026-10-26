import { store, streak, masteryOf, dueWords } from '../core/store.js';
import { lessonsOf, entry, LESSON_LIST } from '../core/dict.js';
import { esc, $, $$, toast, applyDisplay, say } from '../core/ui.js';
import { zhVoices, speak, ttsSupported, SR, voiceLabel } from '../core/tts.js';
import { levelProgress } from './home.js';
import { CURRICULUM } from '../data/lessons.js';

export function progress(root) {
  const s = store.s;
  const days = [...Array(14)].map((_, i) => { const d = new Date(); d.setDate(d.getDate() - 13 + i); const k = d.toLocaleDateString('sv'); return [k, s.activity[k] || 0, d]; });
  const max = Math.max(5, ...days.map(d => d[1]));
  const buckets = [0, 0, 0]; Object.keys(s.srs).forEach(h => { const m = masteryOf(h); if (m) buckets[m - 1]++; });
  const weak = Object.entries(s.srs).filter(([h]) => entry(h)).sort((a, b) => b[1].lapses - a[1].lapses).filter(x => x[1].lapses > 0).slice(0, 12);
  const skills = Object.entries(s.skill);
  root.innerHTML = `<div class="page-head"><h1>Tiến độ học tập</h1></div>
  <section class="stats">
    <div class="stat"><b>${streak()}</b><span>ngày liên tiếp</span></div>
    <div class="stat"><b>${Object.values(s.lessons).filter(l => l.done).length}/${LESSON_LIST.length}</b><span>bài hoàn thành</span></div>
    <div class="stat"><b>${Object.keys(s.srs).length}</b><span>từ đang ôn</span></div>
    <div class="stat"><b>${dueWords().length}</b><span>đến hạn hôm nay</span></div>
    <div class="stat"><b>${s.journal.length}</b><span>bài viết</span></div>
  </section>
  <div class="grid2">
    <section class="card"><h2>Theo cấp độ</h2>${[1, 2, 3].map(l => { const p = levelProgress(l); return `<a class="lv-row" href="#/course/${l}"><span class="lv-badge lv${l}">HSK ${l}</span><span class="lv-info"><span>${p.done}/${p.total} bài</span><span class="bar"><i style="width:${p.pct}%"></i></span></span></a>`; }).join('')}</section>
    <section class="card"><h2>Hoạt động 14 ngày</h2><div class="chart">${days.map(([k, v, d]) => `<div class="col" title="${k}: ${v}"><i style="height:${v / max * 100}%"></i><small>${d.getDate()}</small></div>`).join('')}</div></section>
    <section class="card"><h2>Mức độ ghi nhớ từ vựng</h2>
      ${[['Mới học (< 3 ngày)', buckets[0]], ['Đang nhớ (3–20 ngày)', buckets[1]], ['Nhớ lâu (≥ 21 ngày)', buckets[2]]].map(([n, v]) => `<div class="lv-row"><span>${n}</span><span class="lv-info"><span>${v} từ</span><span class="bar"><i style="width:${Object.keys(s.srs).length ? v / Object.keys(s.srs).length * 100 : 0}%"></i></span></span></div>`).join('')}</section>
    <section class="card"><h2>Năng lực theo kỹ năng</h2>${skills.length ? skills.map(([k, [a, b]]) => `<div class="lv-row"><span>${esc(k)}</span><span class="lv-info"><span>${Math.round(a / b * 100)}% · ${b} câu</span><span class="bar"><i style="width:${a / b * 100}%"></i></span></span></div>`).join('') : '<p class="muted">Làm bài tập để hệ thống đánh giá kỹ năng của bạn.</p>'}</section>
    <section class="card"><h2>Từ hay quên</h2>${weak.length ? `<div class="chips">${weak.map(([h, c]) => `<span class="chip" data-w="${esc(h)}">${esc(h)} <small>${c.lapses}×</small></span>`).join('')}</div><a class="btn sm" href="#/review/hard">Ôn từ khó</a>` : '<p class="muted">Chưa có dữ liệu.</p>'}</section>
    <section class="card"><h2>Bài kiểm tra gần đây</h2>${s.tests.length ? `<table class="tbl">${s.tests.slice(-8).reverse().map(t => `<tr><td>${new Date(t.at).toLocaleDateString('vi')}</td><td>${t.kind === 'exam' ? 'Thi thử' : t.kind === 'chapter' ? `Chương ${t.ch + 1}` : 'Bài học'} HSK ${t.level}</td><td>${Math.round(t.score / t.total * 100)}%</td></tr>`).join('')}</table>` : '<p class="muted">Chưa làm bài kiểm tra nào.</p>'}</section>
  </div>
  <section class="card"><h2>Sao lưu dữ liệu</h2><p class="muted small">Toàn bộ tiến độ được lưu trong trình duyệt này. Hãy xuất tệp sao lưu để chuyển sang máy khác hoặc phòng khi xóa dữ liệu trình duyệt.</p>
    <div class="row gap wrap"><button class="btn" id="bk">Xuất sao lưu</button><label class="btn ghost">Khôi phục từ tệp<input type="file" id="rs" accept=".json" hidden></label></div></section>`;
  $('#bk', root).onclick = () => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([store.export()], { type: 'application/json' })); a.download = `hanngu-viet-sao-luu-${new Date().toLocaleDateString('sv')}.json`; a.click(); };
  $('#rs', root).onchange = async e => { const f = e.target.files[0]; if (!f) return; try { store.import(await f.text()); toast('Đã khôi phục dữ liệu'); progress(root); } catch { toast('Tệp không hợp lệ', 'bad'); } };
  return 'Tiến độ';
}

export function settings(root) {
  const st = store.s.settings;
  const radio = (name, opts) => `<div class="seg">${opts.map(([v, n]) => `<label><input type="radio" name="${name}" value="${v}" ${String(st[name]) === String(v) ? 'checked' : ''}><span>${n}</span></label>`).join('')}</div>`;
  const vs = zhVoices();
  root.innerHTML = `<div class="page-head"><h1>Cài đặt</h1></div>
  <section class="card"><h2>Chế độ hiển thị câu</h2>
    <div class="set"><b>Chữ Hán</b>${radio('hanzi', [[true, 'Hiện'], [false, 'Ẩn (chỉ nghe/đọc pinyin)']])}</div>
    <div class="set"><b>Pinyin</b>${radio('pinyin', [['above', 'Trên mỗi chữ'], ['line', 'Dòng riêng dưới câu'], ['tap', 'Ẩn, bấm để hiện'], ['off', 'Tắt – tự đọc']])}</div>
    <div class="set"><b>Nghĩa tiếng Việt</b>${radio('meaning', [['show', 'Hiện dưới câu'], ['tap', 'Ẩn, bấm để hiện'], ['off', 'Tắt']])}</div>
    <div class="set"><b>Cách hiển thị</b>${radio('split', [[false, 'Cả câu liền mạch'], [true, 'Tách từng từ kèm nghĩa']])}</div>
    <div class="set"><b>Phông chữ Hán</b>${radio('zhFont', [['kai', '楷 Khải thư (chuẩn SGK)'], ['song', '宋 Tống thể'], ['hei', '黑 Hắc thể']])}</div>
    <div class="set"><b>Cỡ chữ Hán</b>${radio('fontSize', [[0.9, 'Nhỏ'], [1, 'Vừa'], [1.2, 'Lớn'], [1.45, 'Rất lớn']])}</div>
    <div class="set"><b>Giao diện</b>${radio('theme', [['auto', 'Theo hệ thống'], ['light', 'Sáng'], ['dark', 'Tối']])}</div>
    <div class="preview card">${'<div class="sent" data-zh="我喜欢学习汉语。"><div class="sent-body"><div class="zh"></div><div class="py-line"></div><div class="vi">Tôi thích học tiếng Trung.</div></div></div>'}</div>
    <p class="muted small">Mẹo: chế độ “tự kiểm tra” = Pinyin “Ẩn, bấm để hiện” + Nghĩa “Ẩn, bấm để hiện”.</p>
  </section>
  <section class="card"><h2>Giọng đọc tiếng Trung</h2>
    ${!ttsSupported() ? '<p class="bad-t">Trình duyệt không hỗ trợ đọc giọng nói.</p>' : vs.length ? `
      <div class="set"><b>Giọng chính (vai A)</b><select class="inp" id="v1"><option value="">Tự chọn tốt nhất</option>${vs.map(v => `<option value="${esc(v.name)}" ${v.name === st.voice ? 'selected' : ''}>${esc(voiceLabel(v))}</option>`).join('')}</select><button class="btn sm ghost" data-test="0">Nghe thử</button></div>
      <div class="set"><b>Giọng thứ hai (vai B)</b><select class="inp" id="v2"><option value="">Tự chọn</option>${vs.map(v => `<option value="${esc(v.name)}" ${v.name === st.voice2 ? 'selected' : ''}>${esc(voiceLabel(v))}</option>`).join('')}</select><button class="btn sm ghost" data-test="1">Nghe thử</button></div>`
      : `<p class="note">Chưa tìm thấy giọng tiếng Trung trên thiết bị. Cách khắc phục: dùng <b>Microsoft Edge</b> (có sẵn giọng tự nhiên “Xiaoxiao Online”), hoặc <b>Chrome</b> (giọng Google 普通话), hoặc cài gói ngôn ngữ Tiếng Trung (giản thể) trong Cài đặt Windows → Thời gian & ngôn ngữ → Giọng nói. Trên iPhone: Cài đặt → Trợ năng → Nội dung được đọc → Giọng nói → Tiếng Trung.</p>`}
    <div class="set"><b>Tốc độ mặc định</b>${radio('rate', [[0.75, '0.75x'], [1, '1.0x'], [1.25, '1.25x']])}</div>
    <p class="muted small">Chất lượng giọng phụ thuộc vào trình duyệt và hệ điều hành. Giọng có chữ “Natural/Online” thường tự nhiên nhất. Nhận dạng giọng nói (luyện phát âm): ${SR ? 'có hỗ trợ ✓' : 'chưa hỗ trợ trên trình duyệt này – dùng Chrome hoặc Edge'}.</p>
  </section>
  <section class="card"><h2>Hồ sơ & mục tiêu</h2>
    <div class="set"><b>Tên</b><input class="inp" id="nm" value="${esc(store.s.profile.name)}" maxlength="30"></div>
    <div class="set"><b>Mục tiêu mỗi ngày</b><select class="inp" id="goal">${[10, 20, 40, 60].map(n => `<option ${n === store.s.profile.goal ? 'selected' : ''} value="${n}">${n} hoạt động</option>`).join('')}</select></div>
    <div class="set"><b>Chương trình</b><span>${esc(CURRICULUM.version)}</span></div>
    <p class="muted small">${esc(CURRICULUM.note)} Hệ thống dữ liệu được thiết kế để có thể bổ sung giáo trình HSK 3.0 (9 cấp) trong các phiên bản sau.</p>
  </section>
  <section class="card"><h2>Dữ liệu</h2><p class="muted small">Dữ liệu chỉ nằm trên trình duyệt này. Sao lưu tại trang <a href="#/progress">Tiến độ</a>.</p><button class="btn ghost" id="reset">Xóa toàn bộ dữ liệu học</button></section>`;
  const drawPreview = async () => { const { zhTokens } = await import('../core/ui.js'); const { sentencePinyin } = await import('../core/dict.js'); const p = $('.preview .sent', root); $('.zh', p).innerHTML = zhTokens('我喜欢学习汉语。'); $('.py-line', p).textContent = sentencePinyin('我喜欢学习汉语。'); };
  drawPreview();
  root.onchange = e => {
    const t = e.target;
    if (t.type === 'radio') { store.update(s => { let v = t.value; if (v === 'true') v = true; else if (v === 'false') v = false; else if (!isNaN(+v) && t.name !== 'pinyin') v = +v; s.settings[t.name] = v; }); applyDisplay(); drawPreview(); }
    if (t.id === 'v1') store.update(s => s.settings.voice = t.value);
    if (t.id === 'v2') store.update(s => s.settings.voice2 = t.value);
    if (t.id === 'nm') store.update(s => s.profile.name = t.value.trim());
    if (t.id === 'goal') store.update(s => s.profile.goal = +t.value);
  };
  root.onclick = e => {
    const b = e.target.closest('[data-test]'); if (b) speak(+b.dataset.test ? '你好！我叫小明，很高兴认识你。' : '你好！欢迎来到汉语学习网站。', { role: +b.dataset.test });
    if (e.target.id === 'reset' && confirm('Xóa toàn bộ tiến độ, từ đã lưu và đóng góp? Không thể hoàn tác.')) { store.reset(); toast('Đã xóa dữ liệu'); location.hash = '#/'; }
  };
  if (ttsSupported() && !vs.length) setTimeout(() => { if (zhVoices().length && root.isConnected && location.hash === '#/settings') settings(root); }, 800);
  return 'Cài đặt';
}
