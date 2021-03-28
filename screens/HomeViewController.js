import React, { useEffect, useState, useRef } from "react";
import { useContext } from "react";
import { View, StyleSheet, FlatList, StatusBar } from "react-native";
import {
  View,
  Image,
  StyleSheet,
  ImageBackground,
  StatusBar,
  ScrollView,
} from "react-native";
import { AuthContext } from "../navigation/AuthProvider.js";
import { Text } from "galio-framework";
import firestore from "@react-native-firebase/firestore";
import InviteCard from "../component/InviteCard";
import PartyCard from "../component/PartyCard.js";

const HomeViewController = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);

  const partyCollection = firestore().collection("Parties");
  const inviteCollection = firestore()
    .collection("Users")
    .doc(user.uid)
    .collection("invitations");

  // subscribe to invites list, remove subscription on mount
  useEffect(() => {
    const unsubscribe = inviteCollection.onSnapshot(
      (snapshot) => {
        const results = snapshot.docs.map((x) => ({ ...x.data(), id: x.id }));
        setData(results);
      },
      (err) => alert(x)
    );

    return () => unsubscribe();
  }, []);

  const handleAccept = async (invite) => {
    try {
      const increment = firestore.FieldValue.increment(1);
      await partyCollection
        .doc(invite.docID)
        .update({ participantCount: increment });

      await inviteCollection.doc(invite.id).update({
        accepted: true,
      });

      navigation.navigate("DuosPartyScreen", {
        partyID: invite.docID,
        inviteID: invite.id,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text h2 style={styles.title}>
        Parties
      </Text>

      <PartyCard invite={{}} />
      <StatusBar translucent={true} />
      <Text h2 style={styles.title}>
        Invitations
      </Text>
      <View style={styles.invitationscontainer}>
        <Text h3 style={styles.subtitle}>
          Pending
        </Text>

        <FlatList
          data={data}
          style={{ paddingTop: 5 }}
          renderItem={({ item }) => (
            <InviteCard invite={item} onAccept={handleAccept} />
          )}
          keyExtractor={() => 1}
        />
      </View>
    </View>
  );
};

export default HomeViewController;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    color: "black",
    justifyContent: "center",
    marginLeft: "5%",
    fontSize: 43,
    fontFamily: "PingFangHK-Medium",
    marginTop: "15%",
    letterSpacing: 0.1,
  },
  subtitle: {
    color: "#ee0979",
    justifyContent: "center",
    marginLeft: "5%",
    fontSize: 43,
    fontFamily: "PingFangHK-Medium",
    // marginTop: "15%",
    letterSpacing: 0.1,
  },
  invitationscontainer: {
    flex: 0.95,
    borderWidth: 1,
    borderRadius: 25,
    marginTop: "5%",
    borderColor: "white",
    marginLeft: "3%",
    marginRight: "3%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 100,
    elevation: 1,
  },
  bottomView: {
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "5%",
    position: "absolute",
    bottom: 0,
  },
});
