if (__DEV__) {
  require("./ReactotronConfig");
}
import "react-native-gesture-handler";
import { Providers } from "@providers/index";
import { AppRoutes } from "@routes/index.routes";
import { preventAutoHideAsync } from "expo-splash-screen";

preventAutoHideAsync();

export default function App() {
  return (
    <Providers>
      <AppRoutes />
    </Providers>
  );
}
