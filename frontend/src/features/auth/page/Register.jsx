import React, { useState } from 'react'
import "../auth.form.css"
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { toast } from 'react-toastify'

export default function Register() {
  const navigate = useNavigate()
  const { loading, handleRegister } = useAuth()

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  })

  function handleForm(e) {
    const { value, name } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

 const handleSubmit = async (e) => {
  e.preventDefault()

  const toastId = toast.loading("Registering...")

  const res = await handleRegister(form)

  if (res?.success) {
    toast.update(toastId, {
      render: "Registered successfully 🎉",
      type: "success",
      isLoading: false,
      autoClose: 3000
    })

    setForm({
      username: "",
      email: "",
      password: ""
    })

    navigate("/")
  } else {
    toast.update(toastId, {
      render: res?.message || "Registration failed ❌",
      type: "error",
      isLoading: false,
      autoClose: 3000
    })
  }
}
  if (loading) {
    return (
      <main>
        <h1>Loading.....</h1>
      </main>
    )
  }

  return (
    <main>
      <div className='form-container'>
        <h1>Register Form</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor='username'>Username</label>
            <input
              type="text"
              value={form.username}
              onChange={handleForm}
              name="username"
              placeholder='Enter your username'
              id="username"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor='email'>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={handleForm}
              name="email"
              placeholder='Enter your email'
              id="email"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor='password'>Password</label>
            <input
              type="password"
              value={form.password}
              onChange={handleForm}
              name="password"
              placeholder='Enter your password'
              id="password"
              required
            />
          </div>

          <button
            type='submit'
            className='button primary-button'
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p>
          Already have an account ? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  )
}