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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const HomeStack = ({navigation}) => (
    <Stack.Navigator>
            <Stack.Screen 
                name="Home" 
                component={HomeViewController}
                options={({navigation}) => ({
                    title:"",
                    headerStyle: {
                        backgroundColor: "#16335e",
                        shadowColor: "#16335e",
                        elevation: 0,
                    },
                    headerRight: () => (
                        <View style={{marginRight: 10}}>
                            <FontAwesome.Button 
                                name="cogs"
                                size={25}
                                backgroundColor="#16335e"
                                color="#f76f6d"
                                onPress={() => navigation.navigate("Settings")}
                            />
                        </View>
                    ),     
                    headerTitleStyle: {
                        color: "#f76f6d",
                    }
                })}
            />
            <Stack.Screen 
                name="Settings"
                component={SettingsViewController}
                options={() => ({
                    title:"",
                    headerStyle: {
                        backgroundColor: "#16335e",
                        shadowColor: "#16335e",
                        elevation: 0,
                    },
                    headerLeft: () => (
                        <Ionicons.Button 
                            name="arrow-back"
                            size= {30}
                            backgroundColor="#16335e"
                            color="#f76f6d"
                            onPress={() => navigation.navigate("Home")}
                        />
                    ),
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
                activeTintColor: "#f76f6d",
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
                            color={"#f76f6d"}
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
                            color={"#f76f6d"}
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
                            color="#f76f6d"
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default AppStack;