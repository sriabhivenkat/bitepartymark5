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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const HomeStack = ({navigation}) => (
    <Stack.Navigator>
            <Stack.Screen 
                name="Home" 
                component={HomeViewController}
                options = {() => ({
                    title: "Bite Party!",
                    headerStyle: {
                        backgroundColor: "#16335e",
                        shadowColor: "#16335e",
                        elevation: 0,
                    },
                    headerTitleStyle: {
                        color: "white",
                        fontFamily: "HelveticaNeue"

                    }
                })}
            />

            <Stack.Screen 
                name="Begin Party"
                component={AddPartyViewController}
                options = {() => ({
                    title: "",
                    headerStyle: {
                        backgroundColor: "#16335e",
                        shadowColor: "#16335e",
                        elevation: 0,
                    }
                })}

            />
        </Stack.Navigator>
);

const ProfileStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="Profile"
            component={ProfileViewController}
            options={() => ({
            title:"",
            headerStyle: {
                backgroundColor: "#16335e",
                shadowColor: "#16335e",
                elevation: 0,
                },
            })}
        />
        <Stack.Screen 
            name="Add Friends"
            component={AddFriendsViewController}
            options={() => ({
                title:"",
                headerStyle: {
                    backgroundColor: "#16335e",
                    shadowColor: "#16335e",
                    elevation: 0,
                },
            })}
        />
    </Stack.Navigator>
);
const AppStack = () => {
    return(
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: "#AFAFC7",
                inactiveTintColor: "white",
                style: {
                    backgroundColor: '#16335e',
                    borderTopColor: "#16335e"
                },
            }}
            initialRouteName={
                "Home"
            }>
            <Tab.Screen 
                name="Profile"
                component={ProfileStack}
                options={{
                    tabBarLabel: "Profile",
                    tabBarIcon: () => (
                        <Ionicons 
                            name="person"
                            color={"#C5E1E5"}
                            size={25}
                        />
                    )
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
                            color={"#C5E1E5"}
                            size={25}
                        />
                    ),
                }}
            />
            <Tab.Screen 
                name="Nearby"
                component={NearbyViewController}
                options={{
                    tabBarLabel: 'Nearby',
                    tabBarIcon: () => (
                        <FontAwesome 
                            name="car"
                            size= {25}
                            backgroundColor="#16335e"
                            color="#C5E1E5"
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default AppStack;