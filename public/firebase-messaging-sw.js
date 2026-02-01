// husin-dashboard/public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDYi2f55FUA0V-GXzaI00",
  projectId: "husin-network",
  messagingSenderId: "809259391323",
  appId: "1:809259391323:web:33d7a9f0",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png' // Add an icon to your public folder
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
