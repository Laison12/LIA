
const CACHE_NAME = "lia-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/chat.html",
  "/config.html",
  "/icon192.png",
  "/icon512.png",
  "/aa.css",
  "/app.js"
];

// Instalando SW e cache inicial
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Ativando SW
self.addEventListener("activate", event => {
  console.log("Service Worker ativado.");
});

// Interceptando requisições
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

// Push notification (exemplo)
self.addEventListener("push", event => {
  const data = event.data.json();
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/icon192.png"
    })
  );
});
