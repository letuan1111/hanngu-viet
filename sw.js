// Bộ nhớ đệm để website mở được khi mất mạng (sau lần truy cập đầu tiên)
const CACHE = 'hanngu-viet-v1';
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  // mạng trước, lỗi mạng thì dùng bản đã lưu
  e.respondWith(fetch(req).then(res => {
    if (res.ok && (req.url.startsWith(self.location.origin) || /jsdelivr|gstatic|googleapis/.test(req.url))) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return res;
  }).catch(() => caches.match(req)));
});
