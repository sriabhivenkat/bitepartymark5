import React, { useEffect } from "react";
import Providers from "./navigation/index.js";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import messaging from "@react-native-firebase/messaging";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { FuegoProvider } from "@nandorojo/swr-firestore";
import ReactNativeFirebase from "@react-native-firebase/app";

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
    // console.log("Permission status:", authorizationStatus);
  }
}

async function saveTokenToDatabase(token) {
  // Assume user is already signed in
  const userId = auth().currentUser.uid;
  console.log(userId);

  // Add the token to the users datastore
  await firestore()
    .collection("Users")
    .doc(userId)
    .update({
      tokens: firestore.FieldValue.arrayUnion(token),
    });
}

class CustomFuego {
  // db;
  // auth;
  // functions;

  constructor() {
    this.db = firestore();
    this.auth = auth;
    // this.functions = functions;
  }
}

const fuego = new CustomFuego();

const App = () => {
  // console.disableYellowBox = true;

  useEffect(() => requestUserPermission(), []);
  useEffect(() => {
    // Get the device token
    messaging()
      .getToken()
      .then((token) => {
        // alert(token);
        return saveTokenToDatabase(token);
      });

    return messaging().onTokenRefresh((token) => {
      saveTokenToDatabase(token);
    });
  }, []);
  return (
    <PaperProvider theme={theme}>
      <FuegoProvider fuego={fuego}>
        <Providers />
      </FuegoProvider>
    </PaperProvider>
  );
};

export default App;
