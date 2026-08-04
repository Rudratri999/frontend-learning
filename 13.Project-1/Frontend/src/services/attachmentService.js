import api from "../api/axios"


export async function getAttachments(taskId) {

    const response = await api.get(
        `/tasks/${taskId}/attachments`
    )

    return response.data
}


export async function postAttachment(taskId, file) {

    const formData = new FormData()

    formData.append("file", file)


    const response = await api.post(
        `/tasks/${taskId}/attachments`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    )

    return response.data
}

export async function deleteAttachment(attachmentId) {
    const response = await api.delete(`/attachments/${attachmentId}`);
    return response.data;
}