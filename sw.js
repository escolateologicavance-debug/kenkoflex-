const CACHE_NAME = 'kenkoflex-pwa-v1';
const urlsToCache = [
'./index.html',
'./manifest.json',
'./logo-192.png',
'./logo-512.png',
'./watermarked_img_979393035786885296.png',
'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
];

// Instalação do Service Worker e cache dos arquivos
self.addEventListener('install', event => {
event.waitUntil(
caches.open(CACHE_NAME)
.then(cache => {
return cache.addAll(urlsToCache);
})
);
});

// Ativação e limpeza de caches antigos
self.addEventListener('activate', event => {
event.waitUntil(
caches.keys().then(cacheNames => {
return Promise.all(
cacheNames.map(cacheName => {
if (cacheName !== CACHE_NAME) {
return caches.delete(cacheName);
}
})
);
})
);
});

// Interceptação de requisições para funcionamento offline
self.addEventListener('fetch', event => {
event.respondWith(
caches.match(event.request)
.then(response => {
return response || fetch(event.request);
})
);
});