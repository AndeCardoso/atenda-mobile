import { Text } from "@components/base/Text";
import { css } from "styled-components";
import styled from "styled-components/native";

interface ISignatureProps {
  top: number;
  left: number;
}

export const SignatureLine = styled.View<ISignatureProps>`
  top: ${({ top }) => top / 3}px;
  left: ${({ left }) => left}px;
  height: 75%;
  width: 1.5px;
  background-color: ${({ theme }) => theme?.colors?.PRIMARY};
  z-index: 99;
  position: absolute;
`;

export const SignatureName = styled(Text)<ISignatureProps>`
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  height: auto;
  width: auto;
  align-items: center;
  justify-content: center;
  z-index: 99;
  position: absolute;
  ${css`
    transform: rotate(-90deg);
  `}
`;
