import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Avatar, Button, Input, Typography, Modal } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

import { useChat } from "../../contexts/chat";

import { StyledContainer } from "./design";
import { useAuth } from "../../contexts/auth";

const { Search, TextArea } = Input;
const { Title, Text } = Typography;

const Container = styled(StyledContainer)`
  overflow: auto;
  background-color: rgb(200, 200, 200);
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

const IconWrapper = styled(PlusCircleOutlined)`
  line-height: 0;
  margin: auto;
  :hover {
  }
`;

const ParticipantList = () => {
  const { room, recipients, addFriend } = useChat();
  const { auth } = useAuth();

  const handleClickPlus = ({ username }) => {
    addFriend(username);
  };

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

              {recipients.find((r) => r.id === f.id) ||
              auth.userId === f.id ? null : (
                <IconWrapper onClick={() => handleClickPlus(f)} />
              )}
            </FriendItemList>
          ))}
      </FriendItemListWrapper>
    </Container>
  );
};

export default ParticipantList;
