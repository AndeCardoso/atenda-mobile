import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { yupResolver } from "@hookform/resolvers/yup";
import { Layout } from "@components/Layout";
import { Container, WrapperButtons } from "./styles";
import { useForm } from "react-hook-form";
import { Button } from "@components/base/Button";
import { useTechnicianFormController } from "./useTechnicianFormController";
import { Loader } from "@components/base/Loader";
import { ITechnicianForm, technicianSchema } from "../schema";
import { UpdateTechnicianForm } from "./form";
import { technicianPositionList, technicianStatusList } from "../../constants";

export const TechnicianUpdateFormPage = () => {
  const { goBack } = useNavigation();
  const {
    technicianData,
    handleRegister,
    viewState: { dataLoading, registerLoading },
  } = useTechnicianFormController();

  const { control, handleSubmit, reset, getValues } = useForm<ITechnicianForm>({
    resolver: yupResolver(technicianSchema),
  });

  useEffect(() => {
    reset({
      ...technicianData,
      position: technicianPositionList.find(
        (item) => item.value === technicianData?.position
      ),
      status: technicianStatusList.find(
        (item) => item.value === technicianData?.status
      ),
      ...technicianData?.address,
    });
  }, [technicianData]);

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
          <UpdateTechnicianForm control={control} getValues={getValues} />
        </Container>
      )}
    </Layout>
  );
};
