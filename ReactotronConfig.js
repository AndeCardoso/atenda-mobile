import Reactotron from "reactotron-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({name: 'ATENDA'}) // controls connection & communication settings
  .useReactNative({
		networking: {
      // optionally, you can turn it off with false.
      ignoreUrls: /symbolicate/,
    },
	}) // add all built-in react native plugins
  .connect(); // let's connect!