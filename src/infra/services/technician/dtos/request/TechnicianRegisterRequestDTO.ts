import { IAdressForm } from "@components/forms/AddressForm/formSchema";
import {
  technicianPositionEnum,
  technicianStatusEnum,
} from "@pages/signedIn/technicians/constants";

export interface TechnicianRegisterRequestDTO extends IAdressForm {
  name: string;
  phone: string;
  cpf: string;
  position: technicianPositionEnum;
  status?: technicianStatusEnum;
}
