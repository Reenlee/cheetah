import React, { createContext, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import jwt from "jsonwebtoken";
import { postRequest } from "../helpers/api";

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

const AuthProvider = props => {
  const history = useHistory();
  const [auth, setAuth] = useState(false);

  const getCurrentSession = () => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      setAuth(jwt.decode(token));
    }
  };

  const signup = ({ username, password }) => {
    postRequest("/signup", { username, password }).then(data => {
      const token = data.token;
      localStorage.setItem("token", token);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      setAuth(jwt.decode(token));
      history.push("/");
    });
  };

  const login = ({ username, password }) => {
    postRequest("/login", { username, password }).then(data => {
      const token = data.token;
      localStorage.setItem("token", token);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      setAuth(jwt.decode(token));
      history.push("/");
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    axios.defaults.headers.common.Authorization = undefined;
    setAuth(false);
    history.push("/");
  };

  useEffect(() => {
    getCurrentSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        signup,
        login,
        logout
      }}
      {...props}
    />
  );
};

export { useAuth };
export default AuthProvider;
