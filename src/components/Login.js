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

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      formData.password = encrypt(formData.password);
      const res = await crudApi.create(DOMAIN, AUTH_ENDPOINT, formData);
      if (res.message === 'Login successful') {
        setIsLoggedIn(true);
        localStorage.setItem('token', res.token);
        navigate('/');
      } else {
        setError(res.message || "Invalid login");
      }
    } catch (err) {
      setError('Invalid email or password');
      console.error(err);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '450px', marginTop: '5rem' }}>
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="card-title text-center mb-4">Login</h3>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email ID</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
