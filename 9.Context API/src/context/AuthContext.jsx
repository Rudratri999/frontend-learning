import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {

    
    //  here ("") when user refresh the page user stays log in
    // refresh -> react start again -> read localstorage -> token
    const [token, setToken] = useState(localStorage.getItem("token") || "");


    const login = (newToken) => {
        localStorage.setItem("token", newToken)
        setToken(newToken)
    }

    const logout = () => {
        localStorage.removeItem("token")
        setToken("")
    }

    const value = {
        token,
        login,
        logout,
        isAuthenticated: !!token
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider