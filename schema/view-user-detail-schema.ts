import * as z from 'zod';

export const viewUserDetailSchema = z.object({
  account: z.string().email('Invalid email address'),
  role: z.string().min(1, 'Role is required'),
  fullName: z.string().min(1, 'Full name is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  address: z.string().min(1, 'Address is required'),
  emergencyNumber: z.string().min(1, 'Emergency number is required'),
  generation: z.string().min(1, 'Generation is required'),
  createDate: z.string().min(1, 'Create date is required'),
});

export type ViewUserDetailSchema = z.infer<typeof viewUserDetailSchema>;