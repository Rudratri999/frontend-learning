import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Dashboard = () => {
    const navigate = useNavigate()
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(true)

    const fetchProfile = async () => {
        setLoading(true)
        const token = localStorage.getItem("token")
        try {
            const response = await axios.get("http://127.0.0.1:8000/profile",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )


            setMessage(response.data.message)
            setLoading(false)
        }
        catch (err) {
            setMessage("Failed to load profile")
            setLoading(false)
        }
    }


    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/login")
    }

    useEffect(() => {
        fetchProfile()
    }, [])


    return (
        <div>

            {loading ? (
                <h2>Loading....</h2>
            ) : (
                <>
                    <h1>{message}</h1>
                    <button onClick={handleLogout}>Logout</button>
                </>
            )}
        </div>
    )
}

export default Dashboard
