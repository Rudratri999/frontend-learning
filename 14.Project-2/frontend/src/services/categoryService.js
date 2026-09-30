import api from "../api/axios"

export async function createCategory(data){
  const response = await api.post("/categories",data)
  return response.data
}
export async function getCategory(){
  const response = await api.get("/categories")
  return response.data
}

export async function updateCategory({id,data}){
  const response = await api.put(`/categories/${id}`, data)
  return response.data
}
export async function deleteCategory(id){
 const response = await api.delete(`/categories/${id}`)
}

export async function getExpensesByCategory(categoryId) {
    const response = await api.get(`/categories/${categoryId}/expenses`)
    return response.data
}

export async function getCategoryById(id){
  const response = await api.get(`/categories/${id}`)
  return response.data
}
