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
import { FabButton } from "@components/base/FAB";

export const TechniciansPage = () => {
  const { colors } = useTheme();
  const isFocused = useIsFocused();

  const {
    technicianList,
    handleGoBack,
    onTechnicianSearch,
    handleGoToDetails,
    fetchNextPage,
    fabActions,
    refetch,
    viewState: { loading, reloading },
  } = useTechniciansController();

  return (
    <Layout
      header="Técnicos"
      onSearch={onTechnicianSearch}
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
                onPress={() => handleGoToDetails(item.id)}
              />
            )}
          />
          <FabButton
            isFocused={isFocused}
            fabActions={fabActions}
            openedIcon="tools"
            closedIcon="toolbox"
          />
        </>
      )}
    </Layout>
  );
};
