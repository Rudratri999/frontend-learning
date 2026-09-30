import React from 'react'
import { useAuth } from "../context/AuthContext"
import { Navigate } from "react-router-dom"

const ProtectedRoutes = ({ children }) => {
    const { isAuthenticated, authLoading } = useAuth()

    if (authLoading) {
        return <p>Loading....</p>
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }
    return children

}

export default ProtectedRoutes
