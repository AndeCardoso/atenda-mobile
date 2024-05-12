import styled from "styled-components/native";
interface IContainerProps {
  fullwidth?: boolean;
}

export const Container = styled.View<IContainerProps>`
  gap: 4px;
`;
