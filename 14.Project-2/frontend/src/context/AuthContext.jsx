import {
    createContext,
    useState,
    useEffect,
    useContext
} from "react";

import {
    logoutUser,
    getProfile
} from "../services/authService";

import { useQueryClient } from "@tanstack/react-query";

export const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const queryClient = useQueryClient();

    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    const login = async () => {
        const data = await getProfile();
        setUser(data);
    };

    const logout = async () => {
        await logoutUser();
        setUser(null);
        queryClient.clear();
    };

    const value = {
        user,
        login,
        logout,
        authLoading,
        isAuthenticated: !!user
    };

    useEffect(() => {
        const publicPaths = [
            "/",
            "/login",
            "/forgot-password",
            "/reset-password"
        ];

        if (publicPaths.includes(window.location.pathname)) {
            setAuthLoading(false);
            return;
        }

        const fetchUser = async () => {
            try {
                const data = await getProfile();
                setUser(data);
            } catch {
                setUser(null);
            } finally {
                setAuthLoading(false);
            }
        };

        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};