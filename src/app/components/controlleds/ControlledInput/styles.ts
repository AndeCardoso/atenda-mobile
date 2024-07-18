import styled from "styled-components/native";
interface IContainerProps {
  fullwidth?: boolean;
}

export const Container = styled.View<IContainerProps>`
  flex: ${({ fullwidth }) => (fullwidth ? 1 : "none")};
  gap: 4px;
`;
