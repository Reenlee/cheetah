import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Typography } from "antd";
import { Input, Avatar } from "antd";
import { FormOutlined } from "@ant-design/icons";

import { useChat } from "../../contexts/chat";

import { StyledContainer } from "./design";

const { Search } = Input;
const { Text, Title } = Typography;

const Container = styled(StyledContainer)`
  overflow: auto;
  background-color: rgb(200, 200, 200);
`;

const RoomListWrapper = styled.div`
  padding-top: 5px;
`;

const RoomListItem = styled.div`
  display: flex;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 10px;
  padding-left: 5px;
  border-left: 5px solid white;
  box-sizing: border-box;
`;

const RoomItem = styled(Text)`
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

const PartChatroom = () => {
  const { room, rooms, selectRoom, listChats } = useChat();
  const [filteredRooms, setFilteredRooms] = useState([]);

  const handleClickRoom = (r) => {
    selectRoom(r);
    listChats({ roomId: r.id });
  };

  const handleChange = (e) => {
    const temp = rooms.filter((r) => r.name && r.name.includes(e.target.value));
    setFilteredRooms(temp);
  };

  useEffect(() => {
    setFilteredRooms(rooms);
  }, [rooms]);

  return (
    <Container>
      <Title level={4}>Participated Chatrooms</Title>
      <Search placeholder="input search text" onChange={handleChange} />

      <RoomListWrapper>
        {filteredRooms.map((r) => (
          <RoomListItem
            key={r.id}
            onClick={() => handleClickRoom(r)}
            style={{ borderLeftColor: room.id === r.id ? "blue" : "" }}
          >
            <Avatar>{r.name[0]}</Avatar>
            <RoomItem>{r.name}</RoomItem>
            <div>{r.unread}</div>
          </RoomListItem>
        ))}
      </RoomListWrapper>
    </Container>
  );
};

export default PartChatroom;
