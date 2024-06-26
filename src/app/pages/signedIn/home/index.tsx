import React from "react";
import { Layout } from "@components/Layout";
import { useHomeController } from "./useHomeController";
import { useIsFocused } from "@react-navigation/native";
import { Text } from "@components/base/Text";
import { Section } from "@components/Section";
import { Card } from "@components/base/Card";
import { FabGroup } from "@components/base/FAB";
import { Loader } from "@components/base/Loader";
import { Carousel } from "@components/base/Carousel";
import { EquipmentCard } from "@components/cards/EquipmentCard";
import { ServiceOrderCard } from "@components/cards/ServiceOrderCard";
import { ServiceOrderGetResponseDTO } from "@services/serviceOrder/dtos/response/ServiceOrderGetResponseDTO";
import { EquipmentGetResponseDTO } from "@services/equipment/dtos/response/EquipmentGetResponseDTO";
import { EmptyStateSection } from "./components/EmptyStateSection";
import { DatasSection } from "./components/DatasSection";
import { Divider } from "@components/base/Separator";
import { AdvertiseCard, Container } from "./styles";

export const HomePage = () => {
  const isFocused = useIsFocused();

  const {
    userData,
    fabActions,
    dataInfosData,
    advertiseData,
    equipmentQueueData,
    serviceOrderOpenedListData,
    handleGoToServiceOrders,
    handleGoToEquipmentDetails,
    handleGoToServiceOrderDetails,
    handleGoToServiceOrdersRegister,
    viewState: {
      isLoadingAdvertise,
      isLoadingServiceOrderOpenedList,
      isLoadingEquipmentQueue,
      isLoadingDataInfos,
    },
  } = useHomeController();

  return (
    <Layout
      hasBrand
      showProfile
      hasScroll
      headerComponent={
        <Text size={24} weight="700" color="SECONDARY">
          Seja bem vindo, {userData?.name}!
        </Text>
      }
    >
      <Container>
        {isLoadingAdvertise ? (
          <Loader size={64} />
        ) : advertiseData ? (
          <>
            <Section title="Notificações" fullwidth>
              <AdvertiseCard color="SECONDARY_INACTIVE">
                <Text weight="600" size={24} color="WHITE">
                  {advertiseData?.message}
                </Text>
              </AdvertiseCard>
            </Section>
            <Divider spaceVertical={16} horizontalPadding={16} />
          </>
        ) : null}

        <Section title="Dados gerais de O.S." fullwidth>
          {isLoadingDataInfos ? (
            <Loader />
          ) : dataInfosData ? (
            <DatasSection data={dataInfosData} />
          ) : null}
        </Section>
        <Divider spaceVertical={16} horizontalPadding={16} />
        <Section
          title="Próximas O.S. em aberto"
          action={{ text: "Ver mais", onPress: handleGoToServiceOrders }}
          fullwidth
        >
          {isLoadingServiceOrderOpenedList ? (
            <Loader size={64} />
          ) : serviceOrderOpenedListData &&
            serviceOrderOpenedListData.length > 0 ? (
            <Carousel
              height={248}
              data={serviceOrderOpenedListData}
              renderComponent={(item: ServiceOrderGetResponseDTO) => (
                <ServiceOrderCard
                  data={item}
                  footerLabel="Detalhes"
                  onPress={() => handleGoToServiceOrderDetails(item.id)}
                  key={item.id.toString()}
                />
              )}
            />
          ) : (
            <EmptyStateSection
              title="Nenhuma O.S. em aberto"
              subtitle="Abra uma nova ordem de serviço pelo botão abaixo"
              action={{
                text: "Cadastrar nova O.S.",
                onPress: handleGoToServiceOrdersRegister,
              }}
            />
          )}
        </Section>

        <Section title="Equipamentos na fila" fullwidth>
          {isLoadingEquipmentQueue ? (
            <Loader size={64} />
          ) : equipmentQueueData && equipmentQueueData.length > 0 ? (
            <Carousel
              height={328}
              data={equipmentQueueData}
              renderComponent={(item: EquipmentGetResponseDTO) => (
                <EquipmentCard
                  key={item.id.toString()}
                  data={item}
                  footerLabel="Detalhes"
                  onPress={() => handleGoToEquipmentDetails(item.id)}
                  unbreakable
                  hasCustomer
                />
              )}
            />
          ) : (
            <EmptyStateSection title="Nenhum equipamento na fila" />
          )}
        </Section>
      </Container>
      <FabGroup
        isFocused={isFocused}
        fabActions={fabActions}
        openedIcon="close"
        closedIcon="menu"
      />
    </Layout>
  );
};
