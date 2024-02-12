import React, {useContext} from 'react';
import AuthContext from '../Store/AuthContext';
import './Header.css';

const Header = () => {
    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };

    return (
        <header className="header">
            <div className="left-section">
                <h1 className="heading">Expense Tracker</h1>
            </div>
            <nav className="navbar">
                <ul className="nav-list">
                   {user && (
                        <li className="nav-item">
                            <button className="logout-button" onClick={handleLogout}>Logout</button>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;
