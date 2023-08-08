import { cookies } from 'next/headers'
import { cache } from 'react'

import { api } from '@axios'

import { Categories } from './page.types'
import { CategoriesTable } from './shards/table'

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
    const { data } = await api.get<Categories>('/categories', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return data
  } catch (error: Error | any) {
    console.log(error?.response?.data?.message)
  }
})

const Categories = async () => {
  const categories = await getCategories()
  const rows = iterateResponse(categories)
  return <CategoriesTable rows={rows} />
}

export default Categories
