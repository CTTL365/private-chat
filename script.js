const myName = prompt("Who are you?");

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

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();

window.onload = function() {
    const chatWindow = document.getElementById('chat-window');
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');

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

    database.ref('messages').on('child_added', (snapshot) => {
        const data = snapshot.val();
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message');
        if (data.sender === myName) { msgDiv.classList.add('my-message'); }
        msgDiv.innerHTML = `<small>${data.sender}</small><div>${data.content}</div>`;
        chatWindow.appendChild(msgDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
      database.ref('messages').on('child_added', (snapshot) => {
    const data = snapshot.val();
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message');
    if (data.sender === myName) { msgDiv.classList.add('my-message'); }
    msgDiv.innerHTML = `<small>${data.sender}</small><div>${data.content}</div>`;
    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}); // <--- Make sure this line exists!
    });
};
