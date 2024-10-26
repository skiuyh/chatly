// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAI4XmanAw68dIlB9lm6ksEyegrm5JjhJc",
    authDomain: "chatly-e68f4.firebaseapp.com",
    databaseURL: "https://chatly-e68f4-default-rtdb.firebaseio.com",
    projectId: "chatly-e68f4",
    storageBucket: "chatly-e68f4.appspot.com",
    messagingSenderId: "402043605446",
    appId: "1:402043605446:web:43aba6835f46e2d560e2c7",
    measurementId: "G-6XDRGXNEN0"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();


// Assign a random anonymous username
const username = `Anonymous${Math.floor(Math.random() * 10000)}`;

// Send a message
document.getElementById('sendButton').onclick = function() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;

    if (message) {
        // Push message to Firebase
        const messagesRef = database.ref('messages');
        messagesRef.push({
            username: username,
            text: message,
            timestamp: Date.now()
        });
        messageInput.value = ''; // Clear input
    }
};

// Display messages
const chatContainer = document.getElementById('chatContainer');
database.ref('messages').on('child_added', (snapshot) => {
    const message = snapshot.val();
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    messageDiv.innerText = `${message.username}: ${message.text}`;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Auto-scroll
});
