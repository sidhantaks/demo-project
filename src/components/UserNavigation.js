import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function UserNavigation() {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate('/');
    };
  return (
     <div>
            {!isLoggedIn && (
                <>
                    <NavLink to="/login" className="nav-link">Login</NavLink>&nbsp;
                    <NavLink to="/signup" className="nav-link">Signup</NavLink>&nbsp;
                </>
            )}
            {isLoggedIn && (
                <button className="nav-link" onClick={handleLogout}>Logout</button>
            )}
        </div>
  )
}

export default UserNavigation