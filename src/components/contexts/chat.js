import React, {
  createContext,
  useRef,
  useState,
  useEffect,
  useContext,
} from "react";
import { Modal } from "antd";
import uuid from "uuid";
import { message } from "antd";

import { useAuth } from "./auth";
import { postRequest } from "../helpers/api";
import { findFriend } from "../pages/ChatPage/api";

const { confirm, warning, info } = Modal;

const ChatContext = createContext();
const useChat = () => useContext(ChatContext);

const ChatProvider = (props) => {
  const { auth } = useAuth();
  const [invites, setInvites] = useState([]);
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

  const listInvites = (username) =>
    postRequest("/accounts/invite").then((data) => {
      setInvites(data);
    });

  const listFriends = () =>
    postRequest("/friends/list").then((data) => {
      setRecipients(data);
    });

  const listRooms = () =>
    postRequest("/rooms/list").then((data) => {
      setRooms(data);
    });

  const addRoom = (name, userIds) => {
    chatRef.current.send(
      JSON.stringify({
        action: "default",
        data: {
          auth_token: `Bearer ${localStorage.getItem("token")}`,
          senderId: auth.userId,
          name,
          userIds,
          type: "add-room",
        },
      })
    );
  };

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

  const sendInvite = async (username) => {
    const foundFriend = recipients.find((r) => r.username === username);
    if (foundFriend) {
      message.error("The user is already your friend");
      return;
    }

    const foundRecord = await findFriend(username);
    if (!foundRecord) {
      message.error("The user does not exist");
      return;
    }

    const foundMyself = username === auth.username;
    if (foundMyself) {
      message.error("You cannot add yourself");
      return;
    }

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

  const acceptInvite = async (username) => {
    chatRef.current.send(
      JSON.stringify({
        action: "default",
        data: {
          auth_token: `Bearer ${localStorage.getItem("token")}`,
          type: "accept",
          username,
        },
      })
    );
  };

  const rejectInvite = async (username) => {
    postRequest("/friends/reject", { username }).then((data) => {
      setInvites(invites.filter((i) => i.username !== data.username));
    });
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
        ((!roomId && recipient.id === senderId) ||
          (roomId && room.id === roomId))
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
        setInvites(invites.concat(payload));
      }

      if (payload.type === "accept") {
        const friend = payload.friends.find((f) => f.id !== auth.userId);
        setRecipients(recipients.concat(friend));
        setInvites(invites.filter((i) => i.username !== friend.username));
      }

      if (payload.type === "add-room") {
        setRooms(rooms.concat(payload.room));
      }
    };
  }, [auth.userId, invites, messages, recipient, recipients, room, rooms]);

  useEffect(() => {
    listFriends();
    listRooms();
    listInvites();
  }, []);

  return (
    <ChatContext.Provider
      value={{
        room,
        rooms,
        invites,
        messages,
        recipient,
        recipients,
        selectRoom,
        selectRecipient,
        addRoom,
        listChats,
        listRooms,
        sendMessage,
        sendInvite,
        acceptInvite,
        rejectInvite,
      }}
      {...props}
    />
  );
};

export { useChat };
export default ChatProvider;
