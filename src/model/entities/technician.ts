import {
  technicianPositionEnum,
  technicianStatusEnum,
} from "@pages/signedIn/technicians/constants";
import { IAddressModel } from "./address";

export interface ITechnicianModel extends IAddressModel {
  id?: string | number;
  name: string;
  phone: string;
  cpf: string;
  position: technicianPositionEnum;
  status?: technicianStatusEnum;
}
