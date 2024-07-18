import styled from "styled-components/native";

export const StyledRow = styled.View<{ gap?: number }>`
  width: 100%;
  flex-direction: row;
  align-items: center;
  gap: ${({ gap }) => gap ?? 8}px;
`;
