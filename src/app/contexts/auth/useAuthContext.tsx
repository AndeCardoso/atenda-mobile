import { parseJwt } from "@utils/parseJwt";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

import { useQueryClient } from "react-query";

interface AuthContextProps {
  user: string | null;
  userData: IUserData | null;
  token: string | null;

  resetAuthStates: () => void;
  changeTokenState: (value: string) => void;
  changeUserState: (value: string) => void;
}

export interface IUserData {
  name: string;
  email: string;
  admin: boolean;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({ children }: PropsWithChildren) {
  const [userDataState, setUserDataState] = useState<IUserData | null>(null);
  const [userState, setUserState] = useState<string | null>(null);
  const [tokenState, setTokenState] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const resetAuthStates = () => {
    setTokenState(null);
  };

  const cleanQuery = () => {
    queryClient.resetQueries({
      queryKey: ["token"],
    });
  };

  const changeTokenState = (value: string) => {
    const jwt = parseJwt(value);
    const user = jwt?.userPayload;
    if (user) {
      setUserDataState({
        name: user.name,
        email: user.email,
        admin: user.admin,
      });
      setTokenState(value);
    }
  };

  const changeUserState = (value: string) => setUserState(value);

  return (
    <AuthContext.Provider
      value={{
        user: userState,
        token: tokenState,
        userData: userDataState,

        resetAuthStates,
        changeTokenState,
        changeUserState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useAuthContext() {
  const context = useContext(AuthContext);
  return context;
}
