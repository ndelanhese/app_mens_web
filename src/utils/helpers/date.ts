/**
 * This function is used to get the current date.
 */
export const currentDate = () => {
  return new Date();
};

/**
 * This function is used to get the current date as a string.
 */
export const currentDateString = () => {
  return currentDate().toLocaleDateString();
};

export const convertDateToString = (date: Date | string | undefined) => {
  if (!date) return currentDateString();

  return new Date(date).toLocaleDateString();
};
