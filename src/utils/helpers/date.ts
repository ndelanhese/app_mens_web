/**
 * This function is used to get the current date.
 */
export const currentDate = () => {
  return new Date();
};

/**
 * Returns the current date in the format "dd/MM/yyyy".
 */
export const currentDateString = () => {
  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };
  return new Intl.DateTimeFormat('pt-BR', options).format(currentDate);
};

/**
 * Converts a date to a string in the format "dd/MM/yyyy".
 * @param date - The date to be converted (can be a Date object, a string in the "dd/MM/yyyy" format, or undefined for the current date).
 */
export const convertDateToString = (date?: Date | string) => {
  if (!date) return currentDateString();

  const parsedDate = typeof date === 'string' ? new Date(date) : date;
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };
  return new Intl.DateTimeFormat('pt-BR', options).format(parsedDate);
};

/**
 * Returns the date for the next day from the given date.
 * @param date - The reference date (can be a Date object, a string in the "dd/MM/yyyy" format, or undefined for the current date).
 * @returns The date for the next day in the format "dd/MM/yyyy".
 */
export const getNextDay = (date?: Date | string): string => {
  const currentDate = date
    ? typeof date === 'string'
      ? new Date(date)
      : date
    : new Date();
  const nextDay = new Date(currentDate);
  nextDay.setDate(currentDate.getDate() + 1);

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };
  return new Intl.DateTimeFormat('pt-BR', options).format(nextDay);
};

/**
 * Converts a date string in the "dd/MM/yyyy" format to a Date object.
 * @param dateString - The date string to be converted.
 * @returns The Date object representing the parsed date, or null if the input is invalid.
 */
export const convertStringToDate = (dateString: string): Date | null => {
  const [day, month, year] = dateString.split('/').map(Number);

  // Check if the components are valid
  if (Number.isNaN(day) || Number.isNaN(month) || Number.isNaN(year)) {
    return null;
  }

  // Month is zero-based in Date objects, so subtract 1
  const parsedDate = new Date(year, month - 1, day, 23, 59, 59);

  // Check if the Date object is valid
  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return parsedDate;
};

export const convertDateFormat = (inputDate: string): string => {
  const [day, month, year] = inputDate.split('/');

  const convertedDate = new Date(
    Date.UTC(Number(year), Number(month) - 1, Number(day), 23, 59),
  );

  const convertedDay = convertedDate.getUTCDate().toString().padStart(2, '0');
  const convertedMonth = (convertedDate.getUTCMonth() + 1)
    .toString()
    .padStart(2, '0');
  const convertedYear = convertedDate.getUTCFullYear();

  return `${convertedYear}-${convertedMonth}-${convertedDay}`;
};

export const revertDateFormat = (isoDate: string): string => {
  const [day, month, year] = isoDate.split('/');

  const revertedDate = new Date(
    Date.UTC(Number(year), Number(month) - 1, Number(day), 23, 59),
  );
  const revertedDay = revertedDate.getUTCDate().toString().padStart(2, '0');
  const revertedMonth = (revertedDate.getUTCMonth() + 1)
    .toString()
    .padStart(2, '0');
  const revertedYear = revertedDate.getUTCFullYear();

  return `${revertedYear}-${revertedMonth}-${revertedDay}`;
};
