import React from "react";
import { Colors } from "@global/styles/colors";
import { useTheme } from "styled-components";
import { Container } from "./styles";
import PieChart from "react-native-pie-chart";
import { Text } from "../Text";

interface IChartProps {
  value: number;
  totalValue: number;
  strokeWidth?: number;
  color?: Colors;
  size?: number;
}

export const Chart = ({
  totalValue,
  value,
  color = "PRIMARY",
  size = 32,
}: IChartProps) => {
  const { colors } = useTheme();
  const restValue = totalValue - value;

  return (
    <Container>
      {value > 0 ? (
        <>
          <Text weight="700" color="PRIMARY">
            {value}
          </Text>
          <PieChart
            widthAndHeight={size}
            series={[restValue, value]}
            sliceColor={[colors.SECONDARY, colors[color]]}
            coverFill={colors.SECONDARY}
            coverRadius={0.65}
          />
        </>
      ) : (
        <Text weight="700" color="WHITE_TEXT">
          ---
        </Text>
      )}
    </Container>
  );
};
