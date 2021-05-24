import React from "react";
import { Image, Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import InvitesDisplay from "./InvitesDisplay";
import { BackButton, logoHeaderOptions } from "../../components";
import AddFriends from "../profile/screens/AddFriends";

const Stack = createStackNavigator();

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default () => (
  <Stack.Navigator screenOptions={{ headerShown: "false" }}>
    <Stack.Screen
      name="invitesDisplay"
      component={InvitesDisplay}
      options={{
        title: "Invites",
        headerShown: false,
        drawBehind: true,
        ...logoHeaderOptions,
      }}
    />
    <Stack.Screen
      name="invitesDisplay/addFriends"
      component={AddFriends}
      options={{
        title: "Friends",
        headerShown: true,
        headerLeft: BackButton,
        // headerRight: () => (
        //   <View marginRight={10}>
        //     <GradientButton
        //       innerStyle={{ paddingHorizontal: 20 }}
        //       textStyle={{ fontSize: 16 }}
        //     >
        //       Add Friends
        //     </GradientButton>
        //   </View>
        // ),

        ...logoHeaderOptions,
      }}
    />
  </Stack.Navigator>
);
