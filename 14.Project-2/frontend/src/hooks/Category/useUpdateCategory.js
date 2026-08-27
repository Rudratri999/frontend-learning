import { getCategoryById, updateCategory } from "../../services/categoryService";
import { useMutation, useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUpdate(id) {
    return useQuery({
        queryKey: ["category", id],
        queryFn: () => getCategoryById(id)
    })
}


export function useUpdateCategory() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const updateCategoryMutation = useMutation({
        mutationFn: updateCategory,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["categories"]
            })

            await queryClient.invalidateQueries({
                queryKey: ["category"]
            })

            toast.success("Category Updated Successfully")

            navigate("/dashboard", { replace: true })
        },

        onError: (error) => {
            toast.error(
                error.response?.data?.detail || "Updation Failed"
            )
        }
    })
    return updateCategoryMutation
}