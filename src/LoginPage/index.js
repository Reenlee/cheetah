import React, { useState } from "react";
import { message } from "antd";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
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
      const userInfo = { username: username, password: password };

      await fetch("http://localhost:3000/login", {
        method: "POST",
        body: JSON.stringify(userInfo)
      }).then(handleErrors);

      history.push("/chat");
    } catch (err) {
      message.error(err.message);
    }
  };

  const handleClickSignup = () => {
    history.push("/signup");
  };

  return (
    <div>
      <div>Username</div>
      <input type="text" onChange={handleChangeUN} value={username} />

      <div>Password</div>
      <input type="password" onChange={handleChangePW} value={password} />

      <br />
      <button onClick={handleClick}>Login</button>

      <br />
      <button onClick={handleClickSignup}>Signup Page</button>
    </div>
  );
};

export default LoginPage;
