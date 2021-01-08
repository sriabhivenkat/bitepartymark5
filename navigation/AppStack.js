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



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const HomeStack = ({navigation}) => (
    <Stack.Navigator>
            <Stack.Screen 
                name="Home" 
                component={HomeViewController}
                options = {() => ({
                    title: "My Feed",
                    headerStyle: {
                        backgroundColor: "#f76f6d",
                        shadowColor: "#f76f6d",
                        elevation: 0,
                    },
                    headerTitleStyle: {
                        color: "white",
                        fontSize: 27.5,
                        alignSelf:"center",
                        textAlign:"center",
                        flex:1,
                    }
                })}
            />

            <Stack.Screen 
                name="Begin Party"
                component={AddPartyViewController}
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
                name="Duos"
                component={AddDuosViewController}
                options = {() => ({
                    title: "",
                    headerStyle: {
                        backgroundColor: "#f76f6d",
                        shadowColor: "#f76f6d",
                        elevation: 0,
                    },
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
                backgroundColor: "#f76f6d",
                shadowColor: "#f76f6d",
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
                    backgroundColor: "#f76f6d",
                    shadowColor: "#f76f6d",
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
                    backgroundColor: 'white',
                    borderTopColor: "white"
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
                            color={"black"}
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
                            color={"black"}
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
                            color="black"
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default AppStack;