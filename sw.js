const CACHE_NAME = 'taxi-platino-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  // Si tienes el logo, agrégalo aquí:
  // './logo.png' 
];

// Instalación: Guardar archivos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cacheando archivos...');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

// Activación: Limpiar caches viejas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
});

// Fetch: Servir desde cache si no hay red
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Si está en caché, lo devuelve. Si no, lo pide a internet.
        return response || fetch(event.request);
      })
  );
});
