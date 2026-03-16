import React, { useState } from 'react'
import "../auth.form.scss";
import { useNavigate , Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';
export default function Register() {
    const navigate = useNavigate()
    const {loading , handleRegister} = useAuth()
    const [form , setForm] = useState({
        username:"",
    email:"",
    password:""
    })

    function handleForm(e){
         const {value ,name} =e.target
         setForm(prev => ({...prev, [name]:value}))
    }

     const handleSubmit = (e)=>{
e.preventDefault()
 handleRegister(form)
    }

    if(loading){
        return (<main>
            <h1>Loading.....</h1>
        </main>)
    }
  return (
       <main>
      <div className='form-container'>
<h1>Registerr form</h1>
<form onSubmit={handleSubmit}>
    <div className="input-group">
        <label htmlFor='email'>username</label>
        <input type="text" value={form.username}  onChange={handleForm} name="username" placeholder='Enter your username' id="username"/>
    </div>
    <div className="input-group">
        <label htmlFor='email'>Email</label>
        <input type="email" value={form.username}  onChange={handleForm}  name="email" placeholder='Enter your email' id="email"/>
    </div>
      <div className="input-group">
        <label htmlFor='password'>password</label>
        <input type="password" value={form.password}  onChange={handleForm} name="password" placeholder='Enter your password' id="password"/>
    </div>
    <button type='submit' className='button primary-button'>Register</button>
</form>
<p>Already have an account ? <Link to="/login">Login</Link></p>
      </div>
   </main>
  )
}
