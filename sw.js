// ASCEND Service Worker — Offline caching for returning students
const CACHE_NAME = 'ascend-v1';
const PRECACHE = [
  '/',
  '/index.html',
  '/courses.html',
  '/explore.html',
  '/contribute.html',
  '/style.css',
  '/pages.css',
  '/explore.css',
  '/js/data.js',
  '/js/app.js',
  '/New_Logo_Top.png',
  '/New_Logo_Bottom.png',
  '/hero-desk.webp',
  '/legacy-art.webp'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  // Network-first for HTML (always get latest), cache-first for assets
  if (e.request.mode === 'navigate') {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request).then(r => r || caches.match('/index.html'))));
  } else {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(resp => {
      if (resp.ok && resp.type === 'basic') {
        const clone = resp.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
      }
      return resp;
    })));
  }
});
