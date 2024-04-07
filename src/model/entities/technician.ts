import {
  technicianPositionEnum,
  technicianStatusEnum,
} from "@pages/signedIn/technicians/constants";
import { IAdressModel } from "./address";

export interface ITechnicianModel extends IAdressModel {
  id?: string | number;
  name: string;
  phone: string;
  cpf: string;
  position: technicianPositionEnum;
  status?: technicianStatusEnum;
}
