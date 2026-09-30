import { useQuery } from "@tanstack/react-query";
import { getExpense , getExpenseById } from "../../services/expenseService";

export function useExpense(){
    return useQuery({
        queryKey : ["expenses"],
        queryFn : getExpense
    })
}

export function useExpenseById(id){
    return useQuery({
        queryKey : ["expense" , id],
        queryFn : ()=>getExpenseById(id)
    })
}