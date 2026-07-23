import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import React from 'react'


const Dashboard = () => {
    const navigate = useNavigate()
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(true)

    const { token, logout } = useAuth()
    const fetchProfile = async () => {
        setLoading(true);
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
            
        }
        finally{
            setLoading(false)
        }
    }

    const handleLogout = () => {
        logout();
        navigate("/login");
    }

    useEffect(() => {
        fetchProfile()
    }, [token])

    return (
        <div>
            {loading ? (
                <h2>Loading...</h2>
            ) : (
                <>
                    <h1>{message}</h1>
                    <button onClick={handleLogout}>Logout</button>
                </>
            )


            }

        </div>
    )
}

export default Dashboard
