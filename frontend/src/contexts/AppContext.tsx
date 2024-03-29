import React from 'react';
import { AuthProvider } from './AuthContext';
import { ProfileProvider } from './ProfileContext';

export const AppProvider: React.FC<ContextProviderProps> = ({ children }) => {
  
  return (
    <AuthProvider>
      <ProfileProvider >
        {children}
      </ProfileProvider>
    </AuthProvider>
  );
};