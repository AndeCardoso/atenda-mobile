import "react-native-gesture-handler";
import { Providers } from "@providers/index";
import { AppRoutes } from "@routes/index.routes";

export default function App() {
  return (
    <Providers>
      <AppRoutes />
    </Providers>
  );
}
