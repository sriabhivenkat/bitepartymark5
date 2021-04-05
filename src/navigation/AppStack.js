import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeViewController from '../screens/HomeViewController.js';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../navigation/AuthProvider.js';
import { useContext } from 'react';
import { View,Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SettingsViewController from '../screens/SettingsViewController.js'
import ProfileViewController from '../screens/ProfileViewController.js';
import NearbyViewController from '../screens/NearbyViewController.js';
import AddFriendsViewController from '../screens/AddFriendsViewController.js';
import AddPartyViewController from '../screens/AddPartyViewController.js';
import AddDuosViewController from '../screens/AddDuosViewController.js';
import AddSquadsViewController from '../screens/AddSquadsViewController.js';
import FiltersViewController from '../screens/FiltersViewController.js';
import DuosPartyScreen from '../screens/DuosPartyScreen.js';
import FlavorTestViewController from '../screens/FlavorTestViewController.js';
import { Image } from 'react-native';
import SwipingScreenViewController from '../screens/swipingScreen.js';
import test from '../screens/test.js';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function LogoTitle() {
    return (
        <Image
            style={{ width: 100, height: 75, alignItems: "center" }}
            source={require("../images/headerlogo.png")}
        />
    );
}
const HomeStack = ({ navigation }) => (
    <Stack.Navigator>
        <Stack.Screen
            name="Home"
            component={HomeViewController}
            options={{ header: () => null }}
        />
    </Stack.Navigator>
);

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
                headerTitle: props => <LogoTitle {...props} />,
                headerStyle: {
                    height: 120,
                }
            }}
        />
    </Stack.Navigator>
);


const NearbyStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="Begin Party"
            component={AddPartyViewController}
            options={{
                headerTitle: props => <LogoTitle {...props} />,
                headerStyle: {
                    height: 120,
                }
            }}
        />
        <Stack.Screen
            name="Duos"
            component={AddDuosViewController}
            options={() => ({
                title: "",
                headerStyle: {
                    backgroundColor: "white",
                    shadowColor: "white",
                    elevation: 0,
                },
            })}
        />
        <Stack.Screen
            name="Squads"
            component={AddSquadsViewController}
            options={{ header: () => null }}
        />
        <Stack.Screen
            name="Filters"
            component={FiltersViewController}
            options={{ header: () => null }}
        />
        <Stack.Screen
            name="DuosPartyScreen"
            component={DuosPartyScreen}
            options={{ header: () => null }}
        />
        <Stack.Screen
            name="SwipingScreen"
            component={SwipingScreenViewController}
            options={{ header: () => null }}
        />
        <Stack.Screen 
            name="test"
            component={test}
            options={{
                headerBackTitle: <Text>Back</Text>,
                headerTitle: props => <LogoTitle {...props} />,
                headerStyle: {
                    height: 120,
                }
            }}
        />
    </Stack.Navigator>
)

const AppStack = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: "white",
                inactiveTintColor: "white",
                style: {
                    backgroundColor: 'white',
                    borderTopColor: "white",
                    marginTop: 10,
                },
                headerShown: false,
                tintColor: "#f76f6d"
            }}
            initialRouteName={
                "Home"
            }
        >
            <Tab.Screen
                name="Profile"
                component={HomeStack}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name="people"
                            color={focused ? 'black' : "gray"}
                            size={30}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Home"
                component={NearbyStack}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name="home"
                            color={focused ? 'black' : "gray"}
                            size={25}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Party!"
                component={ProfileStack}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name="person"
                            color={focused ? 'black' : "gray"}
                            size={25}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default AppStack;