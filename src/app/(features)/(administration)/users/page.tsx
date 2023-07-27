import { UserTable } from './shards/table'

const iterateResponse = () => {
  return [
    {
      representative: 'João da Silva',
      cpfCnpj: '123.456.789-00',
      registration: 'A12345',
      teamCode: 'TEAM-2023',
      branchCode: 'BRANCH-01',
    },
    {
      representative: 'Maria Oliveira',
      cpfCnpj: '987.654.321-00',
      registration: 'B67890',
      teamCode: 'TEAM-2023',
      branchCode: 'BRANCH-02',
    },
    {
      representative: 'Carlos Santos',
      cpfCnpj: '111.222.333-44',
      registration: 'C24680',
      teamCode: 'TEAM-2024',
      branchCode: 'BRANCH-03',
    },
    {
      representative: 'Ana Pereira',
      cpfCnpj: '555.666.777-88',
      registration: 'D13579',
      teamCode: 'TEAM-2024',
      branchCode: 'BRANCH-01',
    },
    {
      representative: 'Pedro Alves',
      cpfCnpj: '999.888.777-66',
      registration: 'E97531',
      teamCode: 'TEAM-2023',
      branchCode: 'BRANCH-02',
    },
    {
      representative: 'Fernanda Costa',
      cpfCnpj: '777.888.999-11',
      registration: 'F75309',
      teamCode: 'TEAM-2025',
      branchCode: 'BRANCH-03',
    },
    {
      representative: 'Laura Martins',
      cpfCnpj: '444.555.666-22',
      registration: 'G24680',
      teamCode: 'TEAM-2025',
      branchCode: 'BRANCH-01',
    },
    {
      representative: 'Ricardo Sousa',
      cpfCnpj: '999.777.888-11',
      registration: 'H13579',
      teamCode: 'TEAM-2024',
      branchCode: 'BRANCH-02',
    },
    {
      representative: 'Isabela Ferreira',
      cpfCnpj: '333.444.555-66',
      registration: 'I97531',
      teamCode: 'TEAM-2023',
      branchCode: 'BRANCH-03',
    },
    {
      representative: 'Gabriel Lima',
      cpfCnpj: '222.111.444-22',
      registration: 'J75309',
      teamCode: 'TEAM-2023',
      branchCode: 'BRANCH-01',
    },
    {
      representative: 'Camila Rodrigues',
      cpfCnpj: '555.777.888-99',
      registration: 'K24680',
      teamCode: 'TEAM-2024',
      branchCode: 'BRANCH-02',
    },
    {
      representative: 'Marcelo Almeida',
      cpfCnpj: '777.666.555-11',
      registration: 'L13579',
      teamCode: 'TEAM-2025',
      branchCode: 'BRANCH-03',
    },
    {
      representative: 'Letícia Souza',
      cpfCnpj: '999.555.888-22',
      registration: 'M97531',
      teamCode: 'TEAM-2023',
      branchCode: 'BRANCH-01',
    },
    {
      representative: 'Pedroso Filho',
      cpfCnpj: '111.777.666-44',
      registration: 'N75309',
      teamCode: 'TEAM-2025',
      branchCode: 'BRANCH-02',
    },
    {
      representative: 'Fátima Carvalho',
      cpfCnpj: '333.555.777-66',
      registration: 'O24680',
      teamCode: 'TEAM-2025',
      branchCode: 'BRANCH-03',
    },
    {
      representative: 'Márcio Oliveira',
      cpfCnpj: '222.777.444-88',
      registration: 'P13579',
      teamCode: 'TEAM-2024',
      branchCode: 'BRANCH-01',
    },
    {
      representative: 'Luciana Silva',
      cpfCnpj: '999.333.888-00',
      registration: 'Q97531',
      teamCode: 'TEAM-2023',
      branchCode: 'BRANCH-02',
    },
    {
      representative: 'Daniel Gomes',
      cpfCnpj: '555.111.777-33',
      registration: 'R75309',
      teamCode: 'TEAM-2023',
      branchCode: 'BRANCH-01',
    },
    {
      representative: 'Patrícia Santos',
      cpfCnpj: '888.111.555-66',
      registration: 'S24680',
      teamCode: 'TEAM-2024',
      branchCode: 'BRANCH-02',
    },
    {
      representative: 'Gustavo Ferreira',
      cpfCnpj: '222.888.777-11',
      registration: 'T13579',
      teamCode: 'TEAM-2025',
      branchCode: 'BRANCH-03',
    },
  ]
}

const Users = () => {
  const rows = iterateResponse()
  return (
    <div className="h-[calc(100vh-5.5rem)] w-screen overflow-x-auto pr-12 sm:w-[calc(100vw-16.5rem)] sm:overflow-y-hidden sm:pr-0">
      <UserTable rows={rows} />
    </div>
  )
}

export default Users
