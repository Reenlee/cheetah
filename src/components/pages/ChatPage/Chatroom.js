import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { Input, Button, Avatar, Typography } from "antd";
import moment from "moment";

import { useChat } from "../../contexts/chat";
import { useAuth } from "../../contexts/auth";

import { StyledContainer, TitleUnderlined } from "./design";

const { Text } = Typography;

const Container = styled(StyledContainer)`
  display: flex;
  flex-direction: column;
  background-color: rgb(255, 255, 255);
`;

const MessagesContainer = styled.div`
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
  padding: 10px;
  display: flex;
`;

const Chatroom = () => {
  const { auth } = useAuth();
  const { messages, sendMessage, recipient, recipients, room } = useChat();
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

  const handleKeyDown = (e) => {
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

  const renderRecipient = ({ id, message, senderId, createdOn }) => {
    const sender =
      (room && room.users && room.users.find((r) => r.id === senderId)) ||
      recipients.find((r) => r.id === senderId);

    const today = moment(new Date().getTime());
    const messageDate = moment(createdOn);
    const format =
      today.diff(messageDate, "days") === 0 ? "[today], h:mm a" : "L";

    return (
      <div key={id} style={{ display: "flex", marginTop: 10 }}>
        <Avatar>{sender.username[0]}</Avatar>
        <div style={{ marginLeft: 10 }}>
          <div style={{ display: "flex" }}>
            <Text strong>{sender && sender.username}</Text>
            <Text style={{ marginLeft: 5, fontSize: 12, lineHeight: "21px" }}>
              {createdOn && moment(createdOn).format(format)}
            </Text>
          </div>
          <div>{message}</div>
        </div>
      </div>
    );
  };

  const renderSender = ({ _id, id, message, createdOn }) => {
    const today = moment(new Date().getTime());
    const messageDate = moment(createdOn);
    const format =
      today.diff(messageDate, "days") === 0 ? "[today], h:mm a" : "L";

    return (
      <div key={id} style={{ display: "flex", marginTop: 10 }}>
        <Avatar>{auth.username[0]}</Avatar>
        <div style={{ marginLeft: 10 }}>
          <div style={{ display: "flex" }}>
            <Text strong>{auth && auth.username}</Text>
            <Text style={{ marginLeft: 5, fontSize: 12, lineHeight: "21px" }}>
              {createdOn && moment(createdOn).format(format)}
            </Text>
          </div>
          <div>{message}</div>
        </div>
      </div>
    );
  };

  const renderMessage = (message) => {
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
      {recipient.username && (
        <TitleUnderlined level={4}>{recipient.username}</TitleUnderlined>
      )}
      <MessagesContainer>
        <MessagesWrapper id="messages">
          {messages.map((m) => renderMessage(m))}
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
