import { Linking } from "react-native";
import { Row } from "../Row";
import { Text } from "../Text";
import { Container } from "./styles";
import { IconButton } from "../IconButton";
import { Colors } from "@global/styles/colors";
import Clipboard from "@react-native-clipboard/clipboard";

interface IDisplayFieldProps {
  text: string;
  value?: string | number;
  color?: Colors;
  hasCopy?: boolean;
  hasCall?: boolean;
}

export const DisplayField = ({
  text,
  value,
  color = "WHITE",
  hasCopy,
  hasCall,
}: IDisplayFieldProps) => {
  const onCopyValue = () => {
    if (value) Clipboard.setString(value?.toString());
  };

  const onCallValue = () => {
    Linking.openURL(`tel:${value}`);
  };

  return (
    <Container>
      <Text color={color} size={14}>
        {text}:
      </Text>
      <Row>
        {value ? (
          <Text color={color} size={18} weight="700">
            {value}
          </Text>
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
