import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { View, Image, StyleSheet } from "react-native";
import { AuthContext } from "../navigation/AuthProvider.js";
import { Text } from "galio-framework";
import {Divider} from 'react-native-elements';
import firestore from "@react-native-firebase/firestore";

const HomeViewController = () => {
  const { user } = useContext(AuthContext);
  const [userHandle, setUserHandle] = useState("");
  const [profileBool, setProfileBool] = useState("");
  
  const B = (props) => <Text style={{fontWeight: "bold"}}>{props.children}</Text>


  useEffect(() => {
    const main = async () => {
      const refVal = firestore().collection("Users").doc(user.uid);
      const doc = await refVal.get();
      const {handle} = doc.data();
      const {flavorProfileCreated} = doc.data();

      setUserHandle(handle);
      setProfileBool(flavorProfileCreated);
    };
    main();
  }, []);

  var message;
    if(profileBool==false) {
        message="You have not created a flavor profile. Tap this card to set it up!"
    } else {
        message="suck my dick"
    }

  return (
    <View style={styles.container}>
      <Text h3 size={45} style={styles.title}>
        <B>@{userHandle}'s</B> Home
      </Text>
      <Divider style={{backgroundColor: "#C4b2bc", height: 2,}}/>
    </View>
  );
};

export default HomeViewController;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#16335e",
  },
  title: {
    color: "#f76f6d",
    justifyContent: "center",
    padding: 15,
  },
  button: {
    marginTop: 20,
    height: 37,
    width: "50%",
    backgroundColor: "#F76F6D",
    borderRadius: 15,
  },
});
