
importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js");


const firebaseConfig = {
    apiKey: "AIzaSyAt68EIrYaoJbNAp8hWvaQ9Tx2vQ58giM4",
    authDomain: "notduo-99e30.firebaseapp.com",
    databaseURL: "https://notduo-99e30-default-rtdb.firebaseio.com",
    projectId: "notduo-99e30",
    storageBucket: "notduo-99e30.appspot.com",
    messagingSenderId: "644883802257",
    appId: "1:644883802257:web:93ec198aa9ed7141597730"
};


firebase.initializeApp(firebaseConfig);
firebase.messaging();

// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);

// ^^^ this instance of firebase messaging is an instance
// of one from the service worker, so its a bit different
// than the one in app.js