import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { yupResolver } from "@hookform/resolvers/yup";
import { Layout } from "@components/Layout";
import { Container, WrapperButtons } from "./styles";
import { useForm } from "react-hook-form";
import { Button } from "@components/base/Button";
import { useRegisterEquipmentFormController } from "./useRegisterEquipmentFormController";
import { IEquipmentForm, equipmentSchema } from "../schema";
import { RegisterEquipmentForm } from "./form";

export const EquipmentRegisterFormPage = () => {
  const { goBack } = useNavigation();

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
            onPress={handleSubmit(handleRegister)}
            mode="contained"
            loading={registerLoading}
          >
            Cadastrar
          </Button>
        </WrapperButtons>
      }
      hasScroll
    >
      <Container>
        <RegisterEquipmentForm control={control} getValues={getValues} />
      </Container>
    </Layout>
  );
};
