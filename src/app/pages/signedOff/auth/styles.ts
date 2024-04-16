import { Row } from "@components/base/Row";
import styled from "styled-components/native";

export const Layout = styled.View`
  flex: 1 100%;
  padding: 16px;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.SECONDARY};
`;

export const WrapperTop = styled.View`
  width: 100%;
  align-items: center;
`;

export const WrapperButtons = styled(Row)`
  margin-bottom: 24px;
  background-color: ${({ theme }) => theme.colors.SECUNDARY};
  gap: 8px;
`;
