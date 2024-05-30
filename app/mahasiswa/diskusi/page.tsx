"use client";
import React, { useState } from "react";

const DiskusiPage = () => {
  const [messages, setMessages]: any = useState([]);
  const [inputValue, setInputValue]: any = useState("");

  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      const newMessage = {
        id: messages.length + 1,
        text: inputValue,
        sender: "You", // Adjust according to your user data
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, newMessage]);
      setInputValue("");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        padding: "10px",
      }}
    >
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        {messages.map((message: any) => (
          <div key={message.id} style={{ marginBottom: "10px" }}>
            <div style={{ fontWeight: "bold" }}>{message.sender}</div>
            <div>{message.text}</div>
            <div style={{ fontSize: "small", color: "gray" }}>
              {message.timestamp}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex" }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message here..."
          style={{ flex: 1, padding: "10px", fontSize: "16px" }}
        />
        <button
          onClick={handleSendMessage}
          style={{ padding: "10px 20px", fontSize: "16px" }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default DiskusiPage;
