'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Spinner } from '@components/icons/spinner'
import { Input } from '@components/ui/inputs/input'
import { Button } from '@components/ui/buttons/button'

import { SigninSchema, signinSchema } from './signinForm.schema'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { signin } from './api'
import { parseCookies } from 'nookies'

export const SigninForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninSchema>({
    resolver: zodResolver(signinSchema),
  })

  const getRedirectTo = () => {
    const { redirectTo } = parseCookies()
    if (redirectTo) {
      return redirectTo
    }
    return '/'
  }

  const onSubmit: SubmitHandler<SigninSchema> = async (data) => {
    const { email, password } = data
    setIsLoading(true)
    try {
      await signin(email, password)
      router.push(getRedirectTo())
    } catch (error: Error | any) {
      toast.error(error?.response?.data?.message)
    } finally {
      setIsLoading(false)
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
        {isLoading ? <Spinner className="dark:text-white" /> : 'Acessar'}
      </Button>
    </form>
  )
}
