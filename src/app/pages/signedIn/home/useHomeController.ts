import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@hooks/connection/useAuth";
import { useTheme } from "styled-components";
import { SignedInNavigators, SignedInScreens } from "@routes/screens";

export const useHomeController = () => {
  const { colors } = useTheme();
  const { navigate } = useNavigation<any>();
  const { logout } = useAuth();

  const actionStyles = {
    borderRadius: 50,
    marginRight: 16,
    backgroundColor: colors.SECONDARY,
  };

  const handleGoToTechnicians = () => {
    navigate(SignedInNavigators.TECHNICIANS, {
      screen: SignedInScreens.TECHNICIANS,
    });
  };

  const handleGoToCustomers = () => {
    navigate(SignedInNavigators.CUSTOMERS);
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
      onPress: () => console.log("Pressed notifications"),
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

  return {
    fabActions,
  };
};
