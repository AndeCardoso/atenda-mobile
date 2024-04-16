import styled from "styled-components/native";
import { Snackbar } from "react-native-paper";

import { Text } from "@components/base/Text";
import { toastPositionEnum } from "@contexts/components/useToastContext";

interface IContainerProps {
  position?: toastPositionEnum;
}

interface IContentProps {
  borderColor?: string;
}

export const Container = styled.View<IContainerProps>`
  position: absolute;
  width: 100%;
  left: 0;
  padding: 8px;
  z-index: 50;
  align-items: center;
  justify-content: center;
  top: 130px;
`;

export const Content = styled(Snackbar)<IContentProps>`
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.SECONDARY_INACTIVE};
  border-radius: 4px;
  border: 2px solid ${({ borderColor, theme }) => borderColor || "transparent"};
`;

export const ContentWrapper = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const ContentText = styled(Text)`
  text-align: center;
`;

export const HeaderToast = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

export const LogoImage = styled.Image`
  width: 16px;
  height: 16px;
  border-radius: 2px;
  margin-right: 6px;
`;
