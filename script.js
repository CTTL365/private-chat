// 1. Ask for the user's name
const myName = prompt("Who are you?");

// 2. Your Firebase Configuration (Updated with your keys!)
const firebaseConfig = {
  apiKey: "AIzaSyCRaMuxzfjqf0TEbS_YIQdJ3DLUAZ4S6So",
  authDomain: "our-private-space-589d7.firebaseapp.com",
  databaseURL: "https://our-private-space-589d7-default-rtdb.firebaseio.com",
  projectId: "our-private-space-589d7",
  storageBucket: "our-private-space-589d7.firebasestorage.app",
  messagingSenderId: "1059054384997",
  appId: "1:1059054384997:web:6b9a8f4fbe26e0f073d38c",
  measurementId: "G-1W0ELKPN3T"
};

// 3. Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();

// 4. Main logic starts when the page loads
window.onload = function() {
    const chatWindow = document.getElementById('chat-window');
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');
    const clearBtn = document.getElementById('clear-btn');

    // --- SENDING MESSAGES ---
    if (sendBtn && messageInput) {
        sendBtn.onclick = () => {
            const msg = messageInput.value;
            if (msg.trim() !== "") {
                database.ref('messages').push({
                    sender: myName || "User",
                    content: msg,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                });
                messageInput.value = ""; 
            }
        };

        // Fix for the "Enter" key
        messageInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                sendBtn.click();
            }
        });
    }

    // --- RECEIVING MESSAGES ---
    database.ref('messages').on('child_added', (snapshot) => {
        const data = snapshot.val();
        const msgDiv = document.createElement('div');
        
        msgDiv.classList.add('message');
        
        // If you are the sender, push bubble to the right
        if (data.sender === myName) {
            msgDiv.classList.add('my-message');
        }

        msgDiv.innerHTML = `
            <small class="sender-name">${data.sender}</small>
            <div class="text">${data.content}</div>
            <small class="timestamp">${data.time}</small>
        `;
        
        chatWindow.appendChild(msgDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll
    });

    // --- CLEAR CHAT BUTTON ---
    if (clearBtn) {
        clearBtn.onclick = () => {
            if(confirm("Are you sure you want to delete all messages?")) {
                database.ref('messages').remove();
                location.reload(); 
            }
        };
    }
};
