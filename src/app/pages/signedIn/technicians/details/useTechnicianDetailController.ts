import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { SignedInScreens } from "@routes/screens";
import { useQuery } from "react-query";
import TechnicianService from "@services/technician";
import { HttpStatusCode } from "axios";
import { SuperConsole } from "@tools/indentedConsole";

export const useTechnicianDetailController = () => {
  const { colors } = useTheme();
  const { navigate, canGoBack, goBack } = useNavigation<any>();
  const { params } = useRoute<any>();
  const { technicianId } = params;
  const technicianService = new TechnicianService();

  const { data } = useQuery(
    ["technicianDetail", technicianId],
    async () => {
      const response = await technicianService.get({
        technicianId,
      });
      switch (response.statusCode) {
        case HttpStatusCode.Ok:
          return response.body;
        case HttpStatusCode.NoContent:
        case HttpStatusCode.BadRequest:
          SuperConsole(response.body);
          return;
        default:
          SuperConsole(response.body);
          return;
      }
    },
    {
      onError: async (error) => {
        console.log("error - technicians", JSON.stringify(error, null, 2));
        return;
      },
    }
  );

  const handleGoBack = () => {
    canGoBack && goBack();
  };

  const handleGoToUpdateTechnician = () => {
    navigate(SignedInScreens.TECHNICIANS_UPDATE_FORM, {
      technicianId,
    });
  };

  const handleServiceOrderReport = () => {
    console.log("report");
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
      onPress: handleGoToUpdateTechnician,
      color: colors.PRIMARY,
      style: actionStyles,
    },
    {
      icon: "file-table",
      label: "Relatorio de ordens de serviço",
      onPress: handleServiceOrderReport,
      color: colors.PRIMARY,
      style: actionStyles,
    },
  ];

  return {
    technicianData: data,
    handleGoBack,
    fabActions,
  };
};
