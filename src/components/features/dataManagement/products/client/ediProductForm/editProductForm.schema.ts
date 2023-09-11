import { z } from 'zod';

export const productFormSchema = z.object({
  name: z.string().nonempty('O nome é obrigatário'),
  partNumber: z.string().nonempty('O part number é obrigatário'),
  description: z.string().nonempty('A descrição é obrigatária'),
  price: z.number().nonnegative('O preço deve ser maior que zero'),
  size: z.string().nonempty('O tamanho é obrigatário'),
  color: z.string().nonempty('A cor é obrigatária'),
  quantity: z.number().nonnegative('A quantidade deve ser maior que zero'),
  category: z.string().nonempty('A categoria é obrigatária'),
  brand: z.string().nonempty('A marca é obrigatária'),
});

export type ProductFormSchema = z.infer<typeof productFormSchema>;
