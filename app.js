
/* Add SDKs for Firebase products that you want to use:
// https://firebase.google.com/docs/web/setup#available-libraries
// https://firebase.google.com/docs/web/learn-more#libraries-cdn
*/


// Import the functions we need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, set, get, update, remove, ref, child} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { getMessaging, getToken, isSupported, onMessage } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging.js"


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

// Initialize & Get Ref to SDKs
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const messaging = async () => await isSupported() && getMessaging(app);
// ^ call by await messaging() every time a Messaging instance is needed

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


/*----- FUNCTIONS -----*/
// Create Account
function InsertData() {

  // hash password
  hash(enterPassword.value)
  .then((hex) => set(ref(database, "Users/" + enterUsername.value), {
    username: enterUsername.value,
    firstName: enterFirstname.value,
    lastName: enterLastname.value,
    passwordHash: hex
  }))

  .then(()=>{
    saveMessagingDeviceToken(enterUsername.value);
    alert("Account Succesfully Created! (Data inserted)")
  })
  .catch((error)=>{
    alert(error)
  });
}


// Sign In
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
          alert("Welcome back, " + snapshot.val().firstName + "!");
        }
        else {
          alert ("Incorrect password!");
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

async function requestNotificationsPermissions(username) {
  console.log("Requesting notifications permissions...")
  const permission = await Notifcation.requestPermission();
  if (permission === 'granted') {
    await saveMessagingDeviceToken(username);
  }
  else {
    console.log("Unable to get permission to notify");
  }
}

// get FCM device token from device, store in db
async function saveMessagingDeviceToken(username) {

  // store the return value of calling the messaging function at the top (await)
  const msg = await messaging();

  const fcmToken = await getToken(msg, { vapidKey: VAPID_KEY});

  if (fcmToken) {
    console.log("got FCM device token: ", fcmToken);
    await update(ref(database, "Users/" + username), {
      deviceToken: fcmToken
    })
  }
  
  else {
    // need to get permission to show notifications
    requestNotificationsPermissions(username);
  }
}
