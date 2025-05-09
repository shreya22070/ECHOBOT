function sendMessage() {
    const userInput = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");
    const message = userInput.value.trim();
  
    if (message === "") return;
  
    // Display user message
    chatBox.innerHTML += <div class="message user">${message}</div>;
    userInput.value = "";
  
    // Bot reply
    botReply(message);
  }
  
  function botReply(message) {
    const chatBox = document.getElementById("chat-box");
    let reply = "I'm not sure how to respond to that.";
  
    // Basic responses
    if (message.toLowerCase().includes("hello")) {
      reply = "Hi there! I'm EchoBot.";
    } else if (message.toLowerCase().includes("how are you")) {
      reply = "I'm just a bot, but I'm doing great!";
    } else if (message.toLowerCase().includes("bye")) {
      reply = "Goodbye! Have a great day!";
    }
  
    chatBox.innerHTML += <div class="message bot">${reply}</div>;
  
    // Text-to-Speech
    speak(reply);
  
    chatBox.scrollTop = chatBox.scrollHeight;
  }
  
  // Voice Output (Text-to-Speech)
  function speak(text) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = text;
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
  }
  
  // Voice Input (Speech Recognition)
  function startListening() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
  
    recognition.onresult = function(event) {
      const transcript = event.results[0][0].transcript;
      document.getElementById("user-input").value = transcript;
      sendMessage();
    };
  
    recognition.start();
  }