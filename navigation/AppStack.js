import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeViewController from '../screens/HomeViewController.js';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../navigation/AuthProvider.js';
import { useContext } from 'react';
import { View } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = ({navigation}) => (
    <Stack.Navigator>
            <Stack.Screen 
                name="Home" 
                component={HomeViewController}
                options={{header: () => null}}
            />
            <Stack.Screen 
                name="Begin Party"
                component={AddPartyViewController}
                options = {() => ({
                    title: "",
                    headerShown: "false",
                    headerStyle: {
                        backgroundColor: "white",
                        shadowColor: "white",
                        elevation: 0,
                    },
                })}
            />
            <Stack.Screen 
                name="Duos"
                component={AddDuosViewController}
                options = {() => ({
                    title: "",
                    headerStyle: {
                        backgroundColor: "white",
                        shadowColor: "white",
                        elevation: 0,
                    },
                })}
            />
            <Stack.Screen 
                name="Filters"
                component={FiltersViewController}
                options={{header: () => null}}
            />
            <Stack.Screen 
                name="DuosPartyScreen"
                component={DuosPartyScreen}
                options={{header: () => null}}
            />
        </Stack.Navigator>
);

const ProfileStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="Profile"
            component={ProfileViewController}
            options={{header: () => null}}
        />
        <Stack.Screen 
            name="Add Friends"
            component={AddFriendsViewController}
            options={{header: () => null}}
        />
        <Stack.Screen 
            name="Settings"
            component={SettingsViewController}
            options={{header: () => null}}
        />
    </Stack.Navigator>
);


const NearbyStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="FlavorProfile"
            component={NearbyViewController}
            options={{header: () => null}}
        />
        <Stack.Screen 
            name="FlavorTest"
            component={FlavorTestViewController}
            options={{header: () => null}}
        />
    </Stack.Navigator>
)

const AppStack = () => {
    return(
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: "#AFAFC7",
                inactiveTintColor: "white",
                style: {
                    backgroundColor: 'white',
                    borderTopColor: "white"
                },
                headerShown: false
            }}
            initialRouteName={
                "Home"
            }
        >
            <Tab.Screen 
                name="Profile"
                component={ProfileStack}
                options={{
                    tabBarLabel: "Profile",
                    tabBarIcon: () => (
                        <Ionicons 
                            name="person"
                            color={"black"}
                            size={25}
                        />
                    ),
                }}
            />
            <Tab.Screen 
                name="Home"
                component={HomeStack}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon:() => (
                        <Ionicons 
                            name="home"
                            color={"black"}
                            size={25}
                        />
                    ),
                }}
            />
            <Tab.Screen 
                name="FlavorProfile"
                component={NearbyStack}
                options={{
                    tabBarLabel: 'FlavorProfile',
                    tabBarIcon: () => (
                        <Ionicons 
                            name="restaurant"
                            color={"black"}
                            size={30}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default AppStack;