import { IOption } from "@components/base/Select";

export enum equipmentStatusEnum {
  IN_LINE = 1,
  ON_BENCH = 2,
  DONE = 3,
  WITHDRAWN = 4,
}

export const equipmentStatusDisplay = {
  [equipmentStatusEnum.IN_LINE]: "Na fila",
  [equipmentStatusEnum.ON_BENCH]: "Na bancada",
  [equipmentStatusEnum.DONE]: "Pronto",
  [equipmentStatusEnum.WITHDRAWN]: "Retirado",
};

export const equipmentStatusList: IOption[] = [
  {
    id: 0,
    text: equipmentStatusDisplay[equipmentStatusEnum.IN_LINE],
    value: equipmentStatusEnum.IN_LINE,
  },
  {
    id: 1,
    text: equipmentStatusDisplay[equipmentStatusEnum.ON_BENCH],
    value: equipmentStatusEnum.ON_BENCH,
  },
  {
    id: 2,
    text: equipmentStatusDisplay[equipmentStatusEnum.DONE],
    value: equipmentStatusEnum.DONE,
  },
  {
    id: 3,
    text: equipmentStatusDisplay[equipmentStatusEnum.WITHDRAWN],
    value: equipmentStatusEnum.WITHDRAWN,
  },
];

export enum equipmentVoltageEnum {
  ONE_HUNDRED_TEN = 1,
  TWO_HUNDRED_TWENTY = 2,
  NOR_APPLICABLE = 3,
}

export const equipmentVoltageDisplay = {
  [equipmentVoltageEnum.ONE_HUNDRED_TEN]: "110v",
  [equipmentVoltageEnum.TWO_HUNDRED_TWENTY]: "220v",
  [equipmentVoltageEnum.NOR_APPLICABLE]: "Não se aplica",
};

export const equipmentVoltageList: IOption[] = [
  {
    id: 0,
    text: equipmentVoltageDisplay[equipmentVoltageEnum.ONE_HUNDRED_TEN],
    value: equipmentVoltageEnum.ONE_HUNDRED_TEN,
  },
  {
    id: 1,
    text: equipmentVoltageDisplay[equipmentVoltageEnum.TWO_HUNDRED_TWENTY],
    value: equipmentVoltageEnum.TWO_HUNDRED_TWENTY,
  },
  {
    id: 3,
    text: equipmentVoltageDisplay[equipmentVoltageEnum.NOR_APPLICABLE],
    value: equipmentVoltageEnum.NOR_APPLICABLE,
  },
];
