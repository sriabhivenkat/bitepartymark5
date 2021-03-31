import React, {useState} from 'react';
import { View, StyleSheet, ImageBackground, KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider.js';
import { useContext } from 'react';
import {Text, Input} from 'galio-framework';
import {Button, Card} from 'react-native-paper'
import {DismissKeyboard} from '../component/DismissKeyboard'

const SignUp1ViewController = ({route, navigation}) => {
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const {electronicmail, password} = route.params;
    return(

        <TouchableWithoutFeedback 
        accessible = {false}
        onPress={() => Keyboard.dismiss()}> 

        <KeyboardAvoidingView
        behavior = "padding"
        style = {styles.container}>
           
        <View style={styles.container}>
            <Text h2 style={[styles.text, {paddingBottom: "10%", padding: 14}]}>Enter your first and last name.</Text>
            <Input 
                placeholder="Enter your first name"
                placeholderTextColor="gray"
                onChangeText={(userFirst) => setFirst(userFirst)}
                style={styles.input1}
                autoCorrect={false}
                value={first}
            />
            <Input 
                placeholder="Enter your last name"
                placeholderTextColor="gray"
                onChangeText={(userLast) => setLast(userLast)}
                style={styles.input1}
                autoCorrect={false}
                value={last}
            />
            {(first != '' && last != "") &&
                <Button
                    mode="contained"
                    onPress={() => navigation.navigate("Sign Up 2", {firstname: first, lastname: last, electronicmail, password})}
                    style={styles.button}
                >
                    Next
                </Button>
            }
        </View>
      
        </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}


export default SignUp1ViewController;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black"
    },
    input: {
        padding: 10,
        width: '90%',
        marginLeft: "5%",
        height: 45,
        borderRadius: 25,
    },
    input1: {
        width: '70%',
        height: 45,
        borderRadius: 20,
    },
    button: {
        marginTop: 20,
        height: 37,
        width:"50%",
        backgroundColor: "#F76F6D",
        borderRadius: 15
    },
    text: {
        marginTop: "30%",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 32,
        color: "white",
        fontFamily: "PingFangHK-Medium"
    },
})
