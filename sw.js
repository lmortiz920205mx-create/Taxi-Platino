// Cambia el número de versión cada vez que hagas cambios en el HTML
const CACHE_NAME = 'taxi-platino-v1.1'; 

const urlsToCache = [
  './',
  './index.html',
  './logo.png',
  './manifest.json'
];

// Instalación: Guardamos los archivos en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Archivos en caché');
        return cache.addAll(urlsToCache);
      })
  );
  // Fuerza al SW a activarse inmediatamente
  self.skipWaiting(); 
});

// Activación: Borramos cachés viejos (v1, v1.1, etc.)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Borrando caché viejo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Toma control de la página inmediatamente sin recargar
  self.clients.claim();
});

// Intercepción: Servir desde caché, si no hay internet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si está en caché, lo devuelve. Si no, lo busca en la red.
        return response || fetch(event.request);
      })
  );
});
