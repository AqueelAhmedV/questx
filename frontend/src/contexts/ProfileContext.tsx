// ProfileContext.js
import React, { createContext, useState, useContext } from 'react';

const ProfileContext = createContext<ProfileContextType<boolean> | undefined>(undefined);

export const ProfileProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile<User> | null>(null);
  const [showNavbar, setShowNavbar] = useState(true)

  // Define functions to update profile data, fetch profile data, etc.

  return (
    <ProfileContext.Provider value={{ profile, showNavbar, setShowNavbar }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);