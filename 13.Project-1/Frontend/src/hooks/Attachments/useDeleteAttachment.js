import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAttachment } from "../../services/attachmentService";

export function useDeleteAttachment(taskId) {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: deleteAttachment,

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["attachments", taskId],
            });

        },
    });

}