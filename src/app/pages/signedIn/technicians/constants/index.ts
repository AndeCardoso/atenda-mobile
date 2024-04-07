import { IOption } from "@components/base/Select";

export enum technicianStatusEnum {
  AVAILABLE = 1,
  OCCUPIED = 2,
  ATTENDING = 3,
  OFF = 4,
  EXONERATED = 5,
}

export const technicianStatusDisplay = {
  [technicianStatusEnum.AVAILABLE]: "Disponível",
  [technicianStatusEnum.ATTENDING]: "Em atendimento",
  [technicianStatusEnum.EXONERATED]: "Exonerado",
  [technicianStatusEnum.OFF]: "Folga",
  [technicianStatusEnum.OCCUPIED]: "Ocupado",
};

export const technicianStatusList: IOption[] = [
  {
    id: 0,
    text: technicianStatusDisplay[technicianStatusEnum.AVAILABLE],
    value: technicianStatusEnum.AVAILABLE,
  },
  {
    id: 1,
    text: technicianStatusDisplay[technicianStatusEnum.ATTENDING],
    value: technicianStatusEnum.ATTENDING,
  },
  {
    id: 2,
    text: technicianStatusDisplay[technicianStatusEnum.EXONERATED],
    value: technicianStatusEnum.EXONERATED,
  },
  {
    id: 3,
    text: technicianStatusDisplay[technicianStatusEnum.OFF],
    value: technicianStatusEnum.OFF,
  },
  {
    id: 4,
    text: technicianStatusDisplay[technicianStatusEnum.OCCUPIED],
    value: technicianStatusEnum.OCCUPIED,
  },
];

export enum technicianPositionEnum {
  FIELD = 1,
  LAB = 2,
  FIELD_LAB = 3,
}

export const technicianPositionDisplay = {
  [technicianPositionEnum.FIELD]: "Campo",
  [technicianPositionEnum.LAB]: "Laboratório",
  [technicianPositionEnum.FIELD_LAB]: "Labor. e campo",
};

export const technicianPositionList: IOption[] = [
  {
    id: 0,
    text: technicianPositionDisplay[technicianPositionEnum.FIELD],
    value: technicianPositionEnum.FIELD,
  },
  {
    id: 1,
    text: technicianPositionDisplay[technicianPositionEnum.LAB],
    value: technicianPositionEnum.LAB,
  },
  {
    id: 2,
    text: technicianPositionDisplay[technicianPositionEnum.FIELD_LAB],
    value: technicianPositionEnum.FIELD_LAB,
  },
];
