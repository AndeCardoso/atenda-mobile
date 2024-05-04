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
import { FabButton } from "@components/base/FAB";
import { EmptyState } from "@components/EmptyState";

export const CustomersPage = () => {
  const { colors } = useTheme();
  const isFocused = useIsFocused();

  const {
    customerList,
    handleGoBack,
    onCustomerSearch,
    handleGoToDetails,
    emptyStateTexts,
    fabActions,
    refetch,
    viewState: { loading, reloading },
  } = useCustomersController();

  return (
    <Layout header="Clientes" onSearch={onCustomerSearch} close={handleGoBack}>
      {loading ? (
        <LoaderBox>
          <Loader size={64} />
        </LoaderBox>
      ) : (
        <>
          <FlatList
            data={customerList}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <Spacer spaceVertical={16} />}
            contentContainerStyle={{ padding: 16 }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <EmptyState
                title={emptyStateTexts.title}
                subtitle={emptyStateTexts.subtitle}
                action={emptyStateTexts.action}
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
                onPress={() => handleGoToDetails(item.id)}
              />
            )}
          />
          <FabButton
            isFocused={isFocused}
            fabActions={fabActions}
            openedIcon="head-cog"
            closedIcon="head"
          />
        </>
      )}
    </Layout>
  );
};
