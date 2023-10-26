import { z } from 'zod';

export const productFormSchema = z.object({
  name: z.string().nonempty('O nome é obrigatário'),
  description: z.string().nonempty('A descrição é obrigatária'),
  purchase_price: z.string(),
  price: z.string().nonempty('O preço deve ser maior que zero'),
  size: z.string().nonempty('O tamanho é obrigatário'),
  color: z.string().nonempty('A cor é obrigatária'),
  quantity: z.string().nonempty('A quantidade deve ser maior que zero'),
  category: z.string().nonempty('A categoria é obrigatária'),
  brand: z.string().nonempty('A marca é obrigatária'),
  supplier: z.string().nonempty('O fornecedor é obrigatário'),
});

export type ProductFormSchema = z.infer<typeof productFormSchema>;
