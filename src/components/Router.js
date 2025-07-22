import React, {useContext} from 'react'
import {Routes, Route, Navigate} from 'react-router-dom';
import Login from './Login'
import Signup from './Signup' 
import Home from './Home'
import Products from './Products'
import { AuthContext } from '../context/AuthContext';

function Router() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  return (
    <div className='content'>
        <Routes>
          {isLoggedIn 
          ? 
          <>
            <Route path="/" element={<Home />} />       
            <Route path="/about" element={<h2>About Page</h2>} />
            <Route path="/contact" element={<h2>Contact Page</h2>} />
            <Route path="/products" element={<Products />} />
            <Route path="*" element={<h2>404 Not Found</h2>} />
          </> 
          : 
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
          }          
          
        </Routes>
    </div>
  )
}

export default Router