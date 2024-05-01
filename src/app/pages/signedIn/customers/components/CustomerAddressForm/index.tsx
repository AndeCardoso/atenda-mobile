import { AddressForm } from "@components/forms/AddressForm";
import {
  IAddressForm,
  addressSchema,
} from "@components/forms/AddressForm/formSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { Control, useForm } from "react-hook-form";

interface ICustomerAddressFormProps {
  addressValues?: IAddressForm;
  controlProp: Control<any, any>;
  setAddressValue: (value: IAddressForm) => void;
}

export const CustomerAddressForm = ({
  addressValues,
  controlProp,
  setAddressValue,
}: ICustomerAddressFormProps) => {
  const { control, handleSubmit, getValues, setValue, watch, reset } =
    useForm<IAddressForm>({
      defaultValues: {
        nickname: "",
        cep: "",
        street: "",
        number: "",
        complement: "",
        district: "",
        city: "",
        state: "",
      },
      resolver: yupResolver(addressSchema),
    });

  const stateField = watch("state");

  useEffect(() => {
    setValue("city", {});
  }, [stateField, setValue]);

  useEffect(() => {
    setAddressValue(getValues());
  }, [getValues]);

  useEffect(() => {
    if (addressValues) {
      reset({
        nickname: addressValues.nickname,
        cep: addressValues.cep,
        street: addressValues.street,
        number: addressValues.number,
        district: addressValues.district,
        complement: addressValues.complement,
        city: addressValues.city,
        state: addressValues.state,
      });
    }
  }, [addressValues]);

  return <AddressForm control={control} getValues={getValues} hasNickname />;
};
