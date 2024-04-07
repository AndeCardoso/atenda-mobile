import styled from "styled-components/native";
interface IContainerProps {
  width?: number;
  fullwidth?: boolean;
}

export const Container = styled.View<IContainerProps>`
  flex: ${({ fullwidth }) => (fullwidth ? 1 : "none")};
  width: ${({ width }) => width && `${width}px`};
  gap: 4px;
`;
