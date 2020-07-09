const staticCalculator7 = "Calculator-7";
const assets = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
  "/images/android-chrome-192x192.png",
  "/images/android-chrome-512x512.png",
  "/images/apple-touch-icon.png",
  "/images/cubes.png",
  "/images/favicon.ico",
  "/images/favicon-16x16.png",
  "/images/favicon-32x32.png",
  "/images/type.png",
];

self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(staticCalculator7).then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      return res || fetch(fetchEvent.request);
    })
  );
});
