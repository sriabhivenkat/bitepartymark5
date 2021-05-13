import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider.js';
import { useContext } from 'react';
import { Text, Input } from 'galio-framework';
import { Button, Card } from 'react-native-paper'
import { DismissKeyboard } from '../components/DismissKeyboard'
import { GradientButton } from '../components';


const SignUp1ViewController = ({ route, navigation }) => {
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const { electronicmail, password } = route.params;
    return (

        <TouchableWithoutFeedback
            accessible={false}
            onPress={() => Keyboard.dismiss()}>

            <KeyboardAvoidingView
                behavior="padding"
                style={styles.container}>

                <View style={styles.container}>
                    <Text style={{ marginTop: 150, left: 15, fontSize: 30, fontFamily: "Kollektif" }}>First Name</Text>
                    <View style={{ alignItems: "center" }}>
                        <Input
                            placeholder="Enter your first name"
                            placeholderTextColor="gray"
                            onChangeText={(userFirst) => setFirst(userFirst)}
                            style={styles.input1}
                            autoCorrect={false}
                            color="black"
                            fontSize={17}
                            value={first}
                        />
                    </View>
                    <Text style={{ marginTop: 20, left: 15, fontSize: 30, fontFamily: "Kollektif" }}>Last Name</Text>
                    <View style={{ alignItems: "center" }}>
                        <Input
                            placeholder="Enter your last name"
                            placeholderTextColor="gray"
                            onChangeText={(userLast) => setLast(userLast)}
                            style={styles.input1}
                            color="black"
                            fontSize={17}
                            autoCorrect={false}
                            value={last}
                        />
                    </View>
                    {(first != '' && last != "") &&
                        <View style={{ alignItems: "center" }}>
                            <KeyboardAvoidingView
                                behavior="padding"
                                style={styles.container}>
                                <GradientButton
                                    mode="contained"
                                    onPress={() => navigation.navigate("Sign Up 2", { firstname: first, lastname: last, electronicmail, password })}
                                    style={styles.button}
                                >
                                    NEXT
                    </GradientButton>
                            </KeyboardAvoidingView>
                        </View>
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
        backgroundColor: "white"
    },
    input: {
        padding: 10,
        width: '90%',
        marginLeft: "5%",
        height: 45,
        borderRadius: 25,
    },
    input1: {
        width: '95%',
        height: 45,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "black",
    },
    button: {
        marginTop: 20,
        height: 37,
        width: "80%",
        backgroundColor: "#F76F6D",
        borderRadius: 15
    },
    text: {
        marginTop: "30%",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 32,
        color: "white",
        fontFamily: "Kollektif"
    },
})
