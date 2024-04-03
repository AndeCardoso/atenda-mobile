export enum technicianStatusEnum {
  AVAILABLE = 1,
  OCCUPIED = 2,
  ATTENDIND = 3,
  OFF = 4,
  EXONERATED = 5,
}

export const technicianStatusDisplay = {
  [technicianStatusEnum.AVAILABLE]: "Disponível",
  [technicianStatusEnum.OCCUPIED]: "Ocupado",
  [technicianStatusEnum.ATTENDIND]: "Em atendimento",
  [technicianStatusEnum.OFF]: "Folga",
  [technicianStatusEnum.EXONERATED]: "Exonerado",
};

export enum technicianPositionEnum {
  FIELD = 1,
  LAB = 2,
  FIELD_LAB = 3,
}

export const technicianPositionDisplay = {
  [technicianPositionEnum.FIELD]: "Campo",
  [technicianPositionEnum.LAB]: "Laboratório",
  [technicianPositionEnum.FIELD_LAB]: "Laboratório e campo",
};
