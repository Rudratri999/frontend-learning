import { z } from "zod"

export const registerSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),

    email: z.string().email("Invalid email"),

    password: z.string().min(6, "Password must be at least 6 characters"),

    confirmPassword: z.string(),
}).refine(
    (data) => data.password === data.confirmPassword,
    {
        path: ["confirmPassword"],
        message: "Password does not match"
    }

)

export const loginSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),

    password: z.string().min(6, "Password must be at least 6 characters"),

   
})

export const forgotPasswordSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Enter a valid email")
})

export const resetPasswordSchema = z
    .object({
        new_password: z
            .string()
            .min(8, "Password must be at least 8 characters"),

        confirm_password: z
            .string()
            .min(1, "Please confirm your password")
    })
    .refine(
        (data) => data.new_password === data.confirm_password,
        {
            message: "Passwords do not match",
            path: ["confirm_password"]
        }
    )