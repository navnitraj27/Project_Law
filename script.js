const form = document.getElementById('chat-form');
const chatBox = document.getElementById('chat-box');
const input = document.getElementById('user-input');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userText = input.value;
  appendMessage('user', userText);
  input.value = '';

  try {
    const res = await fetch('http://localhost:3000/api/simplify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: userText })
    });
    const data = await res.json();
    appendMessage('bot', data.answer);
  } catch (error) {
    appendMessage('bot', 'Error: Unable to connect to the server.');
  }
});

function appendMessage(sender, text) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', sender);
  messageDiv.innerText = text;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}
