
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

function InsertData() {
  set(ref(database, "Users/" + enterUsername.value), {
    firstName: enterFirstname.value,
    lastName: enterLastname.value,
    passwordHash: enterPassword.value,
    username: enterUsername.value
  })
  .then(()=>{
    alert("Data inserted into the database!")
  })
  .catch((error)=>{
    alert(error)
  });
}

function FindData() {
  var dbref = ref(database);

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

// TODO: hash passwords

// add button event listeners
insertButton.addEventListener('click', InsertData);
findButton.addEventListener('click', FindData);
