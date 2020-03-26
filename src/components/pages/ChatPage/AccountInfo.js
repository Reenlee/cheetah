import React, { useState } from "react";
import styled from "styled-components";
import { Typography } from "antd";
import { Button, Modal, Tag, Input } from "antd";

import { postRequest } from "../../helpers/api";

const { Text } = Typography;

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 20px;
`;

const AccountInfo = () => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");

  const handleClickCreateChat = () => {
    setOpen(true);
  };

  const handleOkCreateChat = () => {
    setOpen(false);
  };

  const handleCancelCreateChat = () => {
    setOpen(false);
  };

  const handleChangeUsername = e => {
    setUsername(e.target.value);
  };

  const handleClickAddFriend = () => {
    postRequest("/friends/add", { username }).then(data => {
      setOpen(false);
    });
  };

  return (
    <>
      <Container>
        <div>
          <Text>Reen</Text>
        </div>
        <div>
          <Text>Friends: 20</Text>
        </div>
        <div>
          <Text>Online Friends: 20</Text>
        </div>
        <Button
          onClick={handleClickCreateChat}
          type="primary"
          icon="plus"
          style={{ marginRight: 20 }}
        >
          Add Friend
        </Button>
      </Container>

      <Modal
        title="Add Friend"
        visible={open}
        onCancel={handleCancelCreateChat}
        footer={[
          <Button key="submit" type="primary" onClick={handleClickAddFriend}>
            Add
          </Button>
        ]}
      >
        <Input
          placeholder="Enter username"
          value={username}
          onChange={handleChangeUsername}
        />
      </Modal>
    </>
  );
};

export default AccountInfo;
