import React from 'react'

function Signup() {
  return (
    <div>
      <h2>Signup Page</h2>
      <form>
        <div>
          <label htmlFor="fullname">Full Name:</label>
          <input type="text" id="fullname" name="fullname" required />
        </div><br />
        <div>
          <label htmlFor="email">Email ID:</label>
          <input type="email" id="email" name="email" required />
        </div><br />
        <div>
          <label htmlFor="contact">Contact No:</label>
          <input type="tel" id="contact" name="contact" required />
        </div><br />
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div><br />
        <div>
          <label htmlFor="city">City:</label>
          <input type="text" id="city" name="city" required />
        </div><br />
        <button type="submit">SignUp</button>
      </form> 
    </div>
  )
}

export default Signup