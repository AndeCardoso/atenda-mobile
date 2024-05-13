import { Text } from "@components/base/Text";
import React from "react";
import { Card } from "@components/base/Card";
import { Row } from "@components/base/Row";
import { Chip } from "@components/base/Chip";
import { Divider } from "@components/base/Separator";
import { DisplayField } from "@components/base/DisplayField";
import { serviceOrderStatusDisplay } from "@pages/signedIn/serviceOrders/constants";
import { BottomContainer, CardContainer } from "./styles";
import { GestureResponderEvent } from "react-native";
import { useTheme } from "styled-components";
import { IServiceOrderModel } from "@model/entities/serviceOrder";
import { formatDateToBrazilian } from "@utils/formatDate";

interface IServiceOrderCardProps {
  data: Partial<IServiceOrderModel>;
  footerLabel?: string;
  onPress?: (e: GestureResponderEvent) => void;
}

export const ServiceOrderCard = ({
  data: { id, created_at, customer, equipment, status },
  footerLabel,
  onPress,
}: IServiceOrderCardProps) => {
  const { colors } = useTheme();
  return (
    <Card
      footerLabel={footerLabel}
      onPress={onPress && onPress}
      style={{ backgroundColor: colors.SECONDARY_INACTIVE }}
    >
      <CardContainer>
        <Row space="space-between">
          <Text
            color="WHITE"
            size={24}
            weight="700"
            numberOfLines={1}
            fullwidth
          >
            Nº: {id}
          </Text>

          {status ? (
            <Chip
              text={serviceOrderStatusDisplay[status]}
              color="PRIMARY"
              textColor="SECONDARY"
            />
          ) : null}
        </Row>
        <Divider color="WHITE" />
        <BottomContainer>
          <Row>
            <DisplayField text="Cliente" value={customer?.name} color="WHITE" />
            <DisplayField
              text="Aberto em"
              value={formatDateToBrazilian(created_at!!)}
              color="WHITE"
            />
          </Row>
          <DisplayField
            text="Equipamento"
            value={equipment?.nickname}
            color="WHITE"
          />
          <Row>
            <DisplayField text="Marca" value={equipment?.brand} color="WHITE" />
            <DisplayField
              text="Modelo"
              value={equipment?.model}
              color="WHITE"
            />
          </Row>
        </BottomContainer>
      </CardContainer>
    </Card>
  );
};
