import React from "react";
import { useNavigation } from "@react-navigation/native";
import { yupResolver } from "@hookform/resolvers/yup";
import { Layout } from "@components/Layout";
import { Container, WrapperButtons } from "./styles";
import { useForm } from "react-hook-form";
import { Button } from "@components/base/Button";
import { useTechnicianFormController } from "./useTechnicianFormController";
import { ITechnicianForm, technicianSchema } from "../schema";
import { RegisterTechnicianForm } from "./form";

export const TechnicianRegisterFormPage = () => {
  const { goBack } = useNavigation();
  const {
    handleRegister,
    viewState: { registerLoading },
  } = useTechnicianFormController();

  const { control, handleSubmit } = useForm<ITechnicianForm>({
    defaultValues: {
      name: "",
      cpf: "",
      phone: "",
      status: undefined,
      position: undefined,
      nickname: "",
      cep: "",
      state: "",
      city: "",
      district: "",
      street: "",
      number: "",
      complement: "",
    },
    resolver: yupResolver(technicianSchema),
  });

  return (
    <Layout
      header="Cadastrar técnico"
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
        <RegisterTechnicianForm control={control} />
      </Container>
    </Layout>
  );
};
