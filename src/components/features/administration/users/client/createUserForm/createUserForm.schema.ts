import path from 'path';

import { z } from 'zod';

export const createUserFormSchema = z
  .object({
    // employee: z.number().min(1, 'O funcionário é obrigatório'),
    email: z.string().email('O e-mail é inválido'),
    user: z.string().min(1, 'O usuário é obrigatório'),
    password: z
      .string()
      .min(1, 'A senha é obrigatória')
      .regex(/.*[A-Z].*/, 'Uma letra maiúscula')
      .regex(/.*[a-z].*/, 'Uma letra minuscula')
      .regex(/.*\d.*/, 'Um número')
      .regex(
        /.*[`~<>?,./!@#$%^&*()\-_+="'|{}[\];:\\].*/,
        'Um caractere especial',
      )
      .min(8, 'Mais de 8 caracteres'),
    confirm_password: z.string().min(1, 'A confirmação de senha é obrigatória'),
    // status: z.string().min(1, 'O status é obrigatório'),
  })
  .refine(
    ({ password, confirm_password: confirmPassword }) =>
      password === confirmPassword,
    {
      message: 'As senhas devem ser idênticas',
      path: ['confirm_password'],
    },
  );

export type CreateUserFormSchema = z.infer<typeof createUserFormSchema>;
