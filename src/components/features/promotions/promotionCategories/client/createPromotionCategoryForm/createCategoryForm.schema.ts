import { z } from 'zod';

export const categoryFormSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatário'),
});

export type CategoryFormSchema = z.infer<typeof categoryFormSchema>;
