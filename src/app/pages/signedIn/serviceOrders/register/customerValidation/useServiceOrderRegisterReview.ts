import { useEffect, useRef, useState } from "react";
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
import { SuperConsole } from "@tools/indentedConsole";
import { captureRef } from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import { serviceOrderStatusEnum } from "../../constants";
import { convertCurrencyToNumber } from "@utils/convertCurrency";

export const useServiceOrderRegisterReview = () => {
  const signatureRef = useRef();
  const { navigate, canGoBack, goBack, getParent } = useNavigation<any>();
  const { unexpectedErrorToast } = useToast();

  const [permissionStatus, requestPermission] = MediaLibrary.usePermissions();

  const { data: serviceOrderData } = useServiceOrderContext();

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
            openedAt: data.serviceForm.openedAt,
            closedAt: data.serviceForm.closedAt,
            totalValue: convertCurrencyToNumber(data.totalValue),
            status: data.serviceForm.status.value as serviceOrderStatusEnum,
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
          openedAt: data.serviceForm.openedAt,
          closedAt: data.serviceForm.closedAt,
          totalValue: data.serviceForm.totalValue,
          status: data.serviceForm.status.value as serviceOrderStatusEnum,
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
    async ({ serviceOrderId, image, fileName }: SignatureRequestDTO) => {
      const body: SignatureRequestDTO = {
        serviceOrderId,
        image,
        fileName,
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

  const handleTakeSignatureSnapshot = async () => {
    if (permissionStatus === null) {
      requestPermission();
    }

    const image = await captureRef(signatureRef, {
      quality: 1,
      format: "jpg",
    });
    if (image) {
      return image;
    }
  };

  const handleRegister = async () => {
    const serviceOrderResponse = await mutateAsyncRegister(serviceOrderData!!);
    if (serviceOrderResponse.statusCode === HttpStatusCode.Created) {
      const signatureImage = await handleTakeSignatureSnapshot();
      const signatureRegisterResponse = await mutateAsyncSignatureRegister({
        serviceOrderId: serviceOrderResponse.body.id,
        image: signatureImage!!,
        fileName: `signature-${serviceOrderData?.customer.name}-${serviceOrderResponse.body.id}.jpg`,
      });

      if (signatureRegisterResponse.statusCode === HttpStatusCode.Created) {
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
