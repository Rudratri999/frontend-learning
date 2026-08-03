import React, { useEffect } from 'react'
import { useUpdate, useUpdateTask } from '../hooks/Tasks/useUpdateTask'
import { useForm } from "react-hook-form"
import { useParams } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { createTaskSchema } from '../validation/taskSchema'


const UpdateTask = () => {

    const { projectId, taskId } = useParams()
    const { data, isPending, error } = useUpdate(taskId)
    const updateTaskMutation = useUpdateTask(projectId)


    const onSubmit = (formData) => {
        updateTaskMutation.mutate({
            id: taskId,
            data: {
                ...formData,
                project_id: Number(projectId)
            }
        })

    }



    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(createTaskSchema)
    })


    useEffect(() => {
        if (data) {
            reset({
                title: data.title,
                description: data.description,
                priority: data.priority,
                due_date: data.due_date

            })
        }

    }, [data, reset])


    if (isPending) {
        return (
            <div className='min-h-screen px-4 bg-slate-50 flex items-center justify-center'>
                <p className='text-red-600'>Loading..</p>
            </div>

        )
    }

    if (error) {
        return (
            <div className='min-h-screen px-4 bg-slate-50 flex items-center justify-center'>
                <p className='text-red-600'>{error.message}</p>

            </div>
        )
    }




    return (
        <div className='min-h-screen bg-slate-50 flex items-center justify-center
        px-4'>
            <div className='w-full max-w-lg'>


                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
                        Edit task
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Update the details below and save your changes
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}
                    className='bg-white 
                    rounded-2xl
                     shadow-sm border border-slate-200 p-8 space-y-5 '
                >
                    <div>
                        <label className='block text-sm font-medium text-slate-700 mb-1.5'>
                            Title
                        </label>

                        <input type="text"
                            placeholder='Title'
                            {...register("title")}
                            className='w-full px-2.5 py-3.5 rounded-lg border border-slate-300 
                        text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition'
                        />

                        {errors.title && (
                            <p className='text-sm text-red-600 mt-1.5 '>{errors.title.message}</p>
                        )}
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-slate-700 mb-1.5'>
                            Description
                        </label>
                        <textarea
                            rows={4}
                            placeholder='Title - Description'
                            {...register("description")}
                            className='w-full border px-2.5 py-3.5 rounded-lg border-slate-300 text-slate-900
                            placeholder:text-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition'
                        />

                        {errors.description && (
                            <p className='text-sm text-red-600 mt-1.5'>{errors.description.message}</p>
                        )}
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-slate-700 mb-1.5'>
                            Priority
                        </label>
                        <select {...register("priority")}
                            className='w-full py-2.5 px-2.5 border rounded-lg border-slate-300
                        text-slate-800 mb-1.5'

                        >
                            <option value="">Select Priority</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>

                        {errors.priority && (
                            <p className='text-sm text-red-600 mb-1.5'>{errors.priority.message}</p>
                        )}
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-slate-700 mb-1.5'>
                            Due-Date
                        </label>
                        <input type="date"
                            placeholder='Due_Date'
                            {...register("due_date")}
                            className='w-50 border border-slate-300 rounded-lg text-slate-800
                        py-2.5 px-2.5'
                        />

                        {errors.due_date && (
                            <p className='text-sm text-red-600 mb-1.5'>{errors.due_date.message}</p>
                        )}
                    </div>

                    <button type='submit'
                        disabled={updateTaskMutation.isPending}

                        className='w-full bg-indigo-600 border border-slate-300 text-white
                         rounded-lg py-2.5 px-2.5
                         hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition
                         '
                    >
                        {
                            updateTaskMutation.isPending ? "updating.." : "Save Changes"
                        }
                    </button>





                </form>


            </div>
        </div>
    )
}

export default UpdateTask
