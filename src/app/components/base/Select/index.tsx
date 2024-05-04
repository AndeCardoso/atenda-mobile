import React, { useEffect, useRef, useState } from "react";
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
import { Spacer } from "../Spacer";
import { IconButton } from "../IconButton";
import { Loader } from "../Loader";
import { Content, Header, ModalContainer, Search } from "./styles";
import { InputSearch } from "../InputSearch";
import { LoaderBox } from "../Loader/styles";
import { ListItem } from "../ListItem";

export interface IOption {
  id: number | string;
  text: string;
  value: number | string;
}

interface ISelectProps extends Omit<TextInputProps, "value"> {
  options?: IOption[];
  mask?: Mask;
  value?: IOption;
  loading?: boolean;
  onPress?: () => void;
  onSelect: (value?: any) => void;
  onSearch?: (value?: any) => void;
}

export const Select = ({
  options,
  value,
  loading,
  placeholder,
  disabled,
  mask,
  error,
  onPress,
  onSelect,
  onSearch,
}: ISelectProps) => {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [seletedValueState, setSelectedValueState] = useState<
    IOption | string | undefined
  >(value);

  useEffect(() => {
    if (value) setSelectedValueState(value);
  }, [value]);

  const onToggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const onSelectValue = (value: IOption) => {
    setSelectedValueState(value);
    onSelect(value);
    onToggleModal();
  };

  const handlePress = () => {
    onPress && onPress();
    onToggleModal();
  };

  const inputRef = useRef<TextInputRN>(null);

  function handleClear() {
    inputRef.current?.clear();
    setSelectedValueState(undefined);
    onSelect?.("");
  }

  const inputStyle: StyleProp<TextStyle> = {
    width: "100%",
    backgroundColor: colors.INPUT_BACKGROUND,
  };

  const disabledInputStyle: StyleProp<TextStyle> = {
    ...(inputStyle as Object),
    color: colors.SECONDARY_INACTIVE,
    pointerEvents: "none",
  };

  const isSelected =
    (seletedValueState?.text && seletedValueState?.text?.length > 0) ||
    (seletedValueState && seletedValueState.length > 0);

  return (
    <>
      <TextInput
        value={seletedValueState?.text ?? seletedValueState}
        mode={"outlined"}
        onPressIn={handlePress}
        placeholder={placeholder}
        textColor={disabled ? colors.SECONDARY_INACTIVE : colors.WHITE}
        outlineColor={disabled ? "transparent" : colors.SECONDARY_INACTIVE}
        placeholderTextColor={
          disabled ? colors.SECONDARY : colors.SECONDARY_INACTIVE
        }
        style={disabled ? disabledInputStyle : inputStyle}
        error={error}
        editable={false}
        right={
          <TextInput.Icon
            icon={
              disabled
                ? "lock"
                : isSelected
                ? "close"
                : modalVisible
                ? "chevron-up"
                : "chevron-down"
            }
            color={colors.WHITE}
            onPress={isSelected ? handleClear : handlePress}
          />
        }
        render={(props) => <MaskInput {...props} mask={mask} />}
      />
      <Portal>
        <Modal visible={modalVisible} onDismiss={onToggleModal} dismissable>
          <ModalContainer>
            <Header>
              <Text size={24} weight="700" color="SECONDARY">
                {placeholder}
              </Text>
              <IconButton
                name="close"
                size={26}
                onPress={onToggleModal}
                color="SECONDARY"
              />
            </Header>
            {onSearch ? (
              <Search>
                <InputSearch placeholder="Busca" onChangeText={onSearch} />
              </Search>
            ) : null}
            <Content>
              {loading ? (
                <LoaderBox>
                  <Loader size={64} />
                </LoaderBox>
              ) : (
                <FlatList
                  data={options}
                  keyExtractor={(item) => item.id.toString()}
                  ItemSeparatorComponent={() => <Spacer spaceVertical={16} />}
                  contentContainerStyle={{ padding: 16 }}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => {
                    return (
                      <ListItem onPress={() => onSelectValue(item)}>
                        <Text color="WHITE" size={16} weight="600">
                          {item.text}
                        </Text>
                      </ListItem>
                    );
                  }}
                />
              )}
            </Content>
          </ModalContainer>
        </Modal>
      </Portal>
    </>
  );
};
