import { z } from 'zod';

export const addCurriculumSchema = z.object({
  curriculumName: z.string().min(1, 'Curriculum name is required'),
  settingGroup: z.string().min(1, 'Setting group is required'),
  createDate: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(['active', 'inactive'], {
    required_error: 'Status is required',
  }),
});

export type AddCurriculumFormData = z.infer<typeof addCurriculumSchema>;