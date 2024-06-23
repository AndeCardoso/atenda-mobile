import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Layout } from "@components/Layout";
import { Container, WrapperButtons } from "./styles";
import { useForm } from "react-hook-form";
import { Button } from "@components/base/Button";
import { useUpdateCustomerFormController } from "./useUpdateCustomerFormController";
import { Loader } from "@components/base/Loader";
import { ICustomerForm, customerSchema } from "../schema";
import { UpdateCustomerForm } from "./form";
import { customerStatusList } from "../../constants";
import { LoaderBox } from "@components/base/Loader/styles";

export const CustomerUpdateFormPage = () => {
  const {
    customerData,
    handleEnabledButton,
    handleRegister,
    handleGoBack,
    viewState: { dataLoading, registerLoading, buttonEnabledState },
  } = useUpdateCustomerFormController();

  const { control, handleSubmit, reset, setValue } = useForm<ICustomerForm>({
    resolver: yupResolver(customerSchema),
  });

  useEffect(() => {
    const fixedData = {
      ...customerData,
      status: customerStatusList.find(
        (item) => item.value === customerData?.status
      ),
    };
    reset(fixedData);
  }, [customerData]);

  return (
    <Layout
      header="Atualizar cliente"
      goBack={handleGoBack}
      footer={
        <WrapperButtons>
          <Button
            onPress={handleSubmit(handleRegister)}
            mode="contained"
            loading={registerLoading}
            disabled={!buttonEnabledState}
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
          <UpdateCustomerForm
            controlProp={control}
            addressList={customerData?.addresses}
            setValueProp={setValue}
            onEnabledButton={handleEnabledButton}
          />
        </Container>
      )}
    </Layout>
  );
};
