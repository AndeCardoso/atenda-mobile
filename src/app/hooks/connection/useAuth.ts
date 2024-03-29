import { HttpStatusCode } from "axios";
import { useMutation } from "react-query";

import AuthService from "@services/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useNavigation } from "@react-navigation/native";
import { Navigators, SignedOffScreens } from "@routes/screens";

import { AsyncAuthEnum } from "@model/asyncStorage/auth";
import { useAuthContext } from "@contexts/auth/useAuthContext";

import { SendRecoverTokenRequestDTO } from "@services/auth/dtos/request/SendRecoverTokenRequestDTO";
import { AuthenticationRequestDTO } from "@services/auth/dtos/request/AuthenticationRequestDTO";

import { SuperConsole } from "@tools/indentedConsole";
import { RecoverPasswordRequestDTO } from "@services/auth/dtos/request/RecoverPasswordRequestDTO";

export const useAuth = () => {
  const { navigate } = useNavigation<any>();
  const authService = new AuthService();
  const { changeTokenState, resetAuthStates } = useAuthContext();

  const authentication = useMutation(
    async ({ email, password }: AuthenticationRequestDTO) =>
      await authService.authentication({ email, password }),
    {
      onSuccess: async ({ statusCode, body }) => {
        switch (statusCode) {
          case HttpStatusCode.Ok:
            await AsyncStorage.setItem(AsyncAuthEnum.TOKEN, body.token);
            changeTokenState(body.token);
            return body.token;
          case HttpStatusCode.Unauthorized:
          default:
            SuperConsole(body);
            return;
        }
      },
      onError: async (error) => {
        console.log("error", JSON.stringify(error, null, 2));
        logout();
        return;
      },
    }
  );

  const logout = async () => {
    await AsyncStorage.removeItem(AsyncAuthEnum.TOKEN);
    resetAuthStates();
    navigate(Navigators.SIGNED_OFF_NAVIGATOR, {
      screen: SignedOffScreens.AUTH,
    });
  };

  const sendRecoverToken = useMutation(
    async ({ email }: SendRecoverTokenRequestDTO) =>
      await authService.sendRecoverToken({ email }),
    {
      onSuccess: async ({ statusCode, body }) => {
        switch (statusCode) {
          case HttpStatusCode.Ok:
            return body;
          case HttpStatusCode.BadRequest:
          default:
            SuperConsole(body);
            return;
        }
      },
      onError: async (error) => {
        console.log("error", JSON.stringify(error, null, 2));
        return;
      },
    }
  );

  const recoverPassword = useMutation(
    async ({ email, password, token }: RecoverPasswordRequestDTO) =>
      await authService.recoverPassword({ email, password, token }),
    {
      onSuccess: async ({ statusCode, body }) => {
        switch (statusCode) {
          case HttpStatusCode.Ok:
            return body;
          case HttpStatusCode.BadRequest:
          default:
            SuperConsole(body);
            return;
        }
      },
      onError: async (error) => {
        console.log("error", JSON.stringify(error, null, 2));
        return;
      },
    }
  );

  return {
    authentication,
    logout,
    sendRecoverToken,
    recoverPassword,
  };
};
