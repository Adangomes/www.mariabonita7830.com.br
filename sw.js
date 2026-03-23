// Nome do cache - mude o v1 para v2 sempre que fizer uma atualização grande no código
const CACHE_NAME = 'mydi-cache-v1';

// Arquivos essenciais para cache inicial (Offline básico)
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
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Evento de ativação: Limpa caches antigos para evitar bugs de versão
self.addEventListener('activate', (event) => {
  console.log('[SW] Ativando Service Worker e limpando caches antigos...');
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[SW] Removendo cache antigo:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Intercepta requisições
self.addEventListener('fetch', (event) => {
  // PULA requisições para o Firebase e Google para não quebrar o banco de dados em tempo real
  if (event.request.url.includes('firebase') || event.request.url.includes('google')) {
    return; 
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      
      // 1. Se estiver no cache, retorna a resposta salva
      if (cachedResponse) {
        return cachedResponse;
      }

      // 2. Senão, busca na rede
      return fetch(event.request)
        .then((response) => {
          // Verifica se a resposta é válida antes de salvar no cache
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clona a resposta para salvar uma cópia no cache e enviar a outra para o navegador
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });

          return response;
        })
        .catch(() => {
          // Se estiver sem internet e a página não estiver no cache, redireciona para o index
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
    })
  );
});
