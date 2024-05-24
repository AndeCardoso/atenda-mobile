import { useToastContext } from "@contexts/components/useToastContext";

export const useToast = () => {
  const { createToast } = useToastContext();

  const unexpectedErrorToast = () => {
    return createToast({
      message: `Ocorreu um erro inesperado! \nTente novamente.`,
      alertType: "error",
      duration: 5000,
    });
  };

  return {
    createToast,
    unexpectedErrorToast,
  };
};
