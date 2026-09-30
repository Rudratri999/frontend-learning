import { getExpenseById, updateExpense } from "../../services/expenseService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"

export function useUpdate(expenseId) {
    return useQuery({
        queryKey: ["expense", expenseId],
        queryFn: () => getExpenseById(expenseId)
    })
}

export function useUpdateExpense(categoryId) {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const updateExpenseMutation = useMutation({
        mutationFn: updateExpense,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["expenses", categoryId]
            })

            await queryClient.invalidateQueries({
                queryKey: ["expense", categoryId]
            })

            toast.success("Expense Updated Successfully")
          navigate(`/categories/${categoryId}` , {replace : true})
        },
        onError: (error) => {

            toast.error(
                error.response?.data?.detail || "Update Failed"
            )

        }
    })

    return updateExpenseMutation
}