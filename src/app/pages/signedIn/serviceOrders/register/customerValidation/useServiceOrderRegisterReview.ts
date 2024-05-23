import { useEffect, useState } from "react";
import { HttpStatusCode } from "axios";
import { useMutation } from "react-query";
import { useServiceOrderContext } from "@contexts/serviceOrder";
import { useToast } from "@hooks/useToast";
import { IServiceOrderModel } from "@model/entities/serviceOrder";
import { useNavigation } from "@react-navigation/native";
import { SignedInNavigators, SignedInScreens } from "@routes/screens";
import ServiceOrderService from "@services/serviceOrder";
import { ServiceOrderRegisterRequestDTO } from "@services/serviceOrder/dtos/request/ServiceOrderRegisterRequestDTO";
import { SignatureRequestDTO } from "@services/serviceOrder/dtos/request/SignatureRequestDTO";
import { ImageFormat, useCanvasRef } from "@shopify/react-native-skia";
import { SuperConsole } from "@tools/indentedConsole";

export const useServiceOrderRegisterReview = () => {
  const signatureRef = useCanvasRef();
  const { navigate, canGoBack, goBack, getParent } = useNavigation<any>();
  const { unexpectedErrorToast } = useToast();

  const { data: serviceOrderData, onTakeSignatureSnapshot } =
    useServiceOrderContext();

  const serviceOrderService = new ServiceOrderService();

  const [abandomentOpenModalState, setAbandomentOpenModalState] =
    useState(false);
  const [forwardButtonEnableState, setForwardButtonEnableState] =
    useState(false);

  const onEnableForwardButton = (value: boolean) => {
    setForwardButtonEnableState(value);
  };

  const onAbandomentModalToggle = () => {
    setAbandomentOpenModalState(!abandomentOpenModalState);
  };

  const handleConfirmAbandonment = () => {
    navigate(SignedInNavigators.SERVICE_ORDERS, {
      screen: SignedInScreens.SERVICE_ORDERS,
    });
  };

  const { mutateAsync: mutateAsyncRegister, isLoading: registerLoading } =
    useMutation(
      ["serviceOrderRegister"],
      async (data: IServiceOrderModel) => {
        if (data.address.id) {
          const body: ServiceOrderRegisterRequestDTO = {
            addressId: Number(data.address.id),
            customerId: Number(data.customer.id),
            equipmentId: Number(data.equipment.id),
            technicianId: Number(data.technician.id),
            orderedServices: data.serviceForm.orderedServices,
            reportedDefect: data.serviceForm.reportedDefect,
            selectedVoltage: data.serviceForm.selectedVoltage.text,
            executedServices: data.serviceForm.executedServices,
            foundDefect: data.serviceForm.foundDefect,
            observations: data.serviceForm.observations,
            status: data.serviceForm.status.value,
          };
          return await serviceOrderService.register(body);
        }
        const body: ServiceOrderRegisterRequestDTO = {
          customerId: Number(data.customer.id),
          equipmentId: Number(data.equipment.id),
          technicianId: Number(data.technician.id),
          orderedServices: data.serviceForm.orderedServices,
          reportedDefect: data.serviceForm.reportedDefect,
          selectedVoltage: data.serviceForm.selectedVoltage.text,
          executedServices: data.serviceForm.executedServices,
          foundDefect: data.serviceForm.foundDefect,
          observations: data.serviceForm.observations,
          status: data.serviceForm.status.value,
          cep: data.address.cep,
          city: data.address.city,
          complement: data.address.complement,
          district: data.address.district,
          nickname: data.address.nickname,
          number: data.address.number,
          state: data.address.state,
          street: data.address.street,
        };
        return await serviceOrderService.register(body);
      },
      {
        onSuccess: async ({ statusCode, body }) => {
          switch (statusCode) {
            case HttpStatusCode.Created:
              return body;
            case HttpStatusCode.BadRequest:
            default:
              SuperConsole(body, "serviceOrderRegister");
              unexpectedErrorToast();
              return;
          }
        },
        onError: async (error) => {
          SuperConsole(error, "serviceOrderRegister");
          unexpectedErrorToast();
          return;
        },
      }
    );

  const {
    mutateAsync: mutateAsyncSignatureRegister,
    isLoading: signatureRegisterLoading,
  } = useMutation(
    ["signatureRegister"],
    async ({ serviceOrderId, signature }: SignatureRequestDTO) => {
      const body: SignatureRequestDTO = {
        serviceOrderId,
        signature,
      };
      return await serviceOrderService.registerSignature(body);
    },
    {
      onSuccess: async ({ statusCode, body }) => {
        switch (statusCode) {
          case HttpStatusCode.Created:
            return body;
          case HttpStatusCode.BadRequest:
          case HttpStatusCode.NotFound:
          default:
            SuperConsole(body, "signatureRegister");
            unexpectedErrorToast();
            return;
        }
      },
      onError: async (error) => {
        SuperConsole(error, "signatureRegister");
        unexpectedErrorToast();
        return;
      },
    }
  );

  const handleTakeSignatureSnapshot = () => {
    const image = signatureRef.current?.makeImageSnapshot();
    if (image) {
      return image.encodeToBytes(ImageFormat.JPEG, 95);
    }
  };

  const handleRegister = async () => {
    const serviceOrderResponse = await mutateAsyncRegister(serviceOrderData!!);
    if (serviceOrderResponse.statusCode === HttpStatusCode.Created) {
      const signatureImage = handleTakeSignatureSnapshot();
      const signatureRegisterResponse = await mutateAsyncSignatureRegister({
        serviceOrderId: serviceOrderResponse.body.id,
        signature: signatureImage!!,
      });
      if (signatureRegisterResponse.statusCode === HttpStatusCode.Ok) {
        navigate(SignedInNavigators.SERVICE_ORDERS, {
          screen: SignedInScreens.SERVICE_ORDERS,
        });
      }
    }
  };

  const handleGoBack = () => {
    canGoBack && goBack();
  };

  useEffect(() => {
    getParent()?.setOptions({ gestureEnabled: false });
    return () => {
      getParent()?.setOptions({ gestureEnabled: true });
    };
  }, []);

  return {
    data: serviceOrderData,
    signatureRef,
    handleGoBack,
    handleRegister,
    onEnableForwardButton,
    onAbandomentModalToggle,
    handleConfirmAbandonment,
    viewState: {
      registerLoading: signatureRegisterLoading && registerLoading,
      abandomentOpenModalState,
      forwardButtonEnableState,
    },
  };
};
