export type Representative = {
  representative: string
  cpfCnpj: string
  registration: string
  teamCode: string
  branchCode: string
}

export type UserTableProps = {
  columns: Array<string>
  rows: Array<Representative>
}
