import { z } from "zod";

export const ChangePasswordSchema = z.object({
    id: z.string().optional(),
    oldPassword: z.string().min(1, {
      message: "Cannot be empty",
    }),
    newPassword: z
      .string()
      .min(6, {
        message: "Password has at least 6 characters",
      })
      .refine((value: string) => /[a-z]/.test(value) && /[A-Z]/.test(value), {
        message:
          "Password must contain at least one uppercase letter and one lowercase letter",
      }),
    confirmPassword: z
      .string()
      .min(6, {
        message: "Password has at least 6 characters",
      })
      .refine((value: string) => /[a-z]/.test(value) && /[A-Z]/.test(value), {
        message:
          "Password must contain at least one uppercase letter and one lowercase letter",
      }),
  });