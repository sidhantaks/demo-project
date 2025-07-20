import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { crudApi, DOMAIN, AUTH_ENDPOINT, encrypt } from "../helpers/api";

function Login() {
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  // Update state as user types
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send login data to backend
      formData.password = encrypt(formData.password);
      //console.log(formData.password);
      const res = await crudApi.create(DOMAIN, AUTH_ENDPOINT, formData);
      //console.log("Login API response:", res);
      if (res.message === 'Login successful') {
        setIsLoggedIn(true);
        navigate('/');
      }else {
      setError(res.message || "Invalid login");
    }
    } catch (err) {
      setError('Invalid email or password');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Login Page</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email ID:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div><br />
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
