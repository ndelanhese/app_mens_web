/**
 * Format money with currency symbol
 */

export const formatMoneyByCurrencySymbol = (
  value: number | undefined,
  currency: string | undefined = 'BRL',
  locale: 'pt-BR' | 'en-US' | undefined = 'pt-BR',
) => {
  if (!value) return '';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
};

/**
 * Random number
 */
export const generateRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
