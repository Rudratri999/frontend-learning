import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast"
import { getTaskById, updateTask } from "../../services/taskService";
import { useNavigate } from "react-router-dom";

export function useUpdate(taskId) {
    return useQuery({
        queryKey: ["task" , taskId],
        queryFn: () => getTaskById(taskId)
    })
}

export function useUpdateTask(projectId) {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const updateTaskMutation = useMutation({
        mutationFn: updateTask,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["tasks" , projectId]
            })

            await queryClient.invalidateQueries({
                queryKey: ["task" , projectId]
            })

            toast.success("Project updated successfully");

            navigate(`/projects/${projectId}`, { replace: true })
        },
        onError: (error) => {
            toast.error(
                error.response?.data?.detail || "Update Failed"
            )
        }
    })
    return updateTaskMutation
}