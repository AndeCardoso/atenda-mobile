import { StyledThemes, theme } from "@global/theme/theme";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContextProvider } from "@contexts/auth/useAuthContext";
import { ToastProvider } from "@contexts/components/useToastContext";
import { PropsWithChildren } from "react";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "styled-components/native";

export const Providers = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient();

  return (
    <NavigationContainer>
      <ThemeProvider theme={StyledThemes}>
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <PaperProvider theme={theme}>
              <SafeAreaProvider>
                <ToastProvider>{children}</ToastProvider>
              </SafeAreaProvider>
            </PaperProvider>
          </AuthContextProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
};
