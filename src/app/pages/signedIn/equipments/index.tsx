import React from "react";
import { Layout } from "@components/Layout";
import { useTheme } from "styled-components";
import { useEquipmentsController } from "./useEquipmentsController";
import { FlatList, RefreshControl } from "react-native";
import { Spacer } from "@components/base/Spacer";
import { Loader } from "@components/base/Loader";
import { useIsFocused } from "@react-navigation/native";
import { LoaderBox } from "@components/base/Loader/styles";
import { EquipmentCard } from "@components/cards/EquipmentCard";
import { FabButton } from "@components/base/FAB";
import { EmptyState } from "@components/EmptyState";
import { requestStateEnum } from "app/constants/requestStates";

export const EquipmentsPage = () => {
  const { colors } = useTheme();
  const isFocused = useIsFocused();

  const {
    equipmentList,
    handleGoBack,
    onEquipmentSearch,
    handleGoToDetails,
    emptyStateTexts,
    fetchNextPage,
    fabActions,
    textSearch,
    refetch,
    viewState: { loading, reloading, listState },
  } = useEquipmentsController();

  return (
    <Layout
      header="Equipamentos"
      onSearch={onEquipmentSearch}
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
            data={equipmentList}
            keyExtractor={(item) => item.serialNumber.toString()}
            ItemSeparatorComponent={() => <Spacer spaceVertical={16} />}
            contentContainerStyle={{ padding: 16 }}
            showsVerticalScrollIndicator={false}
            onTouchEnd={() => fetchNextPage()}
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
                data={item}
                footerLabel="Detalhes"
                onPress={() => handleGoToDetails(item.id)}
              />
            )}
          />
          <FabButton
            isFocused={isFocused}
            fabActions={fabActions}
            openedIcon="laptop"
            closedIcon="monitor-cellphone"
          />
        </>
      )}
    </Layout>
  );
};
