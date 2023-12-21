import { currentDateString } from '@utils/helpers/date';

import { z } from 'zod';

export const saleFormSchema = z.object({
  customer: z.string().min(1, 'O cliente é obrigatório'),
  description: z.string().min(1, 'A descrição é obrigatória'),
  observation: z.string().min(1, 'A observação é obrigatória'),
  date: z.string().transform(value => value || currentDateString()),
  status: z.string().min(1, 'O status é obrigatório'),
  user: z.string().min(1, 'O funcionário é obrigatório'),
});

export type SaleFormSchema = z.infer<typeof saleFormSchema>;
