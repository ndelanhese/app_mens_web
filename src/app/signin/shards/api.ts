import { nextApi } from '@axios'

export const signin = async (email: string, password: string) => {
  await nextApi.post('/auth/signin', {
    email,
    password,
  })
}
