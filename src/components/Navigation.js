import React, {useContext} from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';

function Navigation() {
  const { isLoggedIn } = useContext(AuthContext);
  if (!isLoggedIn) return null; // Hide navigation if not logged in   
  return (
   <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container">
        <div className="navbar-nav mx-auto d-flex justify-content-center">
          <NavLink to="/" className="nav-link" activeClassName="active">HOME</NavLink>
          <NavLink to="/about" className="nav-link" activeClassName="active">ABOUT</NavLink>
          <NavLink to="/contact" className="nav-link" activeClassName="active">CONTACT</NavLink>
          <NavLink to="/products" className="nav-link" activeClassName="active">PRODUCTS</NavLink>
        </div>
      </div>
    </nav>       
  )
}

export default Navigation