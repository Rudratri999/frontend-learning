import React from 'react'
import { Link } from 'react-router-dom'
import { useLogin } from '../hooks/Authentication/useLogin'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from '../validation/authSchema'
import { Wallet, AlertCircle } from 'lucide-react'

const inputClasses =
    "w-full text-sm border rounded-lg px-3 py-2.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"

const Login = () => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(loginSchema)
    })

    const loginMutation = useLogin()
    const onSubmit = (data) => {
        loginMutation.mutate(data)
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
                            Log in to your account
                        </h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Welcome back — enter your details to continue.
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
                                placeholder="Username"
                                {...register("username")}
                                className={`${inputClasses} ${errors.username ? "border-rose-300" : "border-slate-200"}`}
                            />
                            {errors.username && (
                                <p className="text-sm text-rose-600 mt-1.5">{errors.username.message}</p>
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
                                placeholder="Password"
                                {...register("password")}
                                className={`${inputClasses} ${errors.password ? "border-rose-300" : "border-slate-200"}`}
                            />
                            {errors.password && (
                                <p className="text-sm text-rose-600 mt-1.5">{errors.password.message}</p>
                            )}
                        </div>

                        <div className="flex justify-end">
                            <Link
                                to="/forgot-password"
                                className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* Mutation-level error */}
                        {loginMutation.isError && (
                            <div className="flex items-start gap-2 text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2.5">
                                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                                <span>{loginMutation.error?.message || "Invalid credentials. Try again."}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loginMutation.isPending}
                            className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {loginMutation.isPending ? "Logging in…" : "Login"}
                        </button>
                    </form>
                </div>

                <p className="text-center text-sm text-slate-500">
                    Don't have an account?{" "}
                    <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-700">
                        Create one
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login