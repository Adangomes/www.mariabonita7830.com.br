const CACHE_NAME = 'mydi-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './imagem/icon-192.png',
  './imagem/icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
