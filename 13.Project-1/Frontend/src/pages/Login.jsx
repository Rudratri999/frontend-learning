import React from 'react'
import { useForm } from "react-hook-form"
import { useAuth } from '../context/AuthContext';
import toast from "react-hot-toast";
import {useLogin} from "../hooks/Authentication/useLogin"
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../validation/authSchema';



const Login = () => {

    const {
        register,
        handleSubmit,
        formState: { errors}
    } = useForm({
        resolver : zodResolver(loginSchema)
    })


const loginMutation = useLogin()

    const onSubmit = (data) => {
        loginMutation.mutate(data)
    }



return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 relative overflow-hidden">

        {/* Signature detail: quiet checklist motif, top-left */}
        <div className="absolute top-10 left-10 hidden sm:flex flex-col gap-2 opacity-30">
            <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-sm bg-indigo-600" />
                <div className="w-24 h-2 rounded-full bg-slate-300" />
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
                    Welcome back
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                    Sign in to get back to your tasks
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-5">

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Username
                    </label>
                    <input
                        type="text"
                        placeholder="Enter your username"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        {...register("username", {
                            required: "Username is required"
                        })}
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
                        placeholder="Enter your password"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        {...register("password", {
                            required: "Password is required"
                        })}
                    />
                    {errors.password && (
                        <p className="text-sm text-red-600 mt-1.5">{errors.password.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loginMutation.isPending}
                    className="w-full bg-indigo-600 text-white font-medium py-2.5 rounded-lg hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
                >
                    {loginMutation.isPending ? "Loging..." : "Log in"}
                </button>

            </form>

        </div>
    </div>
)
}

export default Login
