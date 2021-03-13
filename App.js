import React, { useEffect } from "react";
import Providers from "./navigation/index.js";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import messaging from "@react-native-firebase/messaging";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

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

const App = () => {
  useEffect(() => requestUserPermission(), []);
  useEffect(() => {
    // Get the device token
    messaging()
      .getToken()
      .then((token) => {
        // alert(token);
        return saveTokenToDatabase(token);
      });

    // If using other push notification providers (ie Amazon SNS, etc)
    // you may need to get the APNs token instead for iOS:
    // if(Platform.OS == 'ios') { messaging().getAPNSToken().then(token => { return saveTokenToDatabase(token); }); }

    // Listen to whether the token changes
    return messaging().onTokenRefresh((token) => {
      saveTokenToDatabase(token);
    });
  }, []);
  return (
    <PaperProvider theme={theme}>
      <Providers />
    </PaperProvider>
  );
};

export default App;
