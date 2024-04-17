import { IAddressModel } from "./address";
import { customerStatusEnum } from "@pages/signedIn/customers/constants";

export interface ICustomerModel {
  id?: string | number;
  name: string;
  document: string;
  phone: string;
  secondPhone?: string;
  email: string;
  status: customerStatusEnum;
  addresses: IAddressModel[];
}
