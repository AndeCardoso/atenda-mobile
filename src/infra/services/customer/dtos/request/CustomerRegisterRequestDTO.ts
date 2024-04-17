import { customerStatusEnum } from "@pages/signedIn/customers/constants";
import { AddressRequestDTO } from "@services/location/dtos/request/AddressRequestDTO";

export interface CustomerRegisterRequestDTO {
  name: string;
  document: string;
  phone: string;
  secondPhone?: string;
  email: string;
  status: customerStatusEnum;
  addresses: AddressRequestDTO[];
}
