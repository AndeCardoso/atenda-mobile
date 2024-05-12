import React from "react";
import { Layout } from "@components/Layout";
import { useTheme } from "styled-components";
import { FlatList, RefreshControl } from "react-native";
import { Spacer } from "@components/base/Spacer";
import { Loader } from "@components/base/Loader";
import { LoaderBox } from "@components/base/Loader/styles";
import { useSelectEquipmentController } from "./useSelectEquipmentController";
import { EquipmentCard } from "@components/cards/EquipmentCard";
import { IEquipmentModel } from "@model/entities/equipment";
import { EmptyState } from "@components/EmptyState";
import { requestStateEnum } from "app/constants/requestStates";

export const SelectEquipmentPage = () => {
  const { colors } = useTheme();

  const {
    equipmentList,
    handleGoBack,
    handleGoToRegister,
    onEquipmentSearch,
    emptyStateTexts,
    fetchNextPage,
    handleSelect,
    textSearch,
    refetch,
    viewState: { loading, reloading, listState },
  } = useSelectEquipmentController();

  return (
    <Layout
      header="Selecionar equipamento"
      onRegister={handleGoToRegister}
      onSearch={onEquipmentSearch}
      textSearch={textSearch}
      goBack={handleGoBack}
      close={handleGoBack}
      steps={{ total: 4, current: 2 }}
    >
      {loading ? (
        <LoaderBox>
          <Loader size={64} />
        </LoaderBox>
      ) : (
        <FlatList
          data={equipmentList}
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
            <EquipmentCard
              data={item as Partial<IEquipmentModel>}
              footerLabel="Selecionar"
              onPress={() => handleSelect(item)}
            />
          )}
        />
      )}
    </Layout>
  );
};
