import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { cache } from 'react'

import { api } from '@axios'

import { Employees } from './page.types'
import { EmployeesTable } from '@features-components/employees/employees/client/table/table'

const iterateResponse = (employees?: Employees) => {
  if (!employees) return []
  return employees?.data?.map((employee) => ({
    name: employee?.name,
    cpf: employee?.cpf,
    phone: employee?.phone,
  }))
}

export const revalidate = 3600

const getEmployees = cache(async () => {
  try {
    const cookiesStore = cookies()
    const token = cookiesStore.get('token')?.value
    const { data } = await api.get<Employees>('/employees', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return data
  } catch (error: Error | any) {
    console.log(error?.response?.data?.message)
  }
})

export const metadata: Metadata = {
  title: 'Funcionários',
}

const Employees = async () => {
  const employees = await getEmployees()
  const rows = iterateResponse(employees)
  return <EmployeesTable rows={rows} />
}

export default Employees
