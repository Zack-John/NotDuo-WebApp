
/* Add SDKs for Firebase products that you want to use:
// https://firebase.google.com/docs/web/setup#available-libraries
// https://firebase.google.com/docs/web/learn-more#libraries-cdn
*/

// Import the functions we need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, set, get, update, remove, ref, child} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

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

var enterUsername = document.querySelector("#enterUsername");
var enterFirstname = document.querySelector("#enterFirstname");
var enterLastname = document.querySelector("#enterLastname");
var enterPassword = document.querySelector("#enterPassword");

var findUsername = document.querySelector("#findUsername");
var findFirstname = document.querySelector("#findFirstname");
var findLastname = document.querySelector("#findLastname");
var findEmail = document.querySelector("#findEmail");

var insertButton = document.querySelector("#insertButton");
var findButton = document.querySelector("#findButton");

// add button event listeners
insertButton.addEventListener('click', InsertData);
findButton.addEventListener('click', FindData);


/*----- FUNCTION STUFF -----*/


function InsertData() {

  // hash password first
  hash(enterPassword.value)

  // then insert all data to db
  .then((hex) => set(ref(database, "Users/" + enterUsername.value), {
    username: enterUsername.value,
    firstName: enterFirstname.value,
    lastName: enterLastname.value,
    passwordHash: hex
  }))
  .then(()=>{
    alert("Data inserted into the database!")
  })
  .catch((error)=>{
    alert(error)
  });
}

function FindData() {
  // store ref to db
  var dbref = ref(database);

  // get snapshot of the bucket we're after
  get(child(dbref, "Users/" + findUsername.value))
  .then((snapshot)=>{
    if (snapshot.exists()) {
      findFirstname.innerHTML = snapshot.val().firstName;
      findLastname.innerHTML = snapshot.val().lastName;
    }
    else { alert("No data found :("); }
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
