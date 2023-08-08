export type Product = {
  id: number
  name: string
  part_number: string
  description: string
  price: number
  size: string
  color: string
  quantity: number
  category: {
    name: string
  }
  brand: {
    name: string
  }
  supplier: {
    name: string
  }
}

export type Products = {
  data: Product[]
}
