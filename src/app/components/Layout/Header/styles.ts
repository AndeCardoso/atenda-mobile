import { Row } from "@components/base/Row";
import styled from "styled-components/native";

export const Container = styled.View<{ paddingTop: number }>`
  width: 100%;
  padding: 16px;
  padding-top: ${({ paddingTop }) => paddingTop}px;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.colors.PRIMARY};
  gap: 8px;
`;

export const ContainerTop = styled(Row)`
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding: 0 4px;
  gap: 24px;
`;

export const StyledRow = styled(Row)`
  flex: 1;
  width: auto;
  gap: 8px;
`;
