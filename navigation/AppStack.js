import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeViewController from '../screens/HomeViewController.js';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../navigation/AuthProvider.js';
import { useContext } from 'react';
import { View } from 'react-native';
const Stack = createStackNavigator();


export const AppStack = ({navigation}) => {
    const {logout} = useContext(AuthContext);

    return(
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
                                name="sign-out"
                                size={25}
                                backgroundColor="#16335e"
                                color="#f76f6d"
                                onPress={() => logout()}
                            />
                        </View>
                    ),     
                    headerTitleStyle: {
                        color: "#f76f6d",
                    }
                })}
            />
        </Stack.Navigator>
    );
}

