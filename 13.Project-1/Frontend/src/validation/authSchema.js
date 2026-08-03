import { z } from "zod"

export const registerSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),

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
