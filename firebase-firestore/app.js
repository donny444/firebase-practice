import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { firebaseConfig } from "../firebase.config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const table = document.getElementById("table");
const form = document.getElementById("add-form");

async function getEmployees(db) {
    const empCol = collection(db, "employees");
    const empSnapshot = await getDocs(empCol); // Get all documents in employees collection
    return empSnapshot;
}

// Render a row for each employee data
function showData(employee) {
    const row = table.insertRow(-1); // Insert new row at the end of the table
    const firstNameCol = row.insertCell(0);
    const lastNameCol = row.insertCell(1);
    const birthDayCol = row.insertCell(2);
    const deleteCol = row.insertCell(3);
    firstNameCol.innerHTML = employee.data().firstname;
    lastNameCol.innerHTML = employee.data().lastname;
    birthDayCol.innerHTML = employee.data().birthday;

    let btn = document.createElement("button");
    btn.textContent = "Delete";
    btn.setAttribute("class", "btn btn-danger");
    btn.setAttribute("data-id", employee.id);
    deleteCol.appendChild(btn); // Delete button inside delete column
    btn.addEventListener("click", (e) => {
        let id = e.target.getAttribute("data-id");
        deleteDoc(doc(db, "employees", id)); // Delete document by id specified in data-id attribute
        alert("Data deleted");
    });
}

// Get Documents
const data = await getEmployees(db);
data.forEach(employee => {
    showData(employee); // Render each document for each row
})

// Add Form Data
form.addEventListener("submit", (e) => {
    e.preventDefault();
    addDoc(collection(db, "employees"), {
        firstname: form.firstname.value,
        lastname: form.lastname.value,
        birthday: form.birthday.value
    });
    form.firstname.value = "";
    form.lastname.value = "";
    form.birthday.value = "";
    alert("Data added successfully");
});