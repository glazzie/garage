import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router"




const useAuth = () => {
  const userSignin = useSelector(state => state.userSignin)
  const { userInfo } = userSignin
  if (userInfo && userInfo.isAdmin) {
    return userInfo
  }
}

const AdminRoute = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />
}

export default AdminRoute