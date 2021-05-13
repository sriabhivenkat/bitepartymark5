import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpViewController from '../screens/SignUpViewController.js';
import LoginViewController from '../screens/LoginViewController.js';
import OnboardingViewController from '../screens/OnboardingViewController';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import AuthenticateViewController from '../screens/AuthenticateViewController.js';
import SignUp1ViewController from '../screens/SignUp1ViewController.js';
import SignUp2ViewController from '../screens/SignUp2ViewController.js';

const Stack = createStackNavigator();


const AuthStack = ({ navigation }) => {
    const [isFirstLaunch, setIsFirstLaunch] = useState(null);
    let routeName;

    useEffect(() => {
        AsyncStorage.getItem('alreadyLaunched').then((value) => {
            if (value == null) {
                AsyncStorage.setItem('alreadyLaunched', 'true');
                setIsFirstLaunch(true);
            } else {
                setIsFirstLaunch(false);
            }
        });


    }, []);

    if (isFirstLaunch == null) {
        return null;
    } else if (isFirstLaunch == true) {
        routeName = 'Onboarding';
    } else {
        routeName = "Login";
    }

    return (
        <Stack.Navigator initialRouteName={routeName}>
            <Stack.Screen
                name="Onboarding"
                component={OnboardingViewController}
                options={{ header: () => null }}
            />
            <Stack.Screen
                name="Login"
                component={LoginViewController}
                options={{ header: () => null }}
            />
            <Stack.Screen
                name="Sign Up"
                component={SignUpViewController}
                options={{ headerShown: true, headerBackTitle: "Back", title: "Sign Up" }}
            />
            <Stack.Screen
                name="Authenticate"
                component={AuthenticateViewController}
                options={{ headerShown: true, headerBackTitle: "Back", title: "Login" }}
            />
            <Stack.Screen
                name="Sign Up 1"
                component={SignUp1ViewController}
                options={{ headerShown: true, title: "Sign Up" }}
            />
            <Stack.Screen
                name="Sign Up 2"
                component={SignUp2ViewController}
                options={{ headerShown: true, title: "Sign Up" }}
            />
        </Stack.Navigator>
    );
}

export default AuthStack;