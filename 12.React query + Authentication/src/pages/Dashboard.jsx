import React from 'react'
import { useNavigate } from "react-router-dom"
import { useAuth } from '../context/AuthContext'
import { useProfile } from '../hooks/useProfile'

const Dashboard = () => {
    const { logout , user} = useAuth()
    const navigate = useNavigate()
    const handleLogout = async() => {
        await logout()
        navigate("/login", { replace: true })
    }

    const { data, isPending, error } = useProfile()

    if (isPending) {
        return <p>Loading....</p>
    }

    if (error) {
        return <p>{error.message}</p>
    }

    return (
        <div>
            <h2>{user?.message}</h2>
            <h2>{data.message}</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Dashboard
