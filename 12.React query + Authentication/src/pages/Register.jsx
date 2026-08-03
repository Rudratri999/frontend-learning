import React from 'react'
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { useRegister } from '../hooks/useRegister'
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../validation/authSchema";
import { checkUsername } from "../services/authService";

const Register = () => {


    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        getValues,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(registerSchema)
    })

    const validateusername = async()=>{
        const username = getValues(username)
        if(!username) return;

        const result = await checkUsername("username")

        if(!result.available){
            setError("username",{
                type : "manual",
                message : "Username is alredy exist"
            })
        }else{
            clearErrors("username")
        }
    }

    const registerMutation = useRegister()

    const onSubmit = (data) => {
        registerMutation.mutate(data)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text"
                    placeholder='Username'
                    {...register("username")}
                    onBlur={validateusername}
                />
                {errors.username && (
                    <p>{errors.username.message}</p>
                )}

                <input type="password"
                    placeholder='Password'
                    {...register("password")}

                />
                {errors.password && (
                    <p>{errors.password.message}</p>
                )}

                <input type="Password"
                    placeholder='Confirm Password'
                    {...register("confirmPassword")}

                />
                {errors.confirmPassword && (
                    <p>{errors.confirmPassword.message}</p>
                )}

                <button type='submit'
                    disabled={registerMutation.isPending}>

                    {
                        registerMutation.isPending ? "registering..." : "Register"
                    }
                </button>
            </form>

        </div>
    )
}

export default Register
