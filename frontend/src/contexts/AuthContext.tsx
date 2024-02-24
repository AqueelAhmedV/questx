import React, { createContext, useState, useContext, useEffect } from 'react';
import { registerApi } from '../api/authApi';

  
  // Create the AuthContext
  const AuthContext = createContext<AuthContextType | undefined>(undefined);

  // Custom hook to use the AuthContext
  export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };
  
  // AuthProvider component
  export const AuthProvider: React.FC<ContextProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
  
    // Simulate authentication
    const login = (userData: User) => {
      
      setUser(userData);
    };

    const register = (userData: User) => {
      registerApi(userData)
      .then((d) => {
        console.log('inside context', d)
      }).catch(console.log)
    }
  
    const logout = () => {
      setUser(null);
    };
  
    // You might want to load user data from local storage or a server
    useEffect(() => {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser) as User);
      }
    }, []);
  
    // Save user data to local storage when user changes
    useEffect(() => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    }, [user]);
  
    return (
      <AuthContext.Provider value={{ user, login, logout, register }}>
        {children}
      </AuthContext.Provider>
    )
  }