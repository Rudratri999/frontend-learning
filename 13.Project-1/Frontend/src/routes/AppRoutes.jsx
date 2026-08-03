import React from 'react'
import { Routes, Route } from "react-router-dom"

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import CreateProject from "../pages/CreateProject";
import UpdateProject from "../pages/UpdateProject";
import ProjectDetail from "../pages/ProjectDetail"
import CreateTask from "../pages/CreateTask"
import UpdateTask from "../pages/UpdateTask"
import ProtectedRoute from '../componenets/ProtectedRoute';

const AppRoutes = () => {
    return (
        <Routes>

            {/* Public Routes */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/projects/create"
                element={
                    <ProtectedRoute>
                        <CreateProject />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/projects/edit/:id"
                element={
                    <ProtectedRoute>
                        <UpdateProject />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/projects/:id"
                element={
                    <ProtectedRoute>
                        <ProjectDetail />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/projects/:id/tasks/create"
                element={
                    <ProtectedRoute>
                        <CreateTask />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/projects/:projectId/tasks/:taskId/edit"
                element={
                    <ProtectedRoute>
                        <UpdateTask />
                    </ProtectedRoute>
                }
            />

            
            
            

            

        </Routes>
    );
};

export default AppRoutes;