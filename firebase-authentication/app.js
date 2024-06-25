import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { firebaseConfig } from "../firebase.config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const signup = document.getElementById("signup");
const formarea = document.getElementById("form-area");
const profile = document.getElementById("profile");
const welcome = document.getElementById("welcome");
const signout = document.getElementById("signout");
const signin = document.getElementById("signin");

signup.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = signup.email.value;
    const password = signup.password.value;
    createUserWithEmailAndPassword(auth, email, password)
    .then((result) => {alert("User Created Successfully")})
    .catch((error) => {alert(error.message)})
})

onAuthStateChanged(auth, (user) => {
    if(user) {
        profile.style.display = "block";
        formarea.style.display = "none";
        welcome.innerText = `Welcome ${user.email}`;
    } else {
        profile.style.display = "none";
        formarea.style.display = "block";
    }
})

signout.addEventListener("click", (e) => {
    signOut(auth).then(() => {
        alert("Signed Out");
    }).catch((error) => {
        alert(error.message);
    })
});

signin.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = signin.email.value;
    const password = signin.password.value;
    signInWithEmailAndPassword(auth, email, password)
    .then((result) => {
        alert("Signed In");
    }).catch((error) => {
        alert(error.message);
    })
})