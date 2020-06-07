import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";

const LoginPage = lazy(() => import("../pages/LoginPage"));
const SignupPage = lazy(() => import("../pages/SignupPage"));
const TestPage = lazy(() => import("../pages/TestPage"));
const SecondTestPage = lazy(() => import("../pages/SecondTestPage"));

function Unauthenticated() {
  return (
    <Suspense fallback={<div>LOADING...</div>}>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/test" component={TestPage} />
        <Route exact path="/second-test" component={SecondTestPage} />
      </Switch>
    </Suspense>
  );
}

export default Unauthenticated;
