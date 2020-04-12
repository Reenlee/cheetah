import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Typography } from "antd";
import { Input, Avatar } from "antd";
import { FormOutlined } from "@ant-design/icons";

import { useChat } from "../../contexts/chat";

const { Search } = Input;
const { Text, Title } = Typography;

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 10px;
  overflow: auto;
`;

const RoomItemListWrapper = styled.div`
  padding-top: 5px;
`;

const RoomItemList = styled.div`
  display: flex;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 10px;
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
  const { rooms, selectRoom, listChats } = useChat();
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

      <RoomItemListWrapper>
        {filteredRooms.map((r) => (
          <RoomItemList key={r.id} onClick={() => handleClickRoom(r)}>
            <Avatar>{r.name[0]}</Avatar>
            <RoomItem>{r.name}</RoomItem>
            <IconWrapper
            // onClick={handleClickForm}
            />
          </RoomItemList>
        ))}
      </RoomItemListWrapper>
    </Container>
  );
};

export default PartChatroom;
