import React, {useState} from 'react';
import { View,  Image, StyleSheet, ImageBackground, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import {Text, Input} from 'galio-framework';
import {Headline, TextInput, Button} from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useContext } from 'react';
import { AuthContext } from '../navigation/AuthProvider.js';
import {Card} from 'react-native-paper';

const AuthenticateViewController = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const {login} = useContext(AuthContext);
    return(

        <TouchableWithoutFeedback 
        accessible = {false}
        onPress={() => Keyboard.dismiss()}> 
        <KeyboardAvoidingView 
        behavior = "padding"
        style = {styles.container} 
        >
        <View style={styles.container}>
            <Image source={require('../images/logo.png')} style={styles.logo} />
            <Input
                placeholder="Email"
                placeholderTextColor="gray"
                onChangeText={email => setEmail(email)}
                style={styles.input1}
                autoCapitalize="none"
                value={email}
            />
            <Input      
                placeholder="Password"
                placeholderTextColor="gray"
                secureTextEntry={true}
                onChangeText={pass => setPass(pass)}
                style={styles.input1}
                value={pass}
            />
            <Button
                mode="outlined"
                onPress={() => login(email, pass)}
                style={styles.button}
                color="white"
            >
                Log In
            </Button>
        </View>
        </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

export default AuthenticateViewController


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        marginTop: 20,
        height: 37,
        width:"50%",
        borderColor: "#f76f6d",
        borderWidth: 2,
        borderRadius: 15
     },
    input: {
        padding: 10,
        width: '70%',
        height: 45,
        borderRadius: 25,
    },
    input1: {
        width: '70%',
        height: 45,
        borderRadius: 25,
    },
    logo: {
        height: "33%",
        width: "50%",
        resizeMode: 'cover',
        position: "relative",
    },
});