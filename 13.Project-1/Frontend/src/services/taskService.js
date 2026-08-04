import api from "../api/axios";

// export async function getTasks(projectId) {
//     const response = await api.get(`/tasks?project_id=${projectId}`)
//     return response.data
// }

export async function getTaskById(id) {
    const response = await api.get(`/tasks/${id}`)
    return response.data
}

export async function createTask(data) {
    const response = await api.post("/tasks", data)
    return response.data
}

export async function updateTask({ id, data }) {
    const response = await api.put(`/tasks/${id}`, data)
    return response.data
}

export async function deleteTask(id) {
    const response = await api.delete(`/tasks/${id}`)
    return response.data
}

export async function updateStatus({ id, status }) {
    const response = await api.patch(`/tasks/${id}/status`, { status: status })
    return response.data
}

export async function getTasks({
    projectId,
    search,
    priority,
    page,
    limit,
    sort_by,
    order_by
}) {

    const response = await api.get("/tasks", {
        params: {
            project_id: projectId,
            search: search || undefined,
            priority: priority || undefined,
            page: page || 1,
            limit: limit || 10,
            sort_by: sort_by || undefined,
            order_by: order_by || "asc",
        },
    });

    return response.data;
}