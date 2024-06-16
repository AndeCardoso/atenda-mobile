import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const BulletsContainer = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin: 8px 0;
`;

export const Bullet = styled.View<{ active: boolean }>`
  width: ${({ active }) => (active ? 9 : 8)}px;
  height: ${({ active }) => (active ? 9 : 8)}px;
  border-radius: 4px;
  margin: 0 2px;
  background-color: ${({ theme, active }) =>
    active ? theme.colors.PRIMARY : theme.colors.PRIMARY_INACTIVE};
`;
