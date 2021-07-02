import React from "react";
import { Image, Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";


import AddFriends from "../profile/screens/AddFriends";
import CreateGroup from "../createParty/screens/CreateGroup";
import { GradientButton, logoHeaderOptions, BackButton } from "../../components";
import SyncContacts from "../profile/screens/SyncContacts";
import randomSpinner from "./randomSpinner";
const Stack = createStackNavigator();

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default ({ navigation }) => (
    <Stack.Navigator screenOptions={{ headerShown: "false" }}>
        <Stack.Screen
            name="randomMode/home"
            component={randomSpinner}
            options={{
                title: "Random Mode",
                headerShown: false,
                drawBehind: true,
                ...logoHeaderOptions,
            }}
        />

    </Stack.Navigator>
);