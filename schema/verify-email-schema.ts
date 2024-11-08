import { z } from "zod";

export const VerifyEmailSchema = z.object({
    email: z
    .string()
    .email({
      message: "Vui lòng nhập đúng định dạng email",
    })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
      message: "Email không hợp lệ theo định dạng",
    })
})