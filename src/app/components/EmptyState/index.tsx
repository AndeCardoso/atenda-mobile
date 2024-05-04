import React from "react";
import { Container } from "./style";
import { Image } from "react-native";
import { Text } from "@components/base/Text";
import { Button } from "@components/base/Button";
interface IEmptyStateProps {
  title: string;
  subtitle?: string;
  action?: {
    text: string;
    onPress: (value?: string) => void;
  };
}
export const EmptyState = ({ title, subtitle, action }: IEmptyStateProps) => {
  return (
    <Container>
      <Image
        source={require("../../assets/empty-state.png")}
        resizeMode="contain"
        style={{ width: 250, height: 250 }}
      />
      <Text size={20} weight="600" color="WHITE" textAlign="center">
        {title}
      </Text>
      {subtitle ? (
        <Text size={16} color="WHITE" textAlign="center">
          {subtitle}
        </Text>
      ) : null}
      {action ? (
        <Button onPress={() => action.onPress()}>{action.text}</Button>
      ) : null}
    </Container>
  );
};
