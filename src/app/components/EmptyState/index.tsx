import React from "react";
import { Container } from "./style";
import { Image } from "react-native";
import { Text } from "@components/base/Text";
import { Button } from "@components/base/Button";
import { images } from "@assets/index";
interface IEmptyStateProps {
  title: string;
  subtitle?: string;
  action?: {
    text: string;
    onPress: (value?: string) => void;
  };
  secondary?: boolean;
  error?: boolean;
}
export const EmptyState = ({
  title,
  subtitle,
  action,
  secondary,
  error,
}: IEmptyStateProps) => {
  const renderImage = () => {
    if (secondary) {
      return (
        <Image
          source={images.feedback.emptyStateSecondary}
          resizeMode="contain"
          style={{ width: 150, height: 150 }}
        />
      );
    }

    if (error) {
      return (
        <Image
          source={images.feedback.errorState}
          resizeMode="contain"
          style={{ width: 250, height: 250 }}
        />
      );
    }

    return (
      <Image
        source={images.feedback.emptyState}
        resizeMode="contain"
        style={{ width: 250, height: 250 }}
      />
    );
  };
  return (
    <Container>
      {renderImage()}
      <Text size={20} weight="600" color="WHITE" textAlign="center">
        {error ? "Um erro inesperado aconteceu" : title}
      </Text>
      {error ? (
        <Text size={16} color="WHITE" textAlign="center">
          Aguarde alguns momentos e tente novamente
        </Text>
      ) : null}
      {!error && subtitle ? (
        <Text size={16} color="WHITE" textAlign="center">
          {subtitle}
        </Text>
      ) : null}
      {!error && action ? (
        <Button onPress={() => action.onPress()} mode="outlined">
          {action.text}
        </Button>
      ) : null}
    </Container>
  );
};
