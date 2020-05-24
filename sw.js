const STATIC_CACHE = 'site-static';
const ASSETS = [
    '/',
    '/index.html',
    '/js/app.js',
    '/css/main.css'
]

// Install Servie Worker
self.addEventListener('install', (evt) => {
    // Handle async
    evt.waitUntil(
        // Cache essentials
        caches.open(STATIC_CACHE)
        .then(cache => {
            cache.addAll(ASSETS)
        })
    )
});

// Activate Service Worker
self.addEventListener('activate', (evt) => {
    console.log("Service Worker activated.")
});

// Fetch Events
self.addEventListener('fetch', (evt) => {
    evt.respondWith(
        caches.match(evt.request)
            .then(cacheRes => {
                return cacheRes || fetch(evt.request);
            })
    )
});