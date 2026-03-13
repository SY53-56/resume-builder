import React from 'react'
import "../auth.form.scss";
import { Link } from 'react-router';
export default function Login() {
    const handleSubmit = (e)=>{
e.preventDefault()
    }
  return (
   <main>
      <div className='form-container'>
<h1>Login form</h1>
<form onSubmit={handleSubmit}>
    <div className="input-group">
        <label htmlFor='email'>Email</label>
        <input type="email" name="email" placeholder='Enter your email' id="email"/>
    </div>
      <div className="input-group">
        <label htmlFor='password'>password</label>
        <input type="password" name="password" placeholder='Enter your password' id="password"/>
    </div>
    <button className='button primary-button'>Login</button>
</form>
<p>Don't have an account ? <Link to="/register">register</Link></p>
      </div>
   </main>
  )
}
