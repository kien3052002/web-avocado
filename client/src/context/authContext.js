import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currUser, setCurrUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post(
      "http://localhost:8800/api/auth/login",
      inputs,
      {
        withCredentials: true,
        credentials: "include",
      }
    );
    setCurrUser(res.data);
  };

  const logout = async () => {
    await axios.post("http://localhost:8800/api/auth/logout", null, {
      withCredentials: true,
      credentials: "include",
    });
    setCurrUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currUser));
  }, [currUser]);

  return (
    <AuthContext.Provider value={{ currUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
