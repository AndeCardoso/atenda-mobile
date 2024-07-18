export const convertCurrencyToNumber = (currencyString?: string) => {
  if (!currencyString) {
    return 0;
  }
  let numberString = currencyString.replace(/[^0-9,-]+/g, "").trim();

  numberString = numberString.replace(",", ".");

  const number = parseFloat(numberString);

  return isNaN(number) ? null : number;
};

export const convertNumberToCurrency = (number?: number) => {
  if (!number) {
    return "";
  }

  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return formatter.format(number);
};
