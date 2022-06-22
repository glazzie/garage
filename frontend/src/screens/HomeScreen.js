import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function HomeScreen() {
  const navigate = useNavigate()
  const userSignin = useSelector(state => state.userSignin)
  const { userInfo } = userSignin
  return (
    <div className=''>
      <div className='backgroundimg'></div>
      <div className='form bg-white d-flex flex-column text-center justify-content-center align-items-center'>
        <div className='w-100'>
          <h1>Welcome to your local garage</h1>
          <div className='d-flex justify-content-around my-5'>
            {userInfo && userInfo.isAdmin ? <button className='btn btn-primary border-radius-order' onClick={() => navigate(`orders`)}><h2>Orders</h2></button> : null}
          </div>

        </div>


      </div>

    </div>
  )
}
