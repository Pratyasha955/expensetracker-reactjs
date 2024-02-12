import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../Store/AuthContext';
import { useNavigate } from 'react-router-dom';
import './welcome.css';

const Home = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profileComplete, setProfileComplete] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAd-TikGdyxo3ft2o8ndGc2kJCX2ur6q_0', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idToken: token,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const data = await response.json();
        const user = data.users[0];
        setProfileComplete(!!user && !!user.displayName);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    if (!token) {
      navigate('/');
    } else {
      fetchUserProfile();
    }
  }, [token, navigate]);

  return (
    <div className="container-profile">
      <h2>Welcome To ExpenceTracker</h2>
      {profileComplete ? (
        <p>
          Your profile is complete. <Link to="/complete-profile">View Profile</Link>
        </p>
      ) : (
        <p>Your profile is incomplete.</p>
      )}
      <p>
        <Link to="/complete-profile">Complete it now</Link>
      </p>
    </div>
  );
};

export default Home;
