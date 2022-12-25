import React from 'react'
import { useNavigate, Outlet} from 'react-router-dom';
import account from './appwrite/appwriteConfig'


const ProtectedRoute = () => {
  const navigate = useNavigate();

  const promise = account.get();

  promise.then(function (response) {
     // Success
      console.log("success");
  }, function (error) {
     // Failure
      console.log("failure", error);
      return navigate("/api/u/login");
  });
  return <Outlet/>;
}

export default ProtectedRoute;