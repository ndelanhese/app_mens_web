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
 *
 * @param moneyString an money string Ex. R$ 1.999,99
 * @returns the number from string 1999.99
 */

export const convertMoneyStringToNumber = (moneyString: string) => {
  const cleanedMoneyString = moneyString.replace(/[^\d,.-]/g, '');

  const dotFormattedString = cleanedMoneyString.replace(',', '.');

  return Number.parseFloat(dotFormattedString);
};

/**
 * Random number
 */
export const generateRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 *
 * @param amount amount to calculate installments
 * @param installments installments
 * @returns an array contains the installments amount
 */
export const calculateInstallments = (
  amount: number,
  installments: number,
): { installment: number; amount: string }[] | [] => {
  if (installments <= 0) {
    return [];
  }

  const result: { installment: number; amount: string }[] = Array.from(
    { length: installments },
    (_, index) => ({
      installment: index + 1,
      amount: formatMoneyByCurrencySymbol(+(amount / (index + 1)).toFixed(2)),
    }),
  );

  return result;
};

/**
 *
 * @param amount amount to calculate installment
 * @param installment installment
 * @returns the installments amount
 */
export const calculateInstallment = (
  amount: number | undefined,
  installment: number | undefined,
): { installment: number; amount: string } | undefined => {
  if (!installment || !amount || installment <= 0) {
    return undefined;
  }

  const result: { installment: number; amount: string } = {
    installment,
    amount: formatMoneyByCurrencySymbol(+(amount / installment).toFixed(2)),
  };

  return result;
};
