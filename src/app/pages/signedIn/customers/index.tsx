import React from "react";
import { Layout } from "@components/Layout";
import { useTheme } from "styled-components";
import { FlatList, RefreshControl } from "react-native";
import { Spacer } from "@components/base/Spacer";
import { Loader } from "@components/base/Loader";
import { useIsFocused } from "@react-navigation/native";
import { LoaderBox } from "@components/base/Loader/styles";
import { useCustomersController } from "./useCustomersController";
import { CustomerCard } from "@components/cards/CustomerCard";
import { ICustomerModel } from "@model/entities/customer";
import { FabGroup } from "@components/base/FAB";
import { EmptyState } from "@components/EmptyState";
import { requestStateEnum } from "app/constants/requestStates";
import { StatusFilter } from "@components/base/StatusFilter";
import { customerStatusList } from "./constants";
import { Container } from "./styles";

export const CustomersPage = () => {
  const { colors } = useTheme();
  const isFocused = useIsFocused();

  const {
    customerList,
    handleGoBack,
    handleGoToRegister,
    handleGoToDetails,
    onCustomerSearch,
    emptyStateTexts,
    onFilterStatus,
    fetchNextPage,
    statusFilter,
    textSearch,
    refetch,
    viewState: { loading, reloading, loadingNextPage, listState },
  } = useCustomersController();

  return (
    <Layout
      header="Clientes"
      onSearch={onCustomerSearch}
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
            options={customerStatusList}
            selected={statusFilter as number}
            onSelected={onFilterStatus}
          />
          <FlatList
            data={customerList}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <Spacer spaceVertical={16} />}
            contentContainerStyle={{ padding: 16 }}
            ListFooterComponent={() =>
              loadingNextPage ? (
                <Loader size={62} padding={64} />
              ) : (
                <Spacer spaceVertical={64} />
              )
            }
            onEndReached={() => fetchNextPage()}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <EmptyState
                title={emptyStateTexts.title}
                subtitle={emptyStateTexts.subtitle}
                action={emptyStateTexts.action}
                error={listState === requestStateEnum.ERROR}
              />
            )}
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
              <CustomerCard
                data={item as Partial<ICustomerModel>}
                footerLabel="Detalhes"
                onPress={() => handleGoToDetails(item.id)}
              />
            )}
          />
          <FabGroup
            isSingle
            isFocused={isFocused}
            icon="plus"
            onPress={handleGoToRegister}
          />
        </Container>
      )}
    </Layout>
  );
};
