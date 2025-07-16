import React from 'react'

function Signup() {
  return (
    <div>
      <h2>Signup Page</h2>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
        </div><br />
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div><br />
        <div>
          <label htmlFor="email">Contact No:</label>
          <input type="tel" id="email" name="email" required />
        </div><br />
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div><br />
        <div>
          <label htmlFor="password">Address:</label>
          <input type="text" id="address" name="address" required />
        </div><br />
        <button type="submit">SignUp</button>
      </form> 
    </div>
  )
}

export default Signup