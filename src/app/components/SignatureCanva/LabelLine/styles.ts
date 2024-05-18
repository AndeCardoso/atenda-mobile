import { Text } from "@components/base/Text";
import styled from "styled-components/native";

export const SignatureLine = styled.View`
  top: 120px;
  left: 280px;
  height: 75%;
  width: 1.5px;
  background-color: ${({ theme }) => theme.colors.PRIMARY};
  z-index: 99;
  position: absolute;
`;

export const SignatureName = styled(Text)`
  /* top: 335px;
  left: 200px; */
  height: auto;
  width: auto;
  /* align-items: center;
  justify-content: center; */
  transform: rotateZ(-90deg);
  z-index: 99;
  position: absolute;

  border: 1px solid red;
`;
