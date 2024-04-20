import * as yup from "yup";
import {
  IAddressForm,
  addressObjectSchema,
} from "@components/forms/AddressForm/formSchema";
import { IOption } from "@components/base/Select";

export interface ICustomerForm {
  name: string;
  document: string;
  phone: string;
  secondPhone?: string;
  email: string;
  status: IOption;
  addresses: IAddressForm[];
}

export const customerSchema: yup.ObjectSchema<ICustomerForm> = yup
  .object()
  .shape({
    name: yup
      .string()
      .required("Campo obrigatório")
      .min(4, "Nome deve ter no minímo 4 caracteres")
      .max(32, "Nome deve ter no máximo de 32 caracteres"),
    document: yup.string().required("Campo obrigatório"),
    phone: yup.string().required("Campo obrigatório"),
    secondPhone: yup.string().notRequired(),
    email: yup.string().email().required("Campo obrigatório"),
    status: yup
      .mixed()
      .test("is-object-or-string", (value) => {
        return (
          yup.object().isValidSync(value) || yup.string().isValidSync(value)
        );
      })
      .notRequired(),
    addresses: yup
      .array()
      .of(yup.object(addressObjectSchema))
      .required("Endereço é obrigatório"),
  });
