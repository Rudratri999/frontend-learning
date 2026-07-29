import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


export function useLogin() {


    const { login } = useAuth()
    const navigate = useNavigate()

    const loginMutation = useMutation(
        {
            mutationFn: loginUser,
            onSuccess: async () => {
                await login()
                toast.success("Login Successfully");
                // If you don't want users to go back to the login page after logging in:replace
                navigate("/dashboard", { replace: true })
            },
            onError: (error) => {
                toast.error(
                    error.response?.data?.detail || "Login failed"
                );
            }
        }
    )
    return loginMutation;
}