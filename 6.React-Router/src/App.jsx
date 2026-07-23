import React from 'react'
import Home from './pages/Home'
import User from './pages/User'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar'

import { BrowserRouter, Routes, Route } from "react-router-dom"

const App = () => {

  
  return (
    <BrowserRouter>
      <Routes>
     
     <Route path='/' element= {<Home/>}/>
     <Route path='/users' element={<User/>}/>
     <Route path='/profile' element={<Profile/>}/>
     <Route path='*' element={<NotFound/>}/>
     

      </Routes>
    </BrowserRouter>
  )
}

export default App