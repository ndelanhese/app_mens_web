import { Table } from './shards/table'

const iterateResponse = () => {
  return [
    {
      representative: 'user?.representative',
      cpfCnpj: 'user?.cpfCnpj',
      registration: 'user?.registration',
      teamCode: 'user?.teamCode',
      branchCode: 'user?.branchCode',
    },
  ]
}

const Users = () => {
  const rows = iterateResponse()
  const columns = ['Representante', 'CPF/CNPJ', 'Registro', 'Equipe', 'Filial']
  return (
    <div className="w-full overflow-x-auto">
      <Table columns={columns} rows={rows} />
    </div>
  )
}

export default Users
