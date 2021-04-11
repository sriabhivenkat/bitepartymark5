import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import InvitesDisplay from "./InvitesDisplay";

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator>
    <Stack.Screen
      name="invites"
      component={InvitesDisplay}
      options={{
        title: "Invites",
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);
