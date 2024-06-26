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
import { FabGroup } from "@components/base/FAB";
import { EmptyState } from "@components/EmptyState";
import { requestStateEnum } from "app/constants/requestStates";
import { StatusFilter } from "@components/base/StatusFilter";
import { equipmentStatusList } from "./constants";
import { Container } from "./styles";

export const EquipmentsPage = () => {
  const { colors } = useTheme();
  const isFocused = useIsFocused();

  const {
    equipmentList,
    handleGoBack,
    handleGoToRegister,
    onEquipmentSearch,
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
      isGeneralList,
    },
  } = useEquipmentsController();

  return (
    <Layout
      header="Equipamentos"
      onSearch={onEquipmentSearch}
      searchPlaceholder={
        isGeneralList ? "Busca por cliente" : "Busca por apelido"
      }
      textSearch={textSearch}
      close={handleGoBack}
    >
      <Container>
        <StatusFilter
          options={equipmentStatusList}
          selected={statusFilter as number}
          onSelected={onFilterStatus}
        />
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
              ListFooterComponent={() =>
                loadingNextPage ? (
                  <Loader size={62} padding={64} />
                ) : (
                  <Spacer spaceVertical={64} />
                )
              }
              onEndReached={() => fetchNextPage()}
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
                  hasCustomer={isGeneralList}
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
          </>
        )}
      </Container>
    </Layout>
  );
};
