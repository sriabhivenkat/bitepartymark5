import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import AddFriendsViewController from "../screens/AddFriendsViewController.js";
import CreatePartyNavigator from "features/createParty/CreatePartyNavigator";
import JoinPartyNavigator from "features/joinParty/JoinPartyNavigator";
import InvitesDisplayNavigator from "features/invitesDisplay/InvitesDisplayNavigator";
import ProfileNavigator from "features/profile/ProfileNavigator";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: "white",
      inactiveTintColor: "white",
      style: {
        backgroundColor: "white",
        borderTopColor: "white",
      },
      tintColor: "#f76f6d",
    }}
    initialRouteName={"Home"}
  >
    <Tab.Screen
      name="invites"
      component={InvitesDisplayNavigator}
      options={{
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name="people"
            color={focused ? "black" : "gray"}
            size={30}
          />
        ),
      }}
    />
    <Tab.Screen
      name="home"
      component={CreatePartyNavigator}
      options={{
        tabBarIcon: ({ focused }) => (
          <Ionicons name="home" color={focused ? "black" : "gray"} size={25} />
        ),
      }}
    />
    <Tab.Screen
      name="profile"
      component={ProfileNavigator}
      options={{
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name="person"
            color={focused ? "black" : "gray"}
            size={25}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

const AppStack = () => (
  <Stack.Navigator initialRouteName={"Home"}>
    <Stack.Screen
      name="Home"
      component={BottomTabNavigator}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="joinParty"
      component={JoinPartyNavigator}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Add Friends"
      component={AddFriendsViewController}
      options={{ header: () => null }}
    />
  </Stack.Navigator>
);
export default AppStack;
