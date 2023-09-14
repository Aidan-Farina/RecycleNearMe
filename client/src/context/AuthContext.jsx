import AuthService from '../utils/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = AuthService.getToken();
    if (token) {
      const userData = AuthService.getProfile();
      setCurrentUser(userData);
      setIsLoggedIn(true);
    }
  }, []);

  const login = (token) => {
    AuthService.login(token);
    const userData = AuthService.getProfile();
    console.log(userData);
    setCurrentUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    AuthService.logout();
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  const value = {
    isLoggedIn,
    currentUser,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
