import { useQuery } from "@tanstack/react-query"
import { getAttachments } from "../../services/attachmentService"


export function useAttachments(taskId) {

    return useQuery({

        queryKey: ["attachments", taskId],

        queryFn: () => getAttachments(taskId),

        enabled: !!taskId

    })
}