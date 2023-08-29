export type Employee = {
  name: string
  cpf: string
  phone: string
}

export type EmployeesTableProps = {
  rows: Array<Employee>
}
