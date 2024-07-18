import React from "react";
import { useNavigation } from "@react-navigation/native";
import { yupResolver } from "@hookform/resolvers/yup";
import { Layout } from "@components/Layout";
import { Container, WrapperButtons } from "./styles";
import { useForm } from "react-hook-form";
import { Button } from "@components/base/Button";
import { useRegisterEquipmentFormController } from "./useRegisterEquipmentFormController";
import { IEquipmentForm, equipmentSchema } from "../schema";
import { RegisterEquipmentForm } from "./form";
import { useFormErrorAlert } from "@hooks/useFormErrorAlert";

export const EquipmentRegisterFormPage = () => {
  const { goBack } = useNavigation();
  const { scrollViewFormRef, onFormError } = useFormErrorAlert();

  const {
    handleRegister,
    viewState: { registerLoading },
  } = useRegisterEquipmentFormController();

  const { control, handleSubmit, getValues } = useForm<IEquipmentForm>({
    defaultValues: {
      nickname: "",
      brand: "",
      model: "",
      serialNumber: "",
      description: "",
      voltage: undefined,
      color: "",
      accessories: "",
      status: undefined,
    },
    resolver: yupResolver(equipmentSchema),
  });

  return (
    <Layout
      header="Cadastrar equipamento"
      goBack={goBack}
      footer={
        <WrapperButtons>
          <Button
            onPress={handleSubmit(handleRegister, onFormError)}
            mode="contained"
            loading={registerLoading}
          >
            Cadastrar
          </Button>
        </WrapperButtons>
      }
      hasScroll
      scrollViewRef={scrollViewFormRef}
    >
      <Container>
        <RegisterEquipmentForm control={control} getValues={getValues} />
      </Container>
    </Layout>
  );
};
