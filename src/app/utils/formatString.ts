export const rgxCellphone = /^(\d{2})\s?(\d{4,5})(\d{4})$/;
export const rgxCpf = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
export const rgxCep = /^(\d{5})(\d{3})$/;

export const formatCellphoneNumber = (value?: string) => {
  if (!value) return "";

  if (rgxCellphone.test(value)) {
    return value.replace(rgxCellphone, "($1) $2-$3");
  }
  return value;
};

export const formatCpf = (value?: string) => {
  if (!value) return "";

  if (rgxCpf.test(value)) {
    return value.replace(rgxCpf, "$1.$2.$3-$4");
  } else {
    return value;
  }
};

export const formatCep = (value?: string) => {
  if (!value) return "";

  if (rgxCep.test(value)) {
    return value.replace(rgxCep, "$1-$2");
  } else {
    return value;
  }
};

export const unmask = (value?: string) => {
  if (!value) return "";

  return value.replace(/[^\d]/g, "");
};

export const removeAccentMarks = (value?: string) => {
  if (!value) {
    return "";
  }

  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};
