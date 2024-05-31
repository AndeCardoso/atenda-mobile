import React from "react";
import { Layout } from "@components/Layout";
import { useTheme } from "styled-components";
import { FlatList, RefreshControl } from "react-native";
import { Spacer } from "@components/base/Spacer";
import { Loader } from "@components/base/Loader";
import { LoaderBox } from "@components/base/Loader/styles";
import { useSelectTechnicianController } from "./useSelectTechnicianController";
import { TechnicianCard } from "@components/cards/TechnicianCard";
import { ITechnicianModel } from "@model/entities/technician";
import { EmptyState } from "@components/EmptyState";
import { requestStateEnum } from "app/constants/requestStates";
import { AbandonmentModal } from "../../components/AbandonmentModal";

export const SelectTechnicianPage = () => {
  const { colors } = useTheme();

  const {
    technicianList,
    handleGoBack,
    handleConfirmAbandonment,
    onAbandomentModalToggle,
    handleGoToRegister,
    onTechnicianSearch,
    emptyStateTexts,
    fetchNextPage,
    handleSelect,
    textSearch,
    refetch,
    viewState: {
      loading,
      reloading,
      loadingNextPage,
      listState,
      abandomentOpenModalState,
    },
  } = useSelectTechnicianController();

  return (
    <Layout
      header="Selecionar técnico"
      onRegister={handleGoToRegister}
      onSearch={onTechnicianSearch}
      textSearch={textSearch}
      goBack={handleGoBack}
      close={onAbandomentModalToggle}
      steps={{ total: 4, current: 3 }}
    >
      {loading ? (
        <LoaderBox>
          <Loader size={64} />
        </LoaderBox>
      ) : (
        <FlatList
          data={technicianList}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <Spacer spaceVertical={16} />}
          contentContainerStyle={{ padding: 16 }}
          onEndReached={() => fetchNextPage()}
          ListFooterComponent={() =>
            loadingNextPage ? (
              <Loader size={62} padding={64} />
            ) : (
              <Spacer spaceVertical={64} />
            )
          }
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
            <TechnicianCard
              data={item as Partial<ITechnicianModel>}
              footerLabel="Selecionar"
              onPress={() => handleSelect(item)}
            />
          )}
        />
      )}
      <AbandonmentModal
        onConfirm={handleConfirmAbandonment}
        onDismiss={onAbandomentModalToggle}
        open={abandomentOpenModalState}
      />
    </Layout>
  );
};
