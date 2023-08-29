import { cookies } from 'next/headers'
import { cache } from 'react'
import { Metadata } from 'next'

import { api } from '@axios'

import { Categories } from './page.types'
import { CategoriesTable } from '@features-components/promotions/promotionCategories/client/table/table'

const iterateResponse = (categories?: Categories) => {
  if (!categories) return []
  return categories?.data?.map((user) => ({
    name: user?.name,
  }))
}

const getCategories = cache(async () => {
  try {
    const cookiesStore = cookies()
    const token = cookiesStore.get('token')?.value
    const { data } = await api.get<Categories>('/promotions-categories', {
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
  title: 'Categorias de Promoções',
}

const PromotionCategories = async () => {
  const categories = await getCategories()
  const rows = iterateResponse(categories)
  return <CategoriesTable rows={rows} />
}

export default PromotionCategories
