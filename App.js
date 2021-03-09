import React, { useEffect } from "react";
import Providers from "./navigation/index.js";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import messaging from "@react-native-firebase/messaging";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    surface: "white",
  },
};

async function requestUserPermission() {
  const authorizationStatus = await messaging().requestPermission();

  if (authorizationStatus) {
    console.log("Permission status:", authorizationStatus);
  }
}

const App = () => {
  useEffect(() => requestUserPermission(), []);
  return (
    <PaperProvider theme={theme}>
      <Providers />
    </PaperProvider>
  );
};

export default App;
