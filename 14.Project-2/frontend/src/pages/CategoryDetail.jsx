import React from 'react'
import { Link, useParams } from 'react-router-dom'
import {
    useCategoryById,
    useExpensesByCategory
} from '../hooks/Category/useCategory'
import { useDeleteExpense } from '../hooks/Expense/useDeleteExpense'
import {
    ArrowLeft,
    Wallet,
    Receipt,
    PlusCircle,
    Pencil,
    Trash2,
    Inbox,
    AlertCircle,
    Loader2
} from 'lucide-react'

const CATEGORY_BADGE_STYLES = [
    "bg-indigo-500",
    "bg-emerald-500",
    "bg-amber-500",
    "bg-rose-500",
    "bg-sky-500",
    "bg-violet-500",
]

const CategoryDetail = () => {

    const { id: categoryId } = useParams()

    // Get Category
    const {
        data: category,
        isPending: categoryLoading,
        error: categoryError
    } = useCategoryById(categoryId)

    // Get Expenses
    const {
        data: expenses,
        isPending: expensesLoading,
        error: expensesError
    } = useExpensesByCategory(categoryId)


    // Delete Expense
    const deleteExpenseMutation = useDeleteExpense(categoryId)

    // Sorted the expenses
    const sortedExpenses = expenses ? [...expenses].sort(
        (a, b) => new Date(b.expense_date) - new Date(a.expense_date)
    ) : []

    // Total expense  - Total spent
    const totalExpenses = expenses?.length || 0
    const totalSpent = expenses?.reduce(
        (total, expense) => total + Number(expense.amount), 0
    ) || 0


    if (
        categoryLoading ||
        expensesLoading
    ) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-slate-500">
                <Loader2 className="w-6 h-6 animate-spin" />
                <p className="text-sm">Loading category…</p>
            </div>
        )
    }

    if (
        categoryError ||
        expensesError
    ) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white border border-rose-200 rounded-xl p-6 flex flex-col items-center text-center gap-2">
                    <AlertCircle className="w-8 h-8 text-rose-500" />
                    <h2 className="text-base font-semibold text-slate-900">Couldn't load this category</h2>
                    <p className="text-sm text-slate-500">
                        {categoryError?.message || expensesError?.message}
                    </p>
                </div>
            </div>
        )
    }

    const dotColor = CATEGORY_BADGE_STYLES[Number(categoryId) % CATEGORY_BADGE_STYLES.length]

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

            <Link
                to="/dashboard"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
            </Link>

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                    {category && (
                        <span className={`w-3 h-3 rounded-full shrink-0 ${dotColor}`} aria-hidden="true" />
                    )}
                    <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
                        {category ? category.name : "Category not found"}
                    </h1>
                </div>

                {category && (
                    <Link
                        to={`/categories/${categoryId}/expenses/create`}
                        className="inline-flex items-center gap-2 self-start sm:self-auto px-3.5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                        <PlusCircle className="w-4 h-4" />
                        Add Expense
                    </Link>
                )}
            </div>

            {/* Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-indigo-600 rounded-xl p-5 text-white">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-indigo-100">Total Spent</span>
                        <Wallet className="w-5 h-5 text-indigo-200" />
                    </div>
                    <p className="text-3xl font-semibold tabular-nums">
                        ₹{totalSpent.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                    </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-slate-500">Total Expenses</span>
                        <Receipt className="w-5 h-5 text-slate-400" />
                    </div>
                    <p className="text-3xl font-semibold text-slate-900 tabular-nums">
                        {totalExpenses}
                    </p>
                </div>
            </div>

            {/* Expenses */}
            <section>
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
                    My Expenses
                </h2>

                {
                    !sortedExpenses || sortedExpenses.length === 0 ? (
                        <div className="bg-white border border-dashed border-slate-300 rounded-xl py-16 flex flex-col items-center text-center gap-3">
                            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-100">
                                <Inbox className="w-6 h-6 text-slate-400" />
                            </span>
                            <div>
                                <h3 className="text-base font-semibold text-slate-900">No expenses found</h3>
                                <p className="text-sm text-slate-500 mt-1">
                                    Add an expense to this category to see it here.
                                </p>
                            </div>
                            {category && (
                                <Link
                                    to={`/categories/${categoryId}/expenses/create`}
                                    className="inline-flex items-center gap-2 mt-2 px-3.5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                                >
                                    <PlusCircle className="w-4 h-4" />
                                    Add Expense
                                </Link>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {
                                sortedExpenses.map((expense) => (
                                    <div
                                        key={expense.id}
                                        className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4"
                                    >
                                        <span className="hidden sm:flex shrink-0 w-9 h-9 rounded-lg bg-slate-100 items-center justify-center">
                                            <Receipt className="w-4 h-4 text-slate-500" />
                                        </span>

                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-semibold text-slate-900 truncate">
                                                {expense.title}
                                            </h3>
                                            {expense.description && (
                                                <p className="text-sm text-slate-500 mt-0.5 truncate">
                                                    {expense.description}
                                                </p>
                                            )}
                                            <p className="text-xs text-slate-400 mt-1">
                                                {expense.expense_date}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between sm:justify-end gap-4 sm:w-auto">
                                            <span className="text-base font-semibold text-slate-900 tabular-nums">
                                                ₹{expense.amount}
                                            </span>

                                            <div className="flex items-center gap-3">
                                                <Link
                                                    to={`/categories/${categoryId}/expenses/${expense.id}/edit`}
                                                    className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                    <span className="hidden md:inline">Edit</span>
                                                </Link>

                                                <button
                                                    onClick={() => {
                                                        const confirmDelete = window.confirm(
                                                            "Are you sure you want to delete this expense?"
                                                        )

                                                        if (confirmDelete) {
                                                            deleteExpenseMutation.mutate(expense.id)
                                                        }
                                                    }}
                                                    disabled={deleteExpenseMutation.isPending}
                                                    className="inline-flex items-center gap-1.5 text-sm font-medium text-rose-600 hover:text-rose-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    <span className="hidden md:inline">
                                                        {deleteExpenseMutation.isPending ? "Deleting…" : "Delete"}
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </section>
        </div>
    )
}

export default CategoryDetail