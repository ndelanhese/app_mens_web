import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { cache } from 'react'

import { api } from '@axios'

import { Suppliers } from './page.types'
import { SuppliersTable } from './shards/table'

const iterateResponse = (suppliers?: Suppliers) => {
  if (!suppliers) return []
  return suppliers?.data?.map((supplier) => ({
    contactName: supplier?.contact_name,
    corporateName: supplier?.corporate_name,
    cnpj: supplier?.cnpj,
  }))
}

export const revalidate = 3600

const getSuppliers = cache(async () => {
  try {
    const cookiesStore = cookies()
    const token = cookiesStore.get('token')?.value
    const { data } = await api.get<Suppliers>('/suppliers', {
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
  title: 'Fornecedores',
}

const Suppliers = async () => {
  const suppliers = await getSuppliers()
  const rows = iterateResponse(suppliers)
  return <SuppliersTable rows={rows} />
}

export default Suppliers
