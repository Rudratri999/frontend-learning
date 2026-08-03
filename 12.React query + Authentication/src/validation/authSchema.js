import { z } from "zod";

export const registerSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),

    password: z.string().min(6, "Password must be at least 6 characters"),

    confirmPassword: z.string(),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    }
  );

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, "Username must contain 3 characters"),

  password: z
    .string()
    .min(6, "Password must contain 6 characters")

});





// 🧠 Rule to remember
// ✅ Single field validation → Put it on the field.
// password: z.string().min(6)

// ✅ Compare multiple fields → Put .refine() on the whole object.
// z.object({...}).refine(...)