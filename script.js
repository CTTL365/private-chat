const password = prompt("Enter the secret passcode to enter the chat:");

if (password !== "YourSecretWordHere") {
    alert("Incorrect password. Access denied.");
    document.body.innerHTML = "<h1>Unauthorized Access</h1>";
}// Your specific Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRaMuxzfjqf0TEbS_YIQdJ3DLUAZ4S6So",
  authDomain: "our-private-space-589d7.firebaseapp.com",
  databaseURL: "https://our-private-space-589d7-default-rtdb.firebaseio.com",
  projectId: "our-private-space-589d7",
  storageBucket: "our-private-space-589d7.firebasestorage.app",
  messagingSenderId: "1059054384997",
  appId: "1:1059054384997:web:6b9a8f4fbe26e0f073d38c"
};

// Initialize Firebase (using the version 8 style to match your HTML)
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const chatWindow = document.getElementById('chat-window');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');

// Send message function
sendBtn.onclick = () => {
    const msg = messageInput.value;
    if (msg.trim() !== "") {
        database.ref('messages').push({
            content: msg,
            time: Date.now()
        });
        messageInput.value = "";
    }
};

// Press Enter to send
messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendBtn.click();
});

// Receive messages
database.ref('messages').on('child_added', (snapshot) => {
    const data = snapshot.val();
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message');
    msgDiv.innerText = data.content;
    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
});
