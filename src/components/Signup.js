import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData, resetFormData } from "../redux/signupSlice";
import { crudApi, DOMAIN, USERS_ENDPOINT, encrypt } from "../helpers/api";

function Signup() {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.signup.formData);

  const handleChange = (e) => {
    dispatch(updateFormData({ [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const { confirmPassword, ...dataToSubmit } = formData;
      dataToSubmit.password = encrypt(formData.password);

      await crudApi.create(DOMAIN, USERS_ENDPOINT, dataToSubmit);
      alert("Data submitted!");
      dispatch(resetFormData());
    } catch (err) {
      console.error(err);
      alert("Submission failed.");
    }
  };

  return (
    <div className="container" style={{ maxWidth: "500px", marginTop: "3rem" }}>
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="card-title text-center mb-4">Signup</h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="fullname" className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email ID</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="contact" className="form-label">Contact No</label>
              <input
                type="tel"
                className="form-control"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="city" className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
