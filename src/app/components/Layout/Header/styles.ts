import { Row } from "@components/base/Row";
import { Text } from "@components/base/Text";
import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  padding: 16px;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.colors.PRIMARY};
  gap: 16px;
`;

export const ContainerTop = styled(Row)`
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  gap: 24px;
`;

export const StyledRow = styled(Row)`
  width: auto;
  gap: 16px;
`;
