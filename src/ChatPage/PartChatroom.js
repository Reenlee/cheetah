import React, { useState } from "react";
import styled from "styled-components";
import { Typography } from "antd";
import { Button, Modal, Tag, Badge } from "antd";

const { Text } = Typography;

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 20px;
`;

const PartChatroom = () => {
  return (
    <Container>
      <div>
        <Text>Participated Chatrooms</Text>
      </div>
      <div style={{ padding: 10 }}>
        <Badge count={5}>
          <Text style={{ padding: 15 }}>ARMY Vancouver</Text>
        </Badge>
        <Tag color="magenta" style={{ marginLeft: 20 }}>
          Private
        </Tag>
      </div>
      <div style={{ padding: 10 }}>
        <Badge count={5}>
          <Text style={{ padding: 15 }}>ARMY Vancouver</Text>
        </Badge>
        <Tag color="green" style={{ marginLeft: 20 }}>
          Open
        </Tag>
      </div>
      <div style={{ padding: 10 }}>
        <Badge count={5}>
          <Text style={{ padding: 15 }}>ARMY Vancouver</Text>
        </Badge>
        <Tag color="magenta" style={{ marginLeft: 20 }}>
          Private
        </Tag>
      </div>
    </Container>
  );
};

export default PartChatroom;
