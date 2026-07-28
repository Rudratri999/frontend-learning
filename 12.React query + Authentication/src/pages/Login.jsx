import React from 'react'
import { useForm } from "react-hook-form"
import { useAuth } from '../context/AuthContext';
import toast from "react-hot-toast";
import { useLogin } from '../hooks/useLogin';
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
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text"
                    placeholder='Username'
                    {...register("username", {
                        required: "Username is required"
                    })}
                />
                {errors.username && (
                    <p>{errors.username.message}</p>
                )}

                <input type="password"
                    placeholder='Password'
                    {...register("password", {
                        required: "Password is required"
                    })}
                />
                {errors.password && (
                    <p>{errors.password.message}</p>
                )}

                <button type='submit'
                    disabled={loginMutation.isPending}>

                    {
                        loginMutation.isPending ? "Logged in..." : "Login"
                    }
                </button>
            </form>

        </div>
    )
}

export default Login
