import React, { useState } from "react";
import { Chatbot } from "supersimpledev";

const ChatInput = ({ chatMessages, setChatMessages }) => {
  const [inputText, setInputText] = useState("");
  const saveInputText = (event) => {
    setInputText(event.target.value);
  };

  const sendMessage = () => {
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: "user",
        id: crypto.randomUUID(),
      },
    ];
    setChatMessages(newChatMessages);

    const response = Chatbot.getResponse(inputText);
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ]);

    setInputText("");
  };

  return (
    <div className="chat-input-container">
      <input
        type="text"
        placeholder="Send a message to chatbot?"
        onChange={saveInputText}
        value={inputText}
        className="chat-input"
      />
      <button onClick={sendMessage} className="send-button">
        Send
      </button>
    </div>
  );
};

export default ChatInput;
