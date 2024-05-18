import React from "react";
import { SignatureLine, SignatureName } from "./styles";

interface ILabelLineProps {
  text?: string;
}

export const LabelLine = ({ text }: ILabelLineProps) => {
  return (
    <>
      <SignatureLine />
      <SignatureName size={24} weight="600" color="WHITE">
        {text}
      </SignatureName>
    </>
  );
};
