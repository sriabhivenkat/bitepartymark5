import React, { useEffect } from "react";
import { Alert, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import dynamicLinks from "@react-native-firebase/dynamic-links";
import messaging from "@react-native-firebase/messaging";
import parse from 'url-parse'

import * as RootNavigation from "navigation/RootNavigation";

import CreatePartyNavigator from "features/createParty/CreatePartyNavigator";
import JoinPartyNavigator from "features/joinParty/JoinPartyNavigator";
import InvitesDisplayNavigator from "features/invitesDisplay/InvitesDisplayNavigator";
import ProfileNavigator from "features/profile/ProfileNavigator";
import { TouchableOpacity } from "react-native";
import { BackButton } from "../components/BackButton.js";
import randomModeNavigator from "../features/randomMode/randomModeNavigator.js";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const tabBarListeners = ({ navigation, route }) => ({
  tabPress: () => {
    // if (route?.state?.index) navigation.replace("Home");
    // else navigation.navigate("Home");
    // navigation.replace("Home");
    navigation.reset({
      index: 0,
      routes: [{ name: "home" }],
    })
  },
});
const BottomTabNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: "white",
      inactiveTintColor: "white",
      style: {
        backgroundColor: "white",
        borderTopColor: "white",
        // shadowOffset: { width: 1, height: 2 },
        // shadowOpacity: 0.1,
        // shadowRadius: 5,
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
      // listeners={tabBarListeners}
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
    <Tab.Screen
      name="randomMode"
      component={randomModeNavigator}
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
  const handleMessage = async (message) => {
    if (!message) return;

    const { partyId, type, initial } = message.data;
    console.log({ partyId, type })
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
      case "join":
        /* uh so this avoids a race condition, 
          user isn't loaded when the app initially launches, 
          so delaying the navigation seems to resolve the issue,
          god awful solution, will revisit later...
        */
        if (initial)
          await new Promise(r => setTimeout(r, 2000));
        RootNavigation.navigate("invites", {
          screen: "invitesDisplay",
          params: { partyID: partyId, linkInvite: true },
        })
        // RootNavigation.navigate("invitesDisplay",
        //  { partyID: partyId, linkInvite: true },
        // );
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    messaging().getInitialNotification().then(handleMessage);
    messaging().onNotificationOpenedApp(handleMessage);
    dynamicLinks().onLink((link) => {
      const url = parse(link.url, true)
      handleMessage({ data: { partyId: url.query.id, type: url.pathname.slice(1) } })
    });
    dynamicLinks()
      .getInitialLink()
      .then(link => {
        console.log({ link })
        const url = parse(link.url, true)
        handleMessage({ data: { partyId: url.query.id, type: url.pathname.slice(1), initial: true } })
      })
  }, []);

  return (
    <Stack.Navigator initialRouteName={"Home"}>
      <Stack.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{ headerShown: false, animationEnabled: false }}
      />
      {/* <Stack.Screen
        name="joinParty"
        component={JoinPartyNavigator}
        options={{ headerShown: false }}
      /> */}
      {/* <Stack.Screen
        name="Add Friends"
        component={AddFriendsViewController}
        options={{
          title: "",
          headerLeft: BackButton,
        }}
      /> */}
    </Stack.Navigator>
  );
};
export default AppStack;
