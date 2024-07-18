import { useRef } from "react";
import { ScrollView } from "react-native";
import { useToast } from "./useToast";

export const useFormErrorAlert = () => {
  const { createToast } = useToast();
  const scrollViewFormRef = useRef<ScrollView | null>(null);

  const onFormError = () => {
    createToast({
      message: `Verifique os campos obrigatórios`,
      alertType: "error",
    });
    const y = scrollViewFormRef?.current?.scrollTo();
  };

  return {
    scrollViewFormRef,
    onFormError,
  };
};
