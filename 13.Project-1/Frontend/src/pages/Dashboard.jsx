import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { useProject } from '../hooks/Projects/useProject';
import { useDeleteProject } from "../hooks/Projects/useDeleteProject";
import { useAuth } from '../context/AuthContext';
import { useDashboardStats } from '../hooks/Dashboard/useDashboardStats';
import StatCard from "./StatCard"

const Dashboard = () => {

    // Dashboard stats
    const {
        data: stats,
        isPending: statsLoading,
        error: statsError
    } = useDashboardStats()

    // Projects
    const {
        data: projects,
        isPending,
        error
    } = useProject();

    // Delete Project
    const deleteProjectMutation = useDeleteProject();

    // Authentication
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login", { replace: true });
    };

    // Loading state
    if (isPending || statsLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <p className="text-slate-500">Loading your dashboard...</p>
            </div>
        );
    }

    // Error state
    if (error || statsError) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <p className="text-red-600">Something went wrong. Please try again.</p>
            </div>
        );
    }

    return (
        <div className='max-w-6xl mx-auto p-8'>

            {/* Top bar */}
            <div className='flex justify-between items-center mb-8'>
                <h2 className='text-3xl font-bold text-slate-900'>
                    Welcome, {user?.username}
                </h2>

                <button
                    onClick={handleLogout}
                    className='bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition'
                >
                    Logout
                </button>
            </div>

            {/* Dashboard Stats section */}
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-indigo-600 rounded-full" />
                Dashboard Stats
            </h2>

            {
                !stats ? (
                    <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300 mb-10">
                        <p className="text-slate-500">Stats aren't available yet</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
                        <StatCard title="Total Projects" value={stats.total_projects} color="text-indigo-600" />
                        <StatCard title="Total Tasks" value={stats.total_tasks} color="text-purple-600" />
                        <StatCard title="Completed Tasks" value={stats.completed_tasks} color="text-emerald-600" />
                        <StatCard title="Pending Tasks" value={stats.pending_tasks} color="text-amber-600" />
                        <StatCard title="High Priority" value={stats.high_priority_tasks} color="text-red-600" />
                    </div>
                )
            }

            {/* My Projects section */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-indigo-600 rounded-full" />
                    My Projects
                </h2>

                 <Link
                    to={`/projects/create`}
                    className="flex items-center justify-center gap-1 bg-indigo-600 px-5 py-2.5 rounded-lg text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
                >
                    + Create Project
                </Link> 


            </div>


            {
                projects.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
                        <p className="text-slate-500 mb-1">No projects yet</p>
                        <p className="text-sm text-slate-400">Create your first project to get started</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition duration-300"
                            >
                                <h3 className="text-xl font-bold text-slate-900 mb-2">
                                    {project.name}
                                </h3>

                                <p className="text-slate-600 mb-6">
                                    {project.description}
                                </p>

                                <div className="flex gap-3">
                                    <Link
                                        to={`/projects/${project.id}`}
                                        className="flex-1 flex items-center justify-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
                                    >
                                        View
                                    </Link>

                                    <Link
                                        to={`/projects/edit/${project.id}`}
                                        className="flex-1 flex items-center justify-center bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        onClick={() => {
                                            const confirmDelete = window.confirm(
                                                "Are you sure you want to delete this project?"
                                            );
                                            if (confirmDelete) {
                                                deleteProjectMutation.mutate(project.id);
                                            }
                                        }}
                                        disabled={deleteProjectMutation.isPending}
                                        className="flex-1 flex items-center justify-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition"
                                    >
                                        {deleteProjectMutation.isPending ? "Deleting..." : "Delete"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }

        </div>
    );
};

export default Dashboard;