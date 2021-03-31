import React, {useState} from 'react';
import { View,  Image, StyleSheet, ImageBackground } from 'react-native';
import {Text, Input} from 'galio-framework';
import {Headline, TextInput, Button } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useContext } from 'react';
import { AuthContext } from '../navigation/AuthProvider.js';
import auth, { firebase } from '@react-native-firebase/auth';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { GoogleSignin } from '@react-native-community/google-signin';
// import { LoginManager, AccessToken } from 'react-native-fbsdk';

const LoginViewController = ({navigation}) => {
    GoogleSignin.configure({
        webClientId: '998304890071-5ha8c1cded22uj885qi2jchi7kn6kk1h.apps.googleusercontent.com'
    });
    
    async function onGoogleButtonPress() {
        const {idToken} = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        return auth().signInWithCredential(googleCredential);
    }

    async function onAppleButtonPress() {
        // Start the sign-in request
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });
      
        // Ensure Apple returned a user identityToken
        if (!appleAuthRequestResponse.identityToken) {
          throw 'Apple Sign-In failed - no identify token returned';
        }
      
        // Create a Firebase credential from the response
        const { identityToken, nonce } = appleAuthRequestResponse;
        const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
      
        // Sign the user in with the credential
        return auth().signInWithCredential(appleCredential);
      }
    // async function onFacebookButtonPress() {
    //     const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    //     if (result.isCancelled) {
    //         throw 'shit be cancelled'
    //     }
    //     const data = await AccessToken.getCurrentAccessToken();
    //     if(!data) {
    //         throw 'something be wrong'
    //     }
    //     const facebookCred = auth.FacebookAuthProvider.credential(data.accessToken);
    //     return auth().signInWithCredential(facebookCred);
    // }
    return(
        <View style={styles.container}>
                <Image source={require('../images/logo.png')} style={styles.logo} />
                    <View style={{flex: 0.4, borderColor: "white"}}>
                        <Text h4 style={{textAlign: "center", fontWeight: "bold", color: "white", fontFamily: "PingFangHK-Medium"}}>Thousands of choices,</Text>
                        <Text h4 style={{textAlign: "center", fontWeight: "bold", color: "white", marginBottom: "15%", fontFamily: "PingFangHK-Medium"}}>right at your fingertips.</Text>
                    </View>
                    <Button
                        mode="contained"
                        onPress={() => navigation.navigate("Sign Up")}
                        style={styles.button1}
                    >
                            Sign Up
                    </Button>
                    <Button
                        icon="google"
                        mode="outlined"
                        style={[styles.button]}
                        onPress={() => onGoogleButtonPress().then(() => console.log("suck my dick"))}
                        color="white"
                    >
                        Log In with Google
                    </Button>
                    <Button
                        icon="apple"
                        mode="outlined"
                        style={[styles.button, {marginBottom: "3%"}]}
                        onPress={() => onAppleButtonPress().then(() => console.log("suck my nuts"))}
                        color="white"
                    >
                        Log In with Apple
                    </Button>
                <TouchableOpacity style={styles.forgotPass} onPress={() => navigation.navigate("Authenticate")}>
                    <Text style={styles.navButton}>Log In</Text>
                </TouchableOpacity>
        </View>
    );
};


export default LoginViewController;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        alignItems: "center",
        width: "100%",
        
    },
    card: {
        height: "35%",
        width: "80%",
        borderRadius: 25,
        shadowRadius: 40,
        marginBottom: "5%",
        backgroundColor: "#D7D5ED"
    },  
    logo: {
        height: "33%",
        width: "50%",
        resizeMode: 'cover',
        position: "relative",
        marginBottom: "-5%"
    },
    input: {
        padding: 10,
        width: '90%',
        height: 45,
        borderRadius: 25,
        marginLeft: "5%",
    },
    input1: {
        width: '90%',
        height: 45,
        borderRadius: 25,
        marginLeft: "5%",
        marginTop: "5%",
    },
    button: {
       marginTop: "3%",
       paddingVertical: 4,
       width:"80%",
       borderColor: "#f76f6d",
       borderRadius: 15
    },
    button1: {
        paddingVertical: 15,
        width:"80%",
        backgroundColor: "#F76F6D",
        borderRadius: 25,
        marginBottom: "2.5%"
    },
    forgotPass: {
        marginVertical: 20,
        marginBottom: "10%"
    },
    navButton: {
        fontSize: 15,
        fontWeight: 'bold',
        color: "white"
    },
    text: {
        fontWeight: "bold",
        alignItems: "center"
    },
});