import { createTask } from "../../services/taskService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast";

export function useCreateTask(projectId) {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const createTaskMutation = useMutation({
        mutationFn: createTask,
        onSuccess: async () => {
            toast.success("Task Created Successfully ")
            await queryClient.invalidateQueries({
                queryKey: ["tasks" , projectId]
            })

            navigate(`/projects/${projectId}`, { replace: true })
        },
        onError: (error) => {
            toast.error(
                error.response?.data?.detail || "Task Creation Failed"
            )
        }
    })

    return createTaskMutation
}