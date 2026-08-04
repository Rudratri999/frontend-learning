import api from "../api/axios"

export async function getProjects() {
    const response = await api.get("/projects")
    return response.data
}

export async function getProjectById(id) {
    const response = await api.get(`/projects/${id}`)
    return response.data
}

export async function createProject(data) {
    const response = await api.post("/projects", data)
    return response.data
}

export async function updateProject({ id, data }) {
    const response = await api.put(`/projects/${id}`, data)
    return response.data
}

export async function deleteProject(id) {
    const response = await api.delete(`/projects/${id}`)
    return response.data
}
