import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";

const ChatPage = lazy(() => import("../pages/ChatPage"));

function Authenticated() {
  return (
    <Suspense fallback={<div>LOADING...</div>}>
      <Switch>
        <Route exact path="/" component={ChatPage} />
      </Switch>
    </Suspense>
  );
}

export default Authenticated;
