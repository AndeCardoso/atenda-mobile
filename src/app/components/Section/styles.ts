import { Button } from "@components/base/Button";
import styled from "styled-components/native";

export const Container = styled.View<{ fullwidth?: boolean }>`
  flex: 1 100%;
  margin: ${({ fullwidth }) => (fullwidth ? "0" : "16")}px;
`;

export const Title = styled.View<{ fullwidth?: boolean }>`
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  padding: 16px;
`;

export const StyledButton = styled.TouchableOpacity`
  border-width: 0;
`;
