import { currentDateString } from '@utils/helpers/date';

import { z } from 'zod';

export const orderFormSchema = z.object({
  customer: z.string().min(1, 'O cliente é obrigatório'),
  description: z.string(),
  observation: z.string(),
  date: z.string().transform(value => value || currentDateString()),
  status: z.string(),
});

export type OrderFormSchema = z.infer<typeof orderFormSchema>;
