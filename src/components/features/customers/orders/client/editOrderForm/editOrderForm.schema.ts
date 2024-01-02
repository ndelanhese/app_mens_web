import { currentDateString } from '@utils/helpers/date';

import { z } from 'zod';

export const orderFormSchema = z.object({
  customer: z
    .object(
      {
        value: z.string().min(1, 'O cliente é obrigatório'),
        label: z.string().min(1, 'O cliente é obrigatório'),
      },
      {
        invalid_type_error: 'O cliente é obrigatório',
      },
    )
    .transform(({ value }) => value),
  description: z.string().min(1, 'A descrição é obrigatória'),
  observation: z.string().min(1, 'A observação é obrigatória'),
  date: z.string().transform(value => value || currentDateString()),
  status: z
    .object(
      {
        value: z.string().min(1, 'O status é obrigatório'),
        label: z.string().min(1, 'O status é obrigatório'),
      },
      {
        invalid_type_error: 'O status é obrigatório',
      },
    )
    .transform(({ value }) => value),
  user: z
    .object(
      {
        value: z.string().min(1, 'O funcionário é obrigatório'),
        label: z.string().min(1, 'O funcionário é obrigatório'),
      },
      {
        invalid_type_error: 'O funcionário é obrigatório',
      },
    )
    .transform(({ value }) => value),
});

export type OrderFormSchema = z.infer<typeof orderFormSchema>;
