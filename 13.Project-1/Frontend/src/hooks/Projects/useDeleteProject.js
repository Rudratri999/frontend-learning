import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query"
import { deleteProject } from "../../services/projectService";

export function useDeleteProject() {
    const queryClient = useQueryClient()

    const deleteProjectMutation = useMutation({
        mutationFn: deleteProject,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["projects"]
            })
            toast.success("Project Deleted Successfully")
        },
        onError: (error) => {
            toast.error(
                error.response?.data?.detail || "Deletion Failed"
            );
        }
    })

    return deleteProjectMutation;
}