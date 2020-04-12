import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Avatar, Button, Input, Typography, Modal } from "antd";
import { FormOutlined } from "@ant-design/icons";

import { useChat } from "../../contexts/chat";

const { Search, TextArea } = Input;
const { Title, Text } = Typography;

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 10px;
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

const TextAreaWrapper = styled(TextArea)`
  resize: none;
`;

const FriendList = () => {
  const { recipients, selectRecipient, sendMessage, listChats } = useChat();
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
            <FriendItemList key={f.id} onClick={() => handleClickRecipient(f)}>
              <Avatar>{f.username[0]}</Avatar>
              <FriendItem>{f.username}</FriendItem>
              <IconWrapper onClick={handleClickForm} />
            </FriendItemList>
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
