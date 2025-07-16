import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Login from './Login'
import Signup from './Signup' 

function Router() {
  return (
    <div className='content'>
        <Routes>
          <Route path="/" element={<h2>Home Page</h2>} />       
          <Route path="/about" element={<h2>About Page</h2>} />
          <Route path="/contact" element={<h2>Contact Page</h2>} />
          <Route path="*" element={<h2>404 Not Found</h2>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
    </div>
  )
}

export default Router