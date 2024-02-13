
/* Add SDKs for Firebase products that you want to use:
// https://firebase.google.com/docs/web/setup#available-libraries
// https://firebase.google.com/docs/web/learn-more#libraries-cdn
*/

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAt68EIrYaoJbNAp8hWvaQ9Tx2vQ58giM4",
  authDomain: "notduo-99e30.firebaseapp.com",
  databaseURL: "https://notduo-99e30-default-rtdb.firebaseio.com",
  projectId: "notduo-99e30",
  storageBucket: "notduo-99e30.appspot.com",
  messagingSenderId: "644883802257",
  appId: "1:644883802257:web:93ec198aa9ed7141597730"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);


console.log(database);