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

const IconWrapper = styled(FormOutlined)`
  line-height: 0;
  margin: auto;
  :hover {
  }
`;

const TextAreaWrapper = styled(TextArea)`
  resize: none;
`;

const FriendList = () => {
  const {
    recipient,
    recipients,
    selectRecipient,
    sendMessage,
    listChats,
  } = useChat();
  const [visible, setVisible] = useState(false);
  const [filteredFriends, setFilteredFriends] = useState([]);
  const inputRef = useRef(null);

  const handleClickRecipient = (recipient) => {
    selectRecipient(recipient);
    listChats({ recipientId: recipient.id });
  };

  const handleClickForm = (recipient) => {
    selectRecipient(recipient);
    setVisible(true);
  };

  const handleCancel = () => setVisible(false);

  const handleSend = () => {
    const text = inputRef.current.state.value;
    inputRef.current.setValue("");
    sendMessage(text);
    setVisible(false);
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
    <>
      <Container>
        <Title level={4}>My Friends</Title>
        <Search placeholder="input search text" onChange={handleChange} />

        <FriendItemListWrapper>
          {filteredFriends.map((f) => (
            <FriendListItem
              key={f.id}
              onClick={() => handleClickRecipient(f)}
              style={{
                backgroundColor: recipient.id === f.id ? "yellow" : "",
              }}
            >
              <Avatar>{f.username[0]}</Avatar>
              <FriendItem>{f.username}</FriendItem>
              <IconWrapper onClick={handleClickForm} />
            </FriendListItem>
          ))}
        </FriendItemListWrapper>
      </Container>

      <Modal
        title="Send message"
        visible={visible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="send" type="primary" onClick={handleSend}>
            Send
          </Button>,
        ]}
      >
        <TextAreaWrapper ref={inputRef} rows={4} />
      </Modal>
    </>
  );
};

export default FriendList;
