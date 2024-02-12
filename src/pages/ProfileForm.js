import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../Store/AuthContext';
import './ProfileForm.css';

const ProfileForm = () => {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [error, setError] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        if (!token) {
            navigate('/');
        } else {
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
                    setFullName(user.displayName || ''); 
                    setPhotoUrl(user.photoUrl || ''); 
                } catch (error) {
                    console.error('Error fetching user profile:', error);
                    setError('Failed to fetch user profile');
                }
            };

            fetchUserProfile();
        }
    }, [token, navigate]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setFormSubmitted(true);

        if (!fullName.trim() || !photoUrl.trim()) {
            setError('Please fill in all fields');
            return;
        }

        try {
            const requestBody = {
                idToken: token,
                displayName: fullName,
                photoUrl: photoUrl,
            };

            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAd-TikGdyxo3ft2o8ndGc2kJCX2ur6q_0', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error.message || 'Failed to update profile');
            }

            console.log('Profile updated successfully:', data);
            navigate('/welcome');
        } catch (error) {
            setError(error.message);
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className="profile-form-container">
            <h2>Profile Form</h2>
            {formSubmitted && error && <p className="error-message">{error}</p>}
            <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="photo">Photo URL</label>
                    <input
                        type="text"
                        id="photo"
                        value={photoUrl}
                        onChange={(e) => setPhotoUrl(e.target.value)}
                    />
                </div>
                <button type="submit" className="button-profile">Update Profile</button>
            </form>
        </div>
    );
};

export default ProfileForm;