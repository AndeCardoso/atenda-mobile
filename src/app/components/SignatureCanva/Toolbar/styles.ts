import styled from "styled-components/native";

export const Container = styled.View`
  padding: 0 24px;
  height: 50px;
  width: auto;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: center;
  border-radius: 60px;
  border: 2px solid ${({ theme }) => theme?.colors?.PRIMARY};
  gap: 16px;
  z-index: 99;
  background-color: ${({ theme }) => theme?.colors?.SECONDARY_INACTIVE};
`;
