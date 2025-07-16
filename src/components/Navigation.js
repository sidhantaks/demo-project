import React from 'react'
import { NavLink } from 'react-router-dom'

function Navigation() {
  return (
    <nav>
        <NavLink to="/" className="nav-link" activeClassName="active-link">Home</NavLink>&nbsp;
        <NavLink to="/about" className="nav-link" activeClassName="active-link">About</NavLink>&nbsp;
        <NavLink to="/contact" className="nav-link" activeClassName="active-link">Contact</NavLink>
    </nav>        
  )
}

export default Navigation