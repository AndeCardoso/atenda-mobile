import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useTheme } from "styled-components";
import { useQuery, useQueryClient } from "react-query";
import { HttpStatusCode } from "axios";
import { SuperConsole } from "@tools/indentedConsole";
import { useCallback, useState } from "react";
import ServiceOrderService from "@services/serviceOrder";
import { useToast } from "@hooks/useToast";
import {
  createDownloadResumable,
  documentDirectory,
  getInfoAsync,
} from "expo-file-system";
import * as Sharing from "expo-sharing";

export const useReportController = () => {
  const { colors } = useTheme();
  const { unexpectedErrorToast, createToast } = useToast();
  const { canGoBack, goBack } = useNavigation<any>();
  const { params } = useRoute<any>();
  const { serviceOrderId } = params;
  const queryClient = useQueryClient();

  const [downloadProgress, setDownloadProgress] = useState(0);

  const serviceOrderService = new ServiceOrderService();

  const fileUri = `${documentDirectory}relatorio-os-${serviceOrderId}.pdf`;

  const { data, isLoading } = useQuery(
    ["getPdfReport", serviceOrderId],
    async () => {
      const { statusCode, body } = await serviceOrderService.getPdfReport(
        serviceOrderId
      );
      switch (statusCode) {
        case HttpStatusCode.Ok:
          return body.url;
        case HttpStatusCode.NoContent:
        case HttpStatusCode.BadRequest:
        default:
          SuperConsole(body, "getPdfReport");
          unexpectedErrorToast();
          return;
      }
    },
    {
      onError: async (error) => {
        SuperConsole(error, "getPdfReport");
        unexpectedErrorToast();
        return;
      },
    }
  );

  const handleShare = async () => {
    const fileInfo = await getInfoAsync(fileUri);
    if (fileInfo.exists) {
      await Sharing.shareAsync(fileUri, { mimeType: "pdf" });
    } else {
      createToast({
        duration: 5000,
        alertType: "error",
        message: "Erro ao salvar relatório",
      });
    }
  };

  const handleSave = async () => {
    const callback = (downloadProgress: {
      totalBytesWritten: number;
      totalBytesExpectedToWrite: number;
    }) => {
      const progress =
        downloadProgress.totalBytesWritten /
        downloadProgress.totalBytesExpectedToWrite;
      setDownloadProgress(progress);
    };

    const downloadResumable = createDownloadResumable(
      data,
      fileUri,
      {},
      callback
    );

    const downloadResponse = await downloadResumable.downloadAsync();

    if (downloadResponse?.status === HttpStatusCode.Ok) {
      await Sharing.shareAsync(downloadResponse.uri);
      createToast({
        duration: 5000,
        alertType: "success",
        message: "Relatório salvo com sucesso",
      });
      return;
    }

    createToast({
      duration: 5000,
      alertType: "error",
      message: "Erro ao salvar relatório",
    });
  };

  const handleGoBack = () => {
    canGoBack && goBack();
  };

  const actionStyles = {
    borderRadius: 50,
    marginRight: 16,
    backgroundColor: colors.SECONDARY,
  };

  const fabActions = [
    {
      icon: "share",
      label: "Compartilhar",
      onPress: handleShare,
      color: colors.PRIMARY,
      style: actionStyles,
    },
    {
      icon: "download",
      label: "Salvar",
      onPress: handleSave,
      color: colors.PRIMARY,
      style: actionStyles,
    },
  ];

  useFocusEffect(
    useCallback(() => {
      queryClient.resetQueries("getPdfReport");
    }, [])
  );

  return {
    pdfData: data,
    handleGoBack,
    fabActions,
    viewState: {
      headerText: `Relatório da O.S. ${serviceOrderId}`,
      loading: isLoading,
      downloadProgress,
    },
  };
};
