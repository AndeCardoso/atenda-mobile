import { Text } from "@components/base/Text";
import React, { memo } from "react";
import { Card } from "@components/base/Card";
import { Divider } from "@components/base/Separator";
import { DisplayField } from "@components/base/DisplayField";
import { CardContainer } from "./styles";
import { GestureResponderEvent } from "react-native";
import { useTheme } from "styled-components";
import { IUserModel } from "@model/entities/user";
import { Chip } from "@components/base/Chip";
import { Row } from "@components/base/Row";

interface IUserCardProps {
  data: Partial<IUserModel>;
  footerLabel?: string;
  onPress?: (e: GestureResponderEvent) => void;
}

export const UserCard = memo(
  ({ data: { name, email, admin }, footerLabel, onPress }: IUserCardProps) => {
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
              {name}
            </Text>

            {admin ? (
              <Chip
                text="Administrador"
                color="PRIMARY"
                textColor="SECONDARY"
              />
            ) : null}
          </Row>
          <Divider color="WHITE" />
          <DisplayField text="E-mail" value={email} color="WHITE" />
        </CardContainer>
      </Card>
    );
  }
);
