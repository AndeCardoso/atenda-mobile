import { Button } from "@components/base/Button";
import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  margin: 16px 0;
  padding: 24px;
  border-radius: 4px;
  background-color: ${({ theme }) =>
    theme.colors.SECONDARY_INACTIVE_OPACITY_50};
`;

export const PasswordWrapper = styled.View`
  width: 100%;
  justify-self: flex-end;
`;

export const StyledButton = styled(Button)`
  align-self: flex-end;
`;
