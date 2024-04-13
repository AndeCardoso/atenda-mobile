import React, { useState } from "react";
import { Layout } from "@components/Layout";
import { useTheme } from "styled-components";
import { FAB, Portal } from "react-native-paper";
import { useTechniciansController } from "./useTechniciansController";
import { FlatList, RefreshControl } from "react-native";
import { Spacer } from "@components/base/Spacer";
import { Loader } from "@components/base/Loader";
import { useIsFocused } from "@react-navigation/native";
import { LoaderBox } from "@components/base/Loader/styles";
import { TechnicianCard } from "@components/cards/TechnicianCard";

export const TechniciansPage = () => {
  const { colors } = useTheme();
  const isFocused = useIsFocused();

  const {
    technicianList,
    handleGoBack,
    onTechnicianSearch,
    handleGoToDetails,
    fabActions,
    refetch,
    viewState: { loading, reloading },
  } = useTechniciansController();

  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }: { open: boolean }) => setState({ open });
  const { open } = state;

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
            refreshControl={
              <RefreshControl
                onRefresh={refetch}
                refreshing={reloading}
                tintColor={colors.PRIMARY}
              />
            }
            renderItem={({ item }) => (
              <TechnicianCard
                data={item}
                onPress={() => handleGoToDetails(item.id)}
              />
            )}
          />
          <Portal>
            <FAB.Group
              open={open}
              visible={isFocused}
              icon={open ? "tools" : "toolbox"}
              actions={fabActions}
              fabStyle={{
                borderRadius: 50,
                backgroundColor: open ? colors.SECONDARY : colors.PRIMARY,
                marginRight: 32,
              }}
              color={open ? colors.PRIMARY : colors.SECONDARY}
              onStateChange={onStateChange}
            />
          </Portal>
        </>
      )}
    </Layout>
  );
};
