import styled from "styled-components/native";

export const Content = styled.View`
  top: -8px;
  padding: 18px;
  padding-bottom: 0;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  background-color: ${({ theme }) => theme.colors.SECONDARY_INACTIVE};
  z-index: -1;
`;
