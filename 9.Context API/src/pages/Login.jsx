import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import api from '../api/axios'
import { loginUser } from '../services/authServices'

const Login = () => {

    const navigate = useNavigate()
    const { login } = useAuth()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault()


        try {
            // const response = await axios.post("http://127.0.0.1:8000/login", { username, password })
            // const response = await api.post("/login", { username, password })
            const response = await loginUser(username, password)
           
            login(
                response.data.access_token,
                response.data.role
            );

            navigate("/dashboard")

        } catch (err) {
            console.log(err)
        }

    }


    return (
        <div>
            <form
                onSubmit={(e) => handleLogin(e)}
            >
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login
