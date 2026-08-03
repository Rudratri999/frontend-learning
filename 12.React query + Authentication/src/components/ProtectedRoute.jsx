import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, authLoading } = useAuth()

    if (authLoading) {
        return <p>Loading....</p>
    }
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute
