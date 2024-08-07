import * as yup from "yup";
import { IOption } from "@components/base/Select";

export interface IEquipmentForm {
  nickname?: string;
  brand: string;
  model: string;
  serialNumber?: string;
  description?: string;
  voltage?: IOption | string;
  color?: string;
  accessories?: string;
  status: IOption | string;
}

export const equipmentSchema: yup.ObjectSchema<IEquipmentForm> = yup
  .object()
  .shape({
    nickname: yup
      .string()
      .test({
        name: "min",
        test: (value) => {
          if (!value) return true;
          return value.length >= 4;
        },
        message: "Apelido deve ter no minímo 4 caracteres",
      })
      .test({
        name: "max",
        test: (value) => {
          if (!value) return true;
          return value.length <= 32;
        },
        message: "Apelido deve ter no máximo de 32 caracteres",
      })
      .notRequired(),
    brand: yup.string().required("Campo obrigatório"),
    model: yup.string().required("Campo obrigatório"),
    serialNumber: yup.string().notRequired(),
    description: yup.string().notRequired(),
    voltage: yup
      .mixed()
      .test("is-object-or-string", (value) => {
        return (
          yup.object().isValidSync(value) || yup.string().isValidSync(value)
        );
      })
      .notRequired(),
    color: yup.string().notRequired(),
    accessories: yup.string().notRequired(),
    status: yup
      .mixed()
      .test("is-object-or-string", (value) => {
        return (
          yup.object().isValidSync(value) || yup.string().isValidSync(value)
        );
      })
      .required("Campo obrigatório"),
  });
