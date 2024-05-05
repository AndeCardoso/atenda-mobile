import { Text } from "@components/base/Text";
import React from "react";
import { Card } from "@components/base/Card";
import { Divider } from "@components/base/Separator";
import { DisplayField } from "@components/base/DisplayField";
import { ButtonLabel, CardContainer } from "./styles";
import { GestureResponderEvent } from "react-native";
import { useTheme } from "styled-components";
import { IUserModel } from "@model/entities/user";
import { Chip } from "@components/base/Chip";
import { Row } from "@components/base/Row";
import { Icon } from "@components/base/Icon";

interface IUserCardProps {
  data: Partial<IUserModel>;
  onPress?: (e: GestureResponderEvent) => void;
}

export const UserCard = ({
  data: { name, email, admin },
  onPress,
}: IUserCardProps) => {
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

          {admin ? (
            <Chip text="Administrador" color="PRIMARY" textColor="SECONDARY" />
          ) : null}
        </Row>
        <Divider color="WHITE" />
        <DisplayField text="E-mail" value={email} color="WHITE" />
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
