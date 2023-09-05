export const convertStatus = (status: string) => {
  switch (status) {
    case 'active':
      return 'Ativo';
    case 'inactive':
      return 'Inativo';
    default:
      return 'Não informado';
  }
};
