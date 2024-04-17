import { IAddressForm } from "@components/forms/AddressForm/formSchema";
import {
  technicianPositionEnum,
  technicianStatusEnum,
} from "@pages/signedIn/technicians/constants";

export interface TechnicianRegisterResponseDTO {
  id: number;
  name: string;
  phone: string;
  cpf: string;
  position: technicianPositionEnum;
  status?: technicianStatusEnum;
  address: IAddressForm;
}
