import * as z from 'zod';

export const viewDetailCurriculumSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  code: z.string().min(1, 'Code is required'),
  type: z.string().min(1, 'Type is required'),
  order: z.string().min(1, 'Order is required'),
  weight: z.string().min(1, 'Weight is required'),
  status: z.enum(['active', 'inactive']),
  description: z.string().optional(),
});

export type ViewDetailCurriculumSchema = z.infer<typeof viewDetailCurriculumSchema>;