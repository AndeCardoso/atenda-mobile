import { Canvas } from "@shopify/react-native-skia";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1 100%;
  background-color: ${({ theme }) => theme.colors.SECONDARY};
`;

export const StyledCanvas = styled(Canvas)`
  flex: 1;
  margin-top: 16px;
  border: 3px solid ${({ theme }) => theme.colors.SECONDARY_INACTIVE};
  background-color: ${({ theme }) => theme.colors.SECONDARY};
`;
