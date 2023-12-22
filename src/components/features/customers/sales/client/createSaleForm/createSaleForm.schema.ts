import { currentDateString } from '@utils/helpers/date';

import { z } from 'zod';

export const saleFormSchema = z
  .object({
    customer: z.string().min(1, 'O cliente é obrigatório'),
    observation: z.string().min(1, 'A observação é obrigatória'),
    date: z.string().transform(value => value || currentDateString()),
    status: z.string().min(1, 'O status é obrigatório'),
    user: z.string().min(1, 'O funcionário é obrigatório'),
    discount_amount: z.string().transform(value => {
      const replacedValue = value
        .replaceAll(',', '.')
        .replaceAll('.', '')
        .replaceAll('%', '')
        .replaceAll('R$ ', '');
      return value ? Number(replacedValue) : undefined;
    }),
    discount_type: z.string(),
    total_amount: z.string(),
    final_amount: z.string(),
  })
  .superRefine(
    ({ discount_amount: discountAmount, discount_type: discountType }, ctx) => {
      if (!!discountAmount && !discountType) {
        ctx.addIssue({
          code: 'custom',
          message: 'Informe também o tipo do desconto',
          path: ['discount_type'],
        });
        return;
      }

      if (!discountAmount && discountType) {
        ctx.addIssue({
          code: 'custom',
          message: 'Informe também o valor do desconto',
          path: ['discount_amount'],
        });
      }
    },
  );

export type SaleFormSchema = z.infer<typeof saleFormSchema>;
