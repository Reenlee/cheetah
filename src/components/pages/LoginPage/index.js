import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Input } from "antd";
import { postRequest } from "../../helpers/api";

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

  const handleClick = () => {
    const userInfo = { username, password };

    postRequest("/login", userInfo).then(data => {
      const token = data.token;
      localStorage.setItem("token", token);
      history.push("/chat");
    });
  };

  const handleClickSignup = () => {
    history.push("/signup");
  };

  return (
    <div style={{ display: "grid", minHeight: "100vh" }}>
      <div style={{ margin: "auto", width: 250 }}>
        <div style={{ display: "grid", height: 80 }}>
          <div
            style={{
              margin: "auto",
              fontSize: 40,
              color: "white",
              textShadow:
                "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"
            }}
          >
            ABC
          </div>
        </div>

        <div
          style={{
            border: "3px solid #940575",
            padding: 20,
            borderRadius: 5
          }}
        >
          <div style={{ display: "grid" }}>
            <div>Username</div>
            <Input
              placeholder="Username"
              type="text"
              onChange={handleChangeUN}
              value={username}
            />
          </div>

          <div style={{ display: "grid", marginTop: 5 }}>
            <div>Password</div>
            <Input
              placeholder="Password"
              type="password"
              onChange={handleChangePW}
              value={password}
            />
          </div>

          <div style={{ display: "grid", marginTop: 10 }}>
            <Button type="primary" onClick={handleClick}>
              Login
            </Button>
          </div>

          <div style={{ display: "grid", marginTop: 20 }}>
            <div>Don't have an account?</div>
            <Button onClick={handleClickSignup}>Signup</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
