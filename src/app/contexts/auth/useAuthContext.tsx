import React, {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useState,
} from "react";

import { useQueryClient } from "react-query";

interface AuthContextProps {
  user: string | null;
  token: string | null;

  resetAuthStates: () => void;
  changeTokenState: (value: string) => void;
  changeUserState: (value: string) => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({ children }: PropsWithChildren) {
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

  const changeTokenState = (value: string) => setTokenState(value);

  const changeUserState = (value: string) => setUserState(value);

  return (
    <AuthContext.Provider
      value={{
        user: userState,
        token: tokenState,

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
