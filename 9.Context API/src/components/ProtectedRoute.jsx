import React, { useEffect } from 'react'
import { useAuth } from "../context/AuthContext"
import { Navigate, Outlet } from 'react-router-dom';



const ProtectedRoute = ({ children }) => {

    const { isAuthenticated } = useAuth()
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />

    return (
        <div>
            {children}
        </div>
    )
}

export default ProtectedRoute

