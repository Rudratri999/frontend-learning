// Fetch categories
// Display them
// Clicking one sends user to create expense page
import React from 'react'
import { useCategory } from "../hooks/Category/useCategory";
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Layers, PlusCircle, AlertCircle, Loader2 } from 'lucide-react'

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

const ChooseCategories = () => {

    const {
        data: categories,
        isPending,
        error
    } = useCategory()

    if (isPending) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-slate-500">
                <Loader2 className="w-6 h-6 animate-spin" />
                <p className="text-sm">Loading categories…</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white border border-rose-200 rounded-xl p-6 flex flex-col items-center text-center gap-2">
                    <AlertCircle className="w-8 h-8 text-rose-500" />
                    <h2 className="text-base font-semibold text-slate-900">Couldn't load categories</h2>
                    <p className="text-sm text-slate-500">{error.message}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

            <Link
                to="/dashboard"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
            </Link>

            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
                    Add Expense
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                    Choose a category to log the expense under.
                </p>
            </div>

            {
                !categories || categories.length === 0 ? (
                    <div className="bg-white border border-dashed border-slate-300 rounded-xl py-16 flex flex-col items-center text-center gap-3">
                        <span className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-100">
                            <Layers className="w-6 h-6 text-slate-400" />
                        </span>
                        <div>
                            <h2 className="text-base font-semibold text-slate-900">No categories yet</h2>
                            <p className="text-sm text-slate-500 mt-1">
                                You'll need a category before you can add an expense.
                            </p>
                        </div>
                        <Link
                            to="/categories/create"
                            className="inline-flex items-center gap-2 mt-2 px-3.5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                        >
                            <PlusCircle className="w-4 h-4" />
                            Create Category
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {categories.map((category, index) => (
                            <Link
                                key={category.id}
                                to={`/categories/${category.id}/expenses/create`}
                                className="group flex items-center justify-between gap-3 bg-white border border-slate-200 rounded-xl p-4 hover:border-indigo-300 hover:bg-indigo-50/40 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <span
                                        className={`w-2.5 h-2.5 rounded-full shrink-0 ${CATEGORY_DOT_COLORS[index % CATEGORY_DOT_COLORS.length]}`}
                                        aria-hidden="true"
                                    />
                                    <h3 className="text-sm font-medium text-slate-900 truncate">
                                        {category.name}
                                    </h3>
                                </div>
                                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 shrink-0" />
                            </Link>
                        ))}
                    </div>
                )
            }
        </div>
    )
}

export default ChooseCategories