import { IAddressModel } from "@model/entities/address";
import { ICustomerModel } from "@model/entities/customer";
import { IEquipmentModel } from "@model/entities/equipment";
import { IServiceOrderModel } from "@model/entities/serviceOrder";
import { ITechnicianModel } from "@model/entities/technician";
import { IServiceForm } from "@pages/signedIn/serviceOrders/schema";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

export interface IServiceOrderRegister {
  serviceForm: IServiceForm;
  address: IAddressModel;
  equipment: IEquipmentModel;
  customer: ICustomerModel;
  technician: ITechnicianModel;
  signature: Uint8Array;
}

interface ServiceOrderContextProps {
  data: IServiceOrderRegister | undefined;

  resetState: () => void;
  onSelectCustomer: (costumerData: ICustomerModel) => void;
  onSelectEquipment: (equipmentData: IEquipmentModel) => void;
  onSaveServiceForm: (serviceForm: IServiceForm) => void;
  onSaveAddressForm: (addressForm: IAddressModel) => void;
  onSelectTechnician: (technicianData: ITechnicianModel) => void;
}

export const ServiceOrderContext = createContext(
  {} as ServiceOrderContextProps
);

export function ServiceOrderContextProvider({ children }: PropsWithChildren) {
  const [dataState, setDataState] = useState<IServiceOrderModel | undefined>(
    {} as IServiceOrderModel
  );
  const [serviceFormDataState, setServiceFormDataState] = useState<
    IServiceForm | undefined
  >({} as IServiceForm);
  const [customerSignatureSnapshotState, setCustomerSignatureSnapshotState] =
    useState<Uint8Array | undefined>();

  const resetState = () => {
    setDataState(undefined);
  };

  const onSelectCustomer = (costumerData: ICustomerModel) => {
    setDataState({
      ...dataState!!,
      customer: costumerData,
    });
  };

  const onSelectEquipment = (equipmentData: IEquipmentModel) => {
    setDataState({
      ...dataState!!,
      equipment: equipmentData,
    });
  };

  const onSaveServiceForm = (serviceFormData: IServiceForm) => {
    setServiceFormDataState(serviceFormData);
  };

  const onSaveAddressForm = (addressForm: IAddressModel) => {
    setDataState({
      ...dataState!!,
      address: addressForm,
    });
  };

  const onSelectTechnician = (technicianData: ITechnicianModel) => {
    setDataState({
      ...dataState!!,
      technician: technicianData,
    });
  };

  return (
    <ServiceOrderContext.Provider
      value={{
        data: {
          ...dataState!!,
          serviceForm: serviceFormDataState!!,
          signature: customerSignatureSnapshotState!!,
        },

        resetState,
        onSelectCustomer,
        onSelectEquipment,
        onSaveServiceForm,
        onSaveAddressForm,
        onSelectTechnician,
      }}
    >
      {children}
    </ServiceOrderContext.Provider>
  );
}
export function useServiceOrderContext() {
  const context = useContext(ServiceOrderContext);
  return context;
}
