import React, { PropsWithChildren } from "react";
import { Container, StyledButton, Title } from "./styles";
import { Text } from "@components/base/Text";
import { Row } from "@components/base/Row";
import { View } from "react-native";

interface ISectionProps extends PropsWithChildren {
  title?: string;
  action?: TAction;
  fullwidth?: boolean;
}

type TAction = {
  text: string;
  onPress: () => void;
};

export const Section = ({
  title,
  action,
  fullwidth,
  children,
}: ISectionProps) => {
  return (
    <Container fullwidth={fullwidth}>
      <Title>
        {title ? <Text color="WHITE">{title}</Text> : null}
        {action ? (
          <StyledButton onPress={action.onPress}>
            <Text
              color="WHITE"
              size={14}
              style={{ textDecorationLine: "underline" }}
            >
              {action.text}
            </Text>
          </StyledButton>
        ) : null}
      </Title>
      {children}
    </Container>
  );
};
