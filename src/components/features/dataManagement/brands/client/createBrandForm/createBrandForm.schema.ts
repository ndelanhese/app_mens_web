import { z } from 'zod';

export const brandFormSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatário'),
});

export type BrandFormSchema = z.infer<typeof brandFormSchema>;
