import React, { useState } from 'react'
import { useAuth } from "../context/AuthContext"
import { Link } from 'react-router-dom'
import { useCategory } from '../hooks/Category/useCategory'
import { useExpenseSummary, useMonthlySummary } from '../hooks/Expense-Summary/useSummary'
import { useSummaryCategory } from '../hooks/Expense-Summary/useSummary'
import { useExpense } from "../hooks/Expense/useExpense";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer
} from "recharts"
import {
    Wallet,
    Receipt,
    Layers,
    TrendingUp,
    PlusCircle,
    FolderPlus,
    ListPlus,
    ListChecks,
    AlertCircle,
    Loader2,
    Inbox,
    ArrowRight,
    Award
} from "lucide-react"

// Shared palette so the pie chart, category badges, and list markers all
// point back at the same category consistently.
const CHART_COLORS = ["#6366F1", "#10B981", "#F59E0B", "#F43F5E", "#0EA5E9", "#8B5CF6"]
const CATEGORY_BADGE_STYLES = [
    "bg-indigo-50 text-indigo-700",
    "bg-emerald-50 text-emerald-700",
    "bg-amber-50 text-amber-700",
    "bg-rose-50 text-rose-700",
    "bg-sky-50 text-sky-700",
    "bg-violet-50 text-violet-700",
]

const formatCurrency = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`

const Dashboard = () => {

    // NOTE: initial value changed from "" to "all" — see previous "What Changed" notes.
    const [selectedMonth, setSelectedMonth] = useState("all")

    const { data: categories,
        isPending: categoryLoading,
        error: categoryError
    } = useCategory()

    const {
        data: summary,
        isLoading: summaryLoading,
        error: summaryError
    } = useExpenseSummary()

    const {
        data: categorySummary,
        isLoading: categorySummaryLoading,
        error: categorySummaryError
    } = useSummaryCategory()

    const {
        data: monthlySummary,
        isLoading: monthlySummaryLoading,
        error: monthlySummaryError
    } = useMonthlySummary();

    const {
        data: expenses,
        isLoading: expenseLoading,
        error: expenseError
    } = useExpense();

    const totalCategories = categories?.length || 0

    const { user } = useAuth()

    if (
        categoryLoading ||
        summaryLoading ||
        categorySummaryLoading || expenseLoading || monthlySummaryLoading
    ) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-slate-500">
                <Loader2 className="w-6 h-6 animate-spin" />
                <p className="text-sm">Loading your dashboard…</p>
            </div>
        )
    }

    if (categoryError || summaryError || categorySummaryError || expenseError || monthlySummaryError) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white border border-rose-200 rounded-xl p-6 flex flex-col items-center text-center gap-2">
                    <AlertCircle className="w-8 h-8 text-rose-500" />
                    <h2 className="text-base font-semibold text-slate-900">Couldn't load your dashboard</h2>
                    <p className="text-sm text-slate-500">
                        {
                            categoryError?.message || summaryError?.message || categorySummaryError?.message ||
                            expenseError?.message || monthlySummaryError?.message
                        }
                    </p>
                </div>
            </div>
        )
    }

    // Displaying Recent Expenses
    const recentExpenses = expenses
        ? [...expenses]
            .sort(
                (a, b) =>
                    new Date(b.expense_date) - new Date(a.expense_date)
            )
            .slice(0, 5)
        : []

    // Filtering Monthly
    const filterMonthlySummary =
        selectedMonth === "all" ?
            monthlySummary :
            monthlySummary.filter((item) => `${item.year} - ${item.month}` === selectedMonth
            )

    // Avegrage Expenses
    const averageExpenses =
        summary && summary.total_expenses > 0
            ? summary.total_amount / summary.total_expenses
            : 0

    // Category Chart By summary
    const categoryChartData = categorySummary?.map((item) => ({
        name: item.category,
        value: item.total_amount
    })) || []

    // Monthly Summary Chart
    const monthlyChartData = monthlySummary?.map((item) => ({
        month: new Date(
            item.year,
            item.month - 1
        ).toLocaleString("en-US", {
            month: "short",
            year: "numeric"
        }),
        total: item.total_amount
    })) || []

    const topCategory =
        categorySummary && categorySummary.length > 0
            ? [...categorySummary].sort((a, b) => b.total_amount - a.total_amount)[0]
            : null

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
                    Welcome, {user?.username}
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                    Here's an overview of your spending.
                </p>
            </div>

            {/* Overview */}
            <section>
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
                    Overview
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-indigo-600 rounded-xl p-5 text-white">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-indigo-100">Total Spent</span>
                            <Wallet className="w-5 h-5 text-indigo-200" />
                        </div>
                        <p className="text-3xl font-semibold tabular-nums">
                            {formatCurrency(summary?.total_amount)}
                        </p>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-5">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-slate-500">Total Expenses</span>
                            <Receipt className="w-5 h-5 text-slate-400" />
                        </div>
                        <p className="text-3xl font-semibold text-slate-900 tabular-nums">
                            {summary?.total_expenses || 0}
                        </p>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-5">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-slate-500">Categories</span>
                            <Layers className="w-5 h-5 text-slate-400" />
                        </div>
                        <p className="text-3xl font-semibold text-slate-900 tabular-nums">
                            {totalCategories}
                        </p>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-5">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-slate-500">Average Expense</span>
                            <TrendingUp className="w-5 h-5 text-slate-400" />
                        </div>
                        <p className="text-3xl font-semibold text-slate-900 tabular-nums">
                            {formatCurrency(averageExpenses)}
                        </p>
                    </div>
                </div>
            </section>

            {/* Insights */}
            <section>
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
                    Insights
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Top Spending Category */}
                    <div className="lg:col-span-1 bg-white border border-slate-200 rounded-xl p-5">
                        <div className="flex items-center gap-2 mb-4">
                            <Award className="w-4 h-4 text-amber-500" />
                            <h3 className="text-sm font-medium text-slate-500">Top Spending Category</h3>
                        </div>

                        {topCategory ? (
                            <>
                                <p className="text-lg font-semibold text-slate-900">{topCategory.category}</p>
                                <p className="text-2xl font-semibold text-slate-900 mt-1 tabular-nums">
                                    {formatCurrency(topCategory.total_amount)}
                                </p>
                                <p className="text-sm text-slate-500 mt-1">
                                    {topCategory.total_expenses} expense{topCategory.total_expenses === 1 ? "" : "s"}
                                </p>
                            </>
                        ) : (
                            <p className="text-sm text-slate-400">No spending data available.</p>
                        )}
                    </div>

                    {/* Spending By Category */}
                    <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5">
                        <h3 className="text-sm font-medium text-slate-500 mb-4">Spending By Category</h3>

                        {categorySummary && categorySummary.length > 0 ? (
                            <ul className="divide-y divide-slate-100">
                                {categorySummary.map((item, index) => (
                                    <li key={item.category_id} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <span className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-medium ${CATEGORY_BADGE_STYLES[index % CATEGORY_BADGE_STYLES.length]}`}>
                                                {item.category}
                                            </span>
                                            <span className="text-xs text-slate-400 truncate">
                                                {item.total_expenses} expense{item.total_expenses === 1 ? "" : "s"}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 shrink-0">
                                            <span className="text-sm font-semibold text-slate-900 tabular-nums">
                                                {formatCurrency(item.total_amount)}
                                            </span>
                                            <Link
                                                to={`/categories/${item.category_id}`}
                                                className="text-indigo-600 hover:text-indigo-700"
                                                aria-label={`View ${item.category}`}
                                            >
                                                <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-slate-400">No category expense found.</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Analytics */}
            <section>
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
                    Analytics
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Monthly Trend */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5">
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                            <h3 className="text-sm font-medium text-slate-500">Monthly Spending Trend</h3>

                            <div className="flex items-center gap-2">
                                <select
                                    value={selectedMonth}
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                    className="text-sm border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="all">All Months</option>
                                    {
                                        monthlySummary.map((item) => (
                                            <option key={`${item.year} - ${item.month}`}
                                                value={`${item.year} - ${item.month}`}>
                                                {new Date(item.year, item.month - 1).toLocaleString("en-US",
                                                    {
                                                        month: "long",
                                                        year: "numeric"
                                                    }
                                                )}
                                            </option>
                                        ))
                                    }
                                </select>
                                {selectedMonth !== "all" && (
                                    <button
                                        onClick={() => setSelectedMonth("all")}
                                        className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                        </div>

                        {monthlyChartData.length > 0 ? (
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={monthlyChartData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                                        <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748B" }} />
                                        <YAxis tick={{ fontSize: 12, fill: "#64748B" }} />
                                        <Tooltip formatter={(value) => [formatCurrency(value), "Total Spent"]} />
                                        <Legend wrapperStyle={{ fontSize: 12 }} />
                                        <Line
                                            type="monotone"
                                            dataKey="total"
                                            name="Total Spent"
                                            stroke="#4F46E5"
                                            strokeWidth={2}
                                            dot={{ r: 3 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        ) : (
                            <div className="h-64 flex flex-col items-center justify-center text-slate-400 gap-2">
                                <Inbox className="w-6 h-6" />
                                <p className="text-sm">No monthly data yet.</p>
                            </div>
                        )}

                        {/* Filtered monthly breakdown */}
                        <div className="mt-4 border-t border-slate-100 pt-3">
                            {filterMonthlySummary && filterMonthlySummary.length > 0 ? (
                                <ul className="space-y-2">
                                    {filterMonthlySummary.map((item) => (
                                        <li key={`${item.year}-${item.month}`} className="flex items-center justify-between text-sm">
                                            <span className="text-slate-600">
                                                {new Date(item.year, item.month - 1).toLocaleString("en-US", {
                                                    month: "long",
                                                    year: "numeric"
                                                })}
                                            </span>
                                            <span className="text-slate-900 font-medium tabular-nums">
                                                {formatCurrency(item.total_amount)}
                                                <span className="text-slate-400 font-normal ml-2">
                                                    · {item.total_expenses} expense{item.total_expenses === 1 ? "" : "s"}
                                                </span>
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-slate-400">No monthly data found.</p>
                            )}
                        </div>
                    </div>

                    {/* Spending Distribution */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5">
                        <h3 className="text-sm font-medium text-slate-500 mb-4">Spending Distribution</h3>

                        {categoryChartData.length > 0 ? (
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={categoryChartData}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={85}
                                        >
                                            {
                                                categoryChartData.map((entry, index) => (
                                                    <Cell
                                                        key={`cell-${index}`}
                                                        fill={CHART_COLORS[index % CHART_COLORS.length]}
                                                    />
                                                ))
                                            }
                                        </Pie>
                                        <Tooltip
                                            formatter={(value) => {
                                                const percentage =
                                                    summary?.total_amount > 0
                                                        ? (value / summary.total_amount) * 100
                                                        : 0

                                                return [
                                                    `${formatCurrency(value)} (${percentage.toFixed(1)}%)`,
                                                    "Total Spent"
                                                ]
                                            }}
                                        />
                                        <Legend wrapperStyle={{ fontSize: 12 }} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        ) : (
                            <div className="h-64 flex flex-col items-center justify-center text-slate-400 gap-2">
                                <Inbox className="w-6 h-6" />
                                <p className="text-sm">No spending data yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Activity */}
            <section>
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
                    Activity
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Recent Expenses */}
                    <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-slate-500">Recent Expenses</h3>
                            <Link to="/expenses" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1">
                                View all <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        {!recentExpenses || recentExpenses.length === 0 ? (
                            <div className="py-8 flex flex-col items-center justify-center text-slate-400 gap-2">
                                <Inbox className="w-6 h-6" />
                                <p className="text-sm">No expenses found.</p>
                            </div>
                        ) : (
                            <ul className="divide-y divide-slate-100">
                                {recentExpenses.map((expense) => (
                                    <li key={expense.id} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <span className="shrink-0 w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                                                <Receipt className="w-4 h-4 text-slate-500" />
                                            </span>
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-slate-900 truncate">{expense.title}</p>
                                                <p className="text-xs text-slate-400">{expense.expense_date}</p>
                                            </div>
                                        </div>
                                        <span className="text-sm font-semibold text-slate-900 tabular-nums shrink-0">
                                            {formatCurrency(expense.amount)}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5">
                        <h3 className="text-sm font-medium text-slate-500 mb-4">Quick Actions</h3>

                        <div className="grid grid-cols-1 gap-2">
                            <Link
                                to="/expenses/create"
                                className="inline-flex items-center gap-2.5 px-3.5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                                <PlusCircle className="w-4 h-4" />
                                Add Expense
                            </Link>
                            <Link
                                to="/categories/create"
                                className="inline-flex items-center gap-2.5 px-3.5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                            >
                                <FolderPlus className="w-4 h-4" />
                                Create Category
                            </Link>
                            <Link
                                to="/categories"
                                className="inline-flex items-center gap-2.5 px-3.5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                            >
                                <ListChecks className="w-4 h-4" />
                                View All Categories
                            </Link>
                            <Link
                                to="/expenses"
                                className="inline-flex items-center gap-2.5 px-3.5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                            >
                                <ListPlus className="w-4 h-4" />
                                View All Expenses
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Dashboard