import { Icon } from "@components/base/Icon";
import React from "react";
import { Pressable, View } from "react-native";
import { useTheme } from "styled-components";

interface IToolbarProps {
  onUndo: () => void;
  onClearAll: () => void;
}

export const Toolbar = ({ onClearAll, onUndo }: IToolbarProps) => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        zIndex: 99,
        backgroundColor: colors.SECONDARY_INACTIVE,
        height: 50,
        width: "auto",
        borderRadius: 100,
        borderColor: colors.PRIMARY,
        borderWidth: 1,
        flexDirection: "row",
        paddingHorizontal: 24,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        gap: 16,
      }}
    >
      <Pressable onPress={onClearAll}>
        <Icon name="trash-can" size={24} />
      </Pressable>
      <Pressable onPress={onUndo}>
        <Icon name="undo" size={24} />
      </Pressable>
    </View>
  );
};
