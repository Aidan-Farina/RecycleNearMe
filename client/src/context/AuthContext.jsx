import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService from '../utils/auth'; 

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState(null); // Placeholder for future profile data

  useEffect(() => {
    // Initialize isLoggedIn if a token exists
    const loggedIn = AuthService.loggedIn();
    setIsLoggedIn(loggedIn);

    // If profiles are implemented, you can initialize it here
    if (loggedIn) {
      const userProfile = AuthService.getProfile();
      setProfile(userProfile);
    }
  }, []);

  const login = (token) => {
    AuthService.login(token);
    setIsLoggedIn(true);

    // If profiles are implemented, you can set it here
    const userProfile = AuthService.getProfile();
    setProfile(userProfile);
  };

  const logout = () => {
    AuthService.logout();
    setIsLoggedIn(false);
    setProfile(null); // Clear the profile
  };

  const value = {
    isLoggedIn,
    profile, // Placeholder for future profile data
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};



