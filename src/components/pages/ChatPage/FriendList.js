import React, { useState, useEffect } from "react";
import { postRequest } from "../../helpers/api";

const FriendList = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    postRequest("/friends/list").then(data => {
      setFriends(data.friends);
    });
  }, []);

  return (
    <div>
      {friends.map(f => (
        <div>{f.username}</div>
      ))}
    </div>
  );
};

export default FriendList;
