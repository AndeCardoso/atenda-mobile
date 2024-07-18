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
import { FabGroup } from "@components/base/FAB";
import { EmptyState } from "@components/EmptyState";
import { requestStateEnum } from "app/constants/requestStates";

export const UsersPage = () => {
  const { colors } = useTheme();
  const isFocused = useIsFocused();

  const {
    userList,
    handleGoToRegister,
    handleGoToDetails,
    fetchNextPage,
    handleGoBack,
    onUserSearch,
    refetch,
    viewState: { loading, reloading, loadingNextPage, listState },
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
            ListFooterComponent={() =>
              loadingNextPage ? (
                <Loader size={62} padding={64} />
              ) : (
                <Spacer spaceVertical={64} />
              )
            }
            ListEmptyComponent={() => (
              <EmptyState
                title="Nenhum Usuário encontrado"
                error={listState === requestStateEnum.ERROR}
              />
            )}
            onEndReached={() => fetchNextPage()}
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
