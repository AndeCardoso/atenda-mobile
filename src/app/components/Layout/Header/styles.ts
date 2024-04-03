import { Row } from "@components/base/Row";
import styled from "styled-components/native";

export const Container = styled(Row)`
  width: 100%;
  height: 10%;
  padding: 24px;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.PRIMARY};
  gap: 24px;
`;

export const StyledRow = styled(Row)`
  width: auto;
  gap: 16px;
`;
