import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Text } from "galio-framework";
import { Button } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useContext } from "react";
import { AuthContext } from "../navigation/AuthProvider.js";
import auth, { firebase } from "@react-native-firebase/auth";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import { GoogleSignin } from "@react-native-community/google-signin";
import { headerlogo } from "../assets/images/headerlogo.png";
import { Alert } from "react-native";
// import { LoginManager, AccessToken } from 'react-native-fbsdk';

const LoginViewController = ({ navigation }) => {
  GoogleSignin.configure({
    webClientId:
      "998304890071-5ha8c1cded22uj885qi2jchi7kn6kk1h.apps.googleusercontent.com",
  });

  const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );

  async function onGoogleButtonPress() {
    const { idToken } = await GoogleSignin.signIn();
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
      throw "Apple Sign-In failed - no identify token returned";
    }

    // Create a Firebase credential from the response
    const { identityToken, nonce } = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce
    );

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
  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <Image
          source={require("../assets/images/headerlogo.png")}
          style={styles.logo}
        />
        <View style={{ flex: 0.4, borderColor: "white" }}>
          <Text
            h4
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: "black",
              fontFamily: "Kollektif",
              marginTop: 50,
            }}
          >
            Thousands of choices,
          </Text>
          <Text
            h4
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: "black",
              marginBottom: 25,
              fontFamily: "Kollektif",
            }}
          >
            right at your fingertips.
          </Text>
        </View>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Sign Up")}
          style={styles.button1}
          labelStyle={{ fontFamily: "Kollektif" }}
        >
          Sign Up
        </Button>
        {/* <Button
          icon="google"
          mode="outlined"
          //   disabled
          style={[styles.button]}
          onPress={
            () =>{
            onGoogleButtonPress().then(() => console.log("suck my dick"))
          }}
          color="white"
        >
          Log In with Google
        </Button>
        <Button
          icon="apple"
          mode="outlined"
          style={[styles.button, { marginBottom: "3%" }]}
          onPress={
            () => {
            onAppleButtonPress()
              .then(() => console.log("suck my nuts"))
              .catch((err) => console.error(err))}
          }
          color="white"
        >
          Log In with Apple
        </Button> */}
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Authenticate")}
          style={[styles.button1, { marginBottom: 100 }]}
          labelStyle={{ fontFamily: "Kollektif" }}
        >
          Log In
        </Button>
      </View>
    </DismissKeyboard>
  );
};

export default LoginViewController;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
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
    backgroundColor: "#D7D5ED",
  },
  logo: {
    height: "20%",
    width: "65%",
    resizeMode: "cover",
    position: "relative",
    marginBottom: "-5%",
  },
  input: {
    padding: 10,
    width: "90%",
    height: 45,
    borderRadius: 25,
    marginLeft: "5%",
  },
  input1: {
    width: "90%",
    height: 45,
    borderRadius: 25,
    marginLeft: "5%",
    marginTop: "5%",
  },
  button: {
    marginTop: "3%",
    paddingVertical: 4,
    width: "80%",
    borderColor: "#f76f6d",
    borderRadius: 15,
  },
  button1: {
    paddingVertical: 10,
    width: "80%",
    backgroundColor: "#F76F6D",
    borderRadius: 20,
    marginBottom: "2.5%",
  },
  forgotPass: {
    marginVertical: 20,
    marginBottom: "10%",
  },
  navButton: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  text: {
    fontWeight: "bold",
    alignItems: "center",
  },
});
