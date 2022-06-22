import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from '../../node_modules/react-router-dom/index'
import { register } from '../actions/userActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function RegisterScreen() {

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [regnr, setRegnr] = useState('')
  const navigate = useNavigate()

  const userRegister = useSelector((state) => state.userRegister)
  const { userInfo, loading, error } = userRegister

  const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(register(name, email, password, regnr))
  }
  useEffect(() => {
    if (userInfo) {
      navigate("/")
    }
  }, [navigate, userInfo])
  return (
    <div className='center'>
      <form className="form bg-white d-flex flex-column text-center justify-content-center align-items-center" onSubmit={submitHandler}>
        <div>
          <h1>Register</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div className='d-flex flex-column mb-2'>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Enter your name" required onChange={(e) => setName(e.target.value)}></input>
        </div>
        <div className='d-flex flex-column mb-2'>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter email" required onChange={(e) => setEmail(e.target.value)}></input>
        </div>
        <div className='d-flex flex-column mb-2'>
          <label htmlFor="password">password</label>
          <input type="password" id="password" placeholder="Enter password" required onChange={(e) => setPassword(e.target.value)}></input>
        </div>
        <div className='d-flex flex-column mb-2'>
          <label htmlFor="confirmPassword">reg number</label>
          <input type="text" id="confirmPassword" placeholder="reg number" required onChange={(e) => setRegnr(e.target.value)}></input>
        </div>
        <div className='d-flex flex-column mb-2'>
          <label />
          <button className="primary" type="submit">Register</button>
        </div>
        <div>
          <label />
          <div>
            Already have an account? {' '}
            <Link to={`/signin`}>Sign in</Link>
          </div>
        </div>
      </form>
    </div>
  )
}
