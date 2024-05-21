import React from "react";
import { Layout } from "@components/Layout";
import { useTheme } from "styled-components";
import { useServiceOrderController } from "./useServiceOrderController";
import { FlatList, RefreshControl } from "react-native";
import { Spacer } from "@components/base/Spacer";
import { Loader } from "@components/base/Loader";
import { useIsFocused } from "@react-navigation/native";
import { LoaderBox } from "@components/base/Loader/styles";
import { FabGroup } from "@components/base/FAB";
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
    handleGoToRegister,
    handleGoToDetails,
    emptyStateTexts,
    fetchNextPage,
    textSearch,
    refetch,
    viewState: { loading, reloading, loadingNextPage, listState },
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
            ListFooterComponent={() =>
              loadingNextPage ? (
                <Loader size={32} />
              ) : (
                <Spacer spaceVertical={64} />
              )
            }
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
          <FabGroup
            isSingle
            isFocused={isFocused}
            icon="plus"
            onPress={handleGoToRegister}
          />
        </>
      )}
    </Layout>
  );
};
