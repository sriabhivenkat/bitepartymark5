import { AppRegistry } from "react-native";

import App from "./src/App";
import codePush from "react-native-code-push";
let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_START };

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
AppRegistry.registerComponent("main", () => codePush(codePushOptions)(App));
