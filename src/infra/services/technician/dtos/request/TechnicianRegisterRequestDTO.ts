import {
  technicianPositionEnum,
  technicianStatusEnum,
} from "@pages/signedIn/technicians/constants";
import { AddressRequestDTO } from "@services/location/dtos/request/AddressRequestDTO";

export interface TechnicianRegisterRequestDTO extends AddressRequestDTO {
  name: string;
  phone: string;
  cpf: string;
  position: technicianPositionEnum;
  status?: technicianStatusEnum;
}
