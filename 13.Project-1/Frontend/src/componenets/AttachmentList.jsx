import { useAttachments } from "../hooks/Attachments/useAttachments"
import { useDeleteAttachment } from "../hooks/Attachments/useDeleteAttachment";


const AttachmentList = ({ taskId }) => {

    const {
        data: attachments,
        isLoading,
        error
    } = useAttachments(taskId)

    const deleteMutation = useDeleteAttachment(taskId);


    if (isLoading) {
        return (
            <p className="text-sm text-slate-400 mt-3">
                Loading attachments...
            </p>
        )
    }


    if (error) {
        return (
            <p className="text-sm text-red-500 mt-3">
                Failed to load attachments
            </p>
        )
    }


    if (!attachments || attachments.length === 0) {
        return (
            <p className="text-sm text-slate-400 mt-3">
                No attachments
            </p>
        )
    }


    return (
        <div className="mt-5">

            <h4 className="font-semibold text-slate-800 mb-3">
                Attachments
            </h4>


            <div className="space-y-2">

                {
                    attachments.map((attachment) => {

                        const isImage = attachment.file_type?.startsWith("image")

                        return (
                            <div
                                key={attachment.id}
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    bg-slate-50
                                    border
                                    border-slate-200
                                    rounded-lg
                                    px-3
                                    py-2
                                "
                            >

                                <div className="flex items-center gap-2">

                                    <span>
                                        {
                                            isImage
                                                ? "🖼️"
                                                : "📄"
                                        }
                                    </span>


                                    <p className="text-sm text-slate-700 truncate max-w-45">
                                        {attachment.filename}
                                    </p>

                                </div>


                                <div className="flex items-center gap-3">

                                    <a
                                        href={attachment.file_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-indigo-600 hover:underline text-sm"
                                    >
                                        View
                                    </a>

                                    <button
                                        onClick={() => deleteMutation.mutate(attachment.id)}
                                        disabled={deleteMutation.isPending}
                                        className="text-red-600 hover:underline text-sm disabled:opacity-50"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>
                        )
                    })
                }

            </div>

        </div>
    )
}


export default AttachmentList