export const getFirstName = (fullName?: string) => {
  if (fullName) {
    return fullName.split(' ')[0]
  }
  return 'Usuário'
}
