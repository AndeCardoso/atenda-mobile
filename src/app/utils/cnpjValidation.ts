export const cnpjValidation = (cnpj?: string) => {
  if (!cnpj) {
    return;
  }

  const cnpjOnlyNumber = cnpj.replace(/\D/g, "");
  if (cnpjOnlyNumber.length !== 14) {
    return false;
  }

  const calcDv = (cnpj: string, length: number) => {
    let sum = 0;
    let factor = length - 7;

    for (let i = 0; i < length; i++) {
      sum += parseInt(cnpj[i]) * factor--;
      if (factor < 2) {
        factor = 9;
      }
    }

    const dv = 11 - (sum % 11);
    return dv > 9 ? 0 : dv;
  };

  const dv1 = calcDv(cnpjOnlyNumber, 12);
  const dv2 = calcDv(cnpjOnlyNumber, 13);

  if (
    parseInt(cnpjOnlyNumber[12]) === dv1 &&
    parseInt(cnpjOnlyNumber[13]) === dv2
  ) {
    return true;
  } else {
    return false;
  }
};
