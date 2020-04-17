import React, {
  createContext,
  useRef,
  useState,
  useEffect,
  useContext,
} from "react";
import { Modal } from "antd";
import uuid from "uuid";

import { useAuth } from "./auth";
import { postRequest } from "../helpers/api";

const { confirm, warning, info } = Modal;

const ChatContext = createContext();
const useChat = () => useContext(ChatContext);

const ChatProvider = (props) => {
  const { auth } = useAuth();
  const [recipient, setRecipient] = useState("");
  const [recipients, setRecipients] = useState([]);
  const [room, setRoom] = useState({});
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);

  const chatRef = useRef(new WebSocket(process.env.REACT_APP_WEBSOCKET_URL));

  const selectRecipient = (r) => {
    setRecipient(r);
    setRoom({});
  };

  const selectRoom = (r) => {
    setRecipient({});
    postRequest("/rooms/find", { roomId: r.id }).then((data) => {
      setRoom(data);
    });
  };

  const listFriends = () =>
    postRequest("/friends/list").then((data) => {
      setRecipients(data);
    });

  const addFriend = (username) =>
    postRequest("/friends/add", { username }).then((data) => {
      setRecipients(recipients.concat(data));
    });

  const listRooms = () =>
    postRequest("/rooms/list").then((data) => {
      setRooms(data);
    });

  const addRoom = (name, userIds) =>
    postRequest("/rooms/add", { name, userIds }).then((data) => {
      setRooms(rooms.concat(data));
    });

  const listChats = ({ recipientId, roomId }) => {
    postRequest("/chats/list", { recipientId, roomId }).then((data) => {
      setMessages(data);
    });
  };

  const sendMessage = (message) => {
    console.log({
      auth_token: `Bearer ${localStorage.getItem("token")}`,
      senderId: auth.userId,
      recipientId: recipient.id ? recipient.id : null,
      roomId: room.id ? room.id : null,
      type: "send",
      message,
    });

    setMessages(
      messages.concat({ id: uuid.v4(), senderId: auth.userId, message })
    );

    chatRef.current.send(
      JSON.stringify({
        action: "default",
        data: {
          auth_token: `Bearer ${localStorage.getItem("token")}`,
          senderId: auth.userId,
          recipientId: recipient.id ? recipient.id : null,
          roomId: room.id ? room.id : null,
          type: "send",
          message,
        },
      })
    );
  };

  useEffect(() => {
    chatRef.current.onopen = () => {
      chatRef.current.send(
        JSON.stringify({
          action: "default",
          data: {
            auth_token: `Bearer ${localStorage.getItem("token")}`,
            senderId: auth.userId,
            type: "connect",
          },
        })
      );
    };

    chatRef.current.onmessage = (message) => {
      const payload = JSON.parse(message.data);
      const { senderId, recipientId, roomId } = payload;

      if (
        payload.type === "send" &&
        (recipient.id === senderId || room.id === roomId)
      ) {
        setMessages(messages.concat(payload));
      }
    };
  }, [auth.userId, messages, recipient, room]);

  useEffect(() => {
    listFriends();
    listRooms();
  }, []);

  return (
    <ChatContext.Provider
      value={{
        room,
        rooms,
        messages,
        recipient,
        recipients,
        selectRoom,
        selectRecipient,
        addRoom,
        addFriend,
        listChats,
        listRooms,
        sendMessage,
      }}
      {...props}
    />
  );
};

export { useChat };
export default ChatProvider;
