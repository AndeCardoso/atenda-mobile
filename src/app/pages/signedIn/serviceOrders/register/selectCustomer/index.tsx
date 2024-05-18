import React from "react";
import { Layout } from "@components/Layout";
import { useTheme } from "styled-components";
import { FlatList, RefreshControl } from "react-native";
import { Spacer } from "@components/base/Spacer";
import { Loader } from "@components/base/Loader";
import { LoaderBox } from "@components/base/Loader/styles";
import { useSelectCustomerController } from "./useSelectCustomerController";
import { CustomerCard } from "@components/cards/CustomerCard";
import { ICustomerModel } from "@model/entities/customer";
import { EmptyState } from "@components/EmptyState";
import { requestStateEnum } from "app/constants/requestStates";

export const SelectCustomerPage = () => {
  const { colors } = useTheme();

  const {
    customerList,
    handleGoBack,
    handleGoToRegister,
    onCustomerSearch,
    emptyStateTexts,
    fetchNextPage,
    handleSelect,
    textSearch,
    refetch,
    viewState: { loading, reloading, listState },
  } = useSelectCustomerController();

  return (
    <Layout
      header="Selecionar cliente"
      onRegister={handleGoToRegister}
      onSearch={onCustomerSearch}
      textSearch={textSearch}
      goBack={handleGoBack}
      close={handleGoBack}
      steps={{ total: 4, current: 1 }}
    >
      {loading ? (
        <LoaderBox>
          <Loader size={64} />
        </LoaderBox>
      ) : (
        <FlatList
          data={customerList}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <Spacer spaceVertical={16} />}
          contentContainerStyle={{ padding: 16 }}
          onTouchEnd={() => fetchNextPage()}
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
              footerLabel="Selecionar"
              onPress={() => handleSelect(item)}
            />
          )}
        />
      )}
    </Layout>
  );
};
