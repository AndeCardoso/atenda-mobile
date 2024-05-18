import React, { useState } from "react";
import { SignatureLine, SignatureName } from "./styles";
import { Dimensions, LayoutChangeEvent, Text } from "react-native";

interface ILabelLineProps {
  text?: string;
}

const window = Dimensions.get("window");

export const LabelLine = ({ text }: ILabelLineProps) => {
  const [textWidthState, setTextWidthState] = useState<number>(0);

  const handleTextLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setTextWidthState(width);
  };
  return (
    <>
      <SignatureLine top={window.height / 2.6} left={window.width / 1.2 - 24} />
      {text ? (
        <SignatureName
          size={24}
          weight="600"
          color="WHITE"
          top={window.height / 2.6}
          left={window.width / 1.22 - textWidthState / 2}
          onLayout={handleTextLayout}
        >
          {text}
        </SignatureName>
      ) : null}
    </>
  );
};
