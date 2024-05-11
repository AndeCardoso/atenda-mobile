import { IAddressModel } from "@model/entities/address";
import { ICustomerModel } from "@model/entities/customer";
import { IEquipmentModel } from "@model/entities/equipment";
import { ITechnicianModel } from "@model/entities/technician";
import { serviceOrderStatusEnum } from "@pages/signedIn/serviceOrders/constants";

export interface ServiceOrderRegisterResponseDTO {
  id: number;
  selectedVoltage: string;
  reportedDefect: string;
  foundDefect?: string;
  orderedServices: string;
  executedServices?: string;
  observations?: string;
  closed_at?: Date;
  status?: serviceOrderStatusEnum;
  address: IAddressModel;
  equipment: IEquipmentModel;
  customer: ICustomerModel;
  technician: ITechnicianModel;
  created_at: Date;
  updated_at: Date;
}
