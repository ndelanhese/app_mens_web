import { cookies } from 'next/headers'
import { cache } from 'react'

import { api } from '@axios'

import { Products } from './page.types'
import { ProductsTable } from './shards/table'

const iterateResponse = (products?: Products) => {
  if (!products) return []
  return products?.data?.map((product) => ({
    name: product?.name,
    partNumber: product?.part_number,
    description: product?.description,
    price: product?.price,
    size: product?.size,
    color: product?.color,
    quantity: product?.quantity,
    category: product?.category?.name,
    brand: product?.brand?.name,
  }))
}

const getProducts = cache(async () => {
  try {
    const cookiesStore = cookies()
    const token = cookiesStore.get('token')?.value
    const { data } = await api.get<Products>('/products', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return data
  } catch (error: Error | any) {
    console.log(error?.response?.data?.message)
  }
})

const Products = async () => {
  const categories = await getProducts()
  const rows = iterateResponse(categories)
  return <ProductsTable rows={rows} />
}

export default Products
