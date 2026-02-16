const CACHE_NAME = "mydi-v1";
const ASSETS = [
  "/",
  "/index.html", // ou o nome do seu arquivo principal
  "/manifest.json"
];

// Instala e armazena os arquivos essenciais
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Ativa e limpa caches antigos
self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

// Responde as requisições (Obrigatório para o PWA ser aceito)
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
