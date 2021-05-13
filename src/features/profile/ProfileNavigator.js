import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "./screens/Profile";
import Settings from "./screens/Settings";
import EditProfile from "./screens/EditProfile";
import { logoHeaderOptions } from "../../components";
const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator>
    <Stack.Screen
      name="profile"
      component={Profile}
      options={{
        title: "",
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="profile/settings"
      component={Settings}
      options={{
        title: "",
        // headerShown: false,
        // ...logoHeaderOptions,
      }}
    />
    <Stack.Screen
      name="profile/edit"
      component={EditProfile}
      options={{
        title: "",
        // headerShown: false,
      }}
    />
  </Stack.Navigator>
);
