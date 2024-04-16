import React from "react";

import { Text } from "../Text";

import {
  Container,
  Content,
  ContentText,
  HeaderToast,
  ContentWrapper,
  LogoImage,
} from "./styles";
import { toastPositionEnum } from "@contexts/components/useToastContext";
import { Portal } from "react-native-paper";
import { useTheme } from "styled-components";

interface IToastProps {
  show: boolean;
  message: string;
  duration?: number;
  position: toastPositionEnum;
  alertType?: TToastAlertTypes;
  isNotification?: boolean;
}

export type TToastAlertTypes = "success" | "error" | "alert";

export const Toast = ({
  show,
  message,
  duration = 3000,
  position,
  alertType,
  isNotification = false,
}: IToastProps) => {
  const { colors } = useTheme();
  const borderColors = {
    success: colors.SUCCESS,
    alert: colors.ALERT,
    error: colors.WARNING,
  };
  return (
    <Portal>
      <Container position={position}>
        <Content
          visible={show}
          duration={duration}
          borderColor={alertType ? borderColors[alertType] : ""}
          onDismiss={() => {}}
          wrapperStyle={{
            paddingBottom: 8,
          }}
        >
          <ContentWrapper>
            {isNotification ? (
              <HeaderToast>
                {/* <LogoImage source={''} /> */}
                <Text size={12} color="BLACK">
                  Sistema Atenda
                </Text>
              </HeaderToast>
            ) : null}

            <ContentText color="WHITE" weight="400">
              {message}
            </ContentText>
          </ContentWrapper>
        </Content>
      </Container>
    </Portal>
  );
};
