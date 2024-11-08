import { z } from "zod";

export const ResetPasswordSchema = z.object({
  verificationCode: z
    .string()
    .min(1, { message: "Cannot be empty" }),

  newPassword: z
    .string()
    .min(8, { message: "Password must have at least 8 characters" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/\d/, { message: "Password must contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" }),

  confirmPassword: z
    .string()
    .min(8, { message: "Confirmation password must have at least 8 characters" })
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});