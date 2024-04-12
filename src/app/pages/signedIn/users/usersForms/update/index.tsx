import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { yupResolver } from "@hookform/resolvers/yup";
import { Layout } from "@components/Layout";
import { Container, WrapperButtons } from "./styles";
import { useForm } from "react-hook-form";
import { Button } from "@components/base/Button";
import { Loader } from "@components/base/Loader";
import { IUserForm, userSchema } from "../schema";
import { UpdateTechnicianForm } from "./form";
import { useUpdateUserFormController } from "./useUpdateUserFormController";

export const UserUpdateFormPage = () => {
  const { goBack } = useNavigation();
  const {
    userData,
    handleRegister,
    viewState: { dataLoading, registerLoading },
  } = useUpdateUserFormController();

  const { control, handleSubmit, reset, getValues, watch, setValue } =
    useForm<IUserForm>({
      resolver: yupResolver(userSchema),
    });

  useEffect(() => {
    console.log(userData);
    reset(userData);
  }, [userData]);

  return (
    <Layout
      header="Atualizar técnico"
      goBack={goBack}
      footer={
        <WrapperButtons>
          <Button
            onPress={handleSubmit(handleRegister)}
            mode="contained"
            loading={registerLoading}
          >
            Atualizar
          </Button>
        </WrapperButtons>
      }
      hasScroll
    >
      {dataLoading ? (
        <Loader />
      ) : (
        <Container>
          <UpdateTechnicianForm control={control} />
        </Container>
      )}
    </Layout>
  );
};
