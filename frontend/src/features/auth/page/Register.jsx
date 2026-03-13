import React from 'react'
import "../auth.form.scss";
import { useNavigate , Link } from 'react-router';
export default function Register() {
    const navigate = useNavigate()
     const handleSubmit = (e)=>{
e.preventDefault()
    }
  return (
       <main>
      <div className='form-container'>
<h1>Registerr form</h1>
<form onSubmit={handleSubmit}>
    <div className="input-group">
        <label htmlFor='email'>username</label>
        <input type="text" name="username" placeholder='Enter your username' id="username"/>
    </div>
    <div className="input-group">
        <label htmlFor='email'>Email</label>
        <input type="email" name="email" placeholder='Enter your email' id="email"/>
    </div>
      <div className="input-group">
        <label htmlFor='password'>password</label>
        <input type="password" name="password" placeholder='Enter your password' id="password"/>
    </div>
    <button className='button primary-button'>Register</button>
</form>
<p>Already have an account ? <Link to="/login">Login</Link></p>
      </div>
   </main>
  )
}
