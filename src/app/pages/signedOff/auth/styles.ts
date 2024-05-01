import { Row } from "@components/base/Row";
import { ImageBackground } from "react-native";
import styled from "styled-components/native";

export const Layout = styled(ImageBackground)<{ paddingTop: number }>`
  flex: 1 100%;
  padding: 16px;
  padding-top: ${({ paddingTop }) => paddingTop}px;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.SECONDARY};
`;

export const WrapperTop = styled.View`
  width: 100%;
  align-items: center;
`;

export const WrapperButtons = styled(Row)`
  margin-bottom: 24px;
  background-color: ${({ theme }) => theme.colors.SECUNDARY};
  gap: 8px;
`;
