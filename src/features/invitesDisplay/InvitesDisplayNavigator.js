import React from "react";
import { Image, Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import InvitesDisplay from "./InvitesDisplay";

const Stack = createStackNavigator();

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LogoTitle1 = () => (
  <Image
    style={{ width: 100, height: 70, alignItems: "center" }}
    source={require("assets/images/headerlogo.png")}
  />
);

const LogoTitle2 = () => (
  <Image
    style={{ width: 75, height: 50, alignItems: "center" }}
    source={require("assets/images/headerlogo.png")}
  />
);

export default () => (
  <Stack.Navigator>
    {windowHeight === 667 &&
      <Stack.Screen
        name="invitesDisplay"
        component={InvitesDisplay}
        options={{
          title: "Invites",
          headerShown: true,
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

