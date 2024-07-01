import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { yupResolver } from "@hookform/resolvers/yup";
import { Layout } from "@components/Layout";
import { Container, WrapperButtons } from "./styles";
import { useForm } from "react-hook-form";
import { Button } from "@components/base/Button";
import { useUpdateServiceOrderFormController } from "./useUpdateServiceOrderFormController";
import { Loader } from "@components/base/Loader";
import { UpdateServiceOrderForm } from "./form";
import { serviceOrderStatusList } from "../constants";
import { Text } from "@components/base/Text";
import { AddressAccordion } from "@components/accordions/AddressAccordion";
import { EquipmentAccordion } from "@components/accordions/EquipmentAccordion";
import { CustomerAccordion } from "@components/accordions/CustomerAccordion";
import { Divider } from "@components/base/Separator";
import { Row } from "@components/base/Row";
import { TechnicianAccordion } from "@components/accordions/TechnicianAccordion";
import { IServiceForm, serviceFormSchema } from "../schema";
import { convertNumberToCurrency } from "@utils/convertCurrency";
import { LoaderBox } from "@components/base/Loader/styles";
import { useFormErrorAlert } from "@hooks/useFormErrorAlert";

export const ServiceOrderUpdateFormPage = () => {
  const { goBack } = useNavigation();
  const { scrollViewFormRef, onFormError } = useFormErrorAlert();

  const {
    serviceOrderData,
    handleRegister,
    viewState: { dataLoading, registerLoading },
  } = useUpdateServiceOrderFormController();

  const { control, handleSubmit, reset } = useForm<IServiceForm>({
    resolver: yupResolver(serviceFormSchema),
  });

  useEffect(() => {
    const fixedData = {
      ...serviceOrderData,
      status: serviceOrderStatusList.find(
        (item) => item.value === serviceOrderData?.status
      ),
      openedAt: serviceOrderData?.opened_at,
      closedAt: serviceOrderData?.closed_at,
      totalValue: convertNumberToCurrency(serviceOrderData?.totalValue),
    };
    reset(fixedData);
  }, [serviceOrderData]);

  return (
    <Layout
      header="Atualizar O.S."
      goBack={goBack}
      footer={
        <WrapperButtons>
          <Button
            onPress={handleSubmit(handleRegister, onFormError)}
            mode="contained"
            loading={registerLoading}
          >
            Atualizar
          </Button>
        </WrapperButtons>
      }
      hasScroll
      scrollViewRef={scrollViewFormRef}
    >
      {dataLoading ? (
        <LoaderBox>
          <Loader size={64} />
        </LoaderBox>
      ) : (
        <Container>
          <Row widthType="auto">
            <Text color="WHITE" size={24} weight="700">
              Nº:
            </Text>
            <Text color="WHITE" size={24} weight="600">
              {serviceOrderData?.id}
            </Text>
          </Row>
          <Divider />
          <Text color="WHITE_TEXT" size={14}>
            Cliente:
          </Text>
          <CustomerAccordion data={serviceOrderData?.customer!!} />
          <Divider />
          <Text color="WHITE_TEXT" size={14}>
            Equipamento:
          </Text>
          <EquipmentAccordion data={serviceOrderData?.equipment!!} />
          <Divider />
          <Text color="WHITE_TEXT" size={14}>
            Formulário de serviço:
          </Text>
          <UpdateServiceOrderForm control={control} />
          <Divider />
          <Text color="WHITE_TEXT" size={14}>
            Endereço:
          </Text>
          <AddressAccordion data={serviceOrderData?.address!!} />
          <Divider />
          <Text color="WHITE_TEXT" size={14}>
            Técnico:
          </Text>
          <TechnicianAccordion data={serviceOrderData?.technician!!} />
        </Container>
      )}
    </Layout>
  );
};
