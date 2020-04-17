import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Avatar, Button, Input, Typography, Modal } from "antd";
import { FormOutlined } from "@ant-design/icons";

import { useChat } from "../../contexts/chat";

import { StyledContainer } from "./design";

const { Search, TextArea } = Input;
const { Title, Text } = Typography;

const Container = styled(StyledContainer)`
  overflow: auto;
`;

const FriendItemListWrapper = styled.div`
  padding-top: 5px;
`;

const FriendItemList = styled.div`
  display: flex;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 10px;
`;

const FriendItem = styled(Text)`
  padding-left: 10px;
  line-height: 0;
  margin: auto;
  flex: 1;
`;

const IconWrapper = styled(FormOutlined)`
  line-height: 0;
  margin: auto;
  :hover {
  }
`;

const ParticipantList = () => {
  const { room } = useChat();

  return (
    <Container>
      <Title level={4}>Participant List</Title>

      <div>Room name: {room.name}</div>

      <FriendItemListWrapper>
        {room.users &&
          room.users.map((f) => (
            <FriendItemList key={f.id}>
              <Avatar>{f.username[0]}</Avatar>
              <FriendItem>{f.username}</FriendItem>
              <IconWrapper />
            </FriendItemList>
          ))}
      </FriendItemListWrapper>
    </Container>
  );
};

export default ParticipantList;
