import React, { useEffect } from "react";
import { Alert } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import dynamicLinks from "@react-native-firebase/dynamic-links";
import messaging from "@react-native-firebase/messaging";

import * as RootNavigation from "navigation/RootNavigation";

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
    screenOptions={({ route }) => ({
      tabBarButton: ["joinParty"].includes(route.name)
        ? () => {
            return null;
          }
        : undefined,
    })}
    initialRouteName={"home"}
    // tabBar={(props) => (
    //   <BottomTabBar
    //     {...props}
    //     state={{ ...props.state, routes: props.state.routes.slice(0, 3) }}
    //   ></BottomTabBar>
    // )}
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
    <Tab.Screen
      name="joinParty"
      component={JoinPartyNavigator}
      // options={{
      //   headerShown: false,
      //   tabBarIcon: ({ focused }) => (
      //     <Ionicons
      //       name="person"
      //       color={focused ? "black" : "gray"}
      //       size={25}
      //     />
      //   ),
      // }}
      screenOptions={({ route }) => ({
        tabBarButton: () => null,
      })}
    />
  </Tab.Navigator>
);

const AppStack = () => {
  const handleMessage = (message) => {
    if (!message) return;
    const { partyId, type } = message.data;
    console.log({ type });
    switch (type) {
      case "invite":
        RootNavigation.navigate("invites");
        break;
      case "party":
        RootNavigation.navigate("joinParty", {
          screen: "joinParty/swiping",
          params: { partyID: partyId },
        });
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    messaging().getInitialNotification().then(handleMessage);
    messaging().onNotificationOpenedApp(handleMessage);
  }, []);

  return (
    <Stack.Navigator initialRouteName={"Home"}>
      <Stack.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="joinParty"
        component={JoinPartyNavigator}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="Add Friends"
        component={AddFriendsViewController}
        options={{ title: "" }}
      />
    </Stack.Navigator>
  );
};
export default AppStack;
