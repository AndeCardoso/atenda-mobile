import React from "react";
import { Container } from "./styles";
import { Text } from "@components/base/Text";
import { Button } from "@components/base/Button";

interface IEmptyStateSectionProps {
  title: string;
  subtitle?: string;
  action?: TAction;
}

type TAction = {
  text: string;
  onPress: () => void;
};

export const EmptyStateSection = ({
  title,
  subtitle,
  action,
}: IEmptyStateSectionProps) => {
  return (
    <Container>
      <Text color="SECONDARY_INACTIVE" size={20} weight="700">
        {title}
      </Text>
      {subtitle ? (
        <Text color="SECONDARY_INACTIVE" size={16}>
          {subtitle}
        </Text>
      ) : null}
      {action ? (
        <Button onPress={action.onPress} mode="contained">
          {action.text}
        </Button>
      ) : null}
    </Container>
  );
};
