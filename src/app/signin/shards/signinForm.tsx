'use client'

import { useRouter } from 'next/navigation'

import { Spinner } from '@components/icons/spinner'
import { Button } from '@components/ui/buttons/button'
import { Input } from '@components/ui/inputs/input'
import { useToast } from '@components/ui/shadcn/toast/use-toast'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { signin } from './api'
import { SigninSchema, signinSchema } from './signinForm.schema'
import { parseCookies } from 'nookies'

export const SigninForm = () => {
  const router = useRouter()
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninSchema>({
    resolver: zodResolver(signinSchema),
  })

  const redirect = () => {
    const { redirectTo } = parseCookies()
    if (!redirectTo) {
      router.push('/')
    }
    router.push(redirectTo)
  }

  const onSubmit: SubmitHandler<SigninSchema> = async (data) => {
    const { email, password } = data
    try {
      await signin(email.toLowerCase().trim(), password)
      redirect()
    } catch (error: Error | any) {
      const message = error?.response?.data?.message
      if (message) {
        toast({
          title: 'Erro ao acessar',
          description: message,
          variant: 'destructive',
        })
      }
    }
  }

  return (
    <form
      className="flex flex-col gap-7 sm:w-[24.25rem]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-4">
        <Input
          id="email"
          placeholder="e-mail"
          register={register}
          errorMessage={errors?.email?.message}
          transform="lowercase"
        />
        <Input
          id="password"
          placeholder="senha"
          type="password"
          register={register}
          errorMessage={errors?.password?.message}
        />
      </div>
      <Button size="lg" color="primary">
        {isSubmitting ? <Spinner className="dark:text-white" /> : 'Acessar'}
      </Button>
    </form>
  )
}
