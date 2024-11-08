import * as z from 'zod';

export const viewProfileSchema = z.object({
  fullName: z.string().min(1, 'Họ và tên là bắt buộc'),
  dateOfBirth: z.string().min(1, 'Ngày tháng năm sinh là bắt buộc'),
  phoneNumber: z.string().min(1, 'Số điện thoại là bắt buộc'),
  address: z.string().min(1, 'Địa chỉ là bắt buộc'),
  email: z.string().email('Email không hợp lệ').min(1, 'Email là bắt buộc'),
});

export type ViewProfileSchema = z.infer<typeof viewProfileSchema>;