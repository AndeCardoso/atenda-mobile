import { HttpStatusCode } from "axios";
import { useMutation } from "react-query";
import { useNavigation } from "@react-navigation/native";
import { SuperConsole } from "@tools/indentedConsole";
import UserService from "@services/user";
import { UserRegisterRequestDTO } from "@services/user/dtos/UserRegisterRequestDTO";

export const useUser = () => {
  const userService = new UserService();

  const register = useMutation(
    async ({ name, email, password }: UserRegisterRequestDTO) =>
      await userService.register({ name, email, password }),
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
        console.log("aqui", JSON.stringify(error, null, 2));
        return;
      },
    }
  );

  const list = useMutation(
    async ({ name, email, password }: UserRegisterRequestDTO) =>
      await userService.register({ name, email, password }),
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
        console.log("aqui", JSON.stringify(error, null, 2));
        return;
      },
    }
  );

  return {
    register,
  };
};
