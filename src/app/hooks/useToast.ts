import { useToastContext } from "@contexts/components/useToastContext";

export const useToast = () => {
  const { createToast } = useToastContext();

  return {
    createToast,
  };
};
