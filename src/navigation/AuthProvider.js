import React, { useState } from "react";
import { createContext } from "react";
import firebase from "@react-native-firebase/app";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { Alert } from "react-native";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
            Alert.alert("Invalid email/password");
          }
        },
        register: async (email, password, first, last, handle, phoneNumber) => {
          try {
            const cleanPhone = (str) => str?.replace(/\D/g, "").slice(-9);
            await auth()
              .createUserWithEmailAndPassword(email, password)
              .then(() => {
                var uidval = firebase.auth().currentUser.uid;
                firestore().collection("Users").doc(uidval).set({
                  firstName: first,
                  lastName: last,
                  handle: handle,
                  flavorProfileCreated: false,
                  uidvalue: uidval,
                  phoneNumber: phoneNumber,
                  sliced: cleanPhone(phoneNumber),
                });
              })
              .then(() => {
                var uidval = firebase.auth().currentUser.uid;
                // firestore()
                //   .collection("Users")
                //   .doc(uidval)
                //   .collection("friends")
                //   .doc("friend1")
                //   .set({
                //     uidvalue: "testuid",
                //     firstName: "TestFirst",
                //     lastName: "TestLastName",
                //     handleval: "testhandle",
                //   });
                // firestore()
                //   .collection("Users")
                //   .doc(uidval)
                //   .collection("pastParties")
                //   .doc("testParty")
                //   .set({
                //     partyMembers: [],
                //     location: "testLocation",
                //   });
                // firestore()
                //   .collection("Users")
                //   .doc(uidval)
                //   .collection("invitations")
                //   .doc("testInvitation")
                //   .set({
                //     inviter: "Potato Stalin",
                //     accepted: false,
                //     isDuo: true,
                //   });
              })
              .catch(function (e) {
                console.log(e);
                Alert.alert(
                  "There was a problem signing you up! ",
                  "Please check to make sure all the fields are correctly filled in"
                );
              });
          } catch (e) {
            console.error(e);
          }
        },

        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },

        otpAuth: async(phoneNumber) => {
          const [confirm, setConfirm] = useState(null)
          try{ 
            const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
            setConfirm(confirmation)
          } catch (error) {
            alert(error);
          }
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
