import styled from "styled-components/native";

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  margin: 0 16px;
  padding: 24px;
  border-radius: 8px;
  border: 2px dashed ${({ theme }) => theme.colors.SECONDARY_INACTIVE};
  gap: 8px;
`;
