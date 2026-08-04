import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postAttachment } from "../../services/attachmentService"


export function useUploadAttachment(taskId) {

    const queryClient = useQueryClient()

    return useMutation({

        mutationFn: (file) => 
            postAttachment(taskId, file),


        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["attachments", taskId]
            })

        }

    })
}