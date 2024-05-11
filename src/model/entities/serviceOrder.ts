import { serviceOrderStatusEnum } from "@pages/signedIn/serviceOrders/constants";
import { IAddressModel } from "./address";
import { IEquipmentModel } from "./equipment";
import { ICustomerModel } from "./customer";
import { ITechnicianModel } from "./technician";

export interface IServiceOrderModel {
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
