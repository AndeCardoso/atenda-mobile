import React from "react";
import { Layout } from "@components/Layout";
import { useTheme } from "styled-components";
import { useServiceOrderController } from "./useServiceOrderController";
import { FlatList, RefreshControl } from "react-native";
import { Spacer } from "@components/base/Spacer";
import { Loader } from "@components/base/Loader";
import { useIsFocused } from "@react-navigation/native";
import { LoaderBox } from "@components/base/Loader/styles";
import { TechnicianCard } from "@components/cards/TechnicianCard";
import { FabButton } from "@components/base/FAB";
import { EmptyState } from "@components/EmptyState";
import { requestStateEnum } from "app/constants/requestStates";
import { ServiceOrderCard } from "@components/cards/ServiceOrderCard";

export const ServiceOrdersPage = () => {
  const { colors } = useTheme();
  const isFocused = useIsFocused();

  const {
    serviceOrderList,
    handleGoBack,
    onServiceOrderSearch,
    handleGoToDetails,
    emptyStateTexts,
    fetchNextPage,
    fabActions,
    textSearch,
    refetch,
    viewState: { loading, reloading, listState },
  } = useServiceOrderController();

  return (
    <Layout
      header="Ordens de serviço"
      searchPlaceholder="Buscar por cliente"
      onSearch={onServiceOrderSearch}
      textSearch={textSearch}
      close={handleGoBack}
    >
      {loading ? (
        <LoaderBox>
          <Loader size={64} />
        </LoaderBox>
      ) : (
        <>
          <FlatList
            data={serviceOrderList}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 16 }}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <Spacer spaceVertical={16} />}
            ListFooterComponent={() => <Spacer spaceVertical={64} />}
            ListEmptyComponent={() => (
              <EmptyState
                title={emptyStateTexts.title}
                subtitle={emptyStateTexts.subtitle}
                action={emptyStateTexts.action}
                error={listState === requestStateEnum.ERROR}
              />
            )}
            onTouchEnd={() => fetchNextPage()}
            refreshControl={
              !reloading ? (
                <RefreshControl
                  onRefresh={refetch}
                  refreshing={reloading}
                  tintColor={colors.PRIMARY}
                />
              ) : undefined
            }
            renderItem={({ item }) => (
              <ServiceOrderCard
                data={item}
                onPress={() => handleGoToDetails(item.id)}
                footerLabel="Detalhes"
              />
            )}
          />
          <FabButton
            isFocused={isFocused}
            fabActions={fabActions}
            openedIcon="tools"
            closedIcon="toolbox"
          />
        </>
      )}
    </Layout>
  );
};
