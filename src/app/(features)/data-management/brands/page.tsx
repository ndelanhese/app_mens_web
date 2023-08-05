import { cookies } from 'next/headers'

import { api } from '@axios'

import { Brands } from './page.types'
import { BrandsTable } from './shards/table'

const iterateResponse = (brands?: Brands) => {
  if (!brands) return []
  return brands?.data?.map((user) => ({
    name: user?.name,
  }))
}

const getBrands = async () => {
  try {
    const cookiesStore = cookies()
    const token = cookiesStore.get('token')?.value
    const { data } = await api.get<Brands>('/brands', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return data
  } catch (error: Error | any) {
    console.log(error?.response?.data?.message)
  }
}

const Brands = async () => {
  const brands = await getBrands()
  const rows = iterateResponse(brands)
  return <BrandsTable rows={rows} />
}

export default Brands
