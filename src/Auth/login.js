import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Store/AuthContext';
import './login.css';

const Login = ({ onLoginSuccess }) => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            setError('All fields are mandatory');
            return;
        }

        try {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAd-TikGdyxo3ft2o8ndGc2kJCX2ur6q_0', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('User has successfully logged in');
                setError(null);
                authContext.login(data.idToken); 
                navigate('/Welcome');
            } else {
                setError('Invalid credentials');
            }
        } catch (error) {
            console.error('An error occurred during login:', error);
            setError('An unexpected error occurred during login');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin} className="login-form">
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
                <button type="submit">Login</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            <p className="signup-message">
                Don't have an account? <Link  to="/Signup">Sign Up</Link>
            </p>
        </div>
    );
};

export default Login;
