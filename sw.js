// Cambiamos el nombre de la versión para obligar al navegador a actualizar
const CACHE_NAME = 'taxi-platino-v2';

const urlsToCache = [
  './',
  './index.html',
  './logo.png',
  './manifest.json'
];

// 1. INSTALACIÓN: Guarda los archivos nuevos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Abriendo caché');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. ACTIVACIÓN: Borra la caché vieja (la del coche blanco y errores)
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Borrar cachés antiguas
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 3. FETCH: Sirve la app guardada o la busca en internet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si está en caché, lo devuelve, si no, lo busca en la red
        return response || fetch(event.request);
      })
  );
});
