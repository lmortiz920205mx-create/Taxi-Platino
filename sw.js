
const CACHE_NAME = "taxi-platino-20260216080644";
const ASSETS = [
    "./",
    "./index.html",
    "./style.css",
    "./app.js",
    "./data.js",
    "./manifest.json",
    "./logo.png"
];

self.addEventListener("install", e => {
    self.skipWaiting();
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
    );
});

self.addEventListener("activate", e => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(key => key !== CACHE_NAME)
                .map(key => caches.delete(key))
            )
        )
    );
    self.clients.claim();
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(res =>
            res || fetch(e.request).catch(() => caches.match("./index.html"))
        )
    );
});
