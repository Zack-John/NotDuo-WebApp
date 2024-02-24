
/* Add SDKs for Firebase products that you want to use:
// https://firebase.google.com/docs/web/setup#available-libraries
// https://firebase.google.com/docs/web/learn-more#libraries-cdn
*/


// Import the functions we need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, set, get, update, remove, ref, child} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging.js"


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

// Initialize & Get Ref to Firebase App, Database
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const messaging = getMessaging(app);

const VAPID_KEY = "BOH7kSCrXtzjNhv1kcNigNTWTd9ulRz_T2QLzAHlHRVZiNOWfYRilGkMVM-dt0Waq9XbW-ENwm4Iqb_dTQjW6sc";

var enterUsername = document.querySelector("#enterUsername");
var enterFirstname = document.querySelector("#enterFirstname");
var enterLastname = document.querySelector("#enterLastname");
var enterPassword = document.querySelector("#enterPassword");

var insertButton = document.querySelector("#insertButton");
var findButton = document.querySelector("#findButton");

// add button event listeners
insertButton.addEventListener('click', InsertData); // create account
findButton.addEventListener('click', FindData);     // sign in


// Create Account:
// user enters details and creates account
// device token is saved
// insert all data, including device token, in db

// Sign In:
// user enters details and clicks 'sign in' button
// app queries db for account folder
// if it DOES exist, send notification to stored device
// if it DOES NOT exist, alert 'no account found'


/*----- FUNCTIONS -----*/

//--- Create Account
function InsertData() {

  // saveMessagingDeviceToken();

  // hash password
  hash(enterPassword.value)
  .then((hex) => set(ref(database, "Users/" + enterUsername.value), {
    username: enterUsername.value,
    firstName: enterFirstname.value,
    lastName: enterLastname.value,
    passwordHash: hex
  }))
  .then(()=>{
    alert("Account Succesfully Created! (Data inserted)")
  })
  .catch((error)=>{
    alert(error)
  });
}


//--- Sign In
function FindData() {
  // store ref to db
  var dbref = ref(database);

  // get snapshot of the bucket we're after
  get(child(dbref, "Users/" + enterUsername.value))
  .then((snapshot)=>{
    if (snapshot.exists()) {

      // hash input password
      hash(enterPassword.value)

      // check if the hashes match
      .then((hex) => {
        console.log("input hash: " + hex);
        console.log("stored hash: " + snapshot.val().passwordHash);

        if (hex == snapshot.val().passwordHash) {
          // TODO: actual login process goes here; redirect to site, etc
          alert("Welcome back, " + snapshot.val().firstName + "!");
          console.clear();
        }
        else {
          alert ("Incorrect password!");
          console.clear();
        }
      })
    }
    else { alert("No account found :("); }
  })
  .catch((error)=>{
    alert(error);
  })
}


async function hash(string) {
  const utf8 = new TextEncoder().encode(string);
  const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
  .map((bytes) => bytes.toString(16).padStart(2, '0'))
  .join('');

  return hashHex;
}

// get FCM device token from device, store in db
async function saveMessagingDeviceToken() {

  const fcmToken = await getToken(messaging, { vapidKey: VAPID_KEY});

  if (fcmToken) {
    console.log("got FCM device token: ", fcmToken);
    // save device token to db
  }
}