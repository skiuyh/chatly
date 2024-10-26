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
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Send message function
document.getElementById('sendButton').onclick = function() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;

    if (message) {
        db.collection("messages").add({
            text: message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        messageInput.value = ''; // Clear input after sending
    }
};

// Fetch messages
db.collection("messages")
    .orderBy("timestamp", "asc")
    .onSnapshot(snapshot => {
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
