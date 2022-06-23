import React, { useEffect } from 'react'
import LoadingBox from './LoadingBox'
import MessageBox from './MessageBox'
import { useDispatch, useSelector } from 'react-redux'
import { listFloors } from '../actions/floorActions'
import { Link, useNavigate } from 'react-router-dom'
import { signout } from '../actions/userActions'

export default function SideNav() {


  const navigate = useNavigate();
  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin

  const floorList = useSelector(state => state.floorList)
  const { loading, error, floors } = floorList

  const dispatch = useDispatch()

  const signoutHandler = () => {
    dispatch(signout())
  }

  useEffect(() => {
    dispatch(listFloors())
  }, [dispatch])

  return (
    <div>
      {loading ?
        (<LoadingBox></LoadingBox>)
        :
        error ?
          (<MessageBox variant="danger">{error}</MessageBox>)
          :
          (

            <>
              <nav className='sidebar d-none d-xxl-block'>
                <ul className='navList'>
                  <li className=''>
                    <Link to="/"><button >Home</button></Link>
                  </li>


                  {floors.slice(0).reverse().map((floor) => (
                    <li id={floor._id} key={floor._id}>
                      <button onClick={() => navigate(`garage/${floor.floor}`)}>floor: {floor.floor}</button>
                    </li>
                  ))}
                  {userInfo ?
                    <li className=''>
                      <button className="" onClick={signoutHandler}>Log out</button>
                    </li>
                    :
                    <li>
                      <button className="" onClick={() => navigate("login")}>Logga in</button>
                    </li>}
                </ul>
              </nav>


              <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-xxl-none">
                <div className='container'>
                  <Link className="navbar-brand" to="/">Local Garage</Link>
                  <i className="fa-solid text-white fa-bars fa-xl d-lg-none" role="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar"></i>

                  <div className="offcanvas offcanvas-end sidenav" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className='offcanvas-header mt-2 px-3'>
                      <div className='text-dark' data-bs-dismiss="offcanvas" aria-label="Close">
                        <Link to={"/"} className="nav-link text-dark"><h1 role="button" >Local garage</h1></Link>

                      </div>
                    </div>
                    <div className='offcanvas-body'>
                      <div className="navbar-nav justify-content-lg-end flex-grow-1 pe-3 h-100">
                        <ul className="nav justify-content-between flex-column flex-lg-row" data-bs-dismiss="offcanvas" aria-label="Close" >
                          <li className="nav-item my-2 mx-2">
                            <Link className="nav-link color_to_see" to="/">Home </Link>
                          </li>
                          {floors.map((floor) => (
                            <li key={floor._id} id={floor._id} className="nav-item my-2 mx-2">
                              <Link to={"garage/" + floor.floor} className="nav-link color_to_see" >floor {floor.floor}</Link>
                            </li>
                          ))}

                          {userInfo ?
                            <li className='my-auto mx-2'>
                              <button className="btn btn-primary" onClick={signoutHandler}>Log out</button>
                            </li>
                            :
                            <li className='my-auto'>
                              <button className="btn btn-primary" onClick={() => navigate("login")}>Logga in</button>
                            </li>}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </>
          )
      }
    </div>
  )
}
