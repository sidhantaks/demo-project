import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // ...your login logic...
    setIsLoggedIn(true); // Set login state to true
    navigate('/');
  };
  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email ID:</label>
          <input type="email" id="email" name="email" required />
        </div><br />
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div><br />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login