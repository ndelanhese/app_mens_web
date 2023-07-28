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
    const { data } = await api.get<Users>('/users')
    return data
  } catch (error) {
    console.log(error)
  }
}

const Users = async () => {
  const users = await getUsers()
  const rows = iterateResponse(users)
  return <UserTable rows={rows} />
}

export default Users
