import React, {
  useState,
  createContext,
  useContext,
  PropsWithChildren,
} from "react";
import { TToastAlertTypes, Toast } from "@components/base/Toast";

interface CreateToastProps {
  message: string;
  duration?: number;
  position?: toastPositionEnum;
  alertType?: TToastAlertTypes;
  isNotification?: boolean;
}

interface ToastProps extends CreateToastProps {
  position: toastPositionEnum;
}

interface ToastContextData {
  createToast: (data: CreateToastProps) => void;
}

interface ToastProviderProps extends PropsWithChildren {}

export enum toastPositionEnum {
  BOTTOM = "bottom",
  TOP = "top",
}

const ToastContext = createContext({} as ToastContextData);

const ToastProvider = ({ children }: ToastProviderProps) => {
  const [showToast, setShowToast] = useState(false);

  const [toastProps, setToastProps] = useState<ToastProps>({
    message: "",
    duration: 3000,
    position: toastPositionEnum.BOTTOM,
    alertType: undefined,
    isNotification: false,
  });

  const createToast = ({
    message,
    duration = 3000,
    position = toastPositionEnum.BOTTOM,
    alertType,
    isNotification = false,
  }: CreateToastProps) => {
    if (showToast) {
      return;
    }
    setToastProps({
      message,
      duration,
      position,
      alertType,
      isNotification,
    });

    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, duration + 300);
  };

  return (
    <ToastContext.Provider value={{ createToast }}>
      {showToast ? (
        <Toast
          show={showToast}
          message={toastProps.message}
          duration={toastProps.duration}
          position={toastProps.position}
          alertType={toastProps.alertType}
          isNotification={toastProps.isNotification}
        />
      ) : null}
      {children}
    </ToastContext.Provider>
  );
};

function useToastContext(): ToastContextData {
  const context = useContext(ToastContext);

  return context;
}

export { ToastProvider, useToastContext };
