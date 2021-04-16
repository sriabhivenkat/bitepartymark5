import React, { useContext, useState, useEffect } from "react";
import { Alert, Linking } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import { AuthContext } from "./AuthProvider";
import { navigationRef } from "./RootNavigation";

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

  // useEffect(() => {
  //   dynamicLinks()
  //     .getInitialLink()
  //     .then((link) => {
  //       handleDynamicLink(link);
  //     });
  // }, []);

  // useEffect(() => {
  //   const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
  //   // When the component is unmounted, remove the listener
  //   return () => unsubscribe();
  // }, []);

  // const handleDynamicLink = (link) => {
  //   // AWFUL WAY TO PARSE LINKS - WILL FIX
  //   const url = link.url.slice(0, 26);
  //   const id = link.url.slice(30);
  //   console.log({ url, id, foo: link.url });
  //   if (url == "https://biteparty.app/join") {
  //     Alert.alert(
  //       "Party Invite",
  //       `You've been invited to a party (id=${id})`,
  //       [
  //         {
  //           text: "Cancel",
  //           onPress: () => console.log("Cancel Pressed"),
  //           style: "cancel",
  //         },
  //         // { text: "Go!", onPress: () => navigation.navigate("DuosPartyScreen", { partyID: item.docID }) }
  //       ]
  //       // { cancelable: false }
  //     );
  //   }
  // };

  // useEffect(() => {
  //   // firebase
  //   //   .notifications()
  //   //   .getInitialNotification()
  //   //   .then((notif) => {
  //   //     console.log(notif);
  //   //   });
  //   messaging().onNotificationOpenedApp((remoteMessage) => {
  //     console.log(
  //       "Notification caused app to open from background state:",
  //       remoteMessage.notification
  //     );
  //     console.log({ remoteMessage });
  //     //  navigation.navigate(remoteMessage.data.type);
  //   });

  // messaging()
  //   .getInitialNotification()
  //   .then((remoteMessage) => {
  //     if (remoteMessage) {
  //       console.log(
  //         "Notification caused app to open from quit state:",
  //         remoteMessage.notification
  //       );
  //       console.log({ remoteMessage });

  //       // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
  //     }
  //     // setLoading(false);
  // });
  // if (notificationOpen) {
  //     // App was opened by a notification
  //     // Get the action triggered by the notification being opened
  //     const action = notificationOpen.action;
  //     // Get information about the notification that was opened
  //     const notification  = notificationOpen.notification;

  //     console.log({action, notification})
  // }
  // }, []);

  // const linking = {
  //   prefixes: ["https://biteparty.page.link"],
  //   config: {
  //     initialRouteName: "Home",
  //     screens: {
  //       profile: {
  //         path: "invite",
  //       },
  //       // Details: {
  //       //   path: "details/:itemId",
  //       // },
  //     },
  //   },
  // };

  if (initializing) return null;

  return (
    <NavigationContainer ref={navigationRef}>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
