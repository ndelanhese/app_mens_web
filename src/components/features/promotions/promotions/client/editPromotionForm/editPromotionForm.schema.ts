import { z } from 'zod';

import {
  convertStringToDate,
  currentDate,
  currentDateString,
  getNextDay,
} from '@/utils/helpers/date';

const isValidDate = (value?: string | undefined) => {
  if (!value) return true;

  const inputDate = convertStringToDate(value);
  if (!inputDate) return false;
  return inputDate >= currentDate();
};

export const promotionFormSchema = z
  .object({
    name: z.string().min(1, 'O nome é obrigatário'),
    description: z.string().min(1, 'A descrição é obrigatória'),
    promotion_category_id: z
      .object(
        {
          value: z.string().min(1, 'A categoria é obrigatória'),
          label: z.string().min(1, 'A categoria é obrigatória'),
        },
        {
          invalid_type_error: 'A categoria é obrigatória',
        },
      )
      .transform(({ value }) => value),
    initial_date: z.string().transform(value => value || currentDateString()),
    final_date: z.string().transform(value => value || getNextDay()),
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
      .default({
        value: 'pending',
        label: 'Pendente',
      })
      .transform(({ value }) => value),
    discount_amount: z.coerce
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
        return value ? Number(replacedValue) : null;
      }),
    discount_type: z.object({
      value: z.string().min(1, 'O tipo do desconto é obrigatório'),
      label: z.string().min(1, 'O tipo do desconto é obrigatório'),
    }),
  })
  .superRefine(({ initial_date: initialDate, final_date: finalDate }, ctx) => {
    if (!initialDate && finalDate) {
      ctx.addIssue({
        code: 'custom',
        message: 'Informe também a data inicial',
        path: ['initial_date'],
      });
      return;
    }

    if (!isValidDate(finalDate)) {
      ctx.addIssue({
        code: 'custom',
        message: 'Data final inválida',
        path: ['final_date'],
      });
      return;
    }

    try {
      const initialInputDate = new Date(initialDate);
      const finalInputDate = new Date(finalDate);

      if (initialInputDate.getTime() > finalInputDate.getTime()) {
        ctx.addIssue({
          code: 'custom',
          message: 'A data final deve ser maior que a inicial',
          path: ['final_date'],
        });
      }
    } catch {
      ctx.addIssue({
        code: 'custom',
        message: 'Data final inválida',
        path: ['final_date'],
      });
    }
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

export type PromotionFormSchema = z.infer<typeof promotionFormSchema>;
