import { deleteCategory } from "../../services/categoryService";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast"

export function useDeleteCategory (){
    const queryClient  = useQueryClient()
    const deleteCategoryMutation = useMutation({
        mutationFn : deleteCategory,

        onSuccess : async () =>{
            await queryClient.invalidateQueries({
                queryKey : ["categories"]
            })

            toast.success("Deleted Successfully")


        },

        onError : (error) =>{
            toast.error(
                error.response?.data?.detail || "Deletion failed"
            )

        }
    })

    return deleteCategoryMutation;

}