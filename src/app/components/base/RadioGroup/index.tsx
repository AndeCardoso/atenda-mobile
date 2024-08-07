import React, { useState } from "react";
import { RadioButton } from "react-native-paper";
import { useTheme } from "styled-components";
import { Content } from "./styles";

interface IRadioGroup<T> {
  items: T[];
  selectedValue: any;
  error?: boolean;
  onSelect: (value: any) => void;
}

export const RadioGroup = ({
  items,
  selectedValue,
  error,
  onSelect,
}: IRadioGroup<any>) => {
  const { colors } = useTheme();
  const [value, setValue] = useState(selectedValue);

  const handleSelect = (newValue: any) => {
    setValue(newValue);
    onSelect(newValue);
  };

  return (
    <RadioButton.Group
      onValueChange={(newValue) => handleSelect(newValue)}
      value={value}
    >
      <Content error={Boolean(error)}>
        {items && items.length > 0
          ? items.map((item) => (
              <RadioButton.Item
                key={`${item.id}`}
                value={item}
                label={item.nickname}
                labelStyle={{
                  fontWeight: "700",
                  color: error ? colors.WARNING : colors.WHITE,
                }}
                mode="android"
                color={colors.PRIMARY}
                style={{
                  backgroundColor: colors.SECONDARY_INACTIVE,
                  borderRadius: 8,
                }}
              />
            ))
          : null}
      </Content>
    </RadioButton.Group>
  );
};
