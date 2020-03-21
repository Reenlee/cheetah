import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { postRequest } from "../../helpers/api";

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

  const handleClick = () => {
    const userInfo = { username, password };

    postRequest("/signup", userInfo).then(data => {
      const token = data.token;
      localStorage.setItem("token", token);
      history.push("/chat");
    });
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
