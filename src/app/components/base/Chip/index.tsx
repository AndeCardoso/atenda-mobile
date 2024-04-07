import { Colors } from "@global/styles/colors";
import { TextStyle, ViewStyle } from "react-native";
import { Chip as PaperChip } from "react-native-paper";
import { useTheme } from "styled-components";

interface IChipProps {
  text: string;
  textColor?: Colors;
  color?: Colors;
}

export const Chip = ({
  text,
  textColor = "WHITE",
  color = "SECONDARY_INACTIVE",
}: IChipProps) => {
  const { colors } = useTheme();
  const styles: ViewStyle = {
    backgroundColor: colors[color],
    borderRadius: 30,
  };

  const textStyles: TextStyle = {
    fontSize: 12,
    fontWeight: "700",
    color: colors[textColor],
  };
  return (
    <PaperChip style={styles} textStyle={textStyles} mode="flat">
      {text}
    </PaperChip>
  );
};
