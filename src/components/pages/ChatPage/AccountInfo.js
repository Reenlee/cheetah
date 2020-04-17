import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Typography, Button, Modal, Input, Select } from "antd";

import { useChat } from "../../contexts/chat";
import { useAuth } from "../../contexts/auth";

import { StyledContainer } from "./design";

const { Text } = Typography;
const { Option } = Select;

const Container = styled(StyledContainer)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 10px;
`;

const AccountInfo = () => {
  const { auth } = useAuth();
  const { addFriend, addRoom, recipients } = useChat();
  const [openFriend, setOpenFriend] = useState(false);
  const [openRoom, setOpenRoom] = useState(false);
  // track usernames when user creates a new room
  const [usernames, setUsernames] = useState([]);

  const roomRef = useRef(null);
  const usernameRef = useRef(null);

  const openAddFriendModal = () => setOpenFriend(true);

  const openCreateRoomModal = () => setOpenRoom(true);

  const closeAddFriendModal = () => setOpenFriend(false);

  const closeCreateRoomModal = () => setOpenRoom(false);

  const handleChangeSelect = (_, data) => {
    const result = data.filter(({ props }) => {
      const friend = recipients.find((f) => f.id === props.userId);
      return friend;
    });
    setUsernames(result.map((r) => r.key));
  };

  const handleClickAddFriend = () => {
    const username = usernameRef.current.state.value;
    usernameRef.current.setValue("");
    addFriend(username).then(() => {
      setOpenFriend(false);
    });
  };

  const handleClickCreateRoom = () => {
    const name = roomRef.current.state.value;
    const userIds = recipients
      .filter((r) => usernames.includes(r.username))
      .map((r) => r.id);

    addRoom(name, userIds).then(() => {
      setOpenRoom(false);
      roomRef.current.setValue("");
      setUsernames([]);
    });
  };

  return (
    <>
      <Container>
        <div>
          <Text>{auth.username}</Text>
        </div>
        <div>
          <Text>{`Friends: ${recipients.length}`}</Text>
        </div>
        <Button
          onClick={openAddFriendModal}
          type="primary"
          icon="plus"
          style={{ marginRight: 20 }}
        >
          Add Friend
        </Button>

        <Button
          onClick={openCreateRoomModal}
          type="primary"
          icon="plus"
          style={{ marginRight: 20 }}
        >
          Create Room
        </Button>
      </Container>

      <Modal
        title="Add Friend"
        visible={openFriend}
        onCancel={closeAddFriendModal}
        footer={[
          <Button key="submit" type="primary" onClick={handleClickAddFriend}>
            Add
          </Button>,
        ]}
      >
        <Input ref={usernameRef} placeholder="Enter username" />
      </Modal>

      <Modal
        title="Create Room"
        visible={openRoom}
        onCancel={closeCreateRoomModal}
        footer={[
          <Button key="submit" type="primary" onClick={handleClickCreateRoom}>
            Create
          </Button>,
        ]}
      >
        <Text>Room name</Text>
        <Input ref={roomRef} placeholder="Enter name" />

        <Text>Friends</Text>
        <Select
          mode="tags"
          size="default"
          placeholder="Please select"
          value={usernames}
          defaultValue={[]}
          onChange={handleChangeSelect}
          style={{ width: "100%" }}
        >
          {recipients.map((f) => (
            <Option userId={f.id} key={f.username}>
              {f.username}
            </Option>
          ))}
        </Select>
      </Modal>
    </>
  );
};

export default AccountInfo;
