import React, { useState } from "react";
import { Layout } from "@components/Layout";
import { useTheme } from "styled-components";
import { FAB, Portal } from "react-native-paper";
import { FlatList, RefreshControl } from "react-native";
import { Spacer } from "@components/base/Spacer";
import { Loader } from "@components/base/Loader";
import { useIsFocused } from "@react-navigation/native";
import { LoaderBox } from "@components/base/Loader/styles";
import { useCustomersController } from "./useCustomersController";
import { CustomerCard } from "@components/cards/CustomerCard";
import { ICustomerModel } from "@model/entities/customer";

export const CustomersPage = () => {
  const { colors } = useTheme();
  const isFocused = useIsFocused();

  const {
    customerList,
    handleGoBack,
    onCustomerSearch,
    handleGoToDetails,
    fabActions,
    refetch,
    viewState: { loading, reloading },
  } = useCustomersController();

  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }: { open: boolean }) => setState({ open });
  const { open } = state;
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
            refreshControl={
              <RefreshControl
                onRefresh={refetch}
                refreshing={reloading}
                tintColor={colors.PRIMARY}
              />
            }
            renderItem={({ item }) => (
              <CustomerCard
                data={item as Partial<ICustomerModel>}
                onPress={() => handleGoToDetails(item.id)}
              />
            )}
          />
          <Portal>
            <FAB.Group
              open={open}
              visible={isFocused}
              icon={open ? "head-cog" : "head"}
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
