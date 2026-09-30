import React, { useEffect } from 'react'
import { useUpdate, useUpdateExpense } from '../hooks/Expense/useUpdateExpense'
import { useParams, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createExpenseSchema } from '../validation/expenseSchema'
import { ArrowLeft, AlertCircle, Loader2 } from 'lucide-react'

const inputClasses =
    "w-full text-sm border rounded-lg px-3 py-2.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"

const UpdateExpense = () => {

    const { expenseId, categoryId } = useParams()
    const { data, isPending, error } = useUpdate(expenseId)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm(
        { resolver: zodResolver(createExpenseSchema) }
    )

    const updateExpenseMutation = useUpdateExpense(categoryId)
    const onSubmit = (formData) => {
        updateExpenseMutation.mutate({
            id: expenseId,
            data: {
                ...formData,
                category_id: Number(categoryId)
            }
        })
    }

    useEffect(() => {
        if (data) {
            reset({
                title: data.title,
                description: data.description,
                amount: data.amount,
                expense_date: data.expense_date
            })
        }
    }, [data, reset])

    if (isPending) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-slate-500">
                <Loader2 className="w-6 h-6 animate-spin" />
                <p className="text-sm">Loading expense…</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white border border-rose-200 rounded-xl p-6 flex flex-col items-center text-center gap-2">
                    <AlertCircle className="w-8 h-8 text-rose-500" />
                    <h2 className="text-base font-semibold text-slate-900">Something went wrong</h2>
                    <p className="text-sm text-slate-500">Please try again.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

            <Link
                to={`/categories/${categoryId}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Category
            </Link>

            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
                    Edit Expense
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                    Update the details of this expense.
                </p>
            </div>

            {/* Form */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    {/* Title Field */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1.5">
                            Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            {...register("title")}
                            className={`${inputClasses} ${errors.title ? "border-rose-300" : "border-slate-200"}`}
                        />
                        {errors.title && <p className="text-sm text-rose-600 mt-1.5">{errors.title.message}</p>}
                    </div>

                    {/* Description Field */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1.5">
                            Description
                        </label>
                        <textarea
                            id="description"
                            rows={3}
                            {...register("description")}
                            className={`${inputClasses} resize-none ${errors.description ? "border-rose-300" : "border-slate-200"}`}
                        />
                        {errors.description && <p className="text-sm text-rose-600 mt-1.5">{errors.description.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Amount Field */}
                        <div>
                            <label htmlFor="amount" className="block text-sm font-medium text-slate-700 mb-1.5">
                                Amount
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                                    ₹
                                </span>
                                <input
                                    id="amount"
                                    type="number"
                                    step="0.01"
                                    {...register("amount", { valueAsNumber: true })}
                                    className={`${inputClasses} pl-7 ${errors.amount ? "border-rose-300" : "border-slate-200"}`}
                                />
                            </div>
                            {errors.amount && <p className="text-sm text-rose-600 mt-1.5">{errors.amount.message}</p>}
                        </div>

                        {/* Expense Date Field */}
                        <div>
                            <label htmlFor="expense_date" className="block text-sm font-medium text-slate-700 mb-1.5">
                                Expense date
                            </label>
                            <input
                                id="expense_date"
                                type="date"
                                {...register("expense_date")}
                                className={`${inputClasses} ${errors.expense_date ? "border-rose-300" : "border-slate-200"}`}
                            />
                            {errors.expense_date && <p className="text-sm text-rose-600 mt-1.5">{errors.expense_date.message}</p>}
                        </div>
                    </div>

                    {/* Mutation-level error */}
                    {updateExpenseMutation.isError && (
                        <div className="flex items-start gap-2 text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2.5">
                            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                            <span>{updateExpenseMutation.error?.message || "Couldn't save changes. Try again."}</span>
                        </div>
                    )}

                    <div className="flex items-center gap-3 pt-1">
                        <button
                            type="submit"
                            disabled={updateExpenseMutation.isPending}
                            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {updateExpenseMutation.isPending ? "Saving…" : "Save Changes"}
                        </button>

                        <Link
                            to={`/categories/${categoryId}`}
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

export default UpdateExpense