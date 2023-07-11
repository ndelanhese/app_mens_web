import { z } from 'zod'

export const signinSchema = z.object({
  email: z.string().email('E-mail inválido').nonempty('O e-mail é obrigatário'),
  password: z.string().nonempty('A senha é obrigatária'),
})

export type SigninSchema = z.infer<typeof signinSchema>
