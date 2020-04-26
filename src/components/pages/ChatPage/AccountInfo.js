import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Typography, Button, Modal, Input, Select, Badge, Avatar } from "antd";

import { useChat } from "../../contexts/chat";
import { useAuth } from "../../contexts/auth";

import { StyledContainer } from "./design";

const { Title, Text } = Typography;
const { Option } = Select;

const Container = styled(StyledContainer)`
  overflow: auto;
  background-color: rgb(200, 200, 200);
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

const AccountInfo = () => {
  const { auth, logout } = useAuth();

  const {
    acceptInvite,
    rejectInvite,
    addRoom,
    recipients,
    sendInvite,
    invites,
  } = useChat();
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
    closeAddFriendModal();
    sendInvite(username);
  };

  const handleAcceptInvite = (username) => {
    closeAddFriendModal();
    acceptInvite(username);
  };

  const handleRejectInvite = (username) => {
    closeAddFriendModal();
    rejectInvite(username);
  };

  const handleClickCreateRoom = () => {
    const name = roomRef.current.state.value;
    const userIds = recipients
      .filter((r) => usernames.includes(r.username))
      .map((r) => r.id);

    addRoom(name, userIds);
    setOpenRoom(false);
    roomRef.current.setValue("");
    setUsernames([]);
  };

  const handleClickLogout = () => logout();

  return (
    <>
      <Container>
        <div>
          <FriendItemList>
            <Avatar src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg" />
            <FriendItem>{auth.username}</FriendItem>

            <Button
              style={{ float: "right" }}
              onClick={handleClickLogout}
              type="primary"
              shape="circle"
              icon="logout"
            />
          </FriendItemList>
        </div>

        <div>
          <Text>{`Friends: ${recipients.length}`}</Text>
        </div>

        <div style={{ display: "flex" }}>
          <Button
            onClick={openCreateRoomModal}
            type="primary"
            icon="plus"
            style={{ marginRight: 10 }}
          >
            Create Room
          </Button>

          <Badge count={invites.length}>
            <Button onClick={openAddFriendModal} type="primary" icon="plus">
              Add Friend
            </Button>
          </Badge>
        </div>
      </Container>

      <Modal
        title="Add Friend"
        visible={openFriend}
        onCancel={closeAddFriendModal}
        footer={null}
      >
        <div style={{ display: "flex" }}>
          <Input ref={usernameRef} placeholder="Enter username" />

          <Button
            key="submit"
            type="primary"
            onClick={handleClickAddFriend}
            style={{ marginLeft: 10 }}
          >
            Add
          </Button>
        </div>
        <div>
          {invites.map((i) => (
            <div key={i.username} style={{ marginTop: 10 }}>
              <span>{i.username}</span>

              <Button
                danger
                style={{ marginLeft: 10, marginRight: 10 }}
                onClick={() => handleRejectInvite(i.username)}
              >
                Reject
              </Button>

              <Button
                type="primary"
                onClick={() => handleAcceptInvite(i.username)}
              >
                Accept
              </Button>
            </div>
          ))}
        </div>
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
