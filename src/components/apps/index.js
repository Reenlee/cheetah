import React, { Suspense, lazy } from "react";
import { message } from "antd";
import axios from "axios";
import { useAuth } from "../contexts/auth";

axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;

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

const Authenticated = lazy(() => import("./Authenticated"));
const Unauthenticated = lazy(() => import("./Unauthenticated"));

function App() {
  const { auth } = useAuth();
  console.log(auth);

  if (auth.userId) {
    return (
      <Suspense fallback={<div>LOADING...</div>}>
        <Authenticated />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<div>LOADING...</div>}>
      <Unauthenticated />
    </Suspense>
  );
}

export default App;
