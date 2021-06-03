import React from "react";
import { Image, Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import FriendRequests from './FriendRequests';
import InvitesDisplay from "./InvitesDisplay";
import { BackButton, logoHeaderOptions } from "../../components";
import AddFriends from "../profile/screens/AddFriends";
import CreateGroup from "../createParty/screens/CreateGroup";
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
      name="invitesDisplay/friendRequests"
      component={FriendRequests}
      options={{
        title: "Friend Requests",
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="addFriends"
      component={AddFriends}
      options={{
        title: "Friends",
        headerShown: true,
        headerLeft: BackButton,
        ...logoHeaderOptions,
      }}
    />
     <Stack.Screen
      name="createGroup"
      component={CreateGroup}
      options={{
        title: "Create Group",
        headerShown: false,
        headerLeft: BackButton,
        ...logoHeaderOptions,
      }}
    />
  </Stack.Navigator>
);
