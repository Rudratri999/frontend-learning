import { createContext, useContext, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { getProfile, logoutUser } from "../services/authService";


export const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const queryClient = useQueryClient();

    // ()=>localStorage.getItem("token") = means runs on initial render not every render
    // const [token, setToken] = useState(() => localStorage.getItem("token"))
    const [user, setUser] = useState(null)
    const [authLoading, setAuthLoading] = useState(true);

    // const login = (token) => {
    //     localStorage.setItem("token", token)
    //     setToken(token)
    // }

    // why? = after login cookie is already stored ,we will tell react query that profile is oudated fetch it again
    // const login = async () => {
    //     await queryClient.invalidateQueries({
    //         queryKey: ["profile"],
    //     })
    // };

    const login = async () => {
        const data = await getProfile();
        setUser(data);
    };

    const logout = async () => {
        await logoutUser()
        setUser(null)
        queryClient.clear()
    }

    const value = {
        // token,
        user,
        login,
        logout,
        authLoading,
        // isAuthenticated: !!token
        isAuthenticated: !!user
    }

    useEffect(() => {
        const fetchUser = async () => {

            try {
                const data = await getProfile();
                setUser(data);
            } catch (error) {
                setUser(null);
            } finally {
                setAuthLoading(false);
            }
        };

        fetchUser();
    }, [])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}





// AuthProvider → Wraps the app.
// AuthContext → Stores authentication data.
// useAuth() → Easy way to access authentication anywhere.