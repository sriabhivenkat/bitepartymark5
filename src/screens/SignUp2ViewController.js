import React, { useState } from "react";
import {
    View,
    StyleSheet,
    ImageBackground,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Dimensions
} from "react-native";
import { AuthContext } from "../navigation/AuthProvider.js";
import { useContext } from "react";
import { Text, Input } from "galio-framework";
import { Button, Card } from "react-native-paper";
import { DismissKeyboard } from "../components/DismissKeyboard";
import { GradientButton } from "../components";

const SignUp2ViewController = ({ route, navigation }) => {

    const { password, electronicmail } = route.params;
    const [first, setFirst] = useState("");

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const DismissKeyboard = ({ children }) => (
        <TouchableWithoutFeedback

            onPress={() => Keyboard.dismiss()}>
            {children}
        </TouchableWithoutFeedback>
    );

    return (
        <TouchableWithoutFeedback
            accessible={false}
            onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView
                behavior="padding"
                style={styles.container}
            >

                <View style={styles.container}>
                    <Text style={{ marginTop: 30, left: 15, fontSize: 30, fontFamily: "Kollektif" }}>First Name</Text>
                    <View style={{ alignItems: "center" }}>
                        <Input
                            placeholder="First Name"
                            placeholderTextColor="gray"

                            onChangeText={(first) => setFirst(first)}
                            color="black"
                            fontSize={17}
                            fontFamily="Kollektif"
                            style={styles.input1}
                            value={first}
                        />
                    </View>

                    <View style={{ alignItems: "center" }}>
                        {(first != '') &&
                            <GradientButton
                                onPress={() => {
                                    try {
                                        navigation.navigate("Sign Up 3", { firstName: first, password, electronicmail })
                                    } catch (err) {
                                        Alert.alert(err);
                                    }
                                }}
                                style={styles.button}
                                innerStyle={{ paddingVertical: 10 }}
                            >
                                NEXT
                            </GradientButton>
                        }
                    </View>
                </View>

            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>


    );
};


export default SignUp2ViewController;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    card: {
        height: "50%",
        width: "80%",
        borderRadius: 25,
        shadowRadius: 40,
        alignContent: "center",
        marginBottom: "3%",
        marginTop: "8%",
        backgroundColor: "#D7D5ED"
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        alignItems: "center",
        width: "100%"
    },
    input: {
        padding: 10,
        width: '95%',
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
    text: {
        marginTop: "30%",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 32,
        color: "white",
        fontFamily: "Kollektif"
    },
    subheading: {
        color: '#f7a146',

    },
    button: {
        marginTop: 20,
        height: 37,
        width: "80%",
        backgroundColor: "#F76F6D",
        borderRadius: 15,
    },
    forgotPass: {
        marginVertical: 25,
        marginBottom: 100
    },
    navButton: {
        fontSize: 15,
        fontWeight: 'bold',
        color: "white"
    },
    logo: {
        height: "33%",
        width: "50%",
        resizeMode: 'cover',
        position: "relative",
    },
});