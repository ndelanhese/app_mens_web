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
      return value ? Number(replacedValue) : null;
    }),
    discount_type: z
      .string()
      .nullable()
      .default(null)
      .transform(value => {
        return value || null;
      }),
    total_amount: z.string(),
    final_amount: z.string(),
    method_of_payment: z.string().min(1, 'O método de pagamento é obrigatório'),
    installments: z.string().default('1'),
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
  )
  .superRefine(({ method_of_payment: methodOfPayment, installments }, ctx) => {
    console.log(methodOfPayment);
    if (methodOfPayment === '2' && !installments) {
      ctx.addIssue({
        code: 'custom',
        message: 'Informe também as parcelas',
        path: ['installments'],
      });
    }
  });

export type SaleFormSchema = z.infer<typeof saleFormSchema>;
