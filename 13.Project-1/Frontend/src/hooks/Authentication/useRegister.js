import { registerUser } from "../../services/authService";
import { useMutation} from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast";

export function useRegister() {
    const navigate = useNavigate()
   

    const registerMutation = useMutation({
        mutationFn: registerUser,
        onSuccess: (response) => {
            toast.success("Registerd Successfully")
            navigate("/login", { replace: true })
        },
        onError: () => {
            toast.error(
                error.response?.data?.detail || "registeration  failed"
            );
        }
    })

    return registerMutation
}