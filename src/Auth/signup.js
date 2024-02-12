import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signup.css';

const SignupPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState(null);
    const [idToken, setIdToken] = useState(null);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [signedUp, setSignedUp] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password || !formData.confirmPassword) {
            setError('All fields are mandatory');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await fetch(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAd-TikGdyxo3ft2o8ndGc2kJCX2ur6q_0',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password,
                        returnSecureToken: true,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                setError(null);
                setFormData({
                    email: '',
                    password: '',
                    confirmPassword: '',
                });
                setIdToken(data.idToken);
                setIsEmailVerified(true);
                setSignedUp(true);
            } else {
                setError(data.error.message);
            }
        } catch (error) {
            setError('An error occurred during signup');
        }
    };

    const handleVerifyEmail = async () => {
        try {
            const verificationResponse = await fetch(
                'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAd-TikGdyxo3ft2o8ndGc2kJCX2ur6q_0',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        requestType: 'VERIFY_EMAIL',
                        idToken: idToken,
                    }),
                }
            );

            const verificationData = await verificationResponse.json();

            if (verificationResponse.ok) {
                console.log('Verification email sent successfully');
                navigate('/welcome');  
            } else {
                setError(verificationData.error.message);
            }
        } catch (error) {
            setError('An error occurred during email verification');
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            {signedUp && isEmailVerified ? (
                <button onClick={handleVerifyEmail}>Verify Email</button>
            ) : (
                <form onSubmit={handleSubmit} className="signup-form">
                    <label>
                        Email:
                        <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Password:
                        <input type="password" name="password" value={formData.password} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Confirm Password:
                        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                    </label>
                    <br />
                    <button type="submit">Sign Up</button>
                </form>
            )}
            <p className="login-message">
                Already have an account? <Link to="/">Login</Link>
            </p>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default SignupPage; 