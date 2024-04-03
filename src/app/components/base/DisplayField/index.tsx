import { Text } from "../Text";
import { Container } from "./styles";

interface IDisplayFieldProps {
  text: string;
  value?: string | number;
}

export const DisplayField = ({ text, value }: IDisplayFieldProps) => {
  return (
    <Container>
      <Text color="WHITE" size={14}>
        {text}
      </Text>
      {value ? (
        <Text color="WHITE" size={18} weight="500">
          {value}
        </Text>
      ) : null}
    </Container>
  );
};
