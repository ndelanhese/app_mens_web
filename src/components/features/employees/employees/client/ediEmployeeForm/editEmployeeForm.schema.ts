import { z } from 'zod';

export const employeeFormSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  cpf: z.string().min(1, 'O CPF é obrigatório'),
  rg: z.string().nullable(),
  birth_date: z.string().min(1, 'A data de nascimento é obrigatória'),
  phone: z.string().min(1, 'O telefone é obrigatório'),
  pis_pasep: z.string().min(1, 'O PIS/PASEP é obrigatório'),
  admission_date: z.string().min(1, 'A data de admissão é obrigatória'),
  resignation_date: z.string(),
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

export type EmployeeFormSchema = z.infer<typeof employeeFormSchema>;
