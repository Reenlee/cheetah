import React, { useState } from "react";
import styled from "styled-components";
import { Typography } from "antd";
import { Button, Modal, Tag } from "antd";

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

  const handleClickCreateChat = () => {
    setOpen(true);
  };

  const handleOkCreateChat = () => {
    setOpen(false);
  };

  const handleCancelCreateChat = () => {
    setOpen(false);
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
          icon="poweroff"
          style={{ marginRight: 20 }}
        >
          Create Chatroom
        </Button>
      </Container>

      <Modal
        title="Basic Modal"
        visible={open}
        onOk={handleOkCreateChat}
        onCancel={handleCancelCreateChat}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default AccountInfo;
