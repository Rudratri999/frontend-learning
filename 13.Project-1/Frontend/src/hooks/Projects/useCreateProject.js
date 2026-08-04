import { useMutation } from "@tanstack/react-query"
import { createProject } from "../../services/projectService";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";


export function useCreateProject() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const createProjectMutation = useMutation({
        mutationFn: createProject,
        onSuccess: async (response) => {
            toast.success("Project Created Successfully")

           await queryClient.invalidateQueries({
                queryKey: ["projects"]
            })

            navigate("/dashboard", { replace: true })
        },
        onError: (error) => {
            toast.error(
                error.response?.data?.detail || "Creation Failed"
            )
        }


    })

    return createProjectMutation

}
