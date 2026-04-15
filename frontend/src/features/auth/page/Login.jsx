import React, { useState } from 'react'
import "../auth.form.css"
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { toast } from 'react-toastify'

export default function Login() {
  const { handleLogin, loading } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  function handleForm(e) {
    const { value, name } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    //  basic validation
    if (!form.email || !form.password) {
      return toast.error("All fields are required ")
    }

    const toastId = toast.loading("Logging in...")

    const res = await handleLogin(form)

    if (res?.success) {
      toast.update(toastId, {
        render: "Login successful ",
        type: "success",
        isLoading: false,
        autoClose: 3000
      })

      setForm({
        email: "",
        password: ""
      })

      navigate("/")
    } else {
      toast.update(toastId, {
        render: res?.message || "Login failed ",
        type: "error",
        isLoading: false,
        autoClose: 3000
      })
    }
  }

  if (loading) {
    return (
      <main>
        <h1>Loading....</h1>
      </main>
    )
  }

  return (
    <main>
      <div className='form-container'>
        <h1>Login Form</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor='email'>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={handleForm}
              required
              name="email"
              placeholder='Enter your email'
              id="email"
            />
          </div>

          <div className="input-group">
            <label htmlFor='password'>Password</label>
            <input
              type="password"
              value={form.password}
              onChange={handleForm}
              required
              name="password"
              placeholder='Enter your password'
              id="password"
            />
          </div>

          <button
            type='submit'
            className='button primary-button'
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p>
          Don't have an account ? <Link to="/register">Register</Link>
        </p>
      </div>
    </main>
  )
}