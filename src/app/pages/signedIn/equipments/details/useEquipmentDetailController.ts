import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useTheme } from "styled-components";
import { SignedInScreens } from "@routes/screens";
import { useQuery, useQueryClient } from "react-query";
import { HttpStatusCode } from "axios";
import EquipmentService from "@services/equipment";
import { SuperConsole } from "@tools/indentedConsole";
import { useCallback } from "react";

export const useEquipmentDetailController = () => {
  const { colors } = useTheme();
  const { navigate, canGoBack, goBack } = useNavigation<any>();
  const { params } = useRoute<any>();
  const { equipmentId, customerId } = params;
  const queryClient = useQueryClient();

  const equipmentService = new EquipmentService();

  const { data, isLoading } = useQuery(
    ["equipmentDetail", equipmentId],
    async () => {
      const { statusCode, body } = await equipmentService.get(equipmentId);
      switch (statusCode) {
        case HttpStatusCode.Ok:
          return body;
        case HttpStatusCode.NoContent:
        case HttpStatusCode.BadRequest:
        default:
          SuperConsole(body);
          return;
      }
    },
    {
      onError: async (error) => {
        console.log("error - equipments", JSON.stringify(error, null, 2));
        return;
      },
    }
  );

  const handleGoBack = () => {
    canGoBack && goBack();
  };

  const handleGoToUpdateEquipment = () => {
    navigate(SignedInScreens.EQUIPMENTS_UPDATE_FORM, {
      equipmentId,
      customerId,
    });
  };

  const actionStyles = {
    borderRadius: 50,
    marginRight: 16,
    backgroundColor: colors.SECONDARY,
  };

  const fabActions = [
    {
      icon: "file-edit",
      label: "Editar cadastro",
      onPress: handleGoToUpdateEquipment,
      color: colors.PRIMARY,
      style: actionStyles,
    },
  ];

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries("equipmentDetail");
    }, [])
  );

  return {
    equipmentData: data,
    handleGoBack,
    fabActions,
    viewState: {
      loading: isLoading,
    },
  };
};
