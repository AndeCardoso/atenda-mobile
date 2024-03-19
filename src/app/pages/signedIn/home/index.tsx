import React from "react";
import { useAuth } from "@hooks/connection/useAuth";
import { Text, View } from "react-native";

export const HomeScreen = () => {
  const { logout } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text onPress={logout}>Home</Text>
    </View>
  );
};
