import { deleteTask } from "../../services/taskService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";

export function useDeleteTask(projectId) {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const deletetaskMutation = useMutation({
        mutationFn: deleteTask,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["tasks", projectId]

            })

            toast.success("Deleted successfully")
            navigate(`/projects/${projectId}`, { replace: true })
        },
        onError: (error) => {
            toast.error(
                error.response?.data?.detail || "Task Deletion Failed"
            )
        }
    })
    return deletetaskMutation
}