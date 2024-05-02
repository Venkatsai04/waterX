
self.addEventListener('push', ()=>{
  self.registration.showNotification('WaterX💧🌊',{
    title: 'Water tank is full! 💧🌊',
    body: 'Turn oof the water tank switch fast!',
    badge: "/badge.png",
    icon: '/badge.png',
    sound: '/test.wav',
  })
})
  self.addEventListener('install', (event) => {
      event.waitUntil(
        caches.open('my-site-cache').then((cache) => {
          // Cache necessary resources for offline access
          return cache.addAll([
            '/',
            
            // Include other static assets (CSS, JS, images) as needed
          ]);
        })
      );
    });
    
    self.addEventListener('fetch', (event) => {
      // Handle requests for cached resources or fallback to network
      // (Consider network-first or cache-first strategies)
    });
    