import { createContext, useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {


    //  here ("") when user refresh the page user stays log in
    // refresh -> react start again -> read localstorage -> token
    // const [token, setToken] = useState(localStorage.getItem("token") || "");

    // token , setToken , removeToken = local varable
    const {
        value: token,
        setValue: setToken,
        removeValue: removeToken,
    } = useLocalStorage("token", "");

    const login = (newToken) => {
        setToken(newToken)
    }

    const logout = () => {
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