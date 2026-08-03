import api from "../api/axios"

export async function registerUser (data){
    const response = await api.post("/register" , data)
    return response
}

export async function loginUser (data){
 const response = await api.post("/login" , data)
    return response
}

export async function  getProfile (){
    const response = await api.get("/profile")
    return response.data
}

export async function checkUsername(username) {
    const response = await api.get(`/check-username/${username}`)

    return response.data
}

export async function logoutUser() {
    const response = await api.post("/logout");
    return response.data;
}

// This layer only comminicate with backend

// Flow : authService.js -> axios.js(axios instance)