import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { Input, Button } from "antd";
import { useChat } from "../../contexts/chat";
import { useAuth } from "../../contexts/auth";

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const MessagesContainer = styled.div`
  border: 1px solid grey;
  padding: 10px;
  flex: 1;
  position: relative;
`;

const MessagesWrapper = styled.div`
  padding: 10px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
`;

const ChatActionsWrapper = styled.div`
  border: 1px solid grey;
  padding: 10px;
  display: flex;
`;

const Chatroom = () => {
  const { auth } = useAuth();
  const { messages, sendMessage, recipient } = useChat();
  const inputRef = useRef(null);

  const scrollBottom = () => {
    const dom = document.querySelector("#messages");
    dom.scrollTop = dom.scrollHeight;
  };

  const handleClickSend = () => {
    const text = inputRef.current.state.value;
    inputRef.current.setValue("");
    sendMessage(text);
  };

  const handleKeyDown = e => {
    switch (e.key) {
      case "Enter":
        handleClickSend();
        break;
      case "Escape":
        break;
      default:
        break;
    }
  };

  const renderRecipient = ({ id, message }) => {
    return (
      <div key={id}>
        <div
          style={{
            display: "inline-block",
            padding: 10,
            backgroundColor: "green",
            borderRadius: 3,
            margin: 5
          }}
        >
          {message}
        </div>
      </div>
    );
  };

  const renderSender = ({ _id, id, message }) => {
    return (
      <div key={id} style={{ textAlign: "right" }}>
        <div
          style={{
            display: "inline-block",
            padding: 10,
            backgroundColor: "yellow",
            borderRadius: 3,
            margin: 5
          }}
        >
          {message}
        </div>
      </div>
    );
  };

  const renderMessage = message => {
    if (message.senderId === auth.userId) {
      return renderSender(message);
    } else {
      return renderRecipient(message);
    }
  };

  useEffect(() => {
    scrollBottom();
  }, [messages]);

  return (
    <Container>
      <div>{recipient.username}</div>
      <MessagesContainer>
        <MessagesWrapper id="messages">
          {messages.map(m => renderMessage(m))}
        </MessagesWrapper>
      </MessagesContainer>
      <ChatActionsWrapper>
        <Input
          ref={inputRef}
          placeholder="Type message"
          onKeyDown={handleKeyDown}
        />
        <div style={{ paddingLeft: 10 }}>
          <Button onClick={handleClickSend}>Send</Button>
        </div>
      </ChatActionsWrapper>
    </Container>
  );
};

export default Chatroom;
