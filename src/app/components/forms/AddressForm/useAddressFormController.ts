import { useMutation } from "react-query";
import LocationService from "@services/location";
import { HttpStatusCode } from "axios";
import { SuperConsole } from "@tools/indentedConsole";
import { IOption } from "@components/base/Select";
import { useState } from "react";

export const useAddressFormController = () => {
  const [selectedState, setSelectedState] = useState<IOption>();
  const locationService = new LocationService();

  const onSelectState = (value?: IOption) => {
    setSelectedState(value);
  };

  const {
    data: statesList,
    mutateAsync: stateMutateAsync,
    isLoading: statesLoading,
  } = useMutation(
    ["states"],
    async (): Promise<IOption[] | undefined> => {
      const { statusCode, body } = await locationService.stateList({
        orderBy: "nome",
      });
      switch (statusCode) {
        case HttpStatusCode.Ok:
          return body.map((item) => {
            return {
              id: item.id,
              text: item.nome,
              value: item.sigla,
            };
          });
        case HttpStatusCode.NoContent:
        case HttpStatusCode.BadRequest:
        default:
          SuperConsole(body);
          return;
      }
    },
    {
      onError: async (error) => {
        console.log("error - technicians", JSON.stringify(error, null, 2));
        return;
      },
    }
  );

  const {
    data: citiesList,
    mutateAsync: citiesMutateAsync,
    isLoading: citiesLoading,
  } = useMutation(
    ["cities", selectedState],
    async (): Promise<IOption[] | undefined> => {
      const { statusCode, body } = await locationService.cityList({
        state: selectedState?.value.toString() ?? "",
        orderBy: "nome",
      });
      switch (statusCode) {
        case HttpStatusCode.Ok:
          return body.map((item) => {
            return {
              id: item.id,
              text: item.nome,
              value: item.nome,
            };
          });
        case HttpStatusCode.NoContent:
        case HttpStatusCode.BadRequest:
        default:
          SuperConsole(body);
          return;
      }
    },
    {
      onError: async (error) => {
        console.log("error - technicians", JSON.stringify(error, null, 2));
        return;
      },
    }
  );

  return {
    statesList,
    citiesList,
    onSelectState,
    stateMutateAsync,
    citiesMutateAsync,
    viewState: { statesLoading, citiesLoading },
  };
};
