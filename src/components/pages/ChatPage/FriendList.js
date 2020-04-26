import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Avatar, Input, Typography } from "antd";

import { useChat } from "../../contexts/chat";

import { StyledContainer, TitleUnderlined } from "./design";

const { Search } = Input;
const { Title, Text } = Typography;

const Container = styled(StyledContainer)`
  overflow: auto;
  background-color: rgb(200, 200, 200);
`;

const FriendItemListWrapper = styled.div`
  padding-top: 5px;
`;

const FriendListItem = styled.div`
  display: flex;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 10px;
  border-left: 5px solid white;
  box-sizing: border-box;
`;

const FriendItem = styled(Text)`
  padding-left: 10px;
  line-height: 0;
  margin: auto;
  flex: 1;
`;

const FriendList = () => {
  const { recipient, recipients, selectRecipient, listChats } = useChat();
  const [filteredFriends, setFilteredFriends] = useState([]);

  const handleClickRecipient = (recipient) => {
    selectRecipient(recipient);
    listChats({ recipientId: recipient.id });
  };

  const handleChange = (e) => {
    const temp = recipients.filter(
      (f) => f.username && f.username.includes(e.target.value)
    );
    setFilteredFriends(temp);
  };

  useEffect(() => {
    setFilteredFriends(recipients);
  }, [recipients]);

  return (
    <Container>
      <TitleUnderlined level={4}>My Friends</TitleUnderlined>
      <Search placeholder="input search text" onChange={handleChange} />

      <FriendItemListWrapper>
        {filteredFriends.map((f) => (
          <FriendListItem
            key={f.id}
            onClick={() => handleClickRecipient(f)}
            style={{ borderLeftColor: recipient.id === f.id ? "#1890ff" : "" }}
          >
            <Avatar>{f.username[0]}</Avatar>
            <FriendItem>{f.username}</FriendItem>
            <div style={{ color: "red" }}>{f.unread}</div>
          </FriendListItem>
        ))}
      </FriendItemListWrapper>
    </Container>
  );
};

export default FriendList;
