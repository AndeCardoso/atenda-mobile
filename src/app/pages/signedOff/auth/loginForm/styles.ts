import { Button } from "@components/base/Button";
import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  align-items: center;
  padding: 32px;
  gap: 16px;
  margin: 32px 0;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.SECONDARY};
`;

export const PasswordWrapper = styled.View`
  width: 100%;
  justify-self: flex-end;
`;

export const StyledButton = styled(Button)`
  align-self: flex-end;
  padding-top: 4px;
`;
