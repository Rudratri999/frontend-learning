import api from "../api/axios"

export async function loginUser(username, password) {

    const response = await api.post("/login", {
        username,
        password
    })
    return response;
}

export async function registerUser(username , password) {
    const response = await api.post("/register" , {
        username,
        password
    })
    return response
}

