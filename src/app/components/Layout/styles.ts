import styled from "styled-components/native";

export const FooterContainer = styled.View<{ paddingBottom: number }>`
  width: 100%;
  padding: 0 8px;
  padding-bottom: ${({ paddingBottom }) => paddingBottom}px;
`;
