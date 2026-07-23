import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleRegister = async (e) => {
        e.preventDefault()
        // console.log(username)
        // console.log(password)



        try {
            const response = await axios.post("http://127.0.0.1:8000/register", { username, password })
            // console(response.data)
            // setUsername("")
            // setPassword("")
            navigate("/login")


        }
        catch (err) {
            console.log(err)
        }
    }


    return (
        <div>
            <form onSubmit={handleRegister}>
                <input type="text" placeholder='Enter Name' value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type='submit'>Register</button>
            </form>
        </div>
    )
}

export default Register
