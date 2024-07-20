import AsyncStorage from "@react-native-async-storage/async-storage";

import { AsyncAuthEnum } from "@model/asyncStorage/auth";
import { useAuthContext } from "@contexts/auth/useAuthContext";

export const useAuth = () => {
  const { resetAuthStates, userData } = useAuthContext();

  const logout = async () => {
    await AsyncStorage.removeItem(AsyncAuthEnum.TOKEN);
    resetAuthStates();
  };

  return {
    userData,
    logout,
  };
};
