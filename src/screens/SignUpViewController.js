import React, {useState} from 'react';
import { View, StyleSheet, Image, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import {Subheading} from 'react-native-paper';
import {TextInput} from 'react-native-paper';
import {Button, Card} from 'react-native-paper'
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Text, Input} from 'galio-framework';
import { AuthContext } from '../navigation/AuthProvider.js';
import { useContext } from 'react';
import {GradientButton} from '../components';

const SignUpViewController = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const {register} = useContext(AuthContext);

    

    const DismissKeyboard = ({ children }) => (
        <TouchableWithoutFeedback 
    
        onPress={() => Keyboard.dismiss()}> 
        {children}
        </TouchableWithoutFeedback>
        );

    return(
        <TouchableWithoutFeedback 
        accessible = {false}
        onPress={() => Keyboard.dismiss()}> 
            <KeyboardAvoidingView 
            behavior = "padding"
            style = {styles.container} 
            >
                <View style={styles.container}>
                    <Text style={{marginTop: 150, left: 15, fontSize: 30, fontFamily: "Kollektif"}}>Email</Text>
                    <View style={{alignItems: "center"}}>
                        <Input
                            placeholder="Email"
                            placeholderTextColor="grey"
                            onChangeText={(userEmail) => setEmail(userEmail)}
                            style={styles.input1}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            color="black"
                            fontSize={17}
                            value={email}
                        />
                    </View>
                    <Text style={{marginTop: 20, left: 15, fontSize: 30, fontFamily: "Kollektif"}}>Password</Text>
                    <View style={{alignItems: "center"}}>
                        <Input 
                            placeholder="Password"
                            placeholderTextColor="grey"
                            onChangeText={(userPass) => setPass(userPass)}
                            autoCapitalize="none"
                            secureTextEntry={true}
                            style={styles.input1}
                            value={pass}
                            color="black"
                            fontSize={17}
                        />
                    </View>
                    <View style={{alignItems: "center"}}>
                        {(email != '' && pass != "") &&
                            <GradientButton
                                onPress={() => navigation.navigate("Sign Up 1", {electronicmail: email, password: pass})}
                                style={styles.button}
                                innerStyle={{paddingVertical: 15}}
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


export default SignUpViewController;


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
        width:"80%",
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