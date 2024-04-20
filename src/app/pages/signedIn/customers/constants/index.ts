import { IOption } from "@components/base/Select";

export enum customerStatusEnum {
  OK = 1,
  PENDING = 2,
  DEFAULTER = 3,
}

export const customerStatusDisplay = {
  [customerStatusEnum.OK]: "Ok",
  [customerStatusEnum.PENDING]: "Possui pendências",
  [customerStatusEnum.DEFAULTER]: "Inadimplente",
};

export const customerStatusList: IOption[] = [
  {
    id: 0,
    text: customerStatusDisplay[customerStatusEnum.OK],
    value: customerStatusEnum.OK,
  },
  {
    id: 1,
    text: customerStatusDisplay[customerStatusEnum.PENDING],
    value: customerStatusEnum.PENDING,
  },
  {
    id: 2,
    text: customerStatusDisplay[customerStatusEnum.DEFAULTER],
    value: customerStatusEnum.DEFAULTER,
  },
];
