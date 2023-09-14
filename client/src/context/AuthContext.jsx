import AuthService from '../utils/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = AuthService.getToken();
    console.log("Token in AuthProvider:", token); // Debugging line

    if (token) {
      const userData = AuthService.getProfile();
      console.log("User data in AuthProvider:", userData); // Debugging line
      setCurrentUser(userData);
      setIsLoggedIn(true);
    } else {
      console.log("No token found"); // Debugging line
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
