// Import Firebase libraries
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

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
const database = getDatabase(app);

// References
const messagesRef = ref(database, 'messages');
const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const usernameInput = document.getElementById('usernameInput');
const loginButton = document.getElementById('loginButton');
const logoutButton = document.getElementById('logoutButton');

let username;

// Listen for new messages
onValue(messagesRef, (snapshot) => {
    messagesDiv.innerHTML = ''; // Clear the messages div
    snapshot.forEach((childSnapshot) => {
        const message = childSnapshot.val();
        const messageElement = document.createElement('div');
        messageElement.textContent = `${message.username}: ${message.text}`;
        messagesDiv.appendChild(messageElement);
    });
});

// Send a message
sendButton.addEventListener('click', () => {
    if (messageInput.value && username) {
        const newMessageRef = ref(database, 'messages/' + Date.now());
        set(newMessageRef, {
            username: username,
            text: messageInput.value
        });
        messageInput.value = ''; // Clear the input
    }
});

// Login
loginButton.addEventListener('click', () => {
    username = usernameInput.value;
    usernameInput.value = ''; // Clear the input
    loginButton.style.display = 'none';
    logoutButton.style.display = 'block';
});

// Logout
logoutButton.addEventListener('click', () => {
    username = null;
    logoutButton.style.display = 'none';
    loginButton.style.display = 'block';
});
