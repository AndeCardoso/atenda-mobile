import React, { useState } from "react";
import { Platform } from "react-native";
import { Portal, FAB } from "react-native-paper";
import { useTheme } from "styled-components";

interface IFabButtonProps {
  isFocused: boolean;
  closedIcon: string;
  openedIcon: string;
  fabActions: IFabAction[];
}

interface IFabAction {
  icon: string;
  label?: string;
  onPress: () => void;
  color: string;
  style: any;
}

const android = Platform.OS === "android";

export const FabButton = ({
  isFocused,
  openedIcon,
  closedIcon,
  fabActions,
}: IFabButtonProps) => {
  const { colors } = useTheme();

  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }: { open: boolean }) => setState({ open });
  const { open } = state;

  const fabStyle = {
    borderRadius: 50,
    marginRight: 32,
    marginBottom: android && 48,
    backgroundColor: open ? colors.SECONDARY : colors.PRIMARY,
  };

  return (
    <Portal>
      <FAB.Group
        open={open}
        visible={isFocused}
        icon={open ? openedIcon : closedIcon}
        actions={fabActions}
        fabStyle={fabStyle}
        color={open ? colors.PRIMARY : colors.SECONDARY}
        onStateChange={onStateChange}
      />
    </Portal>
  );
};
