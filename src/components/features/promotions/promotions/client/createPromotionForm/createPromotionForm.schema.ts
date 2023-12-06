import { z } from 'zod';

const isValidDate = (value?: string | undefined) => {
  if (!value) return true;

  const currentDate = new Date();
  try {
    const inputDate = new Date(value);
    return inputDate > currentDate;
  } catch {
    return false;
  }
};

export const promotionFormSchema = z
  .object({
    name: z.string().min(1, 'O nome é obrigatário'),
    description: z.string().min(1, 'A descrição é obrigatória'),
    category: z.string().min(1, 'A categoria é obrigatória'),
    initial_date: z.string().refine(isValidDate, {
      message: 'Data inicial inválida',
    }),
    final_date: z.string(),
    status: z.string(),
    discount_amount: z
      .string()
      .transform(value => (value ? Number(value) : undefined)),
    discount_type: z.string(),
  })
  .superRefine(({ initial_date: initialDate, final_date: finalDate }, ctx) => {
    if (!finalDate) {
      return;
    }

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

    const initialInputDate = new Date(initialDate);
    try {
      const finalInputDate = new Date(finalDate);

      if (initialInputDate.getTime() > finalInputDate.getTime()) {
        ctx.addIssue({
          code: 'custom',
          message: 'A data final deve ser maior que a inicial',
          path: ['final_date'],
        });
      }
    } catch (error) {
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
