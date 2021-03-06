import React from "react";
import { Image, Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import FriendRequests from './FriendRequests';
import InvitesDisplay from "./InvitesDisplay";

import AddFriends from "../profile/screens/AddFriends";
import CreateGroup from "../createParty/screens/CreateGroup";
import { GradientButton, logoHeaderOptions, BackButton } from "../../components";
import SyncContacts from "../profile/screens/SyncContacts";
const Stack = createStackNavigator();

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default ({ navigation }) => (
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
        // headerRight: () => (
        //   <View marginRight={10}>
        //     <GradientButton
        //       innerStyle={{ paddingHorizontal: 20 }}
        //       textStyle={{ fontSize: 16 }}
        //     >
        //       Add Friends
        //     </GradientButton>
        //   </View>
        // ),
        headerRight: () => (
          <GradientButton
            containerStyle={{ right: 10, }}
            innerStyle={{ paddingHorizontal: 10, }}
            textStyle={{ fontSize: 17, letterSpacing: -0.3, lineHeight: 20 }}
            onPress={() => navigation.navigate("invites/syncContacts"
            )}
          >
            Add Contacts
          </GradientButton>
        ),
        ...logoHeaderOptions,
      }}
    />
    <Stack.Screen
      name="invites/syncContacts"
      component={SyncContacts}
      options={{
        title: "",
        headerLeft: BackButton
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
