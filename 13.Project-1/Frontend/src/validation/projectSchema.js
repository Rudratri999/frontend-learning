import { z } from "zod"

export const createProjectSchema = z.object({
    name: z
        .string()
        .min(3, { message: 'Project name must be at least 3 characters' })
        .max(50, { message: 'Project name must be 50 characters or less' })
        .trim(),

    description: z
        .string()
        .min(10, { message: 'Description must be at least 10 characters' })
        .max(500, { message: 'Description must be 500 characters or less' })
        .trim(),
})