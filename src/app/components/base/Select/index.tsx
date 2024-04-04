import React, { useRef, useState } from "react";
import {
  StyleProp,
  TextStyle,
  TextInput as TextInputRN,
  FlatList,
} from "react-native";
import MaskInput, { Mask } from "react-native-mask-input";
import { Modal, Portal, TextInput, TextInputProps } from "react-native-paper";
import { useTheme } from "styled-components";
import { Text } from "../Text";
import { Content, Header, ModalContainer } from "./styles";
import { Card } from "../Card";
import { Spacer } from "../Spacer";
import { IconButton } from "../IconButton";

export interface IOption {
  id: number | string;
  text: string;
  value: number | string;
}

interface ISelectProps extends Omit<TextInputProps, "value"> {
  options: IOption[];
  mask?: Mask;
  value?: IOption;
  onSelect: (value?: any) => void;
}

export const Select = ({
  options,
  value,
  onSelect,
  placeholder,
  disabled,
  mask,
  error,
}: ISelectProps) => {
  const theme = useTheme();
  const { colors } = theme;
  const [modalVisible, setModalVisible] = useState(false);
  const [seletedValue, setSelectedValue] = useState<IOption | undefined>(value);

  const onToggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const onSelectValue = (value: IOption) => {
    setSelectedValue(value);
    onSelect(value);
    onToggleModal();
  };

  const inputRef = useRef<TextInputRN>(null);

  function handleClear() {
    inputRef.current?.clear();
    setSelectedValue(undefined);
    onSelect?.("");
  }

  const inputStyle: StyleProp<TextStyle> = {
    width: "100%",
    backgroundColor: "black",
  };

  const disabledInputStyle: StyleProp<TextStyle> = {
    width: "100%",
    backgroundColor: "black",
    color: colors.SECONDARY_INACTIVE,
    pointerEvents: "none",
  };

  const isSelected = seletedValue && seletedValue.text.length > 0;
  return (
    <>
      <TextInput
        value={seletedValue?.text}
        mode={"outlined"}
        onPressIn={onToggleModal}
        placeholder={placeholder}
        textColor={disabled ? colors.SECONDARY_INACTIVE : theme.colors.primary}
        outlineColor={disabled ? "transparent" : theme.colors.primary}
        placeholderTextColor={theme.colors.secondary}
        style={disabled ? disabledInputStyle : inputStyle}
        error={error}
        right={
          <TextInput.Icon
            icon={
              !disabled && isSelected
                ? "close"
                : modalVisible
                ? "chevron-up"
                : "chevron-down"
            }
            color={theme.colors.primary}
            onPress={isSelected ? handleClear : onToggleModal}
          />
        }
        render={(props) => <MaskInput {...props} mask={mask} />}
      />
      <Portal>
        <Modal visible={modalVisible} onDismiss={onToggleModal} dismissable>
          <ModalContainer>
            <Header>
              <Text size={24} weight="700">
                {placeholder}
              </Text>
              <IconButton name="close" size={26} onPress={onToggleModal} />
            </Header>
            <Content>
              <FlatList
                data={options}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={() => <Spacer spaceVertical={16} />}
                contentContainerStyle={{ padding: 16 }}
                renderItem={({ item }) => (
                  <Card onPress={() => onSelectValue(item)}>
                    <Text color="WHITE" size={24} weight="600">
                      {item.text}
                    </Text>
                  </Card>
                )}
              />
            </Content>
          </ModalContainer>
        </Modal>
      </Portal>
    </>
  );
};
