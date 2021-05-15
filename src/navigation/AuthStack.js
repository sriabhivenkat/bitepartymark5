import React, { useState, useEffect } from "react";
import { View, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import SignUpViewController from "../screens/SignUpViewController.js";
import LoginViewController from "../screens/LoginViewController.js";
// import OnboardingViewController from "../screens/OnboardingViewController";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-community/async-storage";
import AuthenticateViewController from "../screens/AuthenticateViewController.js";
import SignUp1ViewController from "../screens/SignUp1ViewController.js";
import SignUp2ViewController from "../screens/SignUp2ViewController.js";
import SignUp3ViewController from "../screens/SignUp3ViewController.js";
import SignUp4ViewController from "../screens/SignUp4ViewController.js";
import ResetPassword from "../screens/ResetPassword.js";
import { logoHeaderOptions } from "../components/logoHeaderOptions.js";

const Stack = createStackNavigator();

const AuthStack = ({ navigation }) => {
  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value == null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
      }
    });
  }, []);

  // if (isFirstLaunch == null) {
  //   return null;
  // } else if (isFirstLaunch == true) {
  //   routeName = "Onboarding";
  // } else {
  //   routeName = "Login";
  // }

  return (
    <Stack.Navigator initialRouteName={"Login"}>
      {/* <Stack.Screen
        name="Onboarding"
        component={OnboardingViewController}
        options={{ header: () => null }}
      /> */}
      <Stack.Screen
        name="Login"
        component={LoginViewController}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Sign Up"
        component={SignUpViewController}
        options={{
          headerShown: true,
          headerBackTitle: "Back",
          title: "Sign Up",
          ...logoHeaderOptions,
        }}
      />
      <Stack.Screen
        name="Authenticate"
        component={AuthenticateViewController}
        options={{
          headerShown: true,
          headerBackTitle: "Back",
          title: "Login",
          ...logoHeaderOptions,
        }}
      />
      <Stack.Screen
        name="Sign Up 1"
        component={SignUp1ViewController}
        options={{ headerShown: true, title: "Sign Up", ...logoHeaderOptions }}
      />
      <Stack.Screen
        name="Sign Up 2"
        component={SignUp2ViewController}
        options={{ headerShown: true, title: "Sign Up", ...logoHeaderOptions }}
      />
      <Stack.Screen
        name="Sign Up 3"
        component={SignUp3ViewController}
        options={{ headerShown: true, title: "Sign Up", ...logoHeaderOptions }}
      />
      <Stack.Screen
        name="Sign Up 4"
        component={SignUp4ViewController}
        options={{ headerShown: true, title: "Sign Up", ...logoHeaderOptions }}
      />
      <Stack.Screen
        name="auth/reset"
        component={ResetPassword}
        options={{
          headerShown: true,
          title: "Reset Password",
          ...logoHeaderOptions,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
