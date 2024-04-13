import { Button } from "@components/base/Button";
import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  padding: 24px;
  margin: 16px 0;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.SECONDARY_INACTIVE};
`;

export const PasswordWrapper = styled.View`
  width: 100%;
  justify-self: flex-end;
`;

export const StyledButton = styled(Button)`
  align-self: flex-end;
`;
