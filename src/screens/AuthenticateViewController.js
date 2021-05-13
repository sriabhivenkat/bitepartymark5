import React, { useState } from "react";
import {
    View,
    Image,
    StyleSheet,
    ImageBackground,
    Keyboard,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    SafeAreaView,
} from "react-native";
import { Text, Input } from "galio-framework";
import LinearGradient from "react-native-linear-gradient";
import { Headline, TextInput, Button } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useContext } from "react";
import { AuthContext } from "../navigation/AuthProvider.js";
import { GradientButton } from "../components";
import { Card } from "react-native-paper";
import { Alert, Dimensions } from "react-native";

const AuthenticateViewController = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;

    const { login } = useContext(AuthContext);
    return (
        <TouchableWithoutFeedback
            accessible={false}
            onPress={() => Keyboard.dismiss()}
        >
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.container}>


                    <View
                        style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",

                        }}
                    >
                        <View style={{
                            alignItems: "flex-start",
                            marginTop: "2%",
                            justifyContent: "center",

                        }}>
                            <Text
                                style={{
                                    fontSize: 30,
                                    fontFamily: "Kollektif",
                                    textAlign: "left",
                                }}
                            >
                                Email
            </Text>

                            <View style={{ alignItems: "center" }}>
                                <Input
                                    placeholder="Email"
                                    placeholderTextColor="gray"
                                    onChangeText={(email) => setEmail(email)}
                                    style={styles.input1}
                                    autoCapitalize="none"
                                    color="black"
                                    fontSize={17}
                                    value={email}
                                />
                            </View>
                        </View>
                        <View
                            style={{
                                alignItems: "flex-start",
                                marginTop: "2%",
                                justifyContent: "center",

                            }}
                        >
                            <Text style={{ fontSize: 30, fontFamily: "Kollektif" }}>
                                Password
              </Text>
                            <Input
                                placeholder="Password"
                                placeholderTextColor="gray"
                                secureTextEntry={true}
                                onChangeText={(pass) => setPass(pass)}
                                color="black"
                                fontSize={17}
                                style={styles.input1}
                                value={pass}
                            />
                        </View>


                        <View
                            style={{
                                width: windowWidth,
                                alignItems: "center",
                                justifyContent: "center",
                                paddingTop: 20
                            }}
                        >
                            {email != "" && pass != "" && (
                                <GradientButton
                                    onPress={async () => {
                                        try {
                                            login(email, pass);
                                        } catch (err) {
                                            Alert.alert(err)

                                        }
                                    }}
                                    style={{ width: "50%" }}
                                    innerStyle={{ paddingVertical: 10 }}
                                >
                                    Login
                                </GradientButton>
                            )}
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

export default AuthenticateViewController;

const styles = StyleSheet.create({
    container: {
        flex: 1,

        alignItems: "flex-start",
    },
    button: {
        // height: 37,

        borderColor: "#f76f6d",
        borderWidth: 2,
        borderRadius: 15,
    },
    input: {
        // padding: 10,
        // width: '70%',
        // height: 45,
        // borderRadius: 25,
    },
    input1: {
        width: "90%",
        height: 45,
        borderRadius: 15,
        borderColor: "black",
        borderWidth: 1,
        backgroundColor: "#e3e3e3",
    },
    logo: {
        height: "33%",
        width: "50%",
        resizeMode: "cover",
        position: "relative",
    },
});
