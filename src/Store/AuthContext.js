import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = React.createContext({
  token: '',
  user: null,
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthProvider = (props) => {  
  const navigate = useNavigate();
  const storedToken = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user'); 
  const [token, setToken] = useState(storedToken || '');
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null); 
  const [isLoggedIn, setIsLoggedIn] = useState(!!storedToken);

  const logoutHandler = () => {
    setToken('');
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user'); 
    navigate('/');
  };

  const loginHandler = async (token) => {
    setToken(token);
    setIsLoggedIn(true);
    localStorage.setItem('token', token);

    try {
      const response = await fetchUserProfile(token);
      if (response.ok) {
        const data = await response.json();
        const userProfile = data.users[0];
        const newUser = {
          displayName: userProfile.displayName || '',
          photoUrl: userProfile.photoUrl || '',
        };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser)); 
      } else {
        throw new Error('Failed to fetch user profile');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  useEffect(() => {
    if (!storedToken) {
      setIsLoggedIn(false);
    }
  }, [storedToken]);

  const fetchUserProfile = async (token) => {
    return await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAd-TikGdyxo3ft2o8ndGc2kJCX2ur6q_0', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idToken: token,
      }),
    });
  };

  const contextValue = {
    token: token,
    user: user,
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
