import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider.js';
import { useContext } from 'react';
import { Text, Input } from 'galio-framework';
import { Button, Card } from 'react-native-paper'
import { GradientButton } from '../components';
import { Alert } from 'react-native';

const SignUp4ViewController = ({ route }) => {
    const [handle, setHandle] = useState('');
    const { firstName, lastName, electronicmail, password } = route.params
    const { register } = useContext(AuthContext);

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    return (

        <TouchableWithoutFeedback
            accessible={false}
            onPress={() => Keyboard.dismiss()}>

            <KeyboardAvoidingView
                behavior="padding"
                style={styles.container}>

                <View style={styles.container}>
                    <Text h2 style={[styles.text, { paddingBottom: "5%", color: "#f76f6d", marginTop: 15 }]}>Almost there!</Text>

                    <Text style={{ left: 15, fontSize: 30, fontFamily: "Kollektif" }}>Set a Username</Text>
                    <View style={{ alignItems: "center" }}>
                        <Input
                            placeholder="Enter a handle"
                            placeholderTextColor="gray"
                            autoCapitalize="none"
                            onChangeText={(userHandle) => setHandle(userHandle)}
                            style={styles.input1}
                            color="black"
                            fontSize={17}
                            value={handle}
                        />
                    </View>
                    {handle != "" &&
                        <View style={{ alignItems: "center" }}>
                            <GradientButton
                                onPress={() => {
                                    register(electronicmail, password, firstName, lastName, handle)
                                        .then(error => {
                                            if (error.code === 'auth/email-already-in-use') {
                                                Alert.alert('That email address is already in use!');
                                            }

                                            if (error.code === 'auth/invalid-email') {
                                                Alert.alert('That email address is invalid!');
                                            }

                                            console.error(error);
                                        })
                                }}
                                style={styles.button}
                            >
                                LET'S GO
                    </GradientButton>
                        </View>
                    }
                </View>

            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

export default SignUp4ViewController;


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
        marginTop: 150,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 30,
        fontFamily: "Kollektif"
    },
})