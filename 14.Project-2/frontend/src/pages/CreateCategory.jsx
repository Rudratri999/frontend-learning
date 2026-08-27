import React from 'react'
import { Link } from 'react-router-dom'
import { useCreateCategory } from '../hooks/Category/useCreateCategory'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createCategorySchema } from '../validation/categorySchema'
import { ArrowLeft, AlertCircle } from 'lucide-react'

const CreateCategory = () => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(createCategorySchema)
    })

    const createCategoryMutation = useCreateCategory()
    const onSubmit = (data) => {
        createCategoryMutation.mutate(data)
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
                    Create Category
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                    Give your category a name to start grouping expenses under it.
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
                    {createCategoryMutation.isError && (
                        <div className="flex items-start gap-2 text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2.5">
                            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                            <span>{createCategoryMutation.error?.message || "Couldn't create category. Try again."}</span>
                        </div>
                    )}

                    <div className="flex items-center gap-3 pt-1">
                        <button
                            type="submit"
                            disabled={createCategoryMutation.isPending}
                            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {createCategoryMutation.isPending ? "Creating…" : "Create Category"}
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

export default CreateCategory