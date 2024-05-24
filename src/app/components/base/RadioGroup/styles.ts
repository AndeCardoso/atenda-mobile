import styled from "styled-components/native";

export const Container = styled.View`
  gap: 8px;
`;

export const Content = styled.View<{ error: boolean }>`
  border-radius: 8px;
  border: 2px solid
    ${({ error, theme }) => (error ? theme.colors.WARNING : "transparent")};
  gap: 8px;
`;
