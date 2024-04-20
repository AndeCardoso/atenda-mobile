import React, { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { yupResolver } from "@hookform/resolvers/yup";
import { Layout } from "@components/Layout";
import { Container, WrapperButtons } from "./styles";
import { useForm } from "react-hook-form";
import { Button } from "@components/base/Button";
import { useUpdateTechnicianFormController } from "./useUpdateTechnicianFormController";
import { Loader } from "@components/base/Loader";
import { ITechnicianForm, technicianSchema } from "../schema";
import { UpdateTechnicianForm } from "./form";
import { technicianPositionList, technicianStatusList } from "../../constants";
import { IOption } from "@components/base/Select";

export const TechnicianUpdateFormPage = () => {
  const { goBack } = useNavigation();
  const stateRef = useRef<IOption | string>({} as IOption);
  const {
    technicianData,
    handleRegister,
    viewState: { dataLoading, registerLoading },
  } = useUpdateTechnicianFormController();

  const { control, handleSubmit, reset, getValues, watch, setValue } =
    useForm<ITechnicianForm>({
      resolver: yupResolver(technicianSchema),
    });

  const state = watch("state");

  useEffect(() => {
    if (!Boolean(state) || stateRef.current.text !== state.text)
      setValue("city", {} as IOption);
  }, [state, setValue]);

  useEffect(() => {
    stateRef.current = technicianData?.address.state || "";
    const fixedData = {
      ...technicianData,
      position: technicianPositionList.find(
        (item) => item.value === technicianData?.position
      ),
      status: technicianStatusList.find(
        (item) => item.value === technicianData?.status
      ),
      ...technicianData?.address,
    };
    const { address, ...fixedTechnicianData } = fixedData;

    reset(fixedTechnicianData);
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
