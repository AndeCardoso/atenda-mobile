import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { yupResolver } from "@hookform/resolvers/yup";
import { Layout } from "@components/Layout";
import { Container, WrapperButtons } from "./styles";
import { useForm } from "react-hook-form";
import { Button } from "@components/base/Button";
import { Loader } from "@components/base/Loader";
import { IUserForm, userSchema } from "../schema";
import { UpdateUserForm } from "./form";
import { useUpdateUserFormController } from "./useUpdateUserFormController";
import { LoaderBox } from "@components/base/Loader/styles";

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
    reset(userData);
  }, [userData]);

  return (
    <Layout
      header="Atualizar usuário"
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
        <LoaderBox>
          <Loader size={64} />
        </LoaderBox>
      ) : (
        <Container>
          <UpdateUserForm control={control} />
        </Container>
      )}
    </Layout>
  );
};
