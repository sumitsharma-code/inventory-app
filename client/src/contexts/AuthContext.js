import { createContext, useState } from "react";
import api, { setAuthToken } from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    try {
      const res = await api.post("/auth/login", {
        username,
        password,
      });

      const token = res.data.token;

      // Save token
      localStorage.setItem("token", token);
      setAuthToken(token);

      // Save user
      setUser(res.data.user);

      return res.data;
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
