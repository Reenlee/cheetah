import React from "react";
import { Route, Switch } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ChatPage from "../pages/ChatPage";
import { useAuth } from "../contexts/auth";

axios.defaults.baseURL = "http://localhost:3000";

axios.interceptors.response.use(
  ({ data }) => data,
  ({ response }) => {
    const { data = {} } = response || {};
    const { message: msgText } = data || {};
    if (msgText) {
      message.error(msgText);
    }

    return Promise.reject(response);
  }
);

function App() {
  const { auth } = useAuth();
  console.log(auth);

  if (auth.userId) {
    return (
      <Switch>
        <Route exact path="/" component={ChatPage} />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <Route exact path="/signup" component={SignupPage} />
    </Switch>
  );
}

export default App;
