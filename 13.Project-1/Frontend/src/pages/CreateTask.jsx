import React from 'react'
import { useForm } from "react-hook-form"
import { useCreateTask } from '../hooks/Tasks/useCreateTask'
import { zodResolver } from '@hookform/resolvers/zod'
import { createTaskSchema } from '../validation/taskSchema'
import { useParams } from 'react-router-dom'

const CreateTask = () => {

    const { id } = useParams()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(createTaskSchema)
    })

    const createTaskMutation = useCreateTask(id)

    const onSubmit = (formData) => {
        createTaskMutation.mutate({
            ...formData,
            project_id: Number(id),
        })
    }
    return (
        <div className='min-h-screen bg-slate-50 flex items-center justify-center px-4 '>
            <div className='w-full max-w-lg'>

                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
                        Create task
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Fill the details below and create your task
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}
                    className='bg-white rounded-2xl border border-slate-200 shdow space-y-5 p-8'
                >
                    <div>
                        <label className='block text-sm mb-1.5 text-slate-700'>Title</label>
                        <input type="text"
                            placeholder='Title'
                            {...register("title")} 
                            className='w-full border border-slate-300 rounded-lg text-slate-800
                            py-1.5 px-2.5 placeholder:text-slate-400 
                            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                            transition
                            '
                            />

                        {errors.title && (
                            <p className='text-sm text-red-600 mb-1.5'>{errors.title.message}</p>
                        )}
                    </div>

                    <div>
                        <label className='block text-sm mb-1.5 text-slate-700'>Description</label>
                        <textarea
                            rows={4}
                            placeholder='Description'
                            {...register("description")} 
                            className='w-full border border-slate-300 rounded-lg
                            text-slate-800 py-1.5 px-2.5 placeholder:text-slate-400
                            focus:outline-none focus : ring-indigo-500 focus:border-indigo-500
                            transition
                            '/>

                        {errors.description && (
                            <p className='text-sm text-red-600 min-1.5'>{errors.description.message}</p>
                        )}
                    </div>

                    <div>
                        <label className='block text-sm mb-1.5 text-slate-700'>Priority</label>
                        <select {...register("priority")}
                        className='w-full border border-slate-300 rounded-lg
                        text-slate-400 py-1.5 px-2.5 placeholder:text-slate-400'
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
                        <label className='block text-sm mb-1.5 text-slate-700'>Due-Date</label>
                        <input type="date"
                            placeholder='Due_Date'
                            {...register("due_date")}
                            className='w-full border border-slate-300 rounded-lg
                            text-slate-400 placeholder:text-slate-400 py-1.5 px-2.5'
                            />

                        {errors.due_date && (
                            <p className='text-sm text-red-600 mb-1.5'>{errors.due_date.message}</p>
                        )}
                    </div>

                    <button type='submit'
                        disabled={createTaskMutation.isPending}
                        
                        className='w-full border-slate-300 bg-indigo-600 hover:bg-indigo-700 text-white
                        py-1.5 px-2.5 rounded-lg disabled:opacity-0 disabled:cursor-not-allowed transition'
                        >
                        {
                            createTaskMutation.isPending ? "creating.." : "Create"
                        }
                    </button>





                </form>
            </div>
        </div>
    )
}

export default CreateTask
