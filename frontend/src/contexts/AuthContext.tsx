// @ts-nocheck
import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginApi, registerApi } from '../api/authApi';


  
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
    const [authToken, setAuthToken] = useState<string | null>(null)
  
    // Simulate authentication
    
    
    const login = (userData: User) => {
      return loginApi(userData.email, userData.password, userData.user_type)
      .then(({ user, token }) => {
        console.log( 'LOGIN',{user, token})
        setUser(user)
        setAuthToken(token)
        
      })
      // setUser(userData);
    };

    const register = (userData: User) => {
      return registerApi(userData)
      .then(({ user, token }: any) => {
       
          setUser(user)
          setAuthToken(token)
      })
    }
  
    const logout = () => {
      setUser(null);
      setAuthToken(null)
    };
  
    // You might want to load user data from local storage or a server
    useEffect(() => {
      const savedUser = localStorage.getItem('user');
      const savedAuthToken = localStorage.getItem('authToken')
      if (savedUser) {
        setUser(JSON.parse(savedUser) as User);
      }
      if (savedAuthToken) setAuthToken(savedAuthToken)
    }, []);

    // useEffect(() => {
    //   if (!user) return;
    //   if (['/login', '/register'].includes(window.location.pathname)) {
    //       // @ts-ignore
    //       window.location = redirectLookup[user.user_type]
    //     }
    // }, [window.location, user])
  
    // Save user data to local storage when user changes
    useEffect(() => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('authToken', authToken)
      } else {
        localStorage.removeItem('user');
        localStorage.removeItem('authToken')
      }
    }, [user, authToken]);
  
    return (
      <AuthContext.Provider value={{ user, login, logout, register, authToken }}>
        {children}
      </AuthContext.Provider>
    )
  }