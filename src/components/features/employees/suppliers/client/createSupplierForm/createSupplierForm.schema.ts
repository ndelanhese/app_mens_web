import { z } from 'zod';

export const supplierFormSchema = z.object({
  contact_name: z.string().min(1, 'O nome do contato é obrigatário'),
  corporate_name: z.string().min(1, 'O nome do fornecedor é obrigatário'),
  cnpj: z.string().min(1, 'O CPF é obrigatório'),
  address: z.object({
    address: z.string().min(1, 'O endereço é obrigatório'),
    number: z.string().min(1, 'O número é obrigatório'),
    district: z.string().min(1, 'O bairro é obrigatório'),
    postal_code: z.string().min(1, 'O CEP é obrigatório'),
    city: z
      .object(
        {
          value: z.string().min(1, 'A cidade é obrigatória'),
          label: z.string().min(1, 'A cidade é obrigatória'),
        },
        {
          invalid_type_error: 'A cidade é obrigatória',
        },
      )
      .nullable(),
    state: z.object(
      {
        value: z.string().min(1, 'O estado é obrigatório'),
        label: z.string().min(1, 'O estado é obrigatório'),
      },
      {
        invalid_type_error: 'O estado é obrigatório',
      },
    ),
  }),
});

export type SupplierFormSchema = z.infer<typeof supplierFormSchema>;
