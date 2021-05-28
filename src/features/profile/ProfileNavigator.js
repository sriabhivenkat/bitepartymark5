import React from "react";
import {Text, View, Dimensions} from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "./screens/Profile";
import Settings from "./screens/Settings";
import EditProfile from "./screens/EditProfile";
import AddFriends from "./screens/AddFriends";
import ShowGroups from './screens/ShowGroups';

import { BackButton, logoHeaderOptions, GradientButton } from "../../components";
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
      name="profile/showGroup"
      component={ShowGroups}
      options={{
        title: "",
        headerLeft: BackButton,
      }}
    />
    <Stack.Screen
      name="profile/addFriends"
      component={AddFriends}
      options={{
        title: "",
        headerLeft: BackButton,
        headerRight: () => (
          <GradientButton
            containerStyle={{right: 10,}}
            innerStyle={{paddingHorizontal: 20, borderRadius: 7}}
          >
            Sync Contacts
          </GradientButton>
        ),
        headerStyle: {
          height: Dimensions.get("window").height/8
        }
        // headerShown: false,
      }}
    />
  </Stack.Navigator>
);
