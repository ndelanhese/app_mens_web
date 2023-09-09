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

/**
 * This function is used to capitalize the first letter of a string.
 */
export const capitalizeFirstLetter = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

/**
 * This function is used to get the first and last name of a user.
 */
export const getFirstAndLastName = (name: string): string => {
  const names = name.split(' ');

  if (
    names.length === 1 ||
    names[0].length > 11 ||
    names[names.length - 1].length > 11
  ) {
    return capitalizeFirstLetter(names[0]);
  }

  const formattedFirstName = capitalizeFirstLetter(names[0]);
  const formattedLastName = capitalizeFirstLetter(names[names.length - 1]);
  return `${formattedFirstName} ${formattedLastName}`;
};
