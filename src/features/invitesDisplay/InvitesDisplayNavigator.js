import React from "react";
import { Image, Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import InvitesDisplay from "./InvitesDisplay";
import { logoHeaderOptions } from "../../components";

const Stack = createStackNavigator();

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;



export default () => (
  <Stack.Navigator
    screenOptions={{headerShown: "false"}}
  >
    {windowHeight === 667 &&
      <Stack.Screen
        name="invitesDisplay"
        component={InvitesDisplay}
        options={{
          title: "Invites",
          headerShown: true,
          drawBehind: true,
          headerTitle: (props) => <LogoTitle2 {...props} />,
          headerStyle: {
            height: 80,
          },
        }}
      />
    }

    {windowHeight != 667 &&
      <Stack.Screen
        name="invitesDisplay"
        component={InvitesDisplay}
        options={{
          title: "Invites",
          headerShown: true,
          headerTitle: (props) => <LogoTitle1 {...props} />,
          headerStyle: {
            height: 120,
          },
        }}
      />
    }

  </Stack.Navigator>
);
