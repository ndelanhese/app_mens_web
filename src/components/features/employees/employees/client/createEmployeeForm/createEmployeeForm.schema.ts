import { z } from 'zod';

export const employeeFormSchema = z.object({
  name: z.string().nonempty('O nome é obrigatário'),
  cpf: z.string().nonempty('O CPF é obrigatário'),
  rg: z.string().nullable(),
  birth_date: z.string().nonempty('A data de nascimento é obrigatária'),
  phone: z.string().nonempty('O telefone é obrigatário'),
  pis_pasep: z.string().nonempty('O PIS/PASEP é obrigatário'),
  admission_date: z.string().nonempty('A data de admissão é obrigatária'),
  resignation_date: z.string().nullable(),
  address: z.object({
    address: z.string().nonempty('O endereço é obrigatário'),
    number: z.string().nonempty('O número é obrigatório'),
    district: z.string().nonempty('O bairro é obrigatório'),
    postal_code: z.string().nonempty('O CEP é obrigatório'),
    city: z.string().nonempty('A cidade é obrigatória'),
    state: z.string().nonempty('O estado é obrigatório'),
  }),
});

export type EmployeeFormSchema = z.infer<typeof employeeFormSchema>;
