import React, { useState } from "react";
import { Layout } from "@components/Layout";
import { useTheme } from "styled-components";
import { FAB, Portal } from "react-native-paper";
import { useEquipmentsController } from "./useEquipmentsController";
import { FlatList, RefreshControl } from "react-native";
import { Spacer } from "@components/base/Spacer";
import { Loader } from "@components/base/Loader";
import { useIsFocused } from "@react-navigation/native";
import { LoaderBox } from "@components/base/Loader/styles";
import { TechnicianCard } from "@components/cards/TechnicianCard";
import { EquipmentCard } from "@components/cards/EquipmentCard";
import { Icon } from "@components/base/Icon";

export const EquipmentsPage = () => {
  const { colors } = useTheme();
  const isFocused = useIsFocused();

  const {
    equipmentList,
    handleGoBack,
    onEquipmentSearch,
    handleGoToDetails,
    fetchNextPage,
    fabActions,
    refetch,
    viewState: { loading, reloading },
  } = useEquipmentsController();

  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }: { open: boolean }) => setState({ open });
  const { open } = state;

  return (
    <Layout
      header="Equipamentos"
      onSearch={onEquipmentSearch}
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
                onPress={() => handleGoToDetails(item.id)}
              />
            )}
          />
          <Portal>
            <FAB.Group
              open={open}
              visible={isFocused}
              icon={open ? "laptop" : "monitor-cellphone"}
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
