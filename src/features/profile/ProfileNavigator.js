import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {Dimensions} from 'react-native';
import {GradientButton} from "components";
import Profile from "./screens/Profile";
import Settings from "./screens/Settings";
import EditProfile from "./screens/EditProfile";
import AddFriends from "./screens/AddFriends";
import ShowGroups from './screens/ShowGroups';
import SyncContacts from "./screens/SyncContacts";
import { BackButton, logoHeaderOptions } from "../../components";
import FriendsView from "./screens/FriendsView";
import PastParties from "./screens/PastParties";
const Stack = createStackNavigator();

export default ({navigation}) => (
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
        headerShown: true,
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
            innerStyle={{paddingHorizontal: 10,}}
            textStyle={{fontSize: 17, letterSpacing: -0.3, lineHeight: 20}}
            onPress={() => navigation.navigate("profile/syncContacts")}
          >
            Add Contacts
          </GradientButton>
        ),
        headerStyle: {
          height: Dimensions.get("window").height/8
        }
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
    <Stack.Screen 
      name="profile/syncContacts"
      component={SyncContacts}
      options={{
        title:"",
        headerLeft: BackButton
      }}
    />
  </Stack.Navigator>
);
