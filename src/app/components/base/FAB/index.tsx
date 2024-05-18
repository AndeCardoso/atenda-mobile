import React, { useState } from "react";
import { Platform, ViewStyle } from "react-native";
import { Portal, FAB } from "react-native-paper";
import { useTheme } from "styled-components";
import { TIconNames } from "../Icon/types";

interface FABVariant {
  isSingle?: boolean;
}

interface IFabSingleButtonProps extends FABVariant {
  icon: TIconNames;
  isFocused: boolean;
  onPress: () => void;
}

interface IFabGroupProps extends FABVariant {
  isFocused: boolean;
  closedIcon: TIconNames;
  openedIcon: TIconNames;
  fabActions: IFabAction[];
  onPress?: () => void;
}

interface IFabAction {
  icon: string;
  label?: string;
  onPress: () => void;
  color: string;
  style: any;
}

type TFabComponentType = IFabGroupProps | IFabSingleButtonProps;

const android = Platform.OS === "android";

export const FabGroup = (props: TFabComponentType) => {
  const { colors } = useTheme();

  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }: { open: boolean }) => setState({ open });
  const { open } = state;

  if (props.isSingle) {
    const { isFocused, onPress, icon } = props as IFabSingleButtonProps;

    const fabStyle: ViewStyle = {
      borderRadius: 50,
      marginRight: 32,
      marginBottom: android ? 48 : undefined,
      backgroundColor: colors.PRIMARY,
    };

    return (
      <Portal>
        <FAB.Group
          open={open}
          visible={isFocused}
          icon={icon}
          actions={[] as IFabAction[]}
          fabStyle={fabStyle}
          color={colors.SECONDARY}
          onStateChange={() => null}
          onPress={onPress}
        />
      </Portal>
    );
  }

  const { isFocused, onPress, fabActions, openedIcon, closedIcon } =
    props as IFabGroupProps;

  const fabStyle: ViewStyle = {
    borderRadius: 50,
    marginRight: 32,
    marginBottom: android ? 48 : undefined,
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
        onPress={onPress}
      />
    </Portal>
  );
};
