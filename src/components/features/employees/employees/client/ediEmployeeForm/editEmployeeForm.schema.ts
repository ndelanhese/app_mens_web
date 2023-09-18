import { z } from 'zod';

export const employeeFormSchema = z.object({
  name: z.string().nonempty('O nome é obrigatário'),
  cpf: z.string().nonempty('O CPF é obrigatário'),
  phone: z.string().nonempty('O telefone é obrigatário'),
});

export type EmployeeFormSchema = z.infer<typeof employeeFormSchema>;
