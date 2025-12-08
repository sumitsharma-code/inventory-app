import React, { createContext, useState, useEffect } from 'react';
import api, { setAuthToken } from '../api/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);

  useEffect(() => {
    setAuthToken(token);
    if (token && user) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }, [token, user]);

  const login = async (username, password) => {
    const resp = await api.post('/auth/login', { username, password });
    setToken(resp.data.token);
    setUser(resp.data.user);
    return resp.data;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, setUser, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
