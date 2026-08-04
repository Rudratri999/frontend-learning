import React from 'react'
import { useParams } from 'react-router-dom';
import { createProjectSchema } from '../validation/projectSchema';
import { useUpdate, useUpdateProject } from '../hooks/Projects/useUpdateProject';
import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const UpdateProject = () => {
    const { id } = useParams()
    const { data, isPending, error } = useUpdate(id)
    //  all hooks called before any return statement


    const updateProjectMutation = useUpdateProject()

    const onSubmit = (formData) => {
        updateProjectMutation.mutate({ id, data: formData })

    }

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(createProjectSchema)
    })

    useEffect(() => {
        if (data) {
            reset({
                name: data.name,
                description: data.description,
            });
        }
    }, [data, reset]);


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
        <div className='min-h-screen px-4 bg-slate-50 flex justify-center items-center'>
            <div className='w-full max-w-lg'>
                <div className="mb-8 text-center">

                    <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
                        Edit Project
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Update the details below and save your changes
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}
                    className='bg-white rounded-2xl shadow-sm border border-slate-200
                p-8 space-y-5'
                >

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5 "
                        >Project Name</label>

                        <input type="text"
                            placeholder='Update Project Name'
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
                        disabled={updateProjectMutation.isPending}
                        className='w-full bg-indigo-500 px-2.5 py-2.5 border border-slate-300 
                        rounded-lg text-white hover:bg-indigo-700  disabled:opacity-0 disabled:cursor-not-allowed transition'
                    >

                        {
                            updateProjectMutation.isPending ? "updating..." : "Save Changes"
                        }
                    </button>
                </form>
            </div>
        </div>
    )
}

export default UpdateProject
