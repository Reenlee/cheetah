import React from "react";
import styled from "styled-components";
import { Avatar, Button } from "antd";
import { LogoutOutlined, DownloadOutlined } from "@ant-design/icons";

import AccountInfo from "./AccountInfo";
import Chatroom from "./Chatroom";
import FriendList from "./FriendList";
import PartChatroom from "./PartChatroom";
import ParticipantList from "./ParticipantList";

import ChatProvider from "../../contexts/chat";
import { useAuth } from "../../contexts/auth";

const PageContainer = styled.div`
  background-color: black;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 5px;
`;

const ChatContainer = styled.div`
  display: grid;
  grid-template-rows: 150px 1fr 1fr;
  grid-template-columns: 300px 1fr 300px;
  flex: 1;
  grid-gap: 5px;
`;

const Container = styled.div`
  position: relative;
`;

const TopPanel = styled(Container)`
  grid-row: 1/2;
  grid-column: 1/2;
`;

const LeftSidePanel = styled(Container)`
  grid-row: 2/4;
  grid-column: 1/2;
`;

const TopRightPanel = styled(Container)`
  grid-row: 1/3;
  grid-column: 3/4;
`;

const BottomRightPanel = styled(Container)`
  grid-row: 3/4;
  grid-column: 3/4;
`;

const MiddlePanel = styled(Container)`
  grid-row: 1/4;
  grid-column: 2/3;
`;

const ChatPage = () => {
  const { logout } = useAuth();

  const handleClickLogout = () => logout();

  return (
    <ChatProvider>
      <PageContainer>
        {/* <div style={{ display: "flex", padding: 10 }}>
          <Avatar src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg" />

          <Button
            style={{ marginLeft: 10 }}
            onClick={handleClickLogout}
            type="primary"
            shape="circle"
            icon="logout"
          />
        </div> */}

        <ChatContainer>
          <TopPanel>
            <AccountInfo />
          </TopPanel>

          <LeftSidePanel>
            <FriendList />
          </LeftSidePanel>

          <TopRightPanel>
            <PartChatroom />
          </TopRightPanel>

          <BottomRightPanel>
            <ParticipantList />
          </BottomRightPanel>

          <MiddlePanel>
            <Chatroom />
          </MiddlePanel>
        </ChatContainer>
      </PageContainer>
    </ChatProvider>
  );
};

export default ChatPage;
