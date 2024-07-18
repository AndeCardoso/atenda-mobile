import { serviceOrderStatusEnum } from "@pages/signedIn/serviceOrders/constants";
import { IAddressModel } from "./address";
import { IEquipmentModel } from "./equipment";
import { ICustomerModel } from "./customer";
import { ITechnicianModel } from "./technician";
import { IServiceForm } from "@pages/signedIn/serviceOrders/schema";

export interface IServiceOrderModel {
  id?: number | string;
  status?: serviceOrderStatusEnum;
  serviceForm: IServiceForm;
  address: IAddressModel;
  equipment: IEquipmentModel;
  customer: ICustomerModel;
  technician: ITechnicianModel;
  totalValue: number;
  opened_at: Date;
  closed_at?: Date;
  created_at?: Date;
  updated_at?: Date;
}
