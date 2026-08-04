import { useQuery, useMutation } from "@tanstack/react-query";
import { updateProject , getProjectById} from "../../services/projectService";
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";

export function useUpdate(id) {


    return useQuery({
        queryKey: ["project", id],
        queryFn: () => getProjectById(id)
    })

}

export function useUpdateProject() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const updateProjectMutation = useMutation({
        mutationFn: updateProject,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["projects"]
            })

            await queryClient.invalidateQueries({
                queryKey: ["project"]
            })

            toast.success("Project updated successfully");

            navigate("/dashboard", { replace: true })

        },
        onError: (error) => {
            toast.error(
                error.response?.data?.detail || "Update Failed"
            )
        }
    })

    return updateProjectMutation
}