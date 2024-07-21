
self.addEventListener('push', ()=>{
  self.registration.showNotification('WaterX💧🌊',{
    title: 'Water tank is full! 💧🌊',
    body: 'Turn of the water tank switch fast!',
    badge: "/badge.png",
    icon: '/badge.png',
    sound: '/test.wav',
  })
})
