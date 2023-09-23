export const convertStatus = (status: string | undefined) => {
  switch (status) {
    case 'active':
      return 'Ativo';
    case 'inactive':
      return 'Inativo';
    default:
      return 'Não informado';
  }
};
