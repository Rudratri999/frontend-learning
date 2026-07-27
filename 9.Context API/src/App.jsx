import React from 'react'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import Unauthorized from './pages/Unauthorized'
import AdminDashboard from "./pages/AdminDashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Register />} />

          <Route path='/login' element={<Login />} />

          <Route
            path="/unauthorized"
            element={<Unauthorized />}
          />

          <Route element={<ProtectedRoute roles={["user", "admin"]} />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route element={<ProtectedRoute roles={["admin"]} />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>



        </Routes>
      </BrowserRouter>
    </div >
  )
}

export default App
