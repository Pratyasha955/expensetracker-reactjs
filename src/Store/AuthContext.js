import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthProvider = (props) => {  
  const navigate = useNavigate();
  const storedToken = localStorage.getItem('token');
  const [token, setToken] = useState(storedToken || '');
  const [isLoggedIn, setIsLoggedIn] = useState(!!storedToken);

  const logoutHandler = () => {
    setToken('');
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    navigate('/');
  };

  const loginHandler = async (token) => {
    setToken(token);
    setIsLoggedIn(true);
    localStorage.setItem('token', token);
  };


  const contextValue = {
    token: token,
    isLoggedIn: isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
