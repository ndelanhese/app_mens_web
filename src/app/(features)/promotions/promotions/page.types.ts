export type Promotion = {
  id: number
  name: string
  description: string
  discount_amount: number
  discount_type: string
  initial_date: string
  final_date: string
  status: string
  category: {
    id: number
    name: string
  }
  products: Array<{
    product: {
      id: number
      part_number: string
      name: string
      price: number
      quantity: number
    }
  }>
}

export type Promotions = {
  data: Promotion[]
}
