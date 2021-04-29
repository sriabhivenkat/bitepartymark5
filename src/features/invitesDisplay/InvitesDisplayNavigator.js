import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import InvitesDisplay from "./InvitesDisplay";
import PartiesDisplay from "./PartiesDisplay";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context'



const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();



export default () => (


  <Tab.Navigator
    tabBarOptions={{
      labelStyle: { fontSize: 15 },
      inactiveTintColor: "gray",
      activeTintColor: "#EE7C78",
      style: { backgroundColor: 'white', marginTop: 80 },
      pressColor: "#EE7C78",
      indicatorStyle: { backgroundColor: "#EE7C78" }

    }}>
    <Tab.Screen
      name="Invites"
      component={InvitesDisplay}
      options={{
        title: "Invites",
        headerShown: false,
      }}
    />
    <Tab.Screen
      name="Parties"
      component={PartiesDisplay}
      options={{
        title: "Parties",
        headerShown: false,
      }}
    />
  </Tab.Navigator>

);
