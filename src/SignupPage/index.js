import React, { useState } from "react";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeUN = e => {
    setUsername(e.target.value);
  };

  const handleChangePW = e => {
    setPassword(e.target.value);
  };

  const handleClick = () => {
    fetch("http://localhost:3000/save_record");
  };

  return (
    <div>
      <div>Username</div>
      <input type="text" onChange={handleChangeUN} value={username} />

      <div>Password</div>
      <input type="password" onChange={handleChangePW} value={password} />

      <button onClick={handleClick}>Sign Up</button>
    </div>
  );
};

export default SignupPage;
