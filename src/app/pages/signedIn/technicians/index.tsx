import React, { useState } from "react";
import { Layout } from "@components/Layout";
import { useTheme } from "styled-components";
import { FAB, Portal } from "react-native-paper";
import { useTechniciansController } from "./useTechniciansController";
import { FlatList } from "react-native";
import { Text } from "@components/base/Text";
import { Card } from "@components/base/Card";
import { Spacer } from "@components/base/Spacer";
import {
  technicianPositionDisplay,
  technicianStatusDisplay,
} from "./constants";
import { formatCellphoneNumber, formatCpf } from "@utils/formatString";
import { Loader } from "@components/base/Loader";
import { useIsFocused } from "@react-navigation/native";

export const TechniciansPage = () => {
  const { colors } = useTheme();
  const isFocused = useIsFocused();

  const {
    technicianList,
    handleGoBack,
    onTechnicianSearch,
    handleGoToDetails,
    fabActions,
    viewState: { loading },
  } = useTechniciansController();

  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }: { open: boolean }) => setState({ open });
  const { open } = state;

  return (
    <Layout header="Técnicos" close={handleGoBack}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <FlatList
            data={technicianList}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <Spacer spaceVertical={16} />}
            contentContainerStyle={{ padding: 16 }}
            renderItem={({ item }) => (
              <Card onPress={() => handleGoToDetails(item.id)}>
                <Text color="WHITE" size={24} weight="600">
                  {item.name}
                </Text>
                <Text color="WHITE" size={14}>
                  CPF:
                </Text>
                <Text color="WHITE">{formatCpf(item.cpf)}</Text>
                <Text color="WHITE" size={14}>
                  Celular:
                </Text>
                <Text color="WHITE">{formatCellphoneNumber(item.phone)}</Text>
                <Text color="WHITE">
                  {technicianPositionDisplay[item.position]}
                </Text>
                <Text color="WHITE" size={14}>
                  Status:
                </Text>
                <Text color="WHITE">
                  {item.status && technicianStatusDisplay[item.status]}
                </Text>
              </Card>
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
                backgroundColor: colors.PRIMARY,
                marginRight: 32,
              }}
              color={colors.SECONDARY}
              onStateChange={onStateChange}
            />
          </Portal>
        </>
      )}
    </Layout>
  );
};
