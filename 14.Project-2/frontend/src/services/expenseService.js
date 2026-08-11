import api from "../api/axios";

export async function createExpense(data) {
    const response = await api.post("/expenses", data)
    return response.data
}

export async function getExpense() {
    const response = await api.get("/expenses")
    return response.data
}

export async function getExpenseById(id) {
    const response = await api.get(`/expenses/${id}`)
    return response.data
}

export async function updateExpense({ id, data }) {
    const response = await api.put(`/expenses/${id}`, data)
    return response.data
}

export async function deleteExpense(id) {
    const response = await api.delete(`/expenses/${id}`)
    return response.data
}

export async function expenseSummary() {
    const response = await api.get("/expenses/summary")
    return response.data
}

export async function expenseSummaryByCategory() {
    const response = await api.get("/expenses/summary-by-category")
    return response.data
}

export async function expenseMonthlySummary() {
    const response = await api.get("/expenses/monthly-summary")
    return response.data
}

