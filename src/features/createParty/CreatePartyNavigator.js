import React from "react";
import { Image, Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Filters from "./screens/Filters";
import SelectFriends from "./screens/SelectFriends";
import Start from "./screens/Start";
import ChangeLocation from './screens/ChangeLocation';

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
        name="createParty/begin"
        component={Start}
        options={{
          title: "Start Party",
          // headerShown: false,
          headerTitle: (props) => <LogoTitle2 {...props} />,
          headerStyle: {
            height: 80,
          },
        }}
      >

      </Stack.Screen>
    }
    {windowHeight != 667 &&
      <Stack.Screen
        name="createParty/begin"
        component={Start}
        options={{
          title: "Start Party",
          // headerShown: false,
          headerTitle: (props) => <LogoTitle1 {...props} />,
          headerStyle: {
            height: 120,
          },
        }}
      >

      </Stack.Screen>
    }
    <Stack.Screen
      name="createParty/selectFriends"
      component={SelectFriends}
      options={{
        title: "Friends",
        headerShown: true,
        headerTitle: (props) => <LogoTitle {...props} />,
        headerStyle: {
          height: 120,
        },
      }}
    />
    <Stack.Screen
      name="createParty/filters"
      component={Filters}
      options={{
        title: "Filters",
        headerShown: true,
        headerTitle: (props) => <LogoTitle {...props} />,
        headerStyle: {
          height: 120,
        },
      }}
    />
    <Stack.Screen
      name="createParty/filters/changeLocation"
      component={ChangeLocation}
      options={{
        title: "ChangeLocation",
        headerShown: false
      }}
    />
  </Stack.Navigator>
);
