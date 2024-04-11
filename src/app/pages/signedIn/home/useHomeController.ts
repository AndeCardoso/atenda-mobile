import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@hooks/useAuth";
import { useTheme } from "styled-components";
import { SignedInNavigators, SignedInScreens } from "@routes/screens";

export const useHomeController = () => {
  const { colors } = useTheme();
  const { navigate } = useNavigation<any>();
  const { logout, userData } = useAuth();

  const actionStyles = {
    borderRadius: 50,
    marginRight: 16,
    backgroundColor: colors.SECONDARY,
  };

  const handleGoToTechnicians = () => {
    navigate(SignedInNavigators.TECHNICIANS);
  };

  const handleGoToCustomers = () => {
    navigate(SignedInNavigators.CUSTOMERS);
  };

  const handleGoToUsers = () => {
    navigate(SignedInNavigators.USERS);
  };

  const fabActions = [
    {
      icon: "logout",
      onPress: logout,
      color: colors.PRIMARY,
      style: actionStyles,
    },
    {
      icon: "head",
      label: "Clientes",
      onPress: handleGoToCustomers,
      color: colors.PRIMARY,
      style: actionStyles,
    },
    {
      icon: "tools",
      label: "Técnicos",
      onPress: handleGoToTechnicians,
      color: colors.PRIMARY,
      style: actionStyles,
    },
  ];

  if (userData?.admin) {
    fabActions.push({
      icon: "account-key",
      label: "Usuários",
      onPress: handleGoToUsers,
      color: colors.PRIMARY,
      style: actionStyles,
    });
  }

  return {
    fabActions,
  };
};
