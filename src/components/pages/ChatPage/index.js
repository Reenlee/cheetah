import React from "react";
import styled from "styled-components";
import { Avatar, Button } from "antd";
import { LogoutOutlined, DownloadOutlined } from "@ant-design/icons";

import AccountInfo from "./AccountInfo";
import Chatroom from "./Chatroom";
import FriendList from "./FriendList";
import PartChatroom from "./PartChatroom";
import ChatProvider from "../../contexts/chat";
import { useAuth } from "../../contexts/auth";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ChatContainer = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-rows: repeat(9, 1fr);
  grid-template-columns: 3fr 10fr 3fr;
  flex: 1;
`;

const Container = styled.div`
  border: 1px solid black;
  position: relative;
`;

const TopPanel = styled(Container)`
  grid-row: 1/3;
  grid-column: 1/3;
  display: flex;
`;

const LeftSidePanel = styled(Container)`
  grid-row: 3/10;
  grid-column: 1/2;
`;

const TopRightPanel = styled(Container)`
  grid-row: 1/6;
  grid-column: 3/4;
`;

const BottomRightPanel = styled(Container)`
  grid-row: 6/10;
  grid-column: 3/4;
`;

const MiddlePanel = styled(Container)`
  grid-row: 3/10;
  grid-column: 2/3;
`;

const ChatPage = () => {
  const { logout } = useAuth();

  const handleClickLogout = () => logout();

  return (
    <ChatProvider>
      <PageContainer>
        <div style={{ display: "flex", padding: 10 }}>
          <Avatar src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg" />

          <Button
            onClick={handleClickLogout}
            type="primary"
            shape="circle"
            icon="logout"
          />
        </div>

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

          <BottomRightPanel></BottomRightPanel>

          <MiddlePanel>
            <Chatroom />
          </MiddlePanel>
        </ChatContainer>
      </PageContainer>
    </ChatProvider>
  );
};

export default ChatPage;
