export const cpfValidation = (cpf?: string) => {
  if (!cpf) {
    return;
  }

  const cpfOnlyNumbers = cpf.replace(/[^\d]/g, "");
  if (cpfOnlyNumbers.length !== 11) {
    return false;
  }

  const allDigitsEquals = /^(\d)\1+$/.test(cpfOnlyNumbers);
  if (allDigitsEquals) {
    return false;
  }

  let verifyFirstDigit = 0;
  for (let i = 0; i < 9; i++) {
    verifyFirstDigit += parseInt(cpfOnlyNumbers.charAt(i)) * (10 - i);
  }

  let remainder = (verifyFirstDigit * 10) % 11;
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }
  if (remainder !== parseInt(cpfOnlyNumbers.charAt(9))) {
    return false;
  }

  let verifySecondDigit = 0;
  for (let i = 0; i < 10; i++) {
    verifySecondDigit += parseInt(cpfOnlyNumbers.charAt(i)) * (11 - i);
  }

  remainder = (verifySecondDigit * 10) % 11;
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }
  if (remainder !== parseInt(cpfOnlyNumbers.charAt(10))) {
    return false;
  }

  return true;
};
