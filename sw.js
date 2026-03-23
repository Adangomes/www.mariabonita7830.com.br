// Nome do cache
const CACHE_NAME = 'mydi-cache-v4';

// Arquivos essenciais para cache inicial
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './imagem/icon-192.png',
  './imagem/icon-512.png'
];

// Evento de instalação
self.addEventListener('install', (event) => {
  console.log('[SW] Instalando Service Worker e cacheando arquivos...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// Evento de ativação
self.addEventListener('activate', (event) => {
  console.log('[SW] Ativando Service Worker e limpando caches antigos...');
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// Intercepta requisições
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {

      // Se tiver no cache, retorna rápido
      if (cachedResponse) {
        return cachedResponse;
      }

      // Senão, busca da internet
      return fetch(event.request)
        .then((response) => {

          // Não cacheia coisas inválidas
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          const responseClone = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });

          return response;
        })
        .catch(() => {
          return caches.match('./index.html');
        });
    })
  );
});
