import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import SettingsViewController from "../screens/SettingsViewController.js";
import ProfileViewController from "../screens/ProfileViewController.js";
import AddFriendsViewController from "../screens/AddFriendsViewController.js";
import { Image } from "react-native";

import CreatePartyNavigator from "features/createParty/CreatePartyNavigator";
import JoinPartyNavigator from "features/joinParty/JoinPartyNavigator";
import InvitesDisplayNavigator from "features/invitesDisplay/InvitesDisplayNavigator";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ width: 100, height: 75, alignItems: "center" }}
      source={require("../assets/images/headerlogo.png")}
    />
  );
}

const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile"
      component={ProfileViewController}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="Add Friends"
      component={AddFriendsViewController}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="Settings"
      component={SettingsViewController}
      options={{
        headerTitle: (props) => <LogoTitle {...props} />,
        headerStyle: {
          height: 120,
        },
      }}
    />
  </Stack.Navigator>
);

const BottomTabNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: "white",
      inactiveTintColor: "white",
      style: {
        backgroundColor: "white",
        borderTopColor: "white",
        // marginTop: 10,
      },
      // headerShown: false,
      tintColor: "#f76f6d",
    }}
    initialRouteName={"Home"}
  >
    <Tab.Screen
      name="Invites"
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
      name="Home"
      component={CreatePartyNavigator}
      options={{
        tabBarIcon: ({ focused }) => (
          <Ionicons name="home" color={focused ? "black" : "gray"} size={25} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileStack}
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
  </Stack.Navigator>
);
export default AppStack;
