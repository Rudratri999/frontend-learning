// import { useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom"
// import axios from 'axios'
// import api from "../api/axios";
// import React from 'react'
// import {useFetch} from "../hooks/useFetch"


// const Dashboard = () => {
//     const navigate = useNavigate()
//     const { logout } = useAuth()
//     // after creating custom hook
//     const { data, loading, error } = useFetch("/profile");

//     // const [message, setMessage] = useState("")
//     // const [loading, setLoading] = useState(true)
//     // const { token, logout } = useAuth()
//     // const fetchProfile = async () => {
//     //     setLoading(true);
//     //     try {

//     //         // const response = await axios.get("http://127.0.0.1:8000/profile",
//     //         //     {
//     //         //         headers: {
//     //         //             Authorization: `Bearer ${token}`
//     //         //         }
//     //         //     }
//     //         // )

//     //         // Dashboard -> api.get -> interceptor(read token , add auth header , return congig)->
//     //         // FastAPI("/profile") -> JWT verification -> response -> Dashboard

//     //         const response = await api.get("/profile")
//     //         setMessage(response.data.message)
//     //         setLoading(false)
//     //     }


//     //     catch (err) {
//     //         setMessage("Failed to load profile")

//     //     }
//     //     finally{
//     //         setLoading(false)
//     //     }
//     // }

//     //  useEffect(() => {
//     //     fetchProfile()
//     // }, [token])

//     const handleLogout = () => {
//         logout();
//         navigate("/login");
//     }



//     return (
//         <div>
//             {loading ? (
//                 <h2>Loading...</h2>
//             ) : (
//                 <>
//                     <h1>{data?.message}</h1>
//                     <button onClick={handleLogout}>Logout</button>
//                 </>
//             )


//             }

//         </div>
//     )
// }

// export default Dashboard

// ------Previous code above -----
// -----New Code Using React-Query-----------

import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../services/authServices";

import React from 'react'

const Dashboard = () => {
    // No need of useState,useEffect --so query create is loading,error
    const {
        data,
        isloading,
        error

    } = useQuery({
        queryKey: ["profile"],
        queryFn: fetchProfile
    })

    if (isLoading) {

        return <h1>Loading...</h1>;

    }

    if (error) {

        return <h1>Something went wrong.</h1>;

    }


    return (
        <div>
            <h1>{data.message}</h1>
        </div>
    )
}

export default Dashboard

// Compare old Dashboard vs New