import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";

const LoginPage = lazy(() => import("../pages/LoginPage"));
const SignupPage = lazy(() => import("../pages/SignupPage"));

function Unauthenticated() {
  return (
    <Suspense fallback={<div>LOADING...</div>}>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/signup" component={SignupPage} />
      </Switch>
    </Suspense>
  );
}

export default Unauthenticated;
