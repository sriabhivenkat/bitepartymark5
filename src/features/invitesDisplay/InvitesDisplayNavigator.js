import React from "react";
import { Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import InvitesDisplay from "./InvitesDisplay";

const Stack = createStackNavigator();

const LogoTitle = () => (
  <Image
    style={{ width: 100, height: 75, alignItems: "center" }}
    source={require("assets/images/headerlogo.png")}
  />
);

export default () => (
  <Stack.Navigator>
    <Stack.Screen
      name="invitesDisplay"
      component={InvitesDisplay}
      options={{
        title: "Invites",
        headerShown: true,
        headerTitle: (props) => <LogoTitle {...props} />,
        headerStyle: {
          height: 120,
        },
      }}
    />
  </Stack.Navigator>
);

