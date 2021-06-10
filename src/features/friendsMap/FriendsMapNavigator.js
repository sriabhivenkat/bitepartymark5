import React from "react";
import { Image, Dimensions, Text, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { logoHeaderOptions } from "components";
import MapDisplay from './screens/MapDisplay'


const Stack = createStackNavigator();
export default ({ navigation }) => {
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name="friendsMap/mapDisplay"
                component={MapDisplay}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}