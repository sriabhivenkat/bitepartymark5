import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import SignUpViewController from '../screens/SignUpViewController.js';
import LoginViewController from '../screens/LoginViewController.js';
import OnboardingViewController from '../screens/OnboardingViewController';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();


const AuthStack = ({navigation}) => {
    const [isFirstLaunch, setIsFirstLaunch] = useState(null);
    let routeName;

    useEffect(() => {
        AsyncStorage.getItem('alreadyLaunched').then((value) => {
            if(value==null) {
                AsyncStorage.setItem('alreadyLaunched', 'true');
                setIsFirstLaunch(true);
            }else{
                setIsFirstLaunch(false);
            }
        });

        
    }, []);

    if (isFirstLaunch==null){
        return null;
    } else if (isFirstLaunch==true) {
        routeName='Onboarding';
    } else {
        routeName="Login";
    }

    return(
        <Stack.Navigator initialRouteName={routeName}>
            <Stack.Screen 
                name="Onboarding"
                component={OnboardingViewController}
                options={{header: () => null}}
            />
            <Stack.Screen 
                name="Login"
                component={LoginViewController}
                options={{header: () => null}}
            />
            <Stack.Screen 
                name="Sign Up"
                component={SignUpViewController}
                options={({navigation}) => ({
                    title: '',
                    headerStyle: {
                        backgroundColor: '#16335e',
                        shadowColor: '#16335e',
                        elevation: 0,
                    },
                    headerLeft: () => (
                        <View style={{marginLeft: 10}}>
                            <FontAwesome.Button 
                                name="arrow-left"
                                size={30}
                                backgroundColor="#16335e"
                                color="#f7a146"
                                onPress={() => navigation.navigate('Login')}
                            />
                        </View>
                    )
                })}
            />
        </Stack.Navigator>
    );
}

export default AuthStack;