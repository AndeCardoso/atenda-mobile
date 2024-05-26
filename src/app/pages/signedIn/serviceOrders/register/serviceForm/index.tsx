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
import {
  serviceOrderStatusEnum,
  serviceOrderStatusList,
} from "../../constants";
import { AbandonmentModal } from "../../components/AbandonmentModal";
import { getNowDateTime } from "@utils/createDateTime";

export const ServiceFormPage = () => {
  const {
    addressList,
    handleGoBack,
    handleSaveForm,
    onAbandomentModalToggle,
    handleConfirmAbandonment,
    viewState: { abandomentOpenModalState },
  } = useServiceFormController();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IServiceForm>({
    defaultValues: {
      selectedVoltage: undefined,
      reportedDefect: "",
      foundDefect: "",
      orderedServices: "",
      executedServices: "",
      observations: "",
      totalValue: "",
      openedAt: getNowDateTime(),
      status: serviceOrderStatusList.find(
        (item) => item.value === serviceOrderStatusEnum.OPENED
      ),
    },
    resolver: yupResolver(serviceFormSchema),
  });

  const [addressListState, setAddressListState] = useState<
    IAddressForm[] | IAddressModel[] | undefined
  >(addressList);
  const [showAddress, setShowAddress] = useState(false);

  const handleShowAddressToggle = () => {
    setShowAddress(!showAddress);
  };

  const handleSaveNewAddress = (values: IAddressForm) => {
    handleShowAddressToggle();
    setAddressListState([...addressList, values]);
  };

  const handleSaveAndForward = (values: IServiceForm) => {
    if (!values.address?.id) {
      handleSaveForm({
        serviceForm: { ...values },
        addressForm: {
          cep: values?.address?.cep,
          city: values?.address?.city.value,
          district: values?.address?.district,
          number: values?.address?.number,
          state: values?.address?.state.text,
          street: values?.address?.street,
          complement: values?.address?.complement,
          nickname: values?.address?.nickname,
        } as IAddressModel,
      });
      return;
    }
    handleSaveForm({
      serviceForm: values,
      addressForm: addressList?.find(
        (address) => address.id === values?.address?.id
      )!!,
    });
    return;
  };

  return (
    <Layout
      header="Preencher formulário"
      goBack={handleGoBack}
      close={onAbandomentModalToggle}
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
          addressList={addressListState!!}
          handleSaveNewAddress={handleSaveNewAddress}
          handleShowAddressToggle={handleShowAddressToggle}
          newAddressError={Boolean(errors.address)}
        />
      </Container>
      <AbandonmentModal
        onConfirm={handleConfirmAbandonment}
        onDismiss={onAbandomentModalToggle}
        open={abandomentOpenModalState}
      />
    </Layout>
  );
};
