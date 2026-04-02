importScripts(
  "https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js"
);
// // Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyC9zEEGTgCQqMNgt6glRtnBEFzJ3PXYAKY",
  authDomain: "dropi-8c905.firebaseapp.com",
  projectId: "dropi-8c905",
  storageBucket: "dropi-8c905.firebasestorage.app",
  messagingSenderId: "756666575531",
  appId: "1:756666575531:web:bfda7873909395c5abe5ee",
  measurementId: "G-LPSL9D520G"
};

firebase?.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase?.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
