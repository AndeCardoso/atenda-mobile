import styled from "styled-components/native";
import { Row } from "../Row";

export const Conatiner = styled(Row)`
  width: auto;
  padding: 4px 16px 4px 4px;
  border-radius: 30px;
  border: 2.5px solid ${({ theme }) => theme.colors.SECONDARY};
`;

export const IconWrapper = styled.View`
  width: auto;
  padding: 4px;
  border-radius: 30px;
  border: 1px solid ${({ theme }) => theme.colors.SECONDARY};
`;

export const NamesWrapper = styled.View`
  width: auto;
`;
