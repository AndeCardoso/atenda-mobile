import { Row } from "@components/base/Row";
import { ImageBackground } from "react-native";
import styled from "styled-components/native";

export const Layout = styled(ImageBackground)<{ paddingTop: number }>`
  flex: 1 100%;
  padding: 16px;
  padding-bottom: 0;
  padding-top: ${({ paddingTop }) => paddingTop}px;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.SECONDARY};
`;

export const WrapperTop = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const WrapperButtons = styled(Row)<{ ios: boolean }>`
  margin-bottom: ${({ ios }) => (ios ? 32 : 16)}px;
  background-color: ${({ theme }) => theme.colors.SECUNDARY};
  gap: 8px;
`;
