import React, { PropsWithChildren } from "react";
import { Container } from "./styles";
import { Text } from "@components/base/Text";
import { Row } from "@components/base/Row";
import { Button } from "@components/base/Button";

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
          <Button onPress={action.onPress} mode="text">
            <Text color="WHITE" size={14}>
              {action.text}
            </Text>
          </Button>
        ) : null}
      </Row>
      {children}
    </Container>
  );
};
