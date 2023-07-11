import { Metadata } from 'next'

import { Button } from '@components/buttons/button'
import { Input } from '@components/inputs/input'

import { User } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Entrar',
}

const SignIn = () => {
  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-7">
      <User className="h-[6rem] w-[6rem] rounded-full border border-black-80 p-4 dark:border-white-40 dark:text-white-40" />
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="dark:text-white text-xl font-sb">Entrar no sistema</h1>
        <p className="text-md dark:text-white-40">
          Entre com seu usuário e senha
        </p>
      </div>
      <form className="flex w-[24.25rem] flex-col gap-7">
        <div className="flex flex-col gap-4">
          <Input />
          <Input />
        </div>
        <Button size="lg" color="primary">
          Acessar
        </Button>
      </form>
    </section>
  )
}
export default SignIn
