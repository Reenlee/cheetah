import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Input, Button } from "antd";

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 20px;
  display: grid;
  grid-template-rows: 1fr 80px;
  grid-gap: 20px;
`;

const ChatMessagesWrapper = styled.div`
  border: 1px solid grey;
`;

const ChatActionsWrapper = styled.div`
  border: 1px solid grey;
`;

const Chatroom = () => {
  const handleKeyPress = () => {
    
  };

  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);
  }, []);

  return (
    <Container>
      <ChatMessagesWrapper></ChatMessagesWrapper>
      <ChatActionsWrapper>
        <Input placeholder="Type message" />
        <Button>Send</Button>
      </ChatActionsWrapper>
    </Container>
  );
};

export default Chatroom;
