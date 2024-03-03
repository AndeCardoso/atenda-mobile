import { Row } from "@components/base/Row";
import { Text } from "@components/base/Text";
import { ImageBackground } from "react-native";
import styled from "styled-components/native";

export const Layout = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  padding: 16px;
  justify-content: space-between;
`;

export const Background = styled(ImageBackground)``;

export const BrandText = styled(Text)`
  margin-top: 16px;
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
