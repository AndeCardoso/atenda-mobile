import React, { useEffect, useRef, useState } from "react";
import {
  StyleProp,
  TextStyle,
  TextInput as TextInputRN,
  FlatList,
  KeyboardAvoidingView,
  Platform,
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
import { EmptyState } from "@components/EmptyState";
import { RFValue } from "react-native-responsive-fontsize";

export interface IOption {
  id: number | string;
  text: string;
  value: number | string;
}

const ios = Platform.OS === "ios";

interface ISelectProps extends Omit<TextInputProps, "value"> {
  options?: IOption[];
  mask?: Mask;
  value?: IOption;
  loading?: boolean;
  onPress?: () => void;
  onSelect: (value?: any) => void;
  onSearch?: (value?: any) => void;
  onNextPage?: () => void;
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
  onNextPage,
}: ISelectProps) => {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState<string | undefined>("");
  const [seletedValueState, setSelectedValueState] = useState<
    IOption | string | undefined
  >(value);

  const inputRef = useRef<TextInputRN>(null);

  useEffect(() => {
    if (value) setSelectedValueState(value);
  }, [value]);

  const onToggleModal = () => {
    setModalVisible(!modalVisible);
    onCleanSearch();
  };

  const handleSearch = (value?: string) => {
    onSearch && onSearch(value);
    setSearchValue(value);
  };

  const onCleanSearch = () => {
    onSearch && onSearch("");
    setSearchValue("");
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
          <KeyboardAvoidingView
            behavior={ios ? "padding" : "height"}
            keyboardVerticalOffset={ios ? RFValue(40) : 0}
          >
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
                  <InputSearch
                    placeholder="Busca"
                    onChangeText={handleSearch}
                    text={searchValue}
                  />
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
                    onTouchEnd={onNextPage}
                    contentContainerStyle={{ padding: 16 }}
                    ListEmptyComponent={() => (
                      <EmptyState
                        title="Nenhum resultado encontrado"
                        action={{
                          text: "Limpar busca",
                          onPress: onCleanSearch,
                        }}
                        secondary
                      />
                    )}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => {
                      const selected =
                        seletedValueState &&
                        seletedValueState.value === item.value;
                      return (
                        <ListItem
                          onPress={() => onSelectValue(item)}
                          selected={Boolean(selected)}
                        >
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
          </KeyboardAvoidingView>
        </Modal>
      </Portal>
    </>
  );
};
