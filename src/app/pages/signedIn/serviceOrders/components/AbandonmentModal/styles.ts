import { Row } from "@components/base/Row";
import styled from "styled-components/native";

export const ModalContainer = styled.View`
  flex: auto;
  max-height: 90%;
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

export const Content = styled.View`
  flex: 1 auto;
  gap: 16px;
  padding: 16px;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.SECONDARY};
`;

export const Footer = styled(Row)`
  padding: 16px 8px;
  justify-content: space-between;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  background-color: ${({ theme }) => theme.colors.SECONDARY};
`;
