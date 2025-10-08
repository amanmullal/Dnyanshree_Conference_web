// Service Worker for caching and performance optimization
const CACHE_NAME = "magnox-energy-v1";
const urlsToCache = [
  "/",
  "/src/assets/magnox_energy_logo.png",
  "/img/intro-bg.jpg",
  "/img/about.jpg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      return response || fetch(event.request);
    })
  );
});
