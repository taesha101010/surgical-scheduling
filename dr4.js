// Import the functions you need from Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";

// ✅ Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEWxumfb5Dp-niZBhxWjdxPJxY8V04JyY",
  authDomain: "surgical-scheduling-ff91a.firebaseapp.com",
  projectId: "surgical-scheduling-ff91a",
  storageBucket: "surgical-scheduling-ff91a.appspot.com",
  messagingSenderId: "891862817143",
  appId: "1:891862817143:web:4fb62eea3bae6f42022972",
  measurementId: "G-FWPG9VPBS4"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ Get elements from the DOM
const schedulerForm = document.getElementById('schedulerForm');
const doctorInput = document.getElementById('doctor');
const operationInput = document.getElementById('operation');
const roomSelect = document.getElementById('room');
const timeInput = document.getElementById('time');
const anesthesiaInput = document.getElementById('anesthesia');
const anesthesiologistInput = document.getElementById('anesthesiologist');
const assistantSurgeonInput = document.getElementById('assistant_surgeon');
const nursesInput = document.getElementById('nurses');
const preoperativeEventsInput = document.getElementById('preoperative_events');
const postoperativeEventsInput = document.getElementById('postoperative_events');
const surgicalReportsInput = document.getElementById('surgical_reports');
const remarksInput = document.getElementById('remarks');
const drugsInput = document.getElementById('drugs');
const instrumentsInput = document.getElementById('instruments');
const materialsInput = document.getElementById('materials');
const surgeryList = document.getElementById('surgeryList');

// ✅ Submit surgery data to Firebase Firestore
schedulerForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Collect data from the form
    const doctor = doctorInput.value;
    const operation = operationInput.value;
    const room = roomSelect.value;
    const time = timeInput.value;
    const anesthesia = anesthesiaInput.value;
    const anesthesiologist = anesthesiologistInput.value;
    const assistantSurgeon = assistantSurgeonInput.value;
    const nurses = nursesInput.value.split(',');
    const preoperativeEvents = preoperativeEventsInput.value;
    const postoperativeEvents = postoperativeEventsInput.value;
    const surgicalReports = surgicalReportsInput.value;
    const remarks = remarksInput.value;
    const drugs = drugsInput.value.split(',');
    const instruments = instrumentsInput.value.split(',');
    const materials = materialsInput.value.split(',');

    // Create the surgery data object
    const surgeryData = {
        doctor,
        operation,
        room,
        time,
        anesthesia,
        anesthesiologist,
        assistant_surgeon: assistantSurgeon,
        nurses,
        preoperative_events: preoperativeEvents,
        postoperative_events: postoperativeEvents,
        surgical_reports: surgicalReports,
        remarks,
        drugs,
        instruments,
        materials
    };

    // ✅ Log the data for debugging
    console.log("Submitting surgery data:", surgeryData);

    // ✅ Save the data to Firestore
    try {
        const docRef = await addDoc(collection(db, "surgeries"), surgeryData);
        console.log("Data saved successfully with ID: ", docRef.id);
        alert("Surgery scheduled successfully!");
        schedulerForm.reset();  // Reset the form after submission
    } catch (error) {
        console.error("Error saving data:", error);
        alert("Error saving data. Please try again.");
    }
});

// ✅ Function to display surgeries on the page
async function displaySurgeries() {
    const surgeriesRef = collection(db, 'surgeries');
    const querySnapshot = await getDocs(surgeriesRef);
    
    surgeryList.innerHTML = '';  // Clear the existing list
    
    querySnapshot.forEach((docSnapshot) => {
        const surgery = docSnapshot.data();
        const surgeryElement = document.createElement('div');
        surgeryElement.classList.add('surgery-item');
        surgeryElement.innerHTML = `
            <strong>Doctor:</strong> ${surgery.doctor}<br>
            <strong>Operation:</strong> ${surgery.operation}<br>
            <strong>Room:</strong> ${surgery.room}<br>
            <strong>Time:</strong> ${surgery.time}<br>
            <strong>Anesthesia:</strong> ${surgery.anesthesia}<br>
            <strong>Anesthesiologist:</strong> ${surgery.anesthesiologist}<br>
            <strong>Assistant Surgeon:</strong> ${surgery.assistant_surgeon}<br>
            <strong>Nurses:</strong> ${surgery.nurses.join(', ')}<br>
            <strong>Preoperative Events:</strong> ${surgery.preoperative_events}<br>
            <strong>Postoperative Events:</strong> ${surgery.postoperative_events}<br>
            <strong>Remarks:</strong> ${surgery.remarks}<br>
            <strong>Drugs:</strong> ${surgery.drugs.join(', ')}<br>
            <strong>Instruments:</strong> ${surgery.instruments.join(', ')}<br>
            <strong>Materials:</strong> ${surgery.materials.join(', ')}<br>
            <strong>Surgical Reports:</strong> <a href="${surgery.surgical_reports}" target="_blank">View Report</a><br>
        `;
        surgeryList.appendChild(surgeryElement);
    });
}

// ✅ Call the function to display surgeries on page load
displaySurgeries();
