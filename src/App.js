import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ChatPage from "./ChatPage/index";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";

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
