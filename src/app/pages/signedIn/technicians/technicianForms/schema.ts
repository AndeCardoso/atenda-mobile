import * as yup from "yup";
import {
  IAdressForm,
  addressObjectSchema,
} from "@components/forms/AddressForm/formSchema";
import { IOption } from "@components/base/Select";

export interface ITechnicianForm extends IAdressForm {
  name: string;
  phone: string;
  cpf: string;
  position: IOption;
  status?: IOption;
}

export const technicianSchema: yup.ObjectSchema<ITechnicianForm> = yup
  .object()
  .shape({
    name: yup
      .string()
      .required("Campo obrigatório")
      .min(4, "Nome deve ter no minímo 4 caracteres")
      .max(32, "Nome deve ter no máximo de 32 caracteres"),
    phone: yup.string().required("Campo obrigatório"),
    cpf: yup.string().required("Campo obrigatório"),
    position: yup.object<IOption>().required("Campo obrigatório"),
    status: yup.object<IOption>().notRequired(),
    ...addressObjectSchema,
  });
