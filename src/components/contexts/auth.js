import React, { createContext, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import jwt from "jsonwebtoken";

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

  useEffect(() => {
    getCurrentSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth
      }}
      {...props}
    />
  );
};

export { useAuth };
export default AuthProvider;
