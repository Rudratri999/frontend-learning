import { z } from "zod";

export const createExpenseSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters"),

  description: z
    .string()
    .min(5, "Description must be at least 5 characters"),

  amount: z
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
    .positive("Amount must be greater than 0"),

  expense_date: z
    .string()
    .min(1, "Expense date is required"),
});