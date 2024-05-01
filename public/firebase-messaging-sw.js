// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyDiOKg8nl6tURPhrs9w-7P4KHuDReGMNH0",
    authDomain: "esp32-pwa.firebaseapp.com",
    projectId: "esp32-pwa",
    storageBucket: "esp32-pwa.appspot.com",
    messagingSenderId: "7899767448",
    appId: "1:7899767448:web:3a5304c1bfd01b00e066ed",
    measurementId: "G-CB2MR64LH5"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.title,
      icon: 'waterLevel.jpg'
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });