import React, { useState } from 'react'
import { useTasks } from '../hooks/Tasks/useTasks'
import { Link, useParams } from 'react-router-dom'
import { useProjectById } from '../hooks/Projects/useProject'
import { useDeleteTask } from '../hooks/Tasks/useDeleteTask'
import { useUpdateStatus } from '../hooks/Tasks/useUpdateStatus'
import { useDebounce } from '../hooks/useDebounce'
import StatusBadge from "../componenets/StatusBadges"
import PriorityBadge from "../componenets/PriorityBadge"
import AttachmentUpload from "../componenets/AttachmentUpload"
import AttachmentList from "../componenets/AttachmentList"

const priorityStyles = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-amber-100 text-amber-700",
    Low: "bg-emerald-100 text-emerald-700",
}

const ProjectDetail = () => {

    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 400);
    const { id: projectId } = useParams()

    const deleteTaskMutation = useDeleteTask(projectId)
    const updateStatusMutation = useUpdateStatus(projectId)

    const {
        data: project,
        isPending: projectLoading,
        error: projectError
    } = useProjectById(projectId)

    const {
        data: tasks,
        isPending: tasksLoading,
        isFetching: tasksFetching,
        error: tasksError
    } = useTasks({
        projectId,
        search: debouncedSearch,
        page: 1,
        limit: 10,
    })

    const isInitialPageLoading = projectLoading || (tasksLoading && !tasks && !tasksFetching)

    if (isInitialPageLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <p className="text-slate-500">Loading project...</p>
            </div>
        );
    }

    if (projectError || tasksError) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <p className="text-red-600">
                    {projectError?.message || tasksError?.message}
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-8">

            {/* Project header */}
            {
                project ? (
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
                        <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                            <span className="w-1.5 h-7 bg-indigo-600 rounded-full" />
                            {project.name}
                        </h1>
                        <p className="text-slate-600 text-lg">{project.description}</p>
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300 mb-8">
                        <p className="text-slate-500">Project not found</p>
                    </div>
                )
            }

            {/* Search + create task */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-8">
                <input
                    type="text"
                    placeholder="Search tasks"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border border-slate-300 rounded-lg px-4 py-2 w-full sm:w-80 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />

                <Link
                    to={`/projects/${projectId}/tasks/create`}
                    className="flex items-center justify-center gap-1 bg-indigo-600 px-5 py-2.5 rounded-lg text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
                >
                    + Create Task
                </Link>
            </div>

            {/* My Tasks section */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-indigo-600 rounded-full" />
                    My Tasks
                </h2>
                {tasksFetching && (
                    <span className="text-sm text-slate-500">Refreshing...</span>
                )}
            </div>

            {
                !tasks || tasks.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
                        <p className="text-slate-500 mb-1">No tasks yet</p>
                        <p className="text-sm text-slate-400">Create your first task for this project</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {tasks.map((task) => {
                            const isCompleted = task.status === "Completed" || task.status === "completed";
                            const isPending = task.status === "Pending" || task.status === "pending";
                            const badgeStatus = task.status || (isCompleted ? "Completed" : "Pending");

                            return (
                                <div
                                    key={task.id}
                                    className={`bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition duration-300 ${isCompleted ? "border-emerald-200 bg-emerald-50/40" : "border-slate-200"
                                        }`}
                                >
                                    <h3 className="text-xl font-bold mb-3 text-slate-900">
                                        {task.title}
                                    </h3>

                                    <p className="text-slate-600 mb-5">
                                        {task.description}
                                    </p>

                                    {/* <div className="flex justify-between items-center mb-6">
                                        <p className="text-slate-700">
                                            <span className="font-semibold">Priority:</span>{" "}
                                            <span className={`font-semibold ${task.priority === "High" ? "text-red-600" :
                                                    task.priority === "Medium" ? "text-amber-600" :
                                                        "text-emerald-600"
                                                }`}>
                                                {task.priority}
                                            </span>
                                        </p>

                                        <p className="text-sm text-slate-500">
                                            Due_Date : {task.due_date}
                                        </p>
                                    </div> */}

                                    <div className="flex justify-between items-center mb-6">

                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${isCompleted ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                                            {isCompleted ? "Completed" : "Pending"}
                                        </span>

                                        <p className="text-sm text-slate-500">
                                            Due_Date : {task.due_date}
                                        </p>

                                    </div>

                                    <div className="mb-6 flex items-center gap-2">

                                        <span className="font-semibold text-slate-700">
                                            Priority:
                                        </span>

                                        <PriorityBadge priority={task.priority} />

                                    </div>


                                    <div className="flex gap-3 flex-wrap">
                                        <Link
                                            to={`/projects/${projectId}/tasks/${task.id}/edit`}
                                            className="flex items-center justify-center bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            onClick={() => {
                                                const confirmDelete = window.confirm(
                                                    "Are you sure you want to delete this task?"
                                                )
                                                if (confirmDelete) {
                                                    deleteTaskMutation.mutate(task.id)
                                                }
                                            }}
                                            disabled={deleteTaskMutation.isPending}
                                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition"
                                        >
                                            {deleteTaskMutation.isPending ? "Deleting..." : "Delete"}
                                        </button>

                                        {!isCompleted && (
                                            <button
                                                onClick={() => {
                                                    updateStatusMutation.mutate({
                                                        id: task.id,
                                                        status: "Completed"
                                                    })
                                                }}
                                                disabled={updateStatusMutation.isPending}
                                                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
                                            >
                                                {updateStatusMutation.isPending ? "Updating..." : "Complete"}
                                            </button>
                                        )}

                                        {isCompleted && (
                                            <button
                                                onClick={() => {
                                                    updateStatusMutation.mutate({
                                                        id: task.id,
                                                        status: "Pending"
                                                    })
                                                }}
                                                disabled={updateStatusMutation.isPending}
                                                className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition"
                                            >
                                                {updateStatusMutation.isPending ? "Updating..." : "Pending"}
                                            </button>
                                        )}

                                        <AttachmentUpload taskId={task.id} />



                                        <AttachmentList taskId={task.id} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )
            }
        </div>
    )
}

export default ProjectDetail