import { z } from 'zod';

export const employeeFormSchema = z.object({
  name: z.string().min(1, { message: 'O nome é obrigatório' }),
  cpf: z.string().min(1, { message: 'O CPF é obrigatório' }),
  rg: z.string().nullable(),
  birth_date: z
    .string()
    .min(1, { message: 'A data de nascimento é obrigatória' }),
  phone: z.string().min(1, { message: 'O telefone é obrigatório' }),
  pis_pasep: z.string().min(1, { message: 'O PIS/PASEP é obrigatório' }),
  admission_date: z
    .string()
    .min(1, { message: 'A data de admissão é obrigatória' }),
  resignation_date: z.string().nullable(),
  address: z.object({
    address: z.string().min(1, { message: 'O endereço é obrigatório' }),
    number: z.string().min(1, { message: 'O número é obrigatório' }),
    district: z.string().min(1, { message: 'O bairro é obrigatório' }),
    postal_code: z.string().min(1, { message: 'O CEP é obrigatório' }),
    city: z.string().min(1, { message: 'A cidade é obrigatória' }),
    state: z.string().min(1, { message: 'O estado é obrigatório' }),
  }),
});

export type EmployeeFormSchema = z.infer<typeof employeeFormSchema>;
