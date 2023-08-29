export type Promotion = {
  name: string
  description: string
  discount: string
  initialDate: string
  finalDate: string
  status: string
  category: string
  products: string
}

export type PromotionsTableProps = {
  rows: Array<Promotion>
}
