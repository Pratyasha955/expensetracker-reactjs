import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../Reducers/authReducer';
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
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
  };

  const loginHandler = async (token) => {

    try {
      const response = await fetchUserProfile(token);
      if (response.ok) {
        const data = await response.json();
        const userProfile = data.users[0];
        const newUser = {
          displayName: userProfile.displayName || '',
          photoUrl: userProfile.photoUrl || '',
        };
        dispatch(login({ token, user: newUser }));
        console.log('Login successful.');
        navigate('/welcome');
      } else {
        throw new Error('Failed to fetch user profile');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

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
    token: useSelector((state) => state.auth.token),
    user: useSelector((state) => state.auth.user),
    isLoggedIn: useSelector((state) => state.auth.isLoggedIn),
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