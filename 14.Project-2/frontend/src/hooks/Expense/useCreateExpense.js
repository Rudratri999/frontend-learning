import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExpense } from "../../services/expenseService";
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";

export function useCreateExpense(categoryId) {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const createExpenseMutation = useMutation({
        mutationFn: createExpense,
        onSuccess: async () => {
            toast.success("Expense Created Successfully")

            await queryClient.invalidateQueries({
                queryKey: ["/expenses", categoryId]
            })

            navigate(`/categories/${categoryId}`, { replace: true })
        },
        onError: (error) => {
            toast.error(
                error.response?.data?.detail || "Expense Creation Failed"
            )
        }
    })

    return createExpenseMutation;
}


// Cache
// ──────────────────────────────────────────

// Key: ["tasks", 1]
// Value:
// [
//     { id: 1, title: "Learn React" },
//     { id: 2, title: "Learn FastAPI" }
// ]

// Key: ["tasks", 2]
// Value:
// [
//     { id: 7, title: "Buy Milk" },
//     { id: 8, title: "Go Gym" }
// ]