import { deleteExpense } from "../../services/expenseService";
import { useMutation , useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"

export function useDeleteExpense (categoryId){
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const deleteExpenseMutation = useMutation({
        mutationFn : deleteExpense,

        onSuccess : async()=>{
           await queryClient.invalidateQueries({
            queryKey : ["expenses" , categoryId]
           })

           toast.success("Expense Deleted Successfully")
           navigate(`/categories/${categoryId}` , {replace : true})
        },
        onError : (error) =>{
             toast.error(
                error.response?.data?.detail || "Deletion Failed"
            )

        }
    })
    return deleteExpenseMutation
}