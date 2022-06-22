import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signin } from '../actions/userActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function LoginScreen() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo, loading, error } = userSignin

  const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(signin(email, password))
  }
  useEffect(() => {
    if (userInfo) {
      navigate("/")
    }
  }, [navigate, userInfo])
  return (
    <>
      <div className='backgroundimg'></div>

      <form className="form bg-white d-flex flex-column text-center justify-content-center align-items-center" onSubmit={submitHandler}>

        <div>
          <h1>Sign in</h1>
          <p className='text-muted mb-0'>Email: admin@admin.com</p>
          <p className='text-muted'>Pw: admin</p>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div className='d-flex flex-column mb-3'>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter email" required onChange={(e) => setEmail(e.target.value)}></input>
        </div>
        <div className='d-flex flex-column mb-3'>
          <label htmlFor="password">password</label>
          <input type="password" id="password" placeholder="Enter password" required onChange={(e) => setPassword(e.target.value)}></input>
        </div>
        <div>
          <label />
          <button className="btn btn-primary" type="submit">Sign In</button>
        </div>
        <div>
          <label />
        </div>
        <div>
          New customer {' '}
          <Link to={"/register"}>Create your account</Link>
        </div>
      </form>

    </>
  )
}
