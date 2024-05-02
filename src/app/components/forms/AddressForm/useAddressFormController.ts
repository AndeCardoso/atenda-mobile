import { useMutation } from "react-query";
import LocationService from "@services/location";
import { HttpStatusCode } from "axios";
import { SuperConsole } from "@tools/indentedConsole";
import { IOption } from "@components/base/Select";
import { useState } from "react";
import { stateList } from "app/constants/stateList";
import { removeAccentMarks } from "@utils/formatString";

export const useAddressFormController = () => {
  const [selectedState, setSelectedState] = useState<IOption | string>();

  const [searchedState, setSearchedState] = useState<string>("");
  const [searchedCityState, setSearchedCityState] = useState<string>("");

  const locationService = new LocationService();

  const onSelectState = (value?: IOption | string) => {
    setSelectedState(value);
  };

  const {
    data: citiesList,
    mutateAsync: citiesMutateAsync,
    isLoading: citiesLoading,
  } = useMutation(
    ["cities", selectedState, searchedCityState],
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

  const onSearchState = (value?: string) => {
    setSearchedState(value || "");
  };

  const onSearchCity = (value?: string) => {
    setSearchedCityState(value || "");
  };

  const searchedStateList =
    stateList &&
    stateList?.filter((item) => {
      return (
        item.text
          .toLowerCase()
          .includes(removeAccentMarks(searchedState?.toLowerCase())) ||
        item.value
          .toLowerCase()
          .includes(removeAccentMarks(searchedState?.toLowerCase()))
      );
    });

  const searchedCityList =
    citiesList &&
    citiesList?.filter((item) => {
      return item.text
        .toLowerCase()
        .includes(removeAccentMarks(searchedCityState?.toLowerCase()));
    });

  return {
    stateList: searchedStateList || stateList,
    citiesList: searchedCityList || citiesList,
    onSearchCity,
    onSearchState,
    onSelectState,
    citiesMutateAsync,
    viewState: { citiesLoading },
  };
};
