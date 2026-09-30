import React, { useState } from 'react'
import { useExpense } from '../hooks/Expense/useExpense'
import { useDeleteExpense } from '../hooks/Expense/useDeleteExpense'
import { Link } from 'react-router-dom'
import {
    ArrowLeft,
    PlusCircle,
    Receipt,
    Pencil,
    Trash2,
    Inbox,
    AlertCircle,
    Loader2,
    X
} from 'lucide-react'

// Same palette used across Dashboard/Categories, keyed by category_id
// so the same category always gets the same color on this page.
const CATEGORY_BADGE_STYLES = [
    "bg-indigo-50 text-indigo-700",
    "bg-emerald-50 text-emerald-700",
    "bg-amber-50 text-amber-700",
    "bg-rose-50 text-rose-700",
    "bg-sky-50 text-sky-700",
    "bg-violet-50 text-violet-700",
]
const getCategoryStyle = (categoryId) =>
    CATEGORY_BADGE_STYLES[Number(categoryId) % CATEGORY_BADGE_STYLES.length]

const inputClasses =
    "w-full text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"

const Expenses = () => {

    const [selectedCategory, setSelectedCategory] = useState("all")
    const [fromDate, setFromDate] = useState("")
    const [toDate, setToDate] = useState("")
    const [sortBy, setSortBy] = useState("newest")

    const { data: expenses, isPending, error } = useExpense()

    const deleteExpenseMutation = useDeleteExpense()

    if (isPending) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-slate-500">
                <Loader2 className="w-6 h-6 animate-spin" />
                <p className="text-sm">Loading your expenses…</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white border border-rose-200 rounded-xl p-6 flex flex-col items-center text-center gap-2">
                    <AlertCircle className="w-8 h-8 text-rose-500" />
                    <h2 className="text-base font-semibold text-slate-900">Couldn't load your expenses</h2>
                    <p className="text-sm text-slate-500">{error.message}</p>
                </div>
            </div>
        )
    }

    const filterdExpenses = expenses.filter((expense) => {

        const matchesCategory =
            selectedCategory === "all" || expense.category_id === Number(selectedCategory)

        const matchesFromDate =
            !fromDate ||
            expense.expense_date >= fromDate

        const matchesToDate =
            !toDate ||
            expense.expense_date <= toDate

        return (matchesCategory && matchesFromDate && matchesToDate)
    })

    const sortedExpenses = [...filterdExpenses].sort((a, b) => {
    //    logic : descending(b-a) , ascending(a-b)
        if (sortBy === "newest") {
            return new Date(b.expense_date) - new Date(a.expense_date)
        }
        if (sortBy === "oldest") {
            return new Date(a.expense_date) - new Date(b.expense_date)
        }
        if (sortBy === "highest") {
            return b.amount - a.amount
        }
        if (sortBy === "lowest") {
            return a.amount - b.amount
        }

        return 0

    })

    const hasAnyExpenses = expenses && expenses.length > 0
    const filtersActive =
        selectedCategory !== "all" || fromDate !== "" || toDate !== "" || sortBy !== "newest"

    const clearFilters = () => {
        setSelectedCategory("all")
        setFromDate("")
        setToDate("")
        setSortBy("newest")
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
                        My Expenses
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Track and manage everything you've spent.
                    </p>
                </div>

                {hasAnyExpenses && (
                    <Link
                        to="/expenses/create"
                        className="inline-flex items-center gap-2 self-start sm:self-auto px-3.5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                        <PlusCircle className="w-4 h-4" />
                        Add Expense
                    </Link>
                )}
            </div>

            {/* Filter bar */}
            {hasAnyExpenses && (
                <div className="bg-white border border-slate-200 rounded-xl p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">
                                Category
                            </label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className={inputClasses}
                            >
                                <option value="all">All Categories</option>
                                {
                                    [...new Map(
                                        expenses.map((expense) => [
                                            expense.category_id,
                                            expense.category
                                        ])
                                    ).values()].map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">
                                From date
                            </label>
                            <input
                                type="date"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                                className={inputClasses}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">
                                To date
                            </label>
                            <input
                                type="date"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                                className={inputClasses}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">
                                Sort by
                            </label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className={inputClasses}
                            >
                                <option value="newest">Newest</option>
                                <option value="oldest">Oldest</option>
                                <option value="highest">Highest</option>
                                <option value="lowest">Lowest</option>
                            </select>
                        </div>

                        <div className="flex items-end">
                            <button
                                onClick={clearFilters}
                                disabled={!filtersActive}
                                className="w-full inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <X className="w-4 h-4" />
                                Clear
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Expense list */}
            {
                !sortedExpenses || sortedExpenses.length === 0 ? (
                    !hasAnyExpenses ? (
                        <div className="bg-white border border-dashed border-slate-300 rounded-xl py-16 flex flex-col items-center text-center gap-3">
                            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-100">
                                <Receipt className="w-6 h-6 text-slate-400" />
                            </span>
                            <div>
                                <h2 className="text-base font-semibold text-slate-900">No expenses yet</h2>
                                <p className="text-sm text-slate-500 mt-1">
                                    Add your first expense to start tracking your spending.
                                </p>
                            </div>
                            <Link
                                to="/expenses/create"
                                className="inline-flex items-center gap-2 mt-2 px-3.5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                            >
                                <PlusCircle className="w-4 h-4" />
                                Add Expense
                            </Link>
                        </div>
                    ) : (
                        <div className="bg-white border border-dashed border-slate-300 rounded-xl py-16 flex flex-col items-center text-center gap-3">
                            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-100">
                                <Inbox className="w-6 h-6 text-slate-400" />
                            </span>
                            <div>
                                <h2 className="text-base font-semibold text-slate-900">No expenses match your filters</h2>
                                <p className="text-sm text-slate-500 mt-1">
                                    Try adjusting or clearing your filters.
                                </p>
                            </div>
                            <button
                                onClick={clearFilters}
                                className="inline-flex items-center gap-2 mt-2 px-3.5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                            >
                                <X className="w-4 h-4" />
                                Clear filters
                            </button>
                        </div>
                    )
                ) : (
                    <div className="space-y-3">
                        {sortedExpenses.map((expense) => (
                            <div
                                key={expense.id}
                                className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4"
                            >
                                <span className="hidden sm:flex shrink-0 w-9 h-9 rounded-lg bg-slate-100 items-center justify-center">
                                    <Receipt className="w-4 h-4 text-slate-500" />
                                </span>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h3 className="text-sm font-semibold text-slate-900 truncate">
                                            {expense.title}
                                        </h3>
                                        <span className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryStyle(expense.category_id)}`}>
                                            {expense.category.name}
                                        </span>
                                    </div>
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
                                            to={`/categories/${expense.category_id}/expenses/${expense.id}/edit`}
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
                        ))}
                    </div>
                )
            }
        </div>
    )
}

export default Expenses