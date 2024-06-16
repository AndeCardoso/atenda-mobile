import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useAuth } from "@hooks/useAuth";
import { useTheme } from "styled-components";
import { SignedInNavigators, SignedInScreens } from "@routes/screens";
import { useQuery, useQueryClient } from "react-query";
import HomeService from "@services/home";
import { HttpStatusCode } from "axios";
import { SuperConsole } from "@tools/indentedConsole";
import { useCallback } from "react";
import { useToast } from "@hooks/useToast";

export const useHomeController = () => {
  const { colors } = useTheme();
  const { unexpectedErrorToast } = useToast();
  const { navigate } = useNavigation<any>();
  const { logout, userData } = useAuth();
  const queryClient = useQueryClient();

  const homeService = new HomeService();

  const { data: advertiseData, isLoading: isLoadingAdvertise } = useQuery(
    ["advertise"],
    async () => {
      const { statusCode, body } = await homeService.getAdvertise();
      switch (statusCode) {
        case HttpStatusCode.Ok:
          return body;
        case HttpStatusCode.NoContent:
          return;
        case HttpStatusCode.BadRequest:
        default:
          SuperConsole(body, "advertise");
          unexpectedErrorToast();
          return;
      }
    },
    {
      onError: async (error) => {
        SuperConsole(error, "advertise");
        unexpectedErrorToast();
        return;
      },
    }
  );

  const {
    data: serviceOrderOpenedListData,
    isLoading: isLoadingServiceOrderOpenedList,
  } = useQuery(
    ["serviceOrderOpenedList"],
    async () => {
      const { statusCode, body } = await homeService.getServiceOrderList();
      switch (statusCode) {
        case HttpStatusCode.Ok:
          return body;
        case HttpStatusCode.NoContent:
          return;
        case HttpStatusCode.BadRequest:
        default:
          SuperConsole(body, "serviceOrderOpenedList");
          unexpectedErrorToast();
          return;
      }
    },
    {
      onError: async (error) => {
        SuperConsole(error, "serviceOrderOpenedList");
        unexpectedErrorToast();
        return;
      },
    }
  );

  const { data: equipmentQueueData, isLoading: isLoadingEquipmentQueue } =
    useQuery(
      ["equipmentQueue"],
      async () => {
        const { statusCode, body } = await homeService.getEquipmentQueue();
        switch (statusCode) {
          case HttpStatusCode.Ok:
            return body;
          case HttpStatusCode.NoContent:
            return;
          case HttpStatusCode.BadRequest:
          default:
            SuperConsole(body, "equipmentQueue");
            unexpectedErrorToast();
            return;
        }
      },
      {
        onError: async (error) => {
          SuperConsole(error, "equipmentQueue");
          unexpectedErrorToast();
          return;
        },
      }
    );

  const { data: dataInfosData, isLoading: isLoadingDataInfos } = useQuery(
    ["getDatasInfo"],
    async () => {
      const { statusCode, body } = await homeService.getDatasInfo();
      switch (statusCode) {
        case HttpStatusCode.Ok:
          return body;
        case HttpStatusCode.NoContent:
          return;
        case HttpStatusCode.BadRequest:
        default:
          SuperConsole(body, "getDatasInfo");
          unexpectedErrorToast();
          return;
      }
    },
    {
      onError: async (error) => {
        SuperConsole(error, "getDatasInfo");
        unexpectedErrorToast();
        return;
      },
    }
  );

  const actionStyles = {
    borderRadius: 50,
    marginRight: 16,
    backgroundColor: colors.SECONDARY,
  };

  const handleGoToTechnicians = () => {
    navigate(SignedInNavigators.TECHNICIANS);
  };

  const handleGoToCustomers = () => {
    navigate(SignedInNavigators.CUSTOMERS);
  };

  const handleGoToEquipments = () => {
    navigate(SignedInNavigators.EQUIPMENTS);
  };

  const handleGoToServiceOrders = () => {
    navigate(SignedInNavigators.SERVICE_ORDERS);
  };

  const handleGoToServiceOrdersRegister = () => {
    navigate(SignedInNavigators.SERVICE_ORDERS, {
      screen: SignedInScreens.SERVICE_ORDERS_REGISTER_FLOW,
    });
  };

  const handleGoToUsers = () => {
    navigate(SignedInNavigators.USERS);
  };

  const handleGoToEquipmentDetails = (equipmentId: number) => {
    navigate(SignedInNavigators.EQUIPMENTS, {
      screen: SignedInScreens.EQUIPMENTS_DETAILS,
      params: { equipmentId },
    });
  };

  const handleGoToServiceOrderDetails = (serviceOrderId: number) => {
    navigate(SignedInNavigators.SERVICE_ORDERS, {
      screen: SignedInScreens.SERVICE_ORDERS_DETAILS,
      params: { serviceOrderId },
    });
  };

  const fabActions = [
    {
      icon: "logout",
      label: "Sair",
      onPress: logout,
      color: colors.PRIMARY,
      style: actionStyles,
    },
    {
      icon: "tools",
      label: "Técnicos",
      onPress: handleGoToTechnicians,
      color: colors.PRIMARY,
      style: actionStyles,
    },
    {
      icon: "head",
      label: "Clientes",
      onPress: handleGoToCustomers,
      color: colors.PRIMARY,
      style: actionStyles,
    },
    {
      icon: "laptop",
      label: "Equipamentos",
      onPress: handleGoToEquipments,
      color: colors.PRIMARY,
      style: actionStyles,
    },
    {
      icon: "file-cabinet",
      label: "Ordens de serviço",
      onPress: handleGoToServiceOrders,
      color: colors.PRIMARY,
      style: actionStyles,
    },
  ];

  if (userData?.admin) {
    fabActions.push({
      icon: "account-key",
      label: "Usuários",
      onPress: handleGoToUsers,
      color: colors.PRIMARY,
      style: actionStyles,
    });
  }

  useFocusEffect(
    useCallback(() => {
      queryClient.resetQueries(["advertise"]);
      queryClient.resetQueries(["getDatasInfo"]);
      queryClient.resetQueries(["equipmentQueue"]);
      queryClient.resetQueries(["serviceOrderOpenedList"]);
    }, [])
  );

  return {
    userData,
    fabActions,
    dataInfosData,
    advertiseData,
    equipmentQueueData,
    serviceOrderOpenedListData,
    handleGoToServiceOrders,
    handleGoToEquipmentDetails,
    handleGoToServiceOrderDetails,
    handleGoToServiceOrdersRegister,
    viewState: {
      isLoadingAdvertise,
      isLoadingDataInfos,
      isLoadingEquipmentQueue,
      isLoadingServiceOrderOpenedList,
    },
  };
};
