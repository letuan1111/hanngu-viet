import { store, setLast } from './core/store.js';
import { applyDisplay, initGlobalEvents, closePop, $, $$ } from './core/ui.js';
import { stopSeq } from './core/tts.js';
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
      window.scrollTo(0, 0);
      root.focus({ preventScroll: true });
      return;
    }
  }
  root.innerHTML = '<div class="empty"><h2>Không tìm thấy trang</h2><a class="btn" href="#/">Về trang chủ</a></div>';
}

applyDisplay();
initGlobalEvents();
store.on(() => applyDisplay());
window.addEventListener('hashchange', render);
render();

// Đổi trang hiển thị bằng phím tắt "/" để tìm từ
document.addEventListener('keydown', e => {
  if (e.key === '/' && !e.target.matches('input,textarea')) { e.preventDefault(); location.hash = '#/vocab'; setTimeout(() => $('#q')?.focus(), 50); }
});
