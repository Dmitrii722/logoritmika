/* Минимальный service worker: HTML — network-first, статика — cache-first.
   Новая версия активируется сразу (skipWaiting + clientsClaim). */
var CACHE = 'logoritmika-static-v1';

self.addEventListener('install', function (event) {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); })
      );
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (event) {
  var request = event.request;
  if (request.method !== 'GET') return;

  // Навигация и HTML — всегда сеть в приоритете
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(
      fetch(request).catch(function () {
        return caches.match(request).then(function (r) { return r || Response.error(); });
      })
    );
    return;
  }

  // Статика — cache-first с дозаписью в кэш
  event.respondWith(
    caches.match(request).then(function (cached) {
      return cached || fetch(request).then(function (response) {
        if (response.ok) {
          var clone = response.clone();
          caches.open(CACHE).then(function (cache) { cache.put(request, clone); });
        }
        return response;
      });
    })
  );
});
