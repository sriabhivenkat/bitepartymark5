import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { View, Image, StyleSheet } from "react-native";
import { AuthContext } from "../navigation/AuthProvider.js";
import { Text } from "galio-framework";
import firestore from "@react-native-firebase/firestore";

const HomeViewController = () => {
  const { user } = useContext(AuthContext);
  const [userHandle, setUserHandle] = useState("");
  const B = (props) => <Text style={{fontWeight: "bold"}}>{props.children}</Text>


  useEffect(() => {
    const main = async () => {
      const refVal = firestore().collection("Users").doc(user.uid);
      const doc = await refVal.get();
      const {handle} = doc.data()
      setUserHandle(handle)
    };
    main();
  }, []);

  return (
    <View style={styles.container}>
      <Text h3 size={45} style={styles.title}>
        <B>@{userHandle}'s</B> Home
      </Text>
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
