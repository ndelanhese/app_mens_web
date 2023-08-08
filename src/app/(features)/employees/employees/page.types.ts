export type Employee = {
  id: number
  name: string
  cpf: string
  rg: string
  birth_date: string
  phone: string
  pis_pasep: string
  admission_date: string
  resignation_date: string | null
  status: string
  createdAt: string
  updatedAt: string
}

export type Employees = {
  data: Employee[]
}
