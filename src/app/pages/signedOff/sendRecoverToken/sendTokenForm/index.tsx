import React from "react";
import { Container } from "./styles";
import { ControlledInput } from "@components/controlleds/ControlledInput";
import { Control } from "react-hook-form";
import { useTheme } from "styled-components";
import { ISendRecoverTokenForm } from "./formSchema";

interface ISendRecoverTokenFormProps {
  control: Control<ISendRecoverTokenForm>;
}

export const SendRecoverTokenForm = ({
  control,
}: ISendRecoverTokenFormProps) => {
  const theme = useTheme();
  const { colors } = theme;

  return (
    <Container>
      <ControlledInput
        label="E-mail"
        labelStyle={{
          color: colors.WHITE,
          fontWeight: "600",
          fontSize: 20,
        }}
        placeholder="Digite seu e-mail cadastrado"
        name="email"
        control={control}
      />
    </Container>
  );
};
