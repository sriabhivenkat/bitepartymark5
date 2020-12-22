import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeViewController from '../screens/HomeViewController.js';


const Stack = createStackNavigator();


export const AppStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeViewController} />
        </Stack.Navigator>
    );
}

