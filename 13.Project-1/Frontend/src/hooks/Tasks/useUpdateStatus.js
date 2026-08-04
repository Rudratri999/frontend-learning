import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStatus } from "../../services/taskService";
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";

export function useUpdateStatus(projectId) {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const updateStatusMutation = useMutation({
        mutationFn: updateStatus,
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ["tasks", projectId]
                }),
                queryClient.invalidateQueries({
                    queryKey: ["dashboard"]
                })
            ])
            toast.success("Status Updated Successfully")

            navigate(`/projects/${projectId}`)

        },
        onError: (error) => {
            toast.error(
                error.response?.data?.detail || "Status Updation Failed"
            )
        }
    })
    return updateStatusMutation
}