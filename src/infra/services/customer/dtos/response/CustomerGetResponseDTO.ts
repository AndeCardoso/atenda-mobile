import { IAddressForm } from "@components/forms/AddressForm/formSchema";
import { customerStatusEnum } from "@pages/signedIn/customers/constants";

export interface CustomerGetResponseDTO {
  id: number;
  name: string;
  document: string;
  phone: string;
  secondPhone?: string | null;
  email: string;
  status: customerStatusEnum;
  addresses: IAddressForm[];
  updated_at: Date;
}
