import { serviceOrderStatusEnum } from "@pages/signedIn/serviceOrders/constants";
import { AddressRequestDTO } from "@services/location/dtos/request/AddressRequestDTO";

export interface ServiceOrderRegisterRequestDTO
  extends Partial<AddressRequestDTO> {
  selectedVoltage: string;
  reportedDefect: string;
  foundDefect?: string;
  orderedServices: string;
  executedServices?: string;
  observations?: string;
  openedAt: Date;
  closedAt?: Date;
  valueTotal?: number;
  status?: serviceOrderStatusEnum;
  addressId?: number;
  equipmentId: number;
  customerId: number;
  technicianId: number;
}
