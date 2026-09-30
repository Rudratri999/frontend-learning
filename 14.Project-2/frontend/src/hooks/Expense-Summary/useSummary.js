import { expenseSummary, expenseSummaryByCategory , expenseMonthlySummary } from "../../services/expenseService"
import { useQuery } from "@tanstack/react-query"

export function useExpenseSummary() {

    return useQuery({

        queryKey: ["expense-summary"],

        queryFn: expenseSummary,

    })
}

export function useSummaryCategory() {
    return useQuery({
        queryKey: ["expense-summary-category"],
        queryFn: expenseSummaryByCategory,
    })
}


export function useMonthlySummary(){

     return useQuery({
        queryKey : ["expense-summary-monthly"],
        queryFn : expenseMonthlySummary,
     })
}