import * as yup from "yup";
import { IOption } from "@components/base/Select";
import { IAddressForm } from "@components/forms/AddressForm/formSchema";
import { IAddressModel } from "@model/entities/address";

export interface IServiceForm {
  selectedVoltage: IOption | string;
  reportedDefect: string;
  foundDefect?: string;
  orderedServices: string;
  executedServices?: string;
  observations?: string;
  status: IOption;
  address?: IAddressForm | IAddressModel;
}

export const serviceFormSchema: yup.ObjectSchema<IServiceForm> = yup
  .object()
  .shape({
    selectedVoltage: yup
      .mixed()
      .test("is-object-or-string", (value) => {
        return (
          yup.object().isValidSync(value) || yup.string().isValidSync(value)
        );
      })
      .required("Campo obrigatório"),
    reportedDefect: yup.string().required("Campo obrigatório"),
    foundDefect: yup.string(),
    orderedServices: yup.string().required("Campo obrigatório"),
    executedServices: yup.string(),
    observations: yup.string(),
    status: yup
      .mixed()
      .test("is-object-or-string", (value) => {
        return (
          yup.object().isValidSync(value) || yup.string().isValidSync(value)
        );
      })
      .required("Campo obrigatório"),
    address: yup
      .object<IAddressForm | IAddressModel>()
      .required("Endereço é obrigatório"),
  });
