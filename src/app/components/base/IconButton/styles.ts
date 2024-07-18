import styled from "styled-components/native";
import { Row } from "../Row";

export const ModalContainer = styled.View`
  margin: 64px 16px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.SECONDARY_INACTIVE};
`;

export const Header = styled(Row)`
  width: 100%;
  justify-content: space-between;
  padding: 24px 32px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  background-color: ${({ theme }) => theme.colors.PRIMARY};
`;

export const Content = styled.View``;
