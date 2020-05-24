// Install Servie Worker
self.addEventListener('install', (evt) => {
    console.log("Service Worker installed.")
});

// Activate Service Worker
self.addEventListener('activate', (evt) => {
    console.log("Service Worker activated.")
});

// Fetch Events
self.addEventListener('fetch', (evt) => {
    console.log(evt)
});