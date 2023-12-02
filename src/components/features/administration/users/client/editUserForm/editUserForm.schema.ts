import { z } from 'zod';

export const editUserFormSchema = z
  .object({
    // employee: z.number().min(1, 'O funcionário é obrigatório'),
    email: z.string().email('O e-mail é inválido'),
    user: z.string().min(1, 'O usuário é obrigatório'),
    current_password: z.string().min(1, 'A senha atual é obrigatória'),
    new_password: z
      .string()
      .min(1, 'A nova senha é obrigatória')
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
    ({ new_password: newPassword, confirm_password: confirmPassword }) =>
      newPassword === confirmPassword,
    {
      message: 'As senhas devem ser idênticas',
      path: ['confirm_password'],
    },
  )
  .refine(
    ({ new_password: newPassword, current_password: currentPassword }) =>
      newPassword !== currentPassword,
    {
      message: 'A nova senha deve ser diferente da atual',
      path: ['new_password'],
    },
  );

export type EditUserFormSchema = z.infer<typeof editUserFormSchema>;
