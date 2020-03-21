import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { message } from "antd";
import axios from "axios";

import ChatPage from "./components/pages/ChatPage";
import LoginPage from "./components/pages/LoginPage";
import SignupPage from "./components/pages/SignupPage";

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
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/chat" component={ChatPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
