
import React from "react"
import { Link, useSearchParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Wallet, AlertCircle, CheckCircle } from "lucide-react"
import { useResetPassword } from "../hooks/Authentication/useResetPassword"
import { resetPasswordSchema } from "../validation/authSchema"

const inputClasses =
    "w-full text-sm border rounded-lg px-3 py-2.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"

const ResetPassword = () => {
    const [searchParams] = useSearchParams()

    const token = searchParams.get("token")

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(resetPasswordSchema)
    })

    const resetPasswordMutation = useResetPassword()

    const onSubmit = (data) => {
        resetPasswordMutation.mutate({
            token,
            new_password: data.new_password
        })
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md space-y-6">

                {/* Logo */}
                <div className="flex flex-col items-center gap-2">
                    <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-600 text-white">
                        <Wallet className="w-5 h-5" />
                    </span>

                    <span className="text-base font-semibold text-slate-900 tracking-tight">
                        Expense Tracker
                    </span>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">

                    <div>
                        <h1 className="text-xl font-semibold text-slate-900 tracking-tight">
                            Reset your password
                        </h1>

                        <p className="text-sm text-slate-500 mt-1">
                            Enter a new password for your account.
                        </p>
                    </div>

                    {!token ? (
                        <div className="flex items-start gap-2 text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2.5">
                            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />

                            <span>
                                Invalid password reset link.
                            </span>
                        </div>
                    ) : resetPasswordMutation.isSuccess ? (

                        <div className="space-y-4">

                            <div className="flex items-start gap-2 text-sm text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2.5">
                                <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" />

                                <span>
                                    Your password has been reset successfully.
                                </span>
                            </div>

                            <Link
                                to="/login"
                                className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                                Go to Login
                            </Link>

                        </div>

                    ) : (

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-5"
                        >

                            {/* New Password */}
                            <div>
                                <label
                                    htmlFor="new_password"
                                    className="block text-sm font-medium text-slate-700 mb-1.5"
                                >
                                    New Password
                                </label>

                                <input
                                    id="new_password"
                                    type="password"
                                    placeholder="Enter new password"
                                    {...register("new_password")}
                                    className={`${inputClasses} ${
                                        errors.new_password
                                            ? "border-rose-300"
                                            : "border-slate-200"
                                    }`}
                                />

                                {errors.new_password && (
                                    <p className="text-sm text-rose-600 mt-1.5">
                                        {errors.new_password.message}
                                    </p>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label
                                    htmlFor="confirm_password"
                                    className="block text-sm font-medium text-slate-700 mb-1.5"
                                >
                                    Confirm Password
                                </label>

                                <input
                                    id="confirm_password"
                                    type="password"
                                    placeholder="Confirm new password"
                                    {...register("confirm_password")}
                                    className={`${inputClasses} ${
                                        errors.confirm_password
                                            ? "border-rose-300"
                                            : "border-slate-200"
                                    }`}
                                />

                                {errors.confirm_password && (
                                    <p className="text-sm text-rose-600 mt-1.5">
                                        {errors.confirm_password.message}
                                    </p>
                                )}
                            </div>

                            {/* Server error */}
                            {resetPasswordMutation.isError && (
                                <div className="flex items-start gap-2 text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2.5">
                                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />

                                    <span>
                                        {resetPasswordMutation.error?.response?.data?.detail ||
                                            "Unable to reset password. Please try again."}
                                    </span>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={resetPasswordMutation.isPending}
                                className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {resetPasswordMutation.isPending
                                    ? "Resetting password…"
                                    : "Reset Password"}
                            </button>
                        </form>
                    )}

                    {!resetPasswordMutation.isSuccess && (
                        <div className="text-center">
                            <Link
                                to="/login"
                                className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                            >
                                Back to Login
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ResetPassword
