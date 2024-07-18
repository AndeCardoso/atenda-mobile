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
  openedAt: Date;
  closedAt?: Date;
  totalValue?: number | string;
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
    openedAt: yup.date().required("Campo obrigatório"),
    closedAt: yup.date().notRequired(),
    totalValue: yup.string().notRequired(),
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
