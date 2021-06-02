import React, { useState } from 'react';
import { View, StyleSheet,Text, ImageBackground, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Dimensions, StatusBar } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider.js';
import { useContext } from 'react';
import {Input } from 'galio-framework';
import { Button, Card } from 'react-native-paper'
import { GradientButton } from '../components';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import PhoneInput from "react-native-phone-number-input";

const PhoneVerify = ({route, navigation}) => {
    const [number, setNumber] = useState('')
    const [code, setCode] = useState('');
    const [visible, setVisible] = useState(false);
    const [confirm, setConfirm] = useState('')
    const { firstName, lastName, electronicmail, password, handle } = route.params
    const { register, otpAuth } = useContext(AuthContext);

    async function signInWithPhoneNumber(phoneNumber) {
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        setConfirm(confirmation);
      }

    async function confirmCode() {
        try {
          await confirm.confirm(code)
          register(electronicmail, password, firstName, lastName, handle, number);
        } catch (error) {
          console.log(error);
        }
    }
    return(
        <TouchableWithoutFeedback
            accessible={false}
            onPress={() => Keyboard.dismiss()}
        >
            <View style={styles.container}>
                <StatusBar barStyle='dark-content' />
          {visible===false &&
          <View>
          <Text style={[{ marginTop: 30, left: 15, fontSize: 30, fontFamily: "Kollektif" }]}>Verify phone number</Text>
                <View style={{ alignItems: "center" }}>
                    {/* <Input
                        placeholder="Enter a phone number"
                        placeholderTextColor="gray"
                        onChangeText={(phone) => setNumber(phone)}
                        type="phone-pad"
                        color="black"
                        fontSize={17}
                        fontFamily="Kollektif"
                        style={styles.input1}
                        value={number}
                    /> */}
                    <PhoneInput 
                        defaultValue={number}
                        defaultCode="US"
                        onChangeFormattedText={(phone) => setNumber(phone)}
                        layout="second"
                        textInputStyle={{fontFamily: "Kollektif", fontSize: 17}}
                        countryPickerButtonStyle={{borderRightColor: "black", borderRightWidth: 1}}
                        codeTextStyle={{fontFamily: "Kollektif", fontSize: 17}}
                        containerStyle={{borderColor: "black", borderWidth: 1, marginVertical: 10, borderRadius: 25, width: "90%", height: 90}}
                        //containerStyle={styles.input1}
                        placeholder="Enter number"
                    />
                </View>
                <View
                    style={{
                        paddingHorizontal: 20,
                        alignItems: "center"
                    }}
                >
                    <Text style={{textAlign: "center", fontFamily: "Kollektif", color: "lightgray"}}>SMS will be sent for verification, and standard messaging and data rates may apply</Text>
                </View>

                <View style={{ alignItems: "center" }}>
                    {(number != '') &&
                        <GradientButton
                            onPress={() => {
                                signInWithPhoneNumber(number)
                                setVisible(true)
                            }}
                            style={styles.button}
                            innerStyle={{ paddingVertical: 10 }}
                        >
                            Send code!
                        </GradientButton>
                    }
                </View>
               </View> 
            }
                {visible===true &&
                    <View>
                    <Text style={[{ marginTop: 30, left: 15, fontSize: 30, fontFamily: "Kollektif" }]}>Enter code</Text>
                    <View style={{alignItems: 'center'}}>
                        <Input
                            placeholder="Enter code"
                            placeholderTextColor="gray"
                            onChangeText={text => setCode(text)}
                            type="numeric"
                            color="black"
                            fontSize={17}
                            fontFamily="Kollektif"
                            style={styles.input1}
                            value={code}                                
                        />
                    </View>
                    <View style={{ alignItems: "center" }}>
                        {(code.length === 6) &&
                            <GradientButton
                                onPress={() => {
                                    confirmCode(code)
                                }}
                                style={styles.button}
                                innerStyle={{ paddingVertical: 10 }}
                            >
                                Verify
                            </GradientButton>
                        }
                    </View>
                    </View>
                }
            </View>
        </TouchableWithoutFeedback>
    );
}

export default PhoneVerify;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    text: {
        marginTop: 150,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 30,
        fontFamily: "Kollektif"
    },
    input1: {
        width: '90%',
        height: 45,
        // marginTop: 20,
        // marginBottom: 10,
         borderWidth: 1,
         borderColor: "black",
         borderRadius: 15,
    },
    button: {
        marginTop: 20,
        height: 37,
        width: "80%",
        backgroundColor: "#F76F6D",
        borderRadius: 15,
    },
})