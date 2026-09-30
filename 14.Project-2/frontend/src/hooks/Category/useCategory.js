import { useQuery } from "@tanstack/react-query";
import { getCategory, getCategoryById  , getExpensesByCategory} from "../../services/categoryService"

export function useCategory() {
    return useQuery({
        queryKey: ["categories"],
        queryFn: getCategory
    })
}

export function useCategoryById(id) {
    return useQuery({
        queryKey: ["category", id],
        queryFn: () => getCategoryById(id)
    })
}


export function useExpensesByCategory(categoryId) {
    return useQuery({
        queryKey: ["expenses", categoryId],
        queryFn: () => getExpensesByCategory(categoryId),
        enabled: !!categoryId
    })
}