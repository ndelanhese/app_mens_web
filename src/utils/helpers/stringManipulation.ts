/**
 * This function is used to get the first name of a user.
 */
export const getFirstName = (fullName?: string) => {
  if (fullName) {
    return fullName.split(' ')[0];
  }
  return 'Usuário';
};
/**
 * This function is used to remove special characters from a string.
 */
export const removeSpecialCharacters = (str: string): string => {
  return str.toLowerCase().replace(/[^\w\s]/g, '');
};

/**
 * This function is used to replace spaces with underscores in a string.
 */
const replaceSpacesWithUnderscores = (str: string): string => {
  return str.replace(/\s+/g, '_');
};

/**
 * This function is used to convert a string to a slug.
 */
export const convertStringToSlug = (inputString: string): string => {
  const cleanedString = removeSpecialCharacters(inputString);
  return replaceSpacesWithUnderscores(cleanedString);
};
