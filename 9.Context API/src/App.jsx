import React from 'react'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import {BrowserRouter , Routes , Route} from "react-router-dom"

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>

      
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
