import { z } from 'zod';

const passwordStrengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

export const editUserFormSchema = z
  .object({
    employee: z.number().min(1, 'O funcionário é obrigatório'),
    email: z.string().email('O e-mail é inválido'),
    user: z.string().min(1, 'O usuário é obrigatório'),
    password: z
      .string()
      .min(1, 'A senha é obrigatória')
      .regex(new RegExp(passwordStrengthRegex), 'A senha deve ser forte'),
    confirm_password: z.string().min(1, 'A senha é obrigatória'),
    status: z.string().min(1, 'O status é obrigatório'),
  })
  .superRefine(({ confirm_password: confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'As senhas devem ser iguais',
      });
    }
  });

export type EditUserFormSchema = z.infer<typeof editUserFormSchema>;
