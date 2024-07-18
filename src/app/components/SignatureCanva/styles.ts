import { Canvas } from "@shopify/react-native-skia";
import ViewShot from "react-native-view-shot";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1 100%;
  gap: 16px;
  background-color: ${({ theme }) => theme.colors.SECONDARY};
`;

export const PrintBox = styled(ViewShot)`
  flex: 1 100%;
`;

export const StyledCanvas = styled(Canvas)`
  flex: 1;
  border: 3px solid ${({ theme }) => theme.colors.SECONDARY_INACTIVE};
  background-color: ${({ theme }) => theme.colors.SECONDARY};
`;
