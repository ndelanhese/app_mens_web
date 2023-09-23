import { z } from 'zod';

export const supplierFormSchema = z.object({
  contact_name: z.string().nonempty('O nome do contato é obrigatário'),
  corporate_name: z.string().nonempty('O nome do fornecedor é obrigatário'),
  cnpj: z.string().nonempty('O CPF é obrigatório'),
  address: z.object({
    address: z.string().nonempty('O endereço é obrigatório'),
    number: z.string().nonempty('O número é obrigatório'),
    district: z.string().nonempty('O bairro é obrigatório'),
    postal_code: z.string().nonempty('O CEP é obrigatório'),
    city: z.string().nonempty('A cidade é obrigatória'),
    state: z.string().nonempty('O estado é obrigatório'),
  }),
});

export type SupplierFormSchema = z.infer<typeof supplierFormSchema>;
