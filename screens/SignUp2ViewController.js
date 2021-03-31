import React, {useState} from 'react';
import { View, StyleSheet, ImageBackground,Keyboard,KeyboardAvoidingView,TouchableWithoutFeedback } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider.js';
import { useContext } from 'react';
import {Text, Input} from 'galio-framework';
import {Button, Card} from 'react-native-paper'

const SignUp2ViewController = ({route}) => {
    const [handle, setHandle] = useState('');
    const {firstname, lastname, electronicmail, password} = route.params
    const {register} = useContext(AuthContext);
    return(

        <TouchableWithoutFeedback 
        accessible = {false}
        onPress={() => Keyboard.dismiss()}> 

        <KeyboardAvoidingView
        behavior = "padding"
        style = {styles.container}>

        <View style={styles.container}>
            <Text h2 style={[styles.text, {paddingBottom: "10%", padding: 14}]}>Almost there!</Text>
            <Input 
                placeholder="Enter a handle"
                placeholderTextColor="gray"
                autoCapitalize="none"
                onChangeText={(userHandle) => setHandle(userHandle)}
                style={styles.input1}
                value={handle}
            />
            {handle!="" &&
                <Button
                    mode="contained"
                    onPress={() => register(electronicmail, password, firstname, lastname, handle)}
                    style={styles.button}
                >
                    Sign Up!
                </Button>
            }
        </View>
        </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

export default SignUp2ViewController;


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
