import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "../../services/categoryService";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

export function useCreateCategory() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const createCategoryMutation = useMutation({
        mutationFn: createCategory,

        onSuccess: async () => {

            toast.success("Category Created Successfully")

            await queryClient.invalidateQueries({
                queryKey: ["categories"]
            })

            navigate("/dashboard", { replace: true })
        },

        onError: (error) => {
            toast.error(
                error.response?.data?.detail || "Category Creation Failed"
            )
        }

    })

    return createCategoryMutation
}