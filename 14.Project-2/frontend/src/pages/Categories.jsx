import React from 'react'
import { useCategory } from '../hooks/Category/useCategory'
import { useDeleteCategory } from '../hooks/Category/useDeleteCategory'
import { Link } from 'react-router-dom'
import {
    Layers,
    PlusCircle,
    Eye,
    Pencil,
    Trash2,
    AlertCircle,
    Loader2,
    ArrowLeft
} from 'lucide-react'

// Same palette used on the Dashboard, so a category's color stays
// consistent across the app.
const CATEGORY_BADGE_STYLES = [
    "bg-indigo-50 text-indigo-700",
    "bg-emerald-50 text-emerald-700",
    "bg-amber-50 text-amber-700",
    "bg-rose-50 text-rose-700",
    "bg-sky-50 text-sky-700",
    "bg-violet-50 text-violet-700",
]

const CATEGORY_DOT_COLORS = [
    "bg-indigo-500",
    "bg-emerald-500",
    "bg-amber-500",
    "bg-rose-500",
    "bg-sky-500",
    "bg-violet-500",
]


const Categories = () => {

    const { data: categories,
        isPending: categoryLoading,
        error: categoryError
    } = useCategory()

    const deleteCategoryMutation = useDeleteCategory()

    if (categoryLoading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-slate-500">
                <Loader2 className="w-6 h-6 animate-spin" />
                <p className="text-sm">Loading your categories…</p>
            </div>
        )
    }

    if (categoryError) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white border border-rose-200 rounded-xl p-6 flex flex-col items-center text-center gap-2">
                    <AlertCircle className="w-8 h-8 text-rose-500" />
                    <h2 className="text-base font-semibold text-slate-900">Couldn't load your categories</h2>
                    <p className="text-sm text-slate-500">{categoryError?.message}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

            <Link
                to="/dashboard"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
            </Link>


            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
                        Categories
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Organize your expenses by category.
                    </p>
                </div>

                {categories && categories.length > 0 && (
                    <Link
                        to="/categories/create"
                        className="inline-flex items-center gap-2 self-start sm:self-auto px-3.5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                        <PlusCircle className="w-4 h-4" />
                        Add Category
                    </Link>
                )}
            </div>

            {/* Category grid / empty state */}
            {
                !categories || categories.length === 0 ? (
                    <div className="bg-white border border-dashed border-slate-300 rounded-xl py-16 flex flex-col items-center text-center gap-3">
                        <span className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-100">
                            <Layers className="w-6 h-6 text-slate-400" />
                        </span>
                        <div>
                            <h2 className="text-base font-semibold text-slate-900">No categories yet</h2>
                            <p className="text-sm text-slate-500 mt-1">
                                Create a category to start organizing your expenses.
                            </p>
                        </div>
                        <Link
                            to="/categories/create"
                            className="inline-flex items-center gap-2 mt-2 px-3.5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                        >
                            <PlusCircle className="w-4 h-4" />
                            Add Category
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categories.map((category, index) => (
                            <div
                                key={category.id}
                                className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col"
                            >
                                <div className="flex items-center gap-2.5 mb-4">
                                    <span
                                        className={`w-2.5 h-2.5 rounded-full shrink-0 ${CATEGORY_DOT_COLORS[index % CATEGORY_DOT_COLORS.length]}`}
                                        aria-hidden="true"
                                    />
                                    <h3 className="text-base font-semibold text-slate-900 truncate">
                                        {category.name}
                                    </h3>
                                </div>

                                <div className="flex items-center gap-4 pt-3 mt-auto border-t border-slate-100">
                                    <Link
                                        to={`/categories/${category.id}`}
                                        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900"
                                    >
                                        <Eye className="w-4 h-4" />
                                        View
                                    </Link>

                                    <Link
                                        to={`/categories/${category.id}/edit`}
                                        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900"
                                    >
                                        <Pencil className="w-4 h-4" />
                                        Edit
                                    </Link>

                                    <button
                                        onClick={() => {
                                            const confirmDelete = window.confirm(
                                                "Are you sure you want to delete this category?"
                                            );

                                            if (confirmDelete) {
                                                deleteCategoryMutation.mutate(category.id)
                                            }
                                        }}
                                        disabled={deleteCategoryMutation.isPending}
                                        className="inline-flex items-center gap-1.5 text-sm font-medium text-rose-600 hover:text-rose-700 disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        {deleteCategoryMutation.isPending ? "Deleting…" : "Delete"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    )
}

export default Categories