import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useUpdateCategory, useUpdate } from '../hooks/Category/useUpdateCategory'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createCategorySchema } from '../validation/categorySchema'
import { ArrowLeft, AlertCircle, Loader2 } from 'lucide-react'

const UpdateCategory = () => {
    const { id } = useParams()
    
    const { data, isPending, error } = useUpdate(id)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(createCategorySchema)
    })

    const updateCategoryMutation = useUpdateCategory()
    const onSubmit = (formData) => {
        updateCategoryMutation.mutate({
            id,
            data: formData
        })
    }

    useEffect(() => {
        if (data) {
            reset({
                name: data.name
            })
        }

    }, [data, reset])

    if (isPending) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-slate-500">
                <Loader2 className="w-6 h-6 animate-spin" />
                <p className="text-sm">Loading category…</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white border border-rose-200 rounded-xl p-6 flex flex-col items-center text-center gap-2">
                    <AlertCircle className="w-8 h-8 text-rose-500" />
                    <h2 className="text-base font-semibold text-slate-900">Couldn't load this category</h2>
                    <p className="text-sm text-slate-500">{error?.message}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

            <Link
                to="/categories"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Categories
            </Link>

            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
                    Edit Category
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                    Update the name of this category.
                </p>
            </div>

            {/* Form */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    {/* Category name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">
                            Category name
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="e.g. Groceries"
                            {...register("name")}
                            className={`w-full text-sm border rounded-lg px-3 py-2.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                errors.name ? "border-rose-300" : "border-slate-200"
                            }`}
                        />
                        {errors.name && (
                            <p className="text-sm text-rose-600 mt-1.5">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Mutation-level error */}
                    {updateCategoryMutation.isError && (
                        <div className="flex items-start gap-2 text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2.5">
                            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                            <span>{updateCategoryMutation.error?.message || "Couldn't save changes. Try again."}</span>
                        </div>
                    )}

                    <div className="flex items-center gap-3 pt-1">
                        <button
                            type="submit"
                            disabled={updateCategoryMutation.isPending}
                            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {updateCategoryMutation.isPending ? "Saving…" : "Save Changes"}
                        </button>

                        <Link
                            to="/categories"
                            className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateCategory