import { useState } from "react"
import { useUploadAttachment } from "../hooks/Attachments/useUploadAttachment"


const MAX_FILE_SIZE = 5 * 1024 * 1024


const ALLOWED_TYPES = [
    "image/png",
    "image/jpeg",
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
]


const AttachmentUpload = ({ taskId }) => {

    const [file, setFile] = useState(null)
    const [error, setError] = useState("")


    const uploadMutation = useUploadAttachment(taskId)


    const handleFileChange = (e) => {

        const selectedFile = e.target.files[0]

        setError("")


        if (!selectedFile) return


        // Size validation
        if (selectedFile.size > MAX_FILE_SIZE) {

            setError("File size must be less than 5MB")
            setFile(null)
            return
        }


        // Type validation
        if (!ALLOWED_TYPES.includes(selectedFile.type)) {

            setError(
                "Only images, PDF and DOCX files are allowed"
            )

            setFile(null)
            return
        }


        setFile(selectedFile)
    }


    const handleUpload = () => {

        if (!file) return


        uploadMutation.mutate(file)

        setFile(null)
    }


    return (
        <div className="mt-4">

            <input
                type="file"
                onChange={handleFileChange}
                className="block text-sm"
            />


            {
                file && (
                    <p className="text-sm text-slate-600 mt-2">
                        Selected: {file.name}
                    </p>
                )
            }


            {
                error && (
                    <p className="text-sm text-red-600 mt-2">
                        {error}
                    </p>
                )
            }


            <button
                onClick={handleUpload}
                disabled={!file || uploadMutation.isPending}
                className="
                    mt-3
                    bg-indigo-600
                    text-white
                    px-4
                    py-2
                    rounded-lg
                    disabled:opacity-50
                "
            >
                {
                    uploadMutation.isPending
                    ? "Uploading..."
                    : "Upload Attachment"
                }
            </button>


        </div>
    )
}


export default AttachmentUpload