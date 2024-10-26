// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAI4XmanAw68dIlB9lm6ksEyegrm5JjhJc",
    authDomain: "chatly-e68f4.firebaseapp.com",
    projectId: "chatly-e68f4",
    storageBucket: "chatly-e68f4.appspot.com",
    messagingSenderId: "402043605446",
    appId: "1:402043605446:web:43aba6835f46e2d560e2c7",
    measurementId: "G-6XDRGXNEN0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Send message function
document.getElementById('sendButton').onclick = async function() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;

    if (message) {
        await addDoc(collection(db, "messages"), {
            text: message,
            timestamp: serverTimestamp()
        });
        messageInput.value = ''; // Clear input after sending
    }
};

// Fetch messages
const messagesRef = collection(db, "messages");
const q = orderBy("timestamp", "asc");
onSnapshot(q, snapshot => {
    const chatContainer = document.getElementById('chatContainer');
    chatContainer.innerHTML = ''; // Clear previous messages
    snapshot.forEach(doc => {
        const message = doc.data();
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        messageDiv.innerText = message.text;
        chatContainer.appendChild(messageDiv);
    });
    chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to the bottom
});
