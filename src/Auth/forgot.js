import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './forgot.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email.trim()) {
            setMessage('Please fill in all fields');
            return;
        }

        try {
            const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAd-TikGdyxo3ft2o8ndGc2kJCX2ur6q_0`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    requestType: 'PASSWORD_RESET'
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error.message || 'Failed to send password reset email');
            }

            setMessage(`An email has been sent to ${email} with instructions to reset your password.`);
            setEmail('');
            navigate('/');
        } catch (error) {
            setMessage(error.message || 'Failed to reset password');
        }
    };

    return (
        <div className="Forgot-container">
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Reset Password</button>
            </form>
            {message && <p className="error-message">{message}</p>}
            <p className="signup-message">
            Already have an account? <Link to="/">Login</Link> / Don't have an account? <Link className='sp-link' to="/signup">Sign Up</Link>
            </p>
        </div>
    );
};

export default ForgotPassword;