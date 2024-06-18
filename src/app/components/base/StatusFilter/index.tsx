import React, { Fragment, useState } from "react";
import { useTheme } from "styled-components";
import { ScrollView, View, ViewStyle } from "react-native";
import { IOption } from "../Select";
import { Button } from "../Button";
import { Spacer } from "../Spacer";
import { Container } from "./styles";

export interface IStatusFilterProps {
  options: IOption[];
  selected: number;
  onSelected: (value?: any) => void;
}

export const StatusFilter = ({
  options,
  selected,
  onSelected,
}: IStatusFilterProps) => {
  const { colors } = useTheme();

  const styles: ViewStyle = {
    width: "100%",
    paddingHorizontal: 16,
    marginTop: 2,
    marginBottom: 8,
  };

  const handleSelect = (value: number) => {
    if (value !== selected) {
      onSelected(value);
    } else {
      onSelected(undefined);
    }
  };

  return (
    <ScrollView
      horizontal
      style={styles}
      showsHorizontalScrollIndicator={false}
    >
      <Container>
        {options.map((option) => (
          <Fragment key={option.id.toString()}>
            <Button
              onPress={() => handleSelect(Number(option.value))}
              mode={selected === option.value ? "contained" : "outlined"}
              style={{
                borderRadius: 8,
                borderWidth: 3,
                borderColor: colors.PRIMARY,
              }}
            >
              {option.text}
            </Button>
          </Fragment>
        ))}
        <Spacer spaceHorizontal={24} />
      </Container>
    </ScrollView>
  );
};
