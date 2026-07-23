import React from 'react'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </div >
  )
}

export default App
