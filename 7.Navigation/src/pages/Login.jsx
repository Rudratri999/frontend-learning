import React from 'react'
import Dashboard from './Dashboard'
import { useNavigate } from "react-router-dom"

const Login = () => {
    const navigate = useNavigate()
    const handleLogin = () => {
        console.log("Login Success")
        navigate("/dashboard")
    }
    return (
        <div>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

export default Login

