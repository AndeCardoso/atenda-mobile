import { AsyncAuthEnum } from "@model/asyncStorage/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { parseJwt } from "@utils/parseJwt";
import { hideAsync } from "expo-splash-screen";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextProps {
  user: string | null;
  userData: IUserData | null;
  token: string | null;

  resetAuthStates: () => void;
  changeTokenState: (value: string) => void;
  changeUserState: (value: string) => void;
}

export interface IUserData {
  companyName: string;
  name: string;
  email: string;
  admin: boolean;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({ children }: PropsWithChildren) {
  const [userDataState, setUserDataState] = useState<IUserData | null>(null);
  const [userState, setUserState] = useState<string | null>(null);
  const [tokenState, setTokenState] = useState<string | null>(null);

  useEffect(() => {
    checkToken();

    setTimeout(() => {
      hideAsync();
    }, 1000);
  }, []);

  const resetAuthStates = () => {
    setTokenState(null);
  };

  const checkToken = async () => {
    if (Boolean(tokenState)) return;

    const savedToken = await AsyncStorage.getItem(AsyncAuthEnum.TOKEN);

    if (savedToken) {
      const jwt = parseJwt(savedToken);
      const user = jwt?.userPayload;
      if (user) {
        setTokenState(savedToken);
        setUserDataState({
          companyName: user.companyName,
          name: user.name,
          email: user.email,
          admin: user.admin,
        });
      }
    }
  };

  const changeTokenState = async (value: string) => {
    const jwt = parseJwt(value);
    const user = jwt?.userPayload;
    await AsyncStorage.setItem(AsyncAuthEnum.TOKEN, value);
    if (user) {
      setUserDataState({
        companyName: user.companyName,
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
