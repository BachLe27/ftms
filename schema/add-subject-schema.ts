import { z } from 'zod';

export const addSubjectSchema = z.object({
  subjectName: z.string().min(1, 'Subject name is required'),
  subjectCode: z.string().min(1, 'Subject code is required'),
  document: z.string().min(1, 'Document is required'),
  status: z.enum(['Active', 'Inactive'], {
    required_error: 'Status is required',
  }),
  description: z.string().optional(),
});

export type AddSubjectFormData = z.infer<typeof addSubjectSchema>;