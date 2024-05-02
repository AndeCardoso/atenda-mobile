import styled from "styled-components/native";
import { Text } from "../Text";

export const Container = styled.View`
  flex: 1;
  gap: 4px;
`;
export const TextValue = styled(Text)<{ isEmpty: boolean }>`
  margin-left: ${({ isEmpty }) => (isEmpty ? "24px" : 0)};
`;
