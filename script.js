// Keep your Firebase Config at the top as it was!
// ...

const chatWindow = document.getElementById('chat-window');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');

// Ask who is using the app
const myName = prompt("Who are you? (Type your name)");

sendBtn.onclick = () => {
    const msg = messageInput.value;
    if (msg.trim() !== "") {
        // Now sending name AND time
        database.ref('messages').push({
            sender: myName,
            content: msg,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        messageInput.value = "";
    }
};

// Listen for new messages
database.ref('messages').on('child_added', (snapshot) => {
    const data = snapshot.val();
    const msgDiv = document.createElement('div');
    
    // Check if the message is from YOU or your SISTER to style it differently
    const isMe = data.sender === myName;
    msgDiv.classList.add('message');
    if (isMe) msgDiv.classList.add('my-message');
    
    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
});// This listens for the "Enter" key on your keyboard
messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendBtn.click();
    }
});
<button id="clear-btn">Clear History</button>
document.getElementById('clear-btn').onclick = () => {
    if(confirm("Are you sure you want to delete all messages?")) {
        database.ref('messages').remove();
        location.reload(); // Refresh the page to show it's empty
    }
};
database.ref('messages').on('child_added', (snapshot) => {
    const data = snapshot.val();
    const msgDiv = document.createElement('div');
    
    msgDiv.classList.add('message');
    
    // If the name matches yours, add the 'my-message' class
    if (data.sender === myName) {
        msgDiv.classList.add('my-message');
    }
    
    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
});
document.getElementById('clear-btn').onclick = () => {
    if(confirm("Delete all messages for everyone?")) {
        database.ref('messages').remove();
        location.reload(); 
    }
};
// Wait for the page to finish loading
window.onload = function() {
    
    const chatWindow = document.getElementById('chat-window');
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');
    const clearBtn = document.getElementById('clear-btn');

    // Make sure all elements exist before adding logic
    if (sendBtn && messageInput) {
        
        // 1. Sending with the Button
        sendBtn.onclick = () => {
            const msg = messageInput.value;
            if (msg.trim() !== "") {
                database.ref('messages').push({
                    sender: myName || "User", // Uses prompt name or "User"
                    content: msg,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                });
                messageInput.value = ""; // Clears the box
            }
        };

        // 2. Sending with the "Enter" Key
        messageInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                sendBtn.click();
            }
        });
    }

    // 3. Clear Chat Logic
    if (clearBtn) {
        clearBtn.onclick = () => {
            if(confirm("Delete all messages?")) {
                database.ref('messages').remove();
                chatWindow.innerHTML = ""; // Clears the screen immediately
            }
        };
    }
};
