import { api } from '@axios'

import { toast } from '@components/ui/shadcn/toast/use-toast'

import { Users } from './page.types'
import { UserTable } from './shards/table'

const iterateResponse = (users?: Users) => {
  if (!users) return []
  return users?.data?.map((user) => ({
    name: user?.employee?.name,
    cpf: user?.employee?.cpf,
    email: user?.email,
    phone: user?.employee?.phone,
  }))
}

const getUsers = async () => {
  try {
    const { data } = await api.get<Users>('/users')
    return data
  } catch (error: Error | any) {
    toast({
      title: 'Erro ao carregar usuários',
      description: error?.response?.data?.message,
      variant: 'destructive',
    })
  }
}

const Users = async () => {
  const users = await getUsers()
  const rows = iterateResponse(users)
  return <UserTable rows={rows} />
}

export default Users
