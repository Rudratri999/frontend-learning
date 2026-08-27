import api from "../api/axios"

export async function registerUser(data) {
    const response = await api.post("/register", data)
    return response
}

export async function loginUser(credentials) {
    const response = await api.post("/login", credentials)
    return response.data
}

export async function getProfile() {
    const response = await api.get("/profile")
    return response.data
}

export async function logoutUser() {
    const response = await api.post("/logout")
    return response.data
}

export async function forgotPassword(data) {
    const response = await api.post("/forgot-password", data)
    return response.data
}

export async function resetPassword(data) {
    const response = await api.post("/reset-password", data)
    return response.data
}