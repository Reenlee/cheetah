import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ChatPage from "./ChatPage/index";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ChatPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignupPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
