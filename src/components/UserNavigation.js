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
     <div className="d-flex align-items-center justify-content-end gap-3 px-4">
      {!isLoggedIn && (
        <>
          <NavLink to="/login" className="nav-link text-warning"><b>LOGIN</b></NavLink>
          <NavLink to="/signup" className="nav-link text-success"><b>SIGNUP</b></NavLink>
        </>
      )}
      {isLoggedIn && (
        <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
      )}
    </div>
  )
}

export default UserNavigation