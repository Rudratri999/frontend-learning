import React, { useEffect } from 'react'
import { useAuth } from "../context/AuthContext"
import { Navigate, Outlet } from 'react-router-dom';



const ProtectedRoute = ({ roles }) => {

    const { isAuthenticated, role} = useAuth();


    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }


    if (roles && !roles.includes(role)) {
        return <Navigate to="/unauthorized" />;
    }


    return <Outlet />;
};

export default ProtectedRoute

