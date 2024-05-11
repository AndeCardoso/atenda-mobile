import { Linking } from "react-native";
import { Row } from "../Row";
import { Text } from "../Text";
import { Container, TextValue } from "./styles";
import { IconButton } from "../IconButton";
import { Colors } from "@global/styles/colors";
import * as Clipboard from "expo-clipboard";
import { useToast } from "@hooks/useToast";

interface IDisplayFieldProps {
  text: string;
  value?: string | number;
  color?: Colors;
  hasCopy?: boolean;
  hasCall?: boolean;
  goToButton?: () => void;
}

export const DisplayField = ({
  text,
  value,
  color = "WHITE",
  hasCopy,
  hasCall,
  goToButton,
}: IDisplayFieldProps) => {
  const { createToast } = useToast();

  const onCopyValue = async () => {
    if (value) {
      const res = await Clipboard.setStringAsync(value?.toString());

      if (res) {
        createToast({
          message: `${text} copiado com sucesso`,
          alertType: "success",
        });
      } else {
        createToast({
          message: `Aconteceu algo errado ao copiar ${text}`,
          alertType: "error",
        });
      }
    }
  };

  const onCallValue = () => {
    Linking.openURL(`tel:${value}`);
  };

  return (
    <Container>
      <Text color="WHITE_TEXT" size={14}>
        {text}:
      </Text>
      <Row>
        <TextValue color={color} size={18} weight="700" isEmpty={!value}>
          {value || "--"}
        </TextValue>
        {goToButton ? (
          <IconButton
            name="file-move"
            size={20}
            color={color}
            onPress={goToButton}
          />
        ) : null}
        {hasCopy ? (
          <IconButton
            name="content-copy"
            size={20}
            color={color}
            onPress={onCopyValue}
          />
        ) : null}
        {hasCall ? (
          <IconButton
            name="phone"
            size={20}
            color={color}
            onPress={onCallValue}
          />
        ) : null}
      </Row>
    </Container>
  );
};
