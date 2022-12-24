import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';

import account from './appwrite/appwriteConfig'

import ProtectedRoute from './ProtectedRoute';

const App = () => {
  const isLoggedIn = false;
  const promise = account.get();

  promise.then(function (response) {
      console.log(response); // Success
      isLoggedIn = true;
  }, function (error) {
      console.log(error); // Failure
      isLoggedIn = false;
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/api/u/signup' element={<Signup/>}/>
        <Route path='/api/u/login' element={<Login/>}/>
        <Route element={<ProtectedRoute isLoggedIn={isLoggedIn}/>}>
          <Route path='/api/u/home' element={<Home/>}/>
        </Route>
        <Route/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;