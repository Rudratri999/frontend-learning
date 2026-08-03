import { useQuery } from "@tanstack/react-query"
import { getTasks } from "../../services/taskService"

export function useTasks(filters) {
    return useQuery({
        queryKey: [
            "tasks",
            filters?.projectId ?? "",
            filters?.search ?? "",
            filters?.priority ?? "",
            filters?.page ?? 1,
            filters?.limit ?? 10,
            filters?.sort_by ?? "",
            filters?.order_by ?? "asc",
        ],
        queryFn: () => getTasks(filters),
        enabled: Boolean(filters?.projectId),
        keepPreviousData: true,
        placeholderData: (previousData) => previousData,
    })
}