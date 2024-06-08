import React from "react";
import { useIsFocused } from "@react-navigation/native";
import { useReportController } from "./useReportController";
import { FabGroup } from "@components/base/FAB";
import { Loader } from "@components/base/Loader";
import { Layout } from "@components/Layout";
import { LoaderBox } from "@components/base/Loader/styles";
import { WebView } from "react-native-webview";
import { ProgressBar } from "@components/base/ProgressBard";

export const ReportPage = () => {
  const isFocused = useIsFocused();

  const {
    pdfData,
    handleGoBack,
    fabActions,
    viewState: { loading, headerText, downloadProgress },
  } = useReportController();

  return (
    <Layout header={headerText} goBack={handleGoBack}>
      {loading ? (
        <LoaderBox>
          <Loader size={64} />
        </LoaderBox>
      ) : (
        <>
          {downloadProgress > 0 && downloadProgress < 100 ? (
            <ProgressBar progressValue={downloadProgress} />
          ) : null}
          <WebView source={{ uri: pdfData }} />
          <FabGroup
            isFocused={isFocused}
            fabActions={fabActions}
            openedIcon="file-document-multiple"
            closedIcon="file-document"
          />
        </>
      )}
    </Layout>
  );
};
