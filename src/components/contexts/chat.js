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

    const temp = recipients.map((f) => {
      if (f.id === r.id) {
        delete f.unread;
      }
      return f;
    });

    setRecipients(temp);
  };

  const selectRoom = (r) => {
    setRecipient({});
    postRequest("/rooms/find", { roomId: r.id }).then((data) => {
      setRoom(data);
    });

    const temp = rooms.map((f) => {
      if (f.id === r.id) {
        delete f.unread;
      }
      return f;
    });

    setRooms(temp);
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
    setMessages(
      messages.concat({
        id: uuid.v4(),
        senderId: auth.userId,
        message,
        createdOn: new Date().getTime(),
      })
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

  const sendInvitation = (username) => {
    chatRef.current.send(
      JSON.stringify({
        action: "default",
        data: {
          auth_token: `Bearer ${localStorage.getItem("token")}`,
          sender: {
            id: auth.userId,
            username: auth.username,
          },
          type: "invite",
          username,
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
      } else {
        if (recipientId) {
          const temp = recipients.map((r) => {
            if (r.id === senderId) {
              r.unread = typeof r.unread === "number" ? r.unread + 1 : 1;
              return r;
            }
            return r;
          });
          setRecipients(temp);
        }

        if (roomId) {
          const temp = rooms.map((r) => {
            if (r.id === roomId) {
              r.unread = typeof r.unread === "number" ? r.unread + 1 : 1;
              return r;
            }
            return r;
          });
          setRooms(temp);
        }
      }

      if (payload.type === "invite") {
        alert(`you got friend request from... ${payload.sender.username}`);
      }
    };
  }, [auth.userId, messages, recipient, recipients, room, rooms]);

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
        sendInvitation,
      }}
      {...props}
    />
  );
};

export { useChat };
export default ChatProvider;
