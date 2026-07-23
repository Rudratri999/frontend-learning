import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
     const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault()

       
        try {
            const response = await axios.post("http://127.0.0.1:8000/login", { username, password })

            localStorage.setItem("token", response.data.access_token)

            navigate("/dashboard")

        } catch (err) {
            console.log(err)
        }

    }
    return (
        <div>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder='Enter Name' value={username} onChange={(e)=> setUsername(e.target.value)} />
                <input type="password" placeholder='Enter Password' value={password} onChange={(e)=> setPassword(e.target.value)} />
                <button type='submit'>Login</button>
            </form>

        </div>
    )
}

export default Login
