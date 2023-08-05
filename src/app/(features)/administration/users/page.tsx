import { cookies } from 'next/headers'

import { api } from '@axios'

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
    const cookiesStore = cookies()
    const token = cookiesStore.get('token')?.value
    const { data } = await api.get<Users>('/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return data
  } catch (error: Error | any) {
    console.log(error?.response?.data?.message)
  }
}

const Users = async () => {
  const users = await getUsers()
  const rows = iterateResponse(users)
  return <UserTable rows={rows} />
}

export default Users
