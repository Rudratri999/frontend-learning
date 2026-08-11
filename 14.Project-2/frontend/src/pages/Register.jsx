import React from 'react'
import { Link } from 'react-router-dom'
import { useRegister } from '../hooks/Authentication/useRegister'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema } from '../validation/authSchema'
import { Wallet, AlertCircle } from 'lucide-react'

const inputClasses =
    "w-full text-sm border rounded-lg px-3 py-2.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"

const Register = () => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(registerSchema)
    })

    const registerMutation = useRegister()
    const onSubmit = (data) => {
        registerMutation.mutate(data)
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
                            Create your account
                        </h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Start tracking your expenses in a few seconds.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                        {/* Username */}
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-1.5">
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                placeholder="Choose a username"
                                {...register("username")}
                                className={`${inputClasses} ${errors.username ? "border-rose-300" : "border-slate-200"}`}
                            />
                            {errors.username && (
                                <p className="text-sm text-rose-600 mt-1.5">{errors.username.message}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Choose an email"
                                {...register("email")}
                                className={`${inputClasses} ${errors.email ? "border-rose-300" : "border-slate-200"}`}
                            />
                            {errors.email && (
                                <p className="text-sm text-rose-600 mt-1.5">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Create a password"
                                {...register("password")}
                                className={`${inputClasses} ${errors.password ? "border-rose-300" : "border-slate-200"}`}
                            />
                            {errors.password && (
                                <p className="text-sm text-rose-600 mt-1.5">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-1.5">
                                Confirm password
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                placeholder="Re-enter your password"
                                {...register("confirmPassword")}
                                className={`${inputClasses} ${errors.confirmPassword ? "border-rose-300" : "border-slate-200"}`}
                            />
                            {errors.confirmPassword && (
                                <p className="text-sm text-rose-600 mt-1.5">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        {/* Mutation-level error */}
                        {registerMutation.isError && (
                            <div className="flex items-start gap-2 text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2.5">
                                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                                <span>{registerMutation.error?.message || "Couldn't create account. Try again."}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={registerMutation.isPending}
                            className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {registerMutation.isPending ? "Creating account…" : "Create account"}
                        </button>
                    </form>
                </div>

                <p className="text-center text-sm text-slate-500">
                    Already have an account?{" "}
                    <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-700">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Register