import { Colors } from "@global/styles/colors";
import { TextStyle, ViewStyle } from "react-native";
import { Chip as PaperChip } from "react-native-paper";
import { useTheme } from "styled-components";

interface IChipProps {
  text: string;
  textSize?: number;
  textColor?: Colors;
  color?: Colors;
}

export const Chip = ({
  text,
  textSize = 12,
  textColor = "WHITE",
  color = "SECONDARY_INACTIVE",
}: IChipProps) => {
  const { colors } = useTheme();
  const styles: ViewStyle = {
    backgroundColor: colors[color],
    borderRadius: 30,
  };

  const textStyles: TextStyle = {
    fontWeight: "700",
    fontSize: textSize,
    color: colors[textColor],
  };
  return (
    <PaperChip style={styles} textStyle={textStyles} mode="flat">
      {text}
    </PaperChip>
  );
};
