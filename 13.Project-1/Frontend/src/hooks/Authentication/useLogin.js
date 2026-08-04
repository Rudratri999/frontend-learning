import { loginUser } from "../../services/authService";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

export function useLogin() {

    const navigate = useNavigate()
    const { login } = useAuth()

    const loginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: async(response) => {
            await login()
            toast.success("Login Successfully")
            navigate("/dashboard", { replace: true })
        },
        onError: (error) => {
            toast.error(
                error.response?.data?.detail || "Login failed"
            );
        }
    })

    return loginMutation
}