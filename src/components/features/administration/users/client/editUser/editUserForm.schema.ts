import { z } from 'zod';

export const editUserFormSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatário'),
  cpf: z
    .string()
    .min(1, 'O CPF é obrigatário')
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'O CPF é inválido'),
  email: z.string().email('O e-mail é inválido'),
  user: z.string().min(1, 'O usuário é obrigatário'),
  status: z.string().min(1, 'O status é obrigatário'),
});

export type EditUserFormSchema = z.infer<typeof editUserFormSchema>;
