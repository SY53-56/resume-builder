import React, {useState} from 'react'
import "../auth.form.css";
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
export default function Login() {
    const {handleLogin , loading}= useAuth()
    const navigate= useNavigate()
     const [form , setForm] = useState({
        email:"",
        password:""
        })
    
        function handleForm(e){
             const {value ,name} =e.target
             console.log(value ,name)
             setForm(prev => ({...prev, [name]:value}))
        }

const handleSubmit = async(e)=>{
e.preventDefault()
 await handleLogin(form)
 navigate("/")
setForm({
  email: "",
  password: ""
})
    }
    if(loading){
        return ( <main >
            <h1 >loading....</h1>
        </main>)
    }
  return (
   <main>
      <div className='form-container'>
<h1>Login form</h1>
<form onSubmit={handleSubmit}>
    <div className="input-group">
        <label htmlFor='email'>Email</label>
        <input type="email" value={form.email} onChange={handleForm} required name="email" placeholder='Enter your email' id="email"/>
    </div>
      <div className="input-group">
        <label htmlFor='password'>password</label>
        <input type="password" value={form.password}  onChange={handleForm} required  name="password" placeholder='Enter your password' id="password"/>
    </div>
    <button type='submit' className='button primary-button'>Login</button>
</form>
<p>Don't have an account ? <Link to="/register">register</Link></p>
      </div>
   </main>
  )
}
