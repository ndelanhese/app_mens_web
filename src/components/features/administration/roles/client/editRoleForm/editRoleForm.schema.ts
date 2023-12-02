import { z } from 'zod';

export const editRoleFormSchema = z.object({
  description: z
    .string()
    .min(1, 'A descrição do perfil de acesso é obrigatório'),
});

export type EditRoleFormSchema = z.infer<typeof editRoleFormSchema>;
