import React, { PropsWithChildren, ReactNode, useState } from "react";
import { TextStyle, ViewStyle } from "react-native";
import { List } from "react-native-paper";
import { useTheme } from "styled-components";
import { Content } from "./styles";

interface IAccordionProps extends PropsWithChildren {
  title: string;
}

export const Accordion = ({ title, children }: IAccordionProps) => {
  const theme = useTheme();
  const { colors } = theme;
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => setExpanded(!expanded);

  const styles: ViewStyle = {
    borderRadius: 8,
    backgroundColor: colors.SECONDARY_INACTIVE,
  };

  const textStyles: TextStyle = {
    fontSize: 18,
    fontWeight: "700",
    color: colors.WHITE,
  };

  return (
    <List.Accordion
      title={title}
      expanded={expanded}
      onPress={handlePress}
      titleStyle={textStyles}
      style={styles}
      theme={{
        colors: { background: "transparent" },
      }}
    >
      <Content>{children}</Content>
    </List.Accordion>
  );
};
