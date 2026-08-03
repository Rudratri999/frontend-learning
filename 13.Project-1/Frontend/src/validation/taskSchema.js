import {z} from "zod"

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be 100 characters or less")
    .trim(),
    
  description: z
    .string()
    .max(500, "Description must be 500 characters or less")
    .optional()
    .or(z.literal('')), // Allows an empty string input from HTML forms
    
  priority: z
    .enum(['Low', 'Medium', 'High'], {
      errorMap: () => ({ message: "Priority must be low, medium, or high" })
    })
    .default('medium'),
    
  due_date: z
    .coerce // Automatically converts HTML date strings ("YYYY-MM-DD") to a JS Date object
    .date({
      required_error: "Due date is required",
      invalid_type_error: "That's not a valid date",
    })
});
