export const cnpjValidation = (cnpj?: string) => {
  if (!cnpj) {
    return;
  }

  const cnpjOnlyNumber = cnpj.replace(/\D/g, "");
  if (cnpjOnlyNumber.length !== 14) {
    return false;
  }

  const calcDv = (cnpj: string, pos: number) => {
    let sum = 0;
    let factor = pos === 1 ? 5 : pos;
    for (let i = 0; i < 12 + pos; i++) {
      sum += parseInt(cnpj[i]) * factor--;
      if (factor === 1) factor = 9;
    }
    const dv = 11 - (sum % 11);
    return dv > 9 ? 0 : dv;
  };

  const dv1 = calcDv(cnpjOnlyNumber, 1);
  const dv2 = calcDv(cnpjOnlyNumber, 2);

  if (parseInt(cnpj[12]) === dv1 && parseInt(cnpj[13]) === dv2) {
    return true;
  } else {
    return false;
  }
};
