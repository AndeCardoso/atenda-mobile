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
import { StatusFilter } from "@components/base/StatusFilter";
import { serviceOrderStatusList } from "./constants";
import { Container } from "./styles";

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
    onFilterStatus,
    fetchNextPage,
    statusFilter,
    textSearch,
    refetch,
    viewState: {
      loading,
      reloading,
      loadingNextPage,
      listState,
      showNewRegisterButton,
    },
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
        <Container>
          <StatusFilter
            options={serviceOrderStatusList}
            selected={statusFilter as number}
            onSelected={onFilterStatus}
          />
          <FlatList
            data={serviceOrderList}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 16 }}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <Spacer spaceVertical={16} />}
            ListFooterComponent={() =>
              loadingNextPage ? (
                <Loader size={62} padding={64} />
              ) : (
                <Spacer spaceVertical={128} />
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
            onEndReached={() => fetchNextPage()}
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
          {showNewRegisterButton ? (
            <FabGroup
              isSingle
              isFocused={isFocused}
              icon="plus"
              onPress={handleGoToRegister}
            />
          ) : null}
        </Container>
      )}
    </Layout>
  );
};
