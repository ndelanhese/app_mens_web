import { currentDateString } from '@utils/helpers/date';

import { z } from 'zod';

export const saleFormSchema = z
  .object({
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
    observation: z.string().nullable(),
    date: z.string().transform(value => value || currentDateString()),
    status: z.string().min(1, 'O status é obrigatório'),
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
    discount_amount: z
      .string()
      .nullable()
      .default(null)
      .transform(value => {
        const replacedValue = value
          ?.replaceAll('.', '')
          ?.replaceAll(',', '.')
          ?.replaceAll('%', '')
          ?.replaceAll('R$', '')
          ?.replaceAll(' ', '');
        console.log(replacedValue);
        return value ? Number(replacedValue) : null;
      }),
    discount_type: z
      .object({
        value: z.string().min(1, 'O tipo do desconto é obrigatório'),
        label: z.string().min(1, 'O tipo do desconto é obrigatório'),
      })
      .nullable()
      .default(null),
    total_amount: z.string(),
    final_amount: z.string(),
    method_of_payment: z.object(
      {
        value: z.string().min(1, 'O método de pagamento é obrigatório'),
        label: z.string().min(1, 'O método de pagamento é obrigatório'),
      },
      {
        invalid_type_error: 'O método de pagamento é obrigatório',
      },
    ),
    installments: z
      .object(
        {
          value: z.string().min(1, 'A quantidade de parcelas é obrigatória'),
          label: z.string().min(1, 'A quantidade de parcelas é obrigatória'),
        },
        {
          invalid_type_error: 'A quantidade de parcelas é obrigatória',
        },
      )
      .nullable(),
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
    if (methodOfPayment.value === '2' && !installments) {
      ctx.addIssue({
        code: 'custom',
        message: 'Informe também as parcelas',
        path: ['installments'],
      });
    }
  });

export type SaleFormSchema = z.infer<typeof saleFormSchema>;
