import React, { useContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import { AuthContext } from "./AuthProvider";
import dynamicLinks from "@react-native-firebase/dynamic-links";

import AuthStack from "./AuthStack";
import AppStack from "./AppStack";

const Routes = () => {
  const { user, setUser } = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);
  // const navigation = useNavigation();

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing == true) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    dynamicLinks()
      .getInitialLink()
      .then((link) => {
        handleDynamicLink(link);
      });
  }, []);

  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    // When the component is unmounted, remove the listener
    return () => unsubscribe();
  }, []);

  const handleDynamicLink = (link) => {
    // AWFUL WAY TO PARSE LINKS - WILL FIX
    const url = link.url.slice(0, 26);
    const id = link.url.slice(30);
    console.log({ url, id, foo: link.url });
    if (url == "https://biteparty.app/join") {
      Alert.alert(
        "Party Invite",
        `You've been invited to a party (id=${id})`,
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          // { text: "Go!", onPress: () => navigation.navigate("DuosPartyScreen", { partyID: item.docID }) }
        ]
        // { cancelable: false }
      );
    }
  };

  if (initializing) return null;

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
