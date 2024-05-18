import { IAddressModel } from "@model/entities/address";
import { customerStatusEnum } from "@pages/signedIn/customers/constants";

export interface CustomerGetResponseDTO {
  id: number;
  name: string;
  document: string;
  phone: string;
  secondPhone?: string | null;
  email: string;
  status: customerStatusEnum;
  addresses: IAddressModel[];
  updated_at: Date;
}
