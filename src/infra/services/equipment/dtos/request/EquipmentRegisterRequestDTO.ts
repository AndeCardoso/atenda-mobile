import { equipmentStatusEnum } from "@pages/signedIn/equipments/constants";

export interface EquipmentRegisterRequestDTO {
  customerId: number;
  nickname?: string;
  brand: string;
  model: string;
  serialNumber?: string;
  description?: string;
  voltage?: string;
  color?: string;
  accessories?: string;
  status: equipmentStatusEnum;
}
