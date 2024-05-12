import { serviceOrderStatusEnum } from "@pages/signedIn/serviceOrders/constants";
import { IAddressModel } from "./address";
import { IEquipmentModel } from "./equipment";
import { ICustomerModel } from "./customer";
import { ITechnicianModel } from "./technician";
import { IServiceForm } from "@pages/signedIn/serviceOrders/register/serviceForm/schema";

export interface IServiceOrderModel {
  id?: number | string;
  serviceForm: IServiceForm;
  address: IAddressModel;
  equipment: IEquipmentModel;
  customer: ICustomerModel;
  technician: ITechnicianModel;
  closed_at?: Date;
  created_at?: Date;
  updated_at?: Date;
}
