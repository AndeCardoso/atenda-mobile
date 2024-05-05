import { Text } from "@components/base/Text";
import React from "react";
import { Card } from "@components/base/Card";
import { Row } from "@components/base/Row";
import { Chip } from "@components/base/Chip";
import { Divider } from "@components/base/Separator";
import { DisplayField } from "@components/base/DisplayField";
import { formatCellphoneNumber, formatCpf } from "@utils/formatString";
import { customerStatusDisplay } from "@pages/signedIn/customers/constants";
import { BottomContainer, ButtonLabel, CardContainer } from "./styles";
import { GestureResponderEvent } from "react-native";
import { useTheme } from "styled-components";
import { ICustomerModel } from "@model/entities/customer";
import { Icon } from "@components/base/Icon";

interface ICustomerCardProps {
  data: Partial<ICustomerModel>;
  onPress?: (e: GestureResponderEvent) => void;
}

export const CustomerCard = ({
  data: { name, document, phone, email, status },
  onPress,
}: ICustomerCardProps) => {
  const { colors } = useTheme();
  return (
    <Card
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
            {name}
          </Text>

          {status ? (
            <Chip
              text={customerStatusDisplay[status]}
              color="PRIMARY"
              textColor="SECONDARY"
            />
          ) : null}
        </Row>
        <Divider color="WHITE" />
        <BottomContainer>
          <DisplayField
            text="Documento"
            value={formatCpf(document)}
            color="WHITE"
          />
          <Row>
            <DisplayField text="E-mail" value={email} color="WHITE" />
            <DisplayField
              text="Celular"
              value={formatCellphoneNumber(phone)}
              color="WHITE"
            />
          </Row>
        </BottomContainer>
        <ButtonLabel>
          <Text color="WHITE" weight="600">
            Detalhes
          </Text>
          <Icon color="WHITE" name="arrow-right" />
        </ButtonLabel>
      </CardContainer>
    </Card>
  );
};
