import { Text } from "@components/base/Text";
import React, { memo } from "react";
import { Card } from "@components/base/Card";
import { Row } from "@components/base/Row";
import { Chip } from "@components/base/Chip";
import { Divider } from "@components/base/Separator";
import { DisplayField } from "@components/base/DisplayField";
import { equipmentStatusDisplay } from "@pages/signedIn/equipments/constants";
import { BottomContainer, CardContainer } from "./styles";
import { GestureResponderEvent } from "react-native";
import { useTheme } from "styled-components";
import { IEquipmentModel } from "@model/entities/equipment";

interface IEquipmentCardProps {
  data: Partial<IEquipmentModel>;
  footerLabel?: string;
  onPress?: (e: GestureResponderEvent) => void;
}

export const EquipmentCard = memo(
  ({
    data: { nickname, brand, model, voltage, accessories, status },
    footerLabel,
    onPress,
  }: IEquipmentCardProps) => {
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
              {nickname}
            </Text>

            {status ? (
              <Chip
                text={equipmentStatusDisplay[status]}
                color="PRIMARY"
                textColor="SECONDARY"
              />
            ) : null}
          </Row>
          <Divider color="WHITE" />
          <BottomContainer>
            <Row>
              <DisplayField text="Marca" value={brand} color="WHITE" />
              <DisplayField text="Modelo" value={model} color="WHITE" />
            </Row>
            <Row>
              <DisplayField
                text="Acessórios"
                value={accessories}
                color="WHITE"
              />
              <DisplayField text="Voltagem" value={voltage} color="WHITE" />
            </Row>
          </BottomContainer>
        </CardContainer>
      </Card>
    );
  }
);
