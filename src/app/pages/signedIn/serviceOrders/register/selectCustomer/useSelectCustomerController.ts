import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { SignedInNavigators, SignedInScreens } from "@routes/screens";
import { useInfiniteQuery, useQueryClient } from "react-query";
import CustomerService from "@services/customer";
import { HttpStatusCode } from "axios";
import { useCallback, useState } from "react";
import { reducePages } from "@utils/reducePages";
import { useToast } from "@hooks/useToast";
import { requestStateEnum } from "app/constants/requestStates";
import { RegisterServiceOrderScreens } from "../../navigators";
import { useServiceOrderContext } from "@contexts/serviceOrder";
import { ICustomerModel } from "@model/entities/customer";
import { SuperConsole } from "@tools/indentedConsole";

export const useSelectCustomerController = () => {
  const { unexpectedErrorToast } = useToast();
  const { navigate, canGoBack, goBack } = useNavigation<any>();
  const queryClient = useQueryClient();
  const { onSelectCustomer } = useServiceOrderContext();

  const customerService = new CustomerService();

  const [customersSearch, setCustomerSearch] = useState("");
  const [listState, setListState] = useState<requestStateEnum | undefined>();

  const {
    data,
    refetch,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isRefetching,
  } = useInfiniteQuery(
    ["customers", customersSearch],
    async ({ pageParam }) => {
      const { statusCode, body } = await customerService.list({
        limit: 10,
        page: pageParam ?? 1,
        column: "name",
        order: "asc",
        search: customersSearch,
      });
      switch (statusCode) {
        case HttpStatusCode.Ok:
          return body;
        case HttpStatusCode.NoContent:
          setListState(requestStateEnum.EMPTY);
          return;
        case HttpStatusCode.BadRequest:
        default:
          setListState(requestStateEnum.ERROR);
          SuperConsole(body, "customers");
          unexpectedErrorToast();
          return;
      }
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage)
          return lastPage?.currentPage < lastPage?.totalPages
            ? lastPage?.currentPage + 1
            : undefined;
      },
      onError: async (error) => {
        SuperConsole(error, "customers");
        unexpectedErrorToast();
        return;
      },
    }
  );

  const onCustomerSearch = (value?: string) => {
    setCustomerSearch(value ?? "");
  };

  const handleGoBack = () => {
    canGoBack && goBack();
  };

  const handleSelect = (customer: ICustomerModel) => {
    onSelectCustomer(customer);
    navigate(RegisterServiceOrderScreens.SELECT_EQUIPMENT, {
      customerId: customer.id,
    });
  };

  const handleGoToRegister = () => {
    navigate(SignedInNavigators.CUSTOMERS, {
      screen: SignedInScreens.CUSTOMERS_REGISTER_FORM,
    });
  };

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries("customers");
    }, [])
  );

  const emptyStateTexts = {
    title: customersSearch
      ? "Nenhum cliente encontrado"
      : "Ainda não há clientes",
    subtitle: !customersSearch ? "Cadastre novos clientes" : undefined,
    action: customersSearch
      ? {
          text: "Limpar busca",
          onPress: () => onCustomerSearch(""),
        }
      : {
          text: "Cadastrar cliente",
          onPress: handleGoToRegister,
        },
  };

  return {
    customerList: reducePages(data?.pages),
    textSearch: customersSearch,
    handleGoToRegister,
    onCustomerSearch,
    emptyStateTexts,
    fetchNextPage,
    handleGoBack,
    handleSelect,
    refetch,
    viewState: {
      loading: isLoading,
      reloading: isRefetching,
      loadingNextPage: isFetchingNextPage,
      listState,
    },
  };
};
