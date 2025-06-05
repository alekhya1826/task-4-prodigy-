const socket = io();
let username = "";

function login() {
  username = document.getElementById("username").value;
  if (username.trim() !== "") {
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("chat-screen").style.display = "block";
    socket.emit('join', username);
  }
}

function sendMessage() {
  const message = document.getElementById("message").value;
  if (message.trim() !== "") {
    socket.emit('chat', message);
    document.getElementById("message").value = "";
  }
}

socket.on('message', (data) => {
  const chatBox = document.getElementById("chat-box");
  const msg = document.createElement("div");
  msg.textContent = data;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
});
