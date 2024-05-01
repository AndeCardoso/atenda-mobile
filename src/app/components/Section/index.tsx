import React, { PropsWithChildren } from "react";
import { Container, StyledButton } from "./styles";
import { Text } from "@components/base/Text";
import { Row } from "@components/base/Row";

interface ISectionProps extends PropsWithChildren {
  title?: string;
  action?: TAction;
}

type TAction = {
  text: string;
  onPress: () => void;
};

export const Section = ({ title, action, children }: ISectionProps) => {
  return (
    <Container>
      <Row space="space-between">
        {title ? <Text color="WHITE">{title}</Text> : null}
        {action ? (
          <StyledButton onPress={action.onPress} mode="text">
            <Text color="WHITE" size={14}>
              {action.text}
            </Text>
          </StyledButton>
        ) : null}
      </Row>
      {children}
    </Container>
  );
};
