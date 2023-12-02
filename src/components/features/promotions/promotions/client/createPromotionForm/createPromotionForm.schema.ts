import { z } from 'zod';

export const promotionFormSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatário'),
});

export type PromotionFormSchema = z.infer<typeof promotionFormSchema>;
