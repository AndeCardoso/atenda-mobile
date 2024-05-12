import * as yup from "yup";
import {
  IAddressForm,
  addressObjectSchema,
} from "@components/forms/AddressForm/formSchema";
import { IOption } from "@components/base/Select";
import { serviceOrderStatusEnum } from "./constants";

export interface IServiceOrderForm extends Partial<IAddressForm> {
  selectedVoltage: IOption | string;
  reportedDefect: string;
  foundDefect?: string;
  orderedServices: string;
  executedServices?: string;
  observations?: string;
  closedAt: Date;
  status?: serviceOrderStatusEnum;
  addressId?: number;
  equipmentId: number;
  customerId: number;
  technicianId: number;
}

export const serviceOrderSchema: yup.ObjectSchema<IServiceOrderForm> = yup
  .object()
  .shape({
    name: yup
      .string()
      .required("Campo obrigatório")
      .min(4, "Nome deve ter no minímo 4 caracteres")
      .max(32, "Nome deve ter no máximo de 32 caracteres"),
    phone: yup.string().required("Campo obrigatório"),
    cpf: yup.string().required("Campo obrigatório"),
    position: yup
      .mixed()
      .test("is-object-or-string", "Campo obrigatório", (value) => {
        return (
          (yup.object().isValidSync(value) && Object.keys(value).length > 0) ||
          (yup.string().isValidSync(value) &&
            value !== undefined &&
            value.trim().length > 0)
        );
      })
      .required("Campo obrigatório"),
    status: yup
      .mixed()
      .test("is-object-or-string", (value) => {
        return (
          yup.object().isValidSync(value) || yup.string().isValidSync(value)
        );
      })
      .notRequired(),
    ...addressObjectSchema,
  });
