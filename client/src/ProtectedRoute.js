import React from 'react'
import { useNavigate, Outlet} from 'react-router-dom';


const ProtectedRoute = ({isLoggedIn}) => {
  const navigate = useNavigate();
  console.log("Inside protected route", isLoggedIn);
  if(!isLoggedIn){
    return navigate("/api/u/login")
  }
  return <Outlet/>
}

export default ProtectedRoute