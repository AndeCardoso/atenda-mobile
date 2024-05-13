import React, { useState } from "react";
import { Layout } from "@components/Layout";
import { useServiceFormController } from "./useServiceFormController";
import { useForm } from "react-hook-form";
import { IServiceForm, serviceFormSchema } from "../../schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container, WrapperButtons } from "./styles";
import { Button } from "@components/base/Button";
import { ServiceForm } from "./form";
import { IAddressModel } from "@model/entities/address";
import { IAddressForm } from "@components/forms/AddressForm/formSchema";
import { useToast } from "@hooks/useToast";

export const ServiceFormPage = () => {
  const { createToast } = useToast();
  const [addressFormValues, setAddressFormValues] = useState<
    IAddressForm | undefined
  >();
  const [showAddress, setShowAddress] = useState(false);

  const handleShowAddressToggle = () => {
    setAddressFormValues(undefined);
    setShowAddress(!showAddress);
  };

  const handleSaveNewAddress = (values: IAddressForm) => {
    setAddressFormValues(values);
  };

  const { addressList, handleGoBack, handleSaveForm } =
    useServiceFormController();

  const { control, handleSubmit, getValues, setValue, watch } =
    useForm<IServiceForm>({
      defaultValues: {
        selectedVoltage: undefined,
        reportedDefect: "",
        foundDefect: "",
        orderedServices: "",
        executedServices: "",
        observations: "",
        status: undefined,
      },
      resolver: yupResolver(serviceFormSchema),
    });

  const handleSaveAndForward = (values: IServiceForm) => {
    if (!addressFormValues && !values.addressId) {
      createToast({
        duration: 5000,
        alertType: "error",
        message: "É obrigatório selecionar um endereço ou informar um novo",
      });
      return;
    }
    if (addressFormValues) {
      handleSaveForm({
        serviceForm: { ...values },
        addressForm: {
          cep: addressFormValues.cep,
          city: addressFormValues.city.value,
          district: addressFormValues.district,
          number: addressFormValues.number,
          state: addressFormValues.state.text,
          street: addressFormValues.street,
          complement: addressFormValues.complement,
          nickname: addressFormValues.nickname,
        } as IAddressModel,
      });
      return;
    }
    if (values.addressId) {
      handleSaveForm({
        serviceForm: values,
        addressForm: addressList?.find(
          (address) => address.id === values.addressId
        )!!,
      });
      return;
    }
  };

  return (
    <Layout
      header="Preencher formulário"
      goBack={handleGoBack}
      close={handleGoBack}
      footer={
        <WrapperButtons>
          <Button onPress={handleSubmit(handleSaveAndForward)} mode="contained">
            Salvar e avançar
          </Button>
        </WrapperButtons>
      }
      hasScroll
      steps={{ total: 4, current: 3 }}
    >
      <Container>
        <ServiceForm
          control={control}
          showAddress={showAddress}
          addressList={addressList!!}
          handleSaveNewAddress={handleSaveNewAddress}
          handleShowAddressToggle={handleShowAddressToggle}
        />
      </Container>
    </Layout>
  );
};
