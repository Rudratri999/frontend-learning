import React from 'react'
import { useRegister } from '../hooks/Authentication/useRegister'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../validation/authSchema";

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
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 relative overflow-hidden">

            {/* Signature detail: all-open checklist, mirrors Login's motif */}
            <div className="absolute top-10 left-10 hidden sm:flex flex-col gap-2 opacity-30">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-sm border-2 border-slate-300" />
                    <div className="w-24 h-2 rounded-full bg-slate-200" />
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-sm border-2 border-slate-300" />
                    <div className="w-16 h-2 rounded-full bg-slate-200" />
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-sm border-2 border-slate-300" />
                    <div className="w-20 h-2 rounded-full bg-slate-200" />
                </div>
            </div>

            <div className="w-full max-w-sm">

                <div className="mb-8 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600 mb-4">
                        <div className="w-5 h-5 rounded-sm border-2 border-white" />
                    </div>
                    <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
                        Create your account
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Start organizing your projects and tasks
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-5">

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            Username
                        </label>
                        <input
                            type="text"
                            placeholder="Choose a username"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            {...register("username")}
                        />
                        {errors.username && (
                            <p className="text-sm text-red-600 mt-1.5">{errors.username.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Create a password"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            {...register("password")}
                        />
                        {errors.password && (
                            <p className="text-sm text-red-600 mt-1.5">{errors.password.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            Confirm password
                        </label>
                        <input
                            type="password"
                            placeholder="Re-enter your password"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            {...register("confirmPassword")}
                        />
                        {errors.confirmPassword && (
                            <p className="text-sm text-red-600 mt-1.5">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={registerMutation.isPending}
                        className="w-full bg-indigo-600 text-white font-medium py-2.5 rounded-lg hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
                    >
                        {registerMutation.isPending ? "Creating account..." : "Create account"}
                    </button>

                </form>

            </div>
        </div>
    )
}

export default Register