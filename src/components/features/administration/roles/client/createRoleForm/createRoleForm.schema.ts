import { z } from 'zod';

export const createRoleFormSchema = z.object({
  description: z
    .string()
    .min(1, 'A descrição do perfil de acesso é obrigatório'),
});

export type CreateRoleFormSchema = z.infer<typeof createRoleFormSchema>;
