/**
 * Recebe um valor e retorna valor formatado
 *
 * @param string value - Valor a ser formatado
 * @param string Mascara - Marcara para formatar "000.000.000-00"
 * @return string - Valor formatado
 *
 */
export function setMask(value: string, Mask: string): string {
  let valueToMask = value;

  if (!valueToMask || valueToMask.length === 0) return '';

  const cleanMask = String(Mask).replace(/\D/g, '');
  const cleanValue = String(value).replace(/\D/g, '');

  if (cleanValue.length > cleanMask.length)
    return value.substring(0, Mask.length);

  const er = /[^0-9/ (),.-]/;

  er.lastIndex = 0;

  if (er.test(valueToMask)) {
    valueToMask = valueToMask.substring(0, valueToMask.length - 1);
  }

  let isMask;

  let exp = /\-|\.|\/|\(|\)| /g; //eslint-disable-line

  const fieldNumber = valueToMask.toString().replace(exp, '');
  let newValue = '';
  let positionField = 0;
  let sizeMask = fieldNumber.length;
  for (let i = 0; i <= sizeMask; i += 1) {
    isMask =
      Mask.charAt(i) === '-' ||
      Mask.charAt(i) === '.' ||
      Mask.charAt(i) === '/';
    isMask =
      isMask ||
      Mask.charAt(i) === '(' ||
      Mask.charAt(i) === ')' ||
      Mask.charAt(i) === ' ';

    if (isMask) {
      newValue += Mask.charAt(i);
      sizeMask += 1;
    } else {
      newValue += fieldNumber.charAt(positionField);
      positionField += 1;
    }
  }

  let characters = Mask.split(/[0-9]/).filter(item => item.length > 0 && item);

  characters = characters.map(item => item.trim());

  if (characters.includes(newValue.trim().substr(newValue.trim().length - 1))) {
    return valueToMask;
  }

  return newValue;
}

/**
 * Receives Cell value and returns formatted "+00 (00) 0000-0000" | "+00 (00) 00000-0000"
 *
 * @param string value - Value to format
 * @return string - Formatted value
 *
 */
export function cellAreaCode(value: string | undefined | null): string {
  if (!value) return '';

  const characters = value.replace(/\d+-/g, '');
  if (!characters || characters.length === 0) return value;
  const filteredValue = value.replace('+', '');
  if (characters.length > 12)
    return `+${setMask(filteredValue, '00 (00) 00000-0000')}`;
  return `+${setMask(filteredValue, '00 (00) 0000-0000')}`;
}

/**
 * Receives Cell value and returns formatted "(00) 0000-0000" | "(00) 00000-0000"
 *
 * @param string value - Value to format
 * @return string - Formatted value
 *
 */
export function cell(value: string): string {
  const characters = value.replace(/\D/g, '');
  if (characters.length > 10) return setMask(value, '(00) 00000-0000');
  return setMask(value, '(00) 0000-0000');
}

/**
 * Receives CEP value and returns formatted "00000-000"
 *
 * @param string value - Value to format
 * @return string - Formatted value
 *
 */
export function cep(value: string): string {
  return setMask(value, '00000-000');
}

/**
 * Receives CNPJ value and returns formatted "00.000.000/0000-00"
 *
 * @param string value - Value to format
 * @return string - Formatted value
 *
 */
export function cnpj(value: string): string {
  return setMask(value, '00.000.000/0000-00');
}

/**
 * Receives CPF value and returns formatted "000.000.000-00"
 *
 * @param string value - Value to format
 * @return string - Formatted value
 *
 */
export function cpf(value: string | undefined): string {
  if (!value) return '';

  return setMask(value, '000.000.000-00');
}

/**
 * Receives value from CPF and CNPJ and returns formatted "000.000.000-00" / "00.000.000/0000-00"
 *
 * @param string value - Value to format
 * @return string - Formatted value
 *
 */
export function cpfCnpj(value: string | undefined): string {
  if (!value) return '';
  const characters = value.replace(/\D/g, '');
  if (characters.length > 11) return cnpj(value);
  return cpf(value);
}

/**
 * Receives Date value and returns formatted "00/00/0000"
 *
 * @param string value - Value to format
 * @return string - Formatted value
 *
 */
export function date(value: string): string {
  return setMask(value, '00/00/0000');
}

/**
 * Receives money value and return formatted 00.00
 *
 * @param {string | number | undefined} value - Value to format
 * @param {boolean} currency - R$ 00,00
 * @return {string} - Formatted value
 *
 */
export function money(
  value: string | number | undefined,
  currency = true,
): string {
  if (!value) return '';

  const valueMoney = String(value).replace(/\D/g, '');
  const valueNumeric = Number(valueMoney) / 100;

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const formattedValue = formatter.format(valueNumeric);

  return currency ? formattedValue : formattedValue.substring(3);
}

/**
 * Receives a value and sets up a mask for only numbers with 24 chars max
 *
 * @param string value - Value to format
 * @return string - Formatted value
 *
 */

export function onlyNumbers(value: string) {
  return setMask(value, '0000000000000000000000000');
}

/**
 * Receives a percentage value and returns a formatted string
 *
 * @param {string} value - Percentage value to format
 * @return {string} - Formatted percentage value
 *
 */
export function percentage(value: string): string {
  if (!value) return '';

  let valuePercentage = value;

  valuePercentage = valuePercentage.replace(/\D/g, '');
  valuePercentage = valuePercentage.substring(0, 3);
  valuePercentage = Number(valuePercentage).toFixed(0);
  valuePercentage = valuePercentage.replace(/(\d{1})/, '$1');
  console.log(valuePercentage);
  if (valuePercentage === '0') return '';

  return valuePercentage;
}

/**
 * Receives Phone value and returns formatted "+00 (00) 0000-0000" | "+00 0000-0000"
 *
 * @param string value - Value to format
 * @param boolean ddd - Add ddd in formatting
 * @return string - Formatted value
 *
 */
export function phoneAreaCode(
  value: string | undefined | null,
  ddd = true,
): string {
  if (!value) return '';
  const characters = value.replace(/\D/g, '');
  if (!characters || characters.length === 0) return value;
  const filteredValue = value.replace('+', '');
  if (!ddd) return `+${setMask(filteredValue, '00 00000-0000')}`;
  return `+${setMask(filteredValue, '00 (00) 00000-0000')}`;
}

/**
 * Receives Phone value and returns formatted "+00 (00) 0000-0000" | "+00 0000-0000"
 *
 * @param string value - Value to format
 * @param boolean ddd - Add ddd in formatting
 * @return string - Formatted value
 *
 */

/**
 * Receives Phone value and returns formatted "(00) 0000-0000" | "0000-0000"
 *
 * @param string value - Value to format
 * @param boolean ddd - Add ddd in formatting
 * @return string - Formatted value
 *
 */
export function phone(value: string, ddd = true): string {
  if (!ddd) return setMask(value, '0000-0000');
  return setMask(value, '(00) 0000-0000');
}

export const mask = {
  cpf,
  cnpj,
  cpfCnpj,
  cell,
  cellAreaCode,
  cep,
  date,
  phone,
  phoneAreaCode,
  money,
  percentage,
  onlyNumbers,
};
