import React, {useState} from 'react';
import { View,  Image, StyleSheet, ImageBackground, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, SafeAreaView, } from 'react-native';
import {Text, Input} from 'galio-framework';
import LinearGradient from "react-native-linear-gradient";
import {Headline, TextInput, Button} from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useContext } from 'react';
import { AuthContext } from '../navigation/AuthProvider.js';
import {GradientButton} from '../components';
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
        <SafeAreaView style={{alignItems: "center"}}>
        <View style={styles.container}>
            <View style={{flex: 0.5, top: 50, alignItems: "flex-start", left: 10}}>
                <View style={{alignItems: "flex-start"}}>
                    <Text style={{fontSize: 30, fontFamily: "Kollektif", left: 5}}>Email</Text>
                    <Input
                        placeholder="Email"
                        placeholderTextColor="gray"
                        onChangeText={email => setEmail(email)}
                        style={styles.input1}
                        autoCapitalize="none"
                        value={email}
                    />
                </View>
                <View style={{alignItems: "flex-start", marginTop: "2%"}}>
                    <Text style={{fontSize: 30, fontFamily: "Kollektif", left: 5}}>Password</Text>
                    <Input      
                        placeholder="Password"
                        placeholderTextColor="gray"
                        secureTextEntry={true}
                        onChangeText={pass => setPass(pass)}
                        style={styles.input1}
                        value={pass}
                    />
                    {/* <Button
                        mode="filled"
                        onPress={() => login(email, pass)}
                        style={styles.button}
                        color="white"
                    >
                        Log In
                    </Button> */}
                </View>
                <View flex={1} style={{alignItems: "flex-start",}}>
                    <GradientButton >
                        hola 
                    </GradientButton>
                </View>
            </View>
        </View>
        </SafeAreaView>
        </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

export default AuthenticateViewController


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: 'flex-start'
    },
    button: {
        marginTop: 20,
        height: 37,
        width:"100%",
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
        width: '90%',
        height: 45,
        borderRadius: 25,
        backgroundColor: "#e3e3e3"
    },
    logo: {
        height: "33%",
        width: "50%",
        resizeMode: 'cover',
        position: "relative",
    },
});