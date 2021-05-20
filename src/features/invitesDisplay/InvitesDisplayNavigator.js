import React from "react";
import { Image, Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import InvitesDisplay from "./InvitesDisplay";
import { logoHeaderOptions } from "../../components";

const Stack = createStackNavigator();

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default () => (
  <Stack.Navigator>
    <Stack.Screen
      name="invitesDisplay"
      component={InvitesDisplay}
      options={{
        title: "Invites",
        headerShown: true,
        ...logoHeaderOptions,
      }}
    />
  </Stack.Navigator>
);
