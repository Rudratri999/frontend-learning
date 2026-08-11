
import React from "react"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Wallet, AlertCircle, CheckCircle } from "lucide-react"
import { useForgotPassword } from "../hooks/Authentication/useForgotPassword"
import { forgotPasswordSchema } from "../validation/authSchema"

const inputClasses =
    "w-full text-sm border rounded-lg px-3 py-2.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"

const ForgotPassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(forgotPasswordSchema)
    })

    const forgotPasswordMutation = useForgotPassword()

    const onSubmit = (data) => {
        forgotPasswordMutation.mutate(data)
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
                            Forgot your password?
                        </h1>

                        <p className="text-sm text-slate-500 mt-1">
                            Enter your email address and we'll help you reset your password.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-5"
                    >

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-slate-700 mb-1.5"
                            >
                                Email
                            </label>

                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                {...register("email")}
                                className={`${inputClasses} ${errors.email
                                    ? "border-rose-300"
                                    : "border-slate-200"
                                    } `}
                            />

                            {errors.email && (
                                <p className="text-sm text-rose-600 mt-1.5">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Server error */}
                        {forgotPasswordMutation.isError && (
                            <div className="flex items-start gap-2 text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2.5">
                                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />

                                <span>
                                    {forgotPasswordMutation.error?.response?.data?.detail ||
                                        "Unable to process your request. Please try again."}
                                </span>
                            </div>
                        )}

                        {/* Success */}
                        {forgotPasswordMutation.isSuccess && (
                            <div className="space-y-3">

                                <div className="flex items-start gap-2 text-sm text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2.5">
                                    <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" />

                                    <span>
                                        Password reset link generated successfully.
                                    </span>
                                </div>

                                {/* Development-only reset link */}
                                {forgotPasswordMutation.data?.reset_link && (
                                    <Link
                                        to={`/reset-password?token=${forgotPasswordMutation.data.reset_link.split("token=")[1]}`}
                                        className="block text-sm text-indigo-600 hover:text-indigo-700 break-all"
                                    >
                                        Open reset password page
                                    </Link>
                                )}

                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={forgotPasswordMutation.isPending}
                            className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {forgotPasswordMutation.isPending
                                ? "Generating link…"
                                : "Continue"}
                        </button>
                    </form>

                    <div className="text-center">
                        <Link
                            to="/login"
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                        >
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword

