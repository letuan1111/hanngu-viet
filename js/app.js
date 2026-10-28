import { store, setLast } from './core/store.js';
import { applyDisplay, initGlobalEvents, closePop, $, $$ } from './core/ui.js';
import { stopSeq } from './core/tts.js';
import { _capture, _setPending } from './core/nav.js';
import { home } from './views/home.js';
import { course, lesson, chapterTest } from './views/course.js';
import { dictionary, word, topics } from './views/vocab.js';
import { grammarList, grammarDetail, grammarCompare, checkerView } from './views/grammar.js';
import { review } from './views/review.js';
import { practice } from './views/practice.js';
import { exam, placement } from './views/exam.js';
import { examEdit, examDo } from './views/myexam.js';
import { community } from './views/community.js';
import { progress, settings } from './views/progress.js';
import { hsk500, readings } from './views/hsk500.js';
import { speakingList, speakingItem } from './views/speaking.js';
import { pronounce } from './views/pronounce.js';
import { listenHome, listenItem } from './views/listen.js';

const routes = [
  [/^\/?$/, home, 'Trang chủ'],
  [/^\/pinyin(?:\/([\w-]+))?$/, pronounce, 'Luyện phát âm'],
  [/^\/course(?:\/(\d))?$/, course, 'Khóa học'],
  [/^\/lesson\/(\d+)(?:\/(\w+))?$/, lesson, 'Bài học'],
  [/^\/chapter\/(\d)\/(\d)$/, chapterTest, 'Kiểm tra chương'],
  [/^\/hsk1-500$/, hsk500, 'Bảng 500 từ HSK 1'],
  [/^\/hsk30\/([123])$/, hsk500, 'Bảng từ vựng HSK'],
  [/^\/reading(?:\/([\w-]+))?$/, readings, 'Bài đọc HSK 1'],
  [/^\/speaking$/, speakingList, 'Luyện nói'],
  [/^\/speaking\/(\d+)(?:\/(long))?$/, speakingItem, 'Luyện nói'],
  [/^\/listen$/, r => { listenHome(r); return 'Luyện nghe'; }, 'Luyện nghe'],
  [/^\/listen\/([\w-]+)(?:\/(quiz|type|speak))?$/, (r, id, tab) => { listenItem(r, id, tab || 'text'); return 'Luyện nghe'; }, 'Luyện nghe'],
  [/^\/vocab$/, dictionary, 'Từ vựng'],
  [/^\/word\/(.+)$/, word, 'Từ'],
  [/^\/topics(?:\/(\w+))?$/, topics, 'Nhóm từ'],
  [/^\/grammar$/, grammarList, 'Ngữ pháp'],
  [/^\/grammar\/([\w-]+)$/, grammarDetail, 'Ngữ pháp'],
  [/^\/compare\/([\w-]+)\/([\w-]+)$/, grammarCompare, 'So sánh ngữ pháp'],
  [/^\/check$/, checkerView, 'Kiểm tra câu'],
  [/^\/review(?:\/(\w+))?$/, review, 'Ôn tập'],
  [/^\/practice(?:\/(\w+))?$/, practice, 'Luyện tập'],
  [/^\/exam\/new$/, r => { examEdit(r); return 'Tạo đề thi'; }, 'Tạo đề thi'],
  [/^\/exam\/edit\/([\w-]+)$/, (r, id) => { examEdit(r, id); return 'Đáp án đề thi'; }, 'Đáp án đề thi'],
  [/^\/exam\/(?:do|take)\/([\w-]+)$/, (r, id) => { examDo(r, id); return 'Làm đề thi'; }, 'Làm đề thi'],
  [/^\/exam(?:\/(\d))?$/, exam, 'Thi thử HSK'],
  [/^\/placement$/, placement, 'Kiểm tra đầu vào'],
  [/^\/community(?:\/(\w+))?$/, community, 'Cộng đồng'],
  [/^\/progress$/, progress, 'Tiến độ'],
  [/^\/settings$/, settings, 'Cài đặt'],
];

function render() {
  stopSeq(); closePop();
  const path = (decodeURIComponent(location.hash.replace(/^#/, '')) || '/').split('?')[0];
  const root = $('#view');
  for (const [re, view, title] of routes) {
    const m = path.match(re);
    if (m) {
      root.innerHTML = '';
      root.className = 'view';
      root.onclick = null; root.oninput = null;
      const t = view(root, ...m.slice(1));
      document.title = (t || title) + ' · HànNgữ Việt';
      if (!/^\/(settings|progress)?$/.test(path)) setLast('#' + path, t || title);
      $$('.nav a').forEach(a => a.classList.toggle('on', path === a.getAttribute('href').slice(1) || (a.dataset.match && new RegExp(a.dataset.match).test(path))));
      root.focus({ preventScroll: true });
      afterRender(t || title);
      return;
    }
  }
  // Có thể trình duyệt đang giữ bản cũ của web (chưa có trang mới) → tự xóa bộ nhớ đệm và tải lại một lần
  let tried = false; try { tried = sessionStorage.getItem('hv-reload') === path; } catch {}
  if (!tried) { try { sessionStorage.setItem('hv-reload', path); } catch {} hardReload(); return; }
  root.innerHTML = '<div class="empty"><h2>Không tìm thấy trang</h2><p class="muted">Nếu bạn vừa mở một mục mới, hãy bấm “Tải lại bản mới nhất”.</p><div class="row gap" style="justify-content:center"><button class="btn" id="hvReload">🔄 Tải lại bản mới nhất</button><a class="btn ghost" href="#/">Về trang chủ</a></div></div>';
  $('#hvReload').onclick = hardReload;
}

async function hardReload() {
  try { const ks = await caches.keys(); await Promise.all(ks.map(k => caches.delete(k))); } catch {}
  try { const rs = await navigator.serviceWorker?.getRegistrations?.(); if (rs) await Promise.all(rs.map(r => r.update())); } catch {}
  location.reload();
}
try { if (sessionStorage.getItem('hv-reload') && sessionStorage.getItem('hv-reload') !== location.hash.slice(1)) sessionStorage.removeItem('hv-reload'); } catch {}

applyDisplay();
initGlobalEvents();
store.on(() => applyDisplay());
// ── Quay lại trang trước: nút “← Quay lại” + nhớ vị trí cuộn của từng trang ──
try { history.scrollRestoration = 'manual'; } catch {}
const ss = { get: (k, d) => { try { return JSON.parse(sessionStorage.getItem(k)) ?? d; } catch { return d; } }, set: (k, v) => { try { sessionStorage.setItem(k, JSON.stringify(v)); } catch {} } };
let restoreY = 0, restoreA = '';
// Ghi nhớ phần tử người dùng vừa bấm trong trang (từ, nút ví dụ, link…) để quay lại đúng chỗ đó
let lastAnchor = '';
const cssv = v => String(v).replace(/["\\]/g, '\\$&');
document.addEventListener('click', e => {
  const t = e.target; if (!t.closest || !t.closest('#view')) return;
  const el = t.closest('[data-ex],[data-w],[data-h],[data-unsrs],a[href^="#/"],[data-goto],.lesson-item,.ls-item');
  if (!el) return;
  lastAnchor = el.dataset.ex != null ? `[data-ex="${cssv(el.dataset.ex)}"]` : el.dataset.w != null ? `[data-w="${cssv(el.dataset.w)}"]` : el.dataset.h != null ? `[data-h="${cssv(el.dataset.h)}"]` : el.getAttribute('href') ? `a[href="${cssv(el.getAttribute('href'))}"]` : '';
}, true);
function track(e) {
  const cur = location.hash || '#/', stack = ss.get('hv-stack', []), pos = ss.get('hv-scroll', {});
  if (e && e.oldURL) { const old = '#' + (e.oldURL.split('#')[1] || '/'); pos[old] = { y: window.scrollY, a: lastAnchor, st: _capture() }; ss.set('hv-scroll', pos); }
  lastAnchor = '';
  let back = false;
  if (stack.length > 1 && stack[stack.length - 2].h === cur) { stack.pop(); back = true; }          // bấm quay lại
  else if (!stack.length || stack[stack.length - 1].h !== cur) { stack.push({ h: cur, t: '' }); if (stack.length > 60) stack.shift(); }
  else back = true;                                                                                  // tải lại trang
  const p = back ? pos[cur] : null, rec = typeof p === 'number' ? { y: p } : p || {};
  restoreY = rec.y || 0; restoreA = rec.a || ''; _setPending(back ? rec.st : null);
  ss.set('hv-stack', stack);
}
function afterRender(title) {
  const stack = ss.get('hv-stack', []); if (stack.length) { stack[stack.length - 1].t = title; ss.set('hv-stack', stack); }
  const bar = $('#backBar'), path = location.hash.replace(/^#/, '') || '/';
  if (bar) {
    const prev = stack.length > 1 ? stack[stack.length - 2] : null;
    bar.hidden = path === '/' && !prev;
    bar.innerHTML = `<button class="back-btn" id="hvBack" type="button">← Quay lại</button>${prev && prev.t ? `<span class="back-to">${prev.t.replace(/[<>&]/g, '')}</span>` : ''}`;
    $('#hvBack').onclick = () => { if (prev) history.back(); else { const up = path.replace(/\/[^/]*$/, '') || '/'; location.hash = '#' + (up === path ? '/' : up); } };
  }
  // quay lại: cuộn tới đúng phần tử vừa bấm (từ mới, nút “5 câu”…), nếu không có thì về vị trí cuộn cũ
  const y = restoreY, a = restoreA; restoreY = 0; restoreA = '';
  window.scrollTo(0, y);
  if (!y && !a) return;
  let done = false;
  const go = () => {
    if (done) return;
    let el = null; try { el = a ? $('#view').querySelector(a) : null; } catch {}
    if (el && el.offsetParent !== null) {
      done = true; const r = el.getBoundingClientRect(); window.scrollTo(0, window.scrollY + r.top - window.innerHeight / 3);
      const row = el.closest('tr, .wrow, .sp-row, .ls-line, .lesson-item, .vs-row, li') || el; row.classList.add('back-flash'); setTimeout(() => row.classList.remove('back-flash'), 2200);
    } else if (y && Math.abs(window.scrollY - y) > 40 && document.body.scrollHeight > y) window.scrollTo(0, y);
  };
  [0, 150, 450, 1000].forEach(ms => setTimeout(go, ms));
}
window.addEventListener('hashchange', e => { track(e); render(); });
track(); render();

// Đổi trang hiển thị bằng phím tắt "/" để tìm từ
document.addEventListener('keydown', e => {
  if (e.key === '/' && !e.target.matches('input,textarea')) { e.preventDefault(); location.hash = '#/vocab'; setTimeout(() => $('#q')?.focus(), 50); }
});
