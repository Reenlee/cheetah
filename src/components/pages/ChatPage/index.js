import React from "react";
import styled from "styled-components";
import AccountInfo from "./AccountInfo";
import PartChatroom from "./PartChatroom";
import Chatroom from "./Chatroom";
import FriendList from "./FriendList";

const ChatContainer = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-rows: repeat(9, 1fr);
  grid-template-columns: 3fr 10fr 3fr;
  height: 100%;
`;

const Container = styled.div`
  border: 1px solid black;
  position: relative;
`;

const AccountInfoWrapper = styled(Container)`
  grid-row: 1/3;
  grid-column: 1/3;
  display: flex;
`;

const PartChatroomWrapper = styled(Container)`
  grid-row: 3/10;
  grid-column: 1/2;
`;

const OpenChatroom = styled(Container)`
  grid-row: 1/6;
  grid-column: 3/4;
`;

const Friends = styled(Container)`
  grid-row: 6/10;
  grid-column: 3/4;
`;

const ChatroomWrapper = styled(Container)`
  grid-row: 3/10;
  grid-column: 2/3;
`;

const ChatPage = () => {
  return (
    <ChatContainer>
      <AccountInfoWrapper>
        <AccountInfo />
      </AccountInfoWrapper>

      <PartChatroomWrapper>
        <PartChatroom />
      </PartChatroomWrapper>

      <OpenChatroom>
        <FriendList />
      </OpenChatroom>

      <Friends></Friends>

      <ChatroomWrapper>
        <Chatroom />
      </ChatroomWrapper>
    </ChatContainer>
  );
};

export default ChatPage;
