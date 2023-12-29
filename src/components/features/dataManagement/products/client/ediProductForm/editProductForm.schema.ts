import { convertMoneyStringToNumber } from '@utils/helpers';

import { z } from 'zod';

export const productFormSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatário'),
  description: z.string().min(1, 'A descrição é obrigatária'),
  purchase_price: z.string(),
  price: z
    .string()
    .min(1, 'O preço deve ser maior que zero')
    .transform(value => (value ? convertMoneyStringToNumber(value) : value)),
  size: z.string(),
  color: z.string(),
  quantity: z.string().min(1, 'A quantidade deve ser maior que zero'),
  category: z
    .object(
      {
        value: z.string().min(1, 'A categoria é obrigatária'),
        label: z.string().min(1, 'A categoria é obrigatária'),
      },
      {
        invalid_type_error: 'A categoria é obrigatária',
      },
    )
    .transform(({ value }) => value),
  brand: z
    .object(
      {
        value: z.string().min(1, 'A marca é obrigatária'),
        label: z.string().min(1, 'A marca é obrigatária'),
      },
      {
        invalid_type_error: 'A marca é obrigatária',
      },
    )
    .transform(({ value }) => value),
  supplier: z
    .object(
      {
        value: z.string().min(1, 'O fornecedor é obrigatário'),
        label: z.string().min(1, 'O fornecedor é obrigatário'),
      },
      {
        invalid_type_error: 'O fornecedor é obrigatário',
      },
    )
    .transform(({ value }) => value),
});

export type ProductFormSchema = z.infer<typeof productFormSchema>;
