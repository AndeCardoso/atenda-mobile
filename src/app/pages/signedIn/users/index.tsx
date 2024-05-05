import React from "react";
import { Layout } from "@components/Layout";
import { useTheme } from "styled-components";
import { FlatList, RefreshControl } from "react-native";
import { Spacer } from "@components/base/Spacer";
import { Loader } from "@components/base/Loader";
import { useIsFocused } from "@react-navigation/native";
import { LoaderBox } from "@components/base/Loader/styles";
import { useUsersController } from "./useUsersController";
import { UserCard } from "@components/cards/UserCard";
import { FabButton } from "@components/base/FAB";
import { EmptyState } from "@components/EmptyState";
import { requestStateEnum } from "app/constants/requestStates";

export const UsersPage = () => {
  const { colors } = useTheme();
  const isFocused = useIsFocused();

  const {
    userList,
    handleGoBack,
    onUserSearch,
    handleGoToDetails,
    fetchNextPage,
    fabActions,
    refetch,
    viewState: { loading, reloading, listState },
  } = useUsersController();

  return (
    <Layout header="Usuários" onSearch={onUserSearch} close={handleGoBack}>
      {loading ? (
        <LoaderBox>
          <Loader size={64} />
        </LoaderBox>
      ) : (
        <>
          <FlatList
            data={userList}
            keyExtractor={(item) => item.email}
            ItemSeparatorComponent={() => <Spacer spaceVertical={16} />}
            contentContainerStyle={{ padding: 16 }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <EmptyState
                title="Nenhum Usuário encontrado"
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
              <UserCard
                data={item}
                onPress={() => handleGoToDetails(item.id)}
              />
            )}
          />
          <FabButton
            isFocused={isFocused}
            fabActions={fabActions}
            openedIcon="key"
            closedIcon="account-key"
          />
        </>
      )}
    </Layout>
  );
};
