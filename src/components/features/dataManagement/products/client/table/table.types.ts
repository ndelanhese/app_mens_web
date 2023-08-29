export type Product = {
  name: string
  partNumber: string
  description: string
  price: number
  size: string
  color: string
  quantity: number
  category: string
  brand: string
}

export type ProductsTableProps = {
  rows: Array<Product>
}
