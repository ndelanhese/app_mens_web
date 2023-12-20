import { z } from 'zod';

export const orderFormSchema = z.object({
  description: z.string(),
});

export type OrderFormSchema = z.infer<typeof orderFormSchema>;
