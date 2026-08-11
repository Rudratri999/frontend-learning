import React from "react";
import { Routes, Route } from "react-router-dom";

import ProtectedRoutes from "../components/ProtectedRoutes";
import MainLayout from "../layouts/MainLayout";

import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword"
import Dashboard from "../pages/Dashboard";
import Categories from "../pages/Categories";
import CreateCategory from "../pages/CreateCategory";
import UpdateCategory from "../pages/UpdateCategory";
import CategoryDetail from "../pages/CategoryDetail";
import ChooseCategories from "../pages/ChooseCategories";
import CreateExpense from "../pages/CreateExpense";
import UpdateExpense from "../pages/UpdateExpense";
import Expenses from "../pages/Expenses";

const AppRoutes = () => {
    return (
        <Routes>

            {/* Public Routes */}
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route
                path="/forgot-password"
                element={<ForgotPassword />}
            />

            <Route
                path="/reset-password"
                element={<ResetPassword />}
            />

            {/* Protected Routes */}
            <Route
                element={
                    <ProtectedRoutes>
                        <MainLayout />
                    </ProtectedRoutes>
                }
            >

                <Route path="/dashboard" element={<Dashboard />} />

                {/* Categories */}
                <Route path="/categories" element={<Categories />} />

                <Route
                    path="/categories/create"
                    element={<CreateCategory />}
                />

                <Route
                    path="/categories/:id"
                    element={<CategoryDetail />}
                />

                <Route
                    path="/categories/:id/edit"
                    element={<UpdateCategory />}
                />

                {/* Expenses */}
                <Route
                    path="/expenses"
                    element={<Expenses />}
                />

                <Route
                    path="/expenses/create"
                    element={<ChooseCategories />}
                />

                <Route
                    path="/categories/:id/expenses/create"
                    element={<CreateExpense />}
                />

                <Route
                    path="/categories/:categoryId/expenses/:expenseId/edit"
                    element={<UpdateExpense />}
                />

            </Route>

        </Routes>
    );
};

export default AppRoutes;