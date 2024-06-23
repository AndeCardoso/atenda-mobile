import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { yupResolver } from "@hookform/resolvers/yup";
import { Layout } from "@components/Layout";
import { Container, WrapperButtons } from "./styles";
import { useForm } from "react-hook-form";
import { Button } from "@components/base/Button";
import { Loader } from "@components/base/Loader";
import { IEquipmentForm, equipmentSchema } from "../schema";
import { UpdateEquipmentForm } from "./form";
import { equipmentStatusList, equipmentVoltageList } from "../../constants";
import { useUpdateEquipmentFormController } from "./useUpdateEquipmentFormController";
import { LoaderBox } from "@components/base/Loader/styles";

export const EquipmentUpdateFormPage = () => {
  const { goBack } = useNavigation();
  const {
    equipmentData,
    handleRegister,
    viewState: { dataLoading, registerLoading },
  } = useUpdateEquipmentFormController();

  const { control, handleSubmit, reset, getValues } = useForm<IEquipmentForm>({
    resolver: yupResolver(equipmentSchema),
  });

  useEffect(() => {
    const fixedData = {
      ...equipmentData,
      position: equipmentVoltageList.find(
        (item) => item.value === equipmentData?.voltage
      ),
      status: equipmentStatusList.find(
        (item) => item.value === equipmentData?.status
      ),
    };

    reset(fixedData);
  }, [equipmentData]);

  return (
    <Layout
      header="Atualizar equipamento"
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
          <UpdateEquipmentForm control={control} getValues={getValues} />
        </Container>
      )}
    </Layout>
  );
};
