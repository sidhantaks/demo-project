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

    // Validate password match// Validate password match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const { confirmPassword, ...dataToSubmit } = formData; // exclude confirmPassword
      // Encrypt sensitive data before sending
      dataToSubmit.password = encrypt(formData.password);
      //console.log(dataToSubmit.password);
      await crudApi.create(DOMAIN, USERS_ENDPOINT, dataToSubmit);
       // Use the CRUD API to create user
      //console.log("Data submitted successfully:", dataToSubmit);
      alert("Data submitted!");
      dispatch(resetFormData());
    } catch (err) {
      console.error(err);
      alert("Submission failed.");
    }
  };

  return (
    <div>
      <h2>Signup Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullname">Full Name:</label>
          <input type="text" value={formData.fullname} onChange={handleChange} name="fullname" required />
        </div><br />
        <div>
          <label htmlFor="email">Email ID:</label>
          <input type="email" value={formData.email} onChange={handleChange} name="email" required />
        </div><br />
        <div>
          <label htmlFor="contact">Contact No:</label>
          <input type="tel" value={formData.contact} onChange={handleChange} name="contact" required />
        </div><br />
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" value={formData.password} onChange={handleChange} name="password" required />
        </div><br />
         <div>
          <label>Confirm Password:</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        </div><br />
        <div>
          <label htmlFor="city">City:</label>
          <input type="text" value={formData.city} onChange={handleChange} name="city" required />
        </div><br />
        <button type="submit">SignUp</button>
      </form>
    </div>
  );
}

export default Signup;
