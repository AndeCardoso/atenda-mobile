import { Icon } from "@components/base/Icon";
import React from "react";
import { Pressable } from "react-native";
import { Container } from "./styles";

interface IToolbarProps {
  onUndo: () => void;
  onClearAll: () => void;
}

export const Toolbar = ({ onClearAll, onUndo }: IToolbarProps) => {
  return (
    <Container>
      <Pressable onPress={onClearAll}>
        <Icon name="trash-can" size={24} />
      </Pressable>
      <Pressable onPress={onUndo}>
        <Icon name="undo" size={24} />
      </Pressable>
    </Container>
  );
};
