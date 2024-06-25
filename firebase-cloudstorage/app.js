import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import { firebaseConfig } from "../firebase.config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const fileUpload = document.getElementById("upload");
fileUpload.addEventListener("change", (e) => {
    const file = e.target.files[0];
    const imageRef = ref(storage, "image");
    uploadBytes(imageRef, file).then((result) => {
        alert("File uploaded successfully");
    })
});