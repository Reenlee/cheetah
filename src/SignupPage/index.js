import React, { useState } from "react";
import { message } from "antd";
import { useHistory } from "react-router-dom";

const SignupPage = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeUN = e => {
    setUsername(e.target.value);
  };

  const handleChangePW = e => {
    setPassword(e.target.value);
  };

  const handleErrors = async response => {
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
  };

  const handleClick = async () => {
    try {
      const userInfo = { username, password };

      await fetch("http://localhost:3000/signup", {
        method: "POST",
        body: JSON.stringify(userInfo)
      }).then(handleErrors);

      history.push("/chat");
    } catch (err) {
      message.error(err.message);
    }
  };

  return (
    <div>
      <div>Username</div>
      <input type="text" onChange={handleChangeUN} value={username} />

      <div>Password</div>
      <input type="password" onChange={handleChangePW} value={password} />

      <br />
      <button onClick={handleClick}>Sign Up</button>
    </div>
  );
};

export default SignupPage;
