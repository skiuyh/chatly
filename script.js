// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAI4XmanAw68dIlB9lm6ksEyegrm5JjhJc",
    authDomain: "chatly-e68f4.firebaseapp.com",
    databaseURL: "https://chatly-e68f4-default-rtdb.firebaseio.com",  // Realtime Database URL
    projectId: "chatly-e68f4",
    storageBucket: "chatly-e68f4.appspot.com",
    messagingSenderId: "402043605446",
    appId: "1:402043605446:web:43aba6835f46e2d560e2c7",
    measurementId: "G-6XDRGXNEN0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Send message function
document.getElementById('sendButton').onclick = function() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;

    if (message) {
        const messagesRef = ref(database, 'messages');
        push(messagesRef, {
            text: message,
            timestamp: serverTimestamp()
        });
        messageInput.value = ''; // Clear input after sending
    }
};

// Fetch messages
const chatContainer = document.getElementById('chatContainer');
const messagesRef = ref(database, 'messages');
onChildAdded(messagesRef, (snapshot) => {
    const message = snapshot.val();
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    messageDiv.innerText = message.text;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to the bottom
});
