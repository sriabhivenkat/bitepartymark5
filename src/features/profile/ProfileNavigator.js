import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "./screens/Profile";
import Settings from "./screens/Settings";
import EditProfile from "./screens/EditProfile";
import AddFriends from "./screens/AddFriends";

import { BackButton, logoHeaderOptions } from "../../components";
import FriendsView from "./screens/FriendsView";
import PastParties from "./screens/PastParties";
const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator>
    <Stack.Screen
      name="profile"
      component={Profile}
      options={{
        title: "Profile",
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="profile/settings"
      component={Settings}
      options={{
        title: "",
        headerLeft: BackButton,
        // headerShown: false,
        // ...logoHeaderOptions,
      }}
    />
    <Stack.Screen
      name="profile/edit"
      component={EditProfile}
      options={{
        title: "",
        headerLeft: BackButton,

        // headerShown: false,
      }}
    />
    <Stack.Screen
      name="profile/addFriends"
      component={AddFriends}
      options={{
        title: "",
        headerLeft: BackButton,

        // headerShown: false,
      }}
    />
    <Stack.Screen
      name="profile/friendsView"
      component={FriendsView}
      options={{
        title: "",
        headerLeft: BackButton,

        // headerShown: false,
      }}
    />
    <Stack.Screen
      name="profile/pastParties"
      component={PastParties}
      options={{
        title: "",
        headerLeft: BackButton,

        // headerShown: false,
      }}
    />
  </Stack.Navigator>
);
