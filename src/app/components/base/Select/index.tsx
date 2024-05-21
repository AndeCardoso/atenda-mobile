import React, { useCallback, useEffect, useRef, useState } from "react";
import { TextInput as TextInputRN, FlatList } from "react-native";
import { TextInputProps } from "react-native-paper";
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
import { Modal } from "../Modal";
import { debounce, isObject } from "lodash";
import { SelectButton } from "./components/SelectButton";

export interface IOption {
  id: number | string;
  text: string;
  value: number | string;
}

interface ISelectProps extends Omit<TextInputProps, "value"> {
  options?: IOption[];
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

  const isSelected =
    (seletedValueState?.text && seletedValueState?.text?.length > 0) ||
    (seletedValueState && seletedValueState.length > 0);

  const handleDebouncedChange = useCallback(
    debounce((value?: string) => {
      handleSearch && handleSearch(value);
    }, 500),
    []
  );

  const textValue = isObject(seletedValueState)
    ? seletedValueState?.text
    : seletedValueState;

  return (
    <>
      <SelectButton
        value={textValue}
        placeholder={placeholder}
        modalVisible={modalVisible}
        handleClear={handleClear}
        isSelected={isSelected}
        onPress={handlePress}
        disabled={disabled}
        error={error}
      />
      <Modal modalVisible={modalVisible} onToggleModal={onToggleModal}>
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
                onChangeText={handleDebouncedChange}
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
                    seletedValueState && seletedValueState.value === item.value;
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
      </Modal>
    </>
  );
};
