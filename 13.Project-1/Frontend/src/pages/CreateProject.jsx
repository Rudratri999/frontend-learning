import React from 'react'
import { useForm } from "react-hook-form"
import { useCreateProject } from '../hooks/Projects/useCreateProject'
import { zodResolver } from "@hookform/resolvers/zod";
import { createProjectSchema } from '../validation/projectSchema';

const CreateProject = () => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(createProjectSchema)
    })

    const createProjectMutation = useCreateProject()

    const onSubmit = (data) => {
        createProjectMutation.mutate(data)
    }
    return (
        <div className='min-h-screen bg-slate-50 flex justify-center items-center px-4'>
            <div className='w-full max-w-lg'>

                 <div className="mb-8 text-center">

                    <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
                        Create Project
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Fill the details below and create your project
                    </p>
                </div>


                <form onSubmit={handleSubmit(onSubmit)}
                    className='bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-5'
                >
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5 "
                        >Project Name</label>

                        <input type="text"
                            placeholder='Enter Project Name'
                            {...register("name")}
                            className='w-full px-2.5 py-3.5 rounded-lg border border-slate-300 
                        text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition'
                        />

                        {errors.name && (
                            <p className='text-sm text-red-600 mt-1.5'>{errors.name.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5 "
                        >Description</label>
                        <textarea
                            rows={4}
                            placeholder='Update Project Description'
                            {...register("description")}
                            className='w-full px-2.5 py-3.5 rounded-lg border border-slate-300
                            text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-indigo-500 transition'
                        />

                        {errors.description && (
                            <p className='text-sm text-red-600 mt-1.5'>{errors.description.message}</p>
                        )}
                    </div>

                    <button type='submit'
                        disabled={createProjectMutation.isPending}
                        className='w-full bg-indigo-500 px-2.5 py-2.5 border border-slate-300 
                        rounded-lg text-white hover:bg-indigo-700  disabled:opacity-0 disabled:cursor-not-allowed transition'
                        >

                        {
                            createProjectMutation.isPending ? "creating..." : "Create"
                        }
                    </button>


                </form>
            </div>
        </div>

    )
}

export default CreateProject
