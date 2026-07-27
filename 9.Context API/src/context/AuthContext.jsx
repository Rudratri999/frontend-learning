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

    // const[role , setRole] = useState(localStorage.getItem("role" || ""))

    // token , setToken , removeToken = local varable

    // key = token , initialvalue = ""
    const {
        value: token,
        setValue: setToken,
        removeValue: removeToken,
    } = useLocalStorage("token", "");

    // key = Role , initialvalue = ""
    const {
        value: role,
        setValue: setRole,
        removeValue: removeRole,
    } = useLocalStorage("role", "");

    const login = (newToken, userRole) => {
        console.log("Token received:", newToken);
        console.log("Role received:", userRole);
        setToken(newToken)
        setRole(userRole)
    }

    const logout = () => {
        removeToken()
        removeRole()

    }

    const value = {
        role,
        token,
        login,
        logout,
        isAuthenticated: !!token
    }
    console.log("Auth Context Value:", value);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider