import React from "react";
import { Layout } from "@components/Layout";
import { useTheme } from "styled-components";
import { useTechniciansController } from "./useTechniciansController";
import { FlatList, RefreshControl } from "react-native";
import { Spacer } from "@components/base/Spacer";
import { Loader } from "@components/base/Loader";
import { useIsFocused } from "@react-navigation/native";
import { LoaderBox } from "@components/base/Loader/styles";
import { TechnicianCard } from "@components/cards/TechnicianCard";
import { FabGroup } from "@components/base/FAB";
import { EmptyState } from "@components/EmptyState";
import { requestStateEnum } from "app/constants/requestStates";

export const TechniciansPage = () => {
  const { colors } = useTheme();
  const isFocused = useIsFocused();

  const {
    technicianList,
    handleGoBack,
    handleGoToRegister,
    onTechnicianSearch,
    handleGoToDetails,
    emptyStateTexts,
    fetchNextPage,
    textSearch,
    refetch,
    viewState: { loading, reloading, loadingNextPage, listState },
  } = useTechniciansController();

  return (
    <Layout
      header="Técnicos"
      onSearch={onTechnicianSearch}
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
            data={technicianList}
            keyExtractor={(item) => item.cpf.toString()}
            ItemSeparatorComponent={() => <Spacer spaceVertical={16} />}
            contentContainerStyle={{ padding: 16 }}
            showsVerticalScrollIndicator={false}
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
              <TechnicianCard
                data={item}
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
        </>
      )}
    </Layout>
  );
};
