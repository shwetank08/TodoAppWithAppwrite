import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';



import ProtectedRoute from './ProtectedRoute';

const App = () => {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/api/u/signup' element={<Signup/>}/>
        <Route path='/api/u/login' element={<Login/>}/>
        <Route element={<ProtectedRoute/>}>
          <Route path='/api/u/home' element={<Home/>}/>
        </Route>
        <Route/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;