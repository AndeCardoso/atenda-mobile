import { useMutation } from "react-query";
import LocationService from "@services/location";
import { HttpStatusCode } from "axios";
import { SuperConsole } from "@tools/indentedConsole";
import { IOption } from "@components/base/Select";
import { useState } from "react";
import { stateList } from "app/constants/stateList";

export const useAddressFormController = () => {
  const [selectedState, setSelectedState] = useState<IOption | string>();
  const locationService = new LocationService();

  const onSelectState = (value?: IOption | string) => {
    setSelectedState(value);
  };

  const {
    data: citiesList,
    mutateAsync: citiesMutateAsync,
    isLoading: citiesLoading,
  } = useMutation(
    ["cities", selectedState],
    async (): Promise<IOption[] | undefined> => {
      const stateUf = stateList.find(
        (item) =>
          item.text === selectedState?.text ||
          (item.text === selectedState && item.value)
      );

      const { statusCode, body } = await locationService.cityList({
        state: stateUf?.value ?? "",
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
    stateList,
    citiesList,
    onSelectState,
    citiesMutateAsync,
    viewState: { citiesLoading },
  };
};
