import { IOption } from "@components/base/Select";

export enum serviceOrderStatusEnum {
  OPENED = 1,
  EXECUTING = 2,
  DONE = 3,
  CLOSED = 4,
}

export const serviceOrderStatusDisplay = {
  [serviceOrderStatusEnum.OPENED]: "Aberto",
  [serviceOrderStatusEnum.EXECUTING]: "Em execução",
  [serviceOrderStatusEnum.DONE]: "Pronto",
  [serviceOrderStatusEnum.CLOSED]: "Concluido",
};

export const serviceOrderStatusList: IOption[] = [
  {
    id: 0,
    text: serviceOrderStatusDisplay[serviceOrderStatusEnum.OPENED],
    value: serviceOrderStatusEnum.OPENED,
  },
  {
    id: 1,
    text: serviceOrderStatusDisplay[serviceOrderStatusEnum.EXECUTING],
    value: serviceOrderStatusEnum.EXECUTING,
  },
  {
    id: 2,
    text: serviceOrderStatusDisplay[serviceOrderStatusEnum.DONE],
    value: serviceOrderStatusEnum.DONE,
  },
  {
    id: 3,
    text: serviceOrderStatusDisplay[serviceOrderStatusEnum.CLOSED],
    value: serviceOrderStatusEnum.CLOSED,
  },
];
